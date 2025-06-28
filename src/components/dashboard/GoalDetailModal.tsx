import React from "react"
import { Calendar, Clock, Target, CheckCircle, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

interface GoalDetailModalProps {
  isOpen: boolean
  onClose: () => void
  goal: {
    id: string
    name: string
    description?: string
    createdAt: string | Date
    updatedAt?: string | Date
    notes?: string
  }
  onSaveNotes: (notes: string) => Promise<void>
}

export function GoalDetailModal({
  isOpen,
  onClose,
  goal,
  onSaveNotes
}: GoalDetailModalProps) {
  const [notes, setNotes] = React.useState(goal?.notes || '')
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'saving' | 'saved'>('idle')
  const notesRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  React.useEffect(() => {
    if (notesRef.current) {
      notesRef.current.style.height = 'auto'
      notesRef.current.style.height = `${notesRef.current.scrollHeight}px`
    }
  }, [notes])

  const handleSave = async () => {
    if (isSaving) return
    
    try {
      setIsSaving(true)
      setSaveStatus('saving')
      await onSaveNotes(notes)
      setSaveStatus('saved')
      
      // Reset save status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Failed to save notes:', error)
      setSaveStatus('idle')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Auto-save when notes change (with debounce)
  React.useEffect(() => {
    if (notes === goal?.notes) return
    
    const timer = setTimeout(() => {
      if (notes.trim() !== (goal?.notes || '').trim()) {
        handleSave()
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [notes, goal?.notes])

  if (!goal) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-blue-200/80 dark:border-blue-900/30">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {goal.name}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Created: {format(new Date(goal.createdAt), 'MMM d, yyyy')}
            </div>
            {goal.updatedAt && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Updated: {format(new Date(goal.updatedAt), 'MMM d, yyyy')}
              </div>
            )}
            {saveStatus === 'saving' && (
              <div className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Saving...
              </div>
            )}
            {saveStatus === 'saved' && (
              <div className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                Saved
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium mb-2 text-muted-foreground">
              <ListChecks className="h-4 w-4" />
              Goal Details
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-muted-foreground pl-4">
                  {goal.description || 'No description provided'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Notes</h3>
              {saveStatus === 'saved' && (
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Saved
                </span>
              )}
            </div>
            <Textarea
              ref={notesRef}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="min-h-[150px] resize-none"
              disabled={isSaving}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={isSaving || notes === goal.notes}
                size="sm"
                className="mt-2"
              >
                {isSaving ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
