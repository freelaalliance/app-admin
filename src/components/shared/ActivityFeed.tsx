'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export interface ActivityItem {
  id: string | number
  type: string
  title: string
  description?: string
  timestamp: string | Date
  icon?: LucideIcon
  user?: string
  badge?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

interface ActivityFeedProps {
  title?: string
  description?: string
  activities: ActivityItem[]
  showRelativeTime?: boolean
  maxItems?: number
  className?: string
}

export function ActivityFeed({
  title = 'Atividades Recentes',
  description,
  activities,
  showRelativeTime = true,
  maxItems,
  className,
}: ActivityFeedProps) {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity, index) => {
            const Icon = activity.icon
            const timestamp = new Date(activity.timestamp)

            return (
              <div key={activity.id}>
                <div className="flex gap-4">
                  {Icon && (
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-muted p-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                        )}
                        {activity.user && (
                          <p className="text-xs text-muted-foreground mt-1">
                            por {activity.user}
                          </p>
                        )}
                      </div>
                      {activity.badge && (
                        <Badge variant={activity.badge.variant || 'default'} className="shrink-0">
                          {activity.badge.label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {showRelativeTime
                        ? formatDistanceToNow(timestamp, { addSuffix: true, locale: ptBR })
                        : format(timestamp, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                {index < displayActivities.length - 1 && <Separator className="mt-4" />}
              </div>
            )
          })}

          {displayActivities.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma atividade recente
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
