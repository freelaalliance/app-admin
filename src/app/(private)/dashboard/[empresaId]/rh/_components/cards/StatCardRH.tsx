'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface StatCardRHProps {
  titulo: string
  valor: string | number
  subtitulo: string
  icon: LucideIcon
  tendencia?: 'up' | 'down' | 'neutral'
  isLoading?: boolean
  className?: string
}

export function StatCardRH({ 
  titulo, 
  valor, 
  subtitulo, 
  icon: Icon, 
  tendencia,
  isLoading,
  className = '' 
}: StatCardRHProps) {
  const getTendenciaInfo = () => {
    switch (tendencia) {
      case 'up':
        return { icon: TrendingUp, color: 'text-red-500', bgColor: 'bg-red-50', label: 'Aumentou' }
      case 'down':
        return { icon: TrendingDown, color: 'text-green-500', bgColor: 'bg-green-50', label: 'Diminuiu' }
      case 'neutral':
        return { icon: Minus, color: 'text-gray-500', bgColor: 'bg-gray-50', label: 'Estável' }
      default:
        return null
    }
  }

  const tendenciaInfo = getTendenciaInfo()

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <Skeleton className="h-24 w-full" />
      </Card>
    )
  }

  return (
    <Card className={`p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{titulo}</p>
          <p className="text-3xl font-bold mb-1">{valor}</p>
          <p className="text-sm text-muted-foreground">{subtitulo}</p>
        </div>
        <div className="ml-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
      
      {tendenciaInfo && (
        <div className="mt-4 pt-4 border-t">
          <Badge variant="outline" className={`${tendenciaInfo.bgColor} ${tendenciaInfo.color}`}>
            <tendenciaInfo.icon className="h-3 w-3 mr-1" />
            {tendenciaInfo.label}
          </Badge>
        </div>
      )}
    </Card>
  )
}
