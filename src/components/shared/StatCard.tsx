'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    type: 'up' | 'down' | 'neutral'
    description: string
  }
  className?: string
  isLoading?: boolean
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  isLoading = false,
}: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend?.type) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />
      case 'down':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (trend?.type) {
      case 'up':
        return 'bg-alliance-success-100 text-alliance-success-800 border-alliance-success-200 dark:bg-alliance-success-900 dark:text-alliance-success-200'
      case 'down':
        return 'bg-alliance-danger-100 text-alliance-danger-800 border-alliance-danger-200 dark:bg-alliance-danger-900 dark:text-alliance-danger-200'
      default:
        return 'bg-alliance-neutral-100 text-alliance-neutral-800 border-alliance-neutral-200 dark:bg-alliance-neutral-800 dark:text-alliance-neutral-200'
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-alliance-neutral-200 dark:border-alliance-neutral-700 hover:shadow-lg hover:border-alliance-primary-300 transition-all', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-alliance-neutral-600 dark:text-alliance-neutral-400">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-alliance-secondary-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}
        {trend && (
          <Badge variant="outline" className={`text-xs ${getTrendColor()}`}>
            <span className="flex items-center gap-1">
              {getTrendIcon()}
              {Math.abs(trend.value)}%
              <span className="font-normal">{trend.description}</span>
            </span>
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
