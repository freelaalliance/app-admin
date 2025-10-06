import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-gradient-to-br from-alliance-primary-100 to-alliance-secondary-100 dark:from-alliance-primary-900 dark:to-alliance-secondary-900 p-6 mb-4">
        <Icon className="h-10 w-10 text-alliance-primary-600 dark:text-alliance-primary-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-alliance-neutral-900 dark:text-alliance-neutral-100">{title}</h3>
      {description && (
        <p className="text-sm text-alliance-neutral-600 dark:text-alliance-neutral-400 mb-6 max-w-sm">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
