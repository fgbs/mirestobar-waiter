
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"


export function StateBadge({ state }) {
  let color = ''

  if (state === 'available') {
    color = 'bg-green-400'
  }

  if (state === 'ocupied') {
    color = 'bg-yellow-400'
  }

  if (state === 'reserved') {
    color = 'bg-red-400'
  }

  if (state === 'unavailable') {
    color = 'bg-gray-400'
  }

  return (
    <div className="flex ml-auto items-center space-x-1">
      <Badge 
        variant="outline" 
        className={cn(color)}
      >
        { state }
      </Badge>
    </div>
  )
}