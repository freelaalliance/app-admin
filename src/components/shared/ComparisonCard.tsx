'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface ComparisonItem {
  label: string
  value: number
  total?: number
  color?: string
  badge?: string
}

interface ComparisonCardProps {
  title: string
  description?: string
  items: ComparisonItem[]
  showPercentage?: boolean
  className?: string
}

export function ComparisonCard({
  title,
  description,
  items,
  showPercentage = true,
  className,
}: ComparisonCardProps) {
  const maxValue = Math.max(...items.map((item) => item.total || item.value))

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0
          const displayValue = item.total
            ? `${item.value}/${item.total}`
            : item.value.toLocaleString('pt-BR')

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-bold">{displayValue}</span>
              </div>
              <Progress
                value={percentage}
                className="h-2"
                style={{
                  ['--progress-background' as any]: item.color || 'hsl(var(--primary))',
                }}
              />
              {showPercentage && (
                <p className="text-xs text-muted-foreground">
                  {percentage.toFixed(1)}% do total
                </p>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
