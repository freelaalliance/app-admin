'use client'

import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  description?: string
  trend?: {
    value: number
    label?: string
  }
  formatter?: (value: number | string) => string
  className?: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  formatter,
  className,
}: MetricCardProps) {
  const displayValue = formatter ? formatter(value) : value

  const getTrendIcon = () => {
    if (!trend) return null
    if (trend.value > 0) return <TrendingUp className="h-4 w-4" />
    if (trend.value < 0) return <TrendingDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getTrendColor = () => {
    if (!trend) return ''
    if (trend.value > 0) return 'text-alliance-success-600 dark:text-alliance-success-400'
    if (trend.value < 0) return 'text-alliance-danger-600 dark:text-alliance-danger-400'
    return 'text-alliance-neutral-600 dark:text-alliance-neutral-400'
  }

  return (
    <Card className={cn('border-alliance-neutral-200 dark:border-alliance-neutral-700 hover:shadow-lg transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-alliance-neutral-600 dark:text-alliance-neutral-400">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-alliance-primary-500" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{displayValue}</div>
        
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-1">
            {trend && (
              <div className={cn('flex items-center gap-1 text-sm', getTrendColor())}>
                {getTrendIcon()}
                <span className="font-medium">
                  {Math.abs(trend.value)}%
                </span>
                {trend.label && (
                  <span className="text-muted-foreground">{trend.label}</span>
                )}
              </div>
            )}
            {description && !trend && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
