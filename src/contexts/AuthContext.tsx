"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

// ---------------------------------------------------------------------------
// API instance (exported)
// ---------------------------------------------------------------------------
const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:3000";
export const api = axios.create({ baseURL: API_BASE });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Custom Hook
// ---------------------------------------------------------------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------
const decodeToken = (token: string): { userId: string; email: string; name?: string } | null => {
  console.log(token,"toker");
  
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return {
      userId: decodedPayload.userId || decodedPayload._id,
      email: decodedPayload.email,
      name: decodedPayload.name,
    };
  } catch (err) {
    return null;
  }
};

// ---------------------------------------------------------------------------
// Auth Provider Component
// ---------------------------------------------------------------------------
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from API
  const fetchProfile = async (): Promise<User | null> => {
    try {
      const { data } = await api.get<any>("/auth/profile");
      const u = data.user || data;
      return {
        id: u._id || u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=6366f1&color=fff`,
      };
    } catch (err) {
      return null;
    }
  };

  // Authenticate user (login/register)
  const authenticate = async (
    email: string,
    password: string,
    name?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Register if name is provided
      if (name) {
        await api.post("/auth/signup", { name, email, password });
      }

      // Login to get token
      const loginRes = await api.post<{ token: string }>("/auth/login", { email, password });
      const { token } = loginRes.data;
      
      if (!token) {
        console.error("No token returned from API");
        return false;
      }

      localStorage.setItem("token", token);

      // Try to get full profile from API, fall back to token data
      let profile = await fetchProfile();
      
      if (!profile) {
        const decoded = decodeToken(token);
        if (decoded) {
          profile = {
            id: decoded.userId,
            name: decoded.name || email.split('@')[0],
            email: decoded.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              decoded.name || email[0].toUpperCase()
            )}&background=6366f1&color=fff`,
          };
        }
      }
      
      if (profile) {
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        // Check for stored user first
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoading(false);
          return;
        }
        
        // If no stored user but we have a token, try to fetch profile
        const token = localStorage.getItem("token");
        if (token) {
          const profile = await fetchProfile();
          if (profile) {
            setUser(profile);
            localStorage.setItem("user", JSON.stringify(profile));
          } else {
            // If profile fetch fails but we have a valid token, use token data
            const decoded = decodeToken(token);
            if (decoded) {
              const fallbackUser = {
                id: decoded.userId,
                name: decoded.name || 'User',
                email: decoded.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  decoded.name || (decoded.email ? decoded.email[0].toUpperCase() : 'U')
                )}&background=6366f1&color=fff`,
              };
              setUser(fallbackUser);
              localStorage.setItem("user", JSON.stringify(fallbackUser));
            }
          }
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initialize();
  }, []);

  // Auth methods
  const login = async (email: string, password: string): Promise<boolean> => {
    return authenticate(email, password);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    return authenticate(email, password, name);
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Context value
  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
