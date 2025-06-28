import { api } from "@/contexts/AuthContext";

// Types
export interface GoalRef {
  _id: string;
  name: string;
}

export interface Pillar {
  _id: string;
  id?: string; // For compatibility with frontend
  userId: string;
  name: string;
  description?: string;
  category: string;
  goals: string[] | GoalRef[];
  createdAt: string;
  updatedAt?: string;
}

// API Response Type
interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: number;
}

export interface CreatePillarDto {
  name: string;
  description?: string;
  category: string;
  goals?: string[];
}

export interface UpdatePillarDto extends Partial<CreatePillarDto> {}

// Helper function to handle API response
const handleApiResponse = <T>(response: any): T => {
  // If the response has a data property, return it directly
  if (response.data) {
    return response.data;
  }
  // If the response is the data itself, return it
  return response;
};

// API Service
export const PillarsService = {
  /**
   * Get all pillars for the current user
   */
  async getAllPillars(): Promise<Pillar[]> {
    try {
      const response = await api.get<ApiResponse<Pillar[]>>("/pillars");
      const data = handleApiResponse<Pillar[]>(response.data);
      // Ensure each pillar has an id field (for compatibility with frontend)
      return Array.isArray(data) 
        ? data.map(p => ({
            ...p,
            id: p._id || p.id, // Use _id as id if id is not present
            category: p.category || 'Uncategorized' // Ensure category is never undefined
          }))
        : [];
    } catch (error) {
      console.error("Failed to fetch pillars:", error);
      throw error;
    }
  },

  /**
   * Create a new pillar
   */
  async createPillar(data: CreatePillarDto): Promise<Pillar> {
    try {
      const response = await api.post<ApiResponse<Pillar>>("/pillars", data);
      const result = handleApiResponse<Pillar>(response.data);
      return {
        ...result,
        id: result._id || result.id, // Ensure id is set
        goals: result.goals || [] // Ensure goals is always an array
      };
    } catch (error: any) {
      console.error("Failed to create pillar:", error);
      const errorMessage = error.response?.data?.message || "Failed to create pillar";
      throw new Error(errorMessage);
    }
  },

  /**
   * Get all unique pillar categories
   */
  async getPillarCategories(): Promise<string[]> {
    try {
      const response = await api.get<ApiResponse<string[]>>("/pillars/categories/all");
      const data = handleApiResponse<string[]>(response.data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return []; // Return empty array instead of throwing for categories
    }
  },

  /**
   * Get names of all goals for dropdowns
   */
  async getGoalNames(): Promise<Array<{ _id: string; name: string; id?: string }>> {
    try {
      const response = await api.get<ApiResponse<Array<{ _id: string; name: string }>>>(
        "/pillars/goals/names"
      );
      const data = handleApiResponse<Array<{ _id: string; name: string }>>(response.data);
      return Array.isArray(data) 
        ? data.map(g => ({ ...g, id: g._id })) // Add id field for frontend compatibility
        : [];
    } catch (error) {
      console.error("Failed to fetch goal names:", error);
      return []; // Return empty array instead of throwing
    }
  },

  /**
   * Get a single pillar by ID
   */
  async getPillarById(id: string): Promise<Pillar | null> {
    try {
      const response = await api.get<ApiResponse<Pillar>>(`/pillars/${id}`);
      const data = handleApiResponse<Pillar>(response.data);
      return data ? { ...data, id: data._id || data.id } : null;
    } catch (error) {
      console.error(`Failed to fetch pillar ${id}:`, error);
      return null; // Return null instead of throwing
    }
  },

  /**
   * Update a pillar by ID
   */
  async updatePillar(id: string, data: UpdatePillarDto): Promise<Pillar | null> {
    try {
      const response = await api.put<ApiResponse<Pillar>>(`/pillars/${id}`, data);
      const result = handleApiResponse<Pillar>(response.data);
      return result ? { ...result, id: result._id || result.id } : null;
    } catch (error) {
      console.error(`Failed to update pillar ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a pillar by ID
   */
  async deletePillar(id: string): Promise<boolean> {
    try {
      await api.delete(`/pillars/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete pillar ${id}:`, error);
      return false;
    }
  },
};

export default PillarsService;
