import type { ElementType } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface IndicadorInfoProps {
  titulo: string
  info: number | string
  subtitulo?: string
  icon?: ElementType
  carregandoInformacao: boolean
  className?: string
}

export function IndicadorInfo({
  titulo,
  info,
  subtitulo,
  icon: Icon,
  carregandoInformacao,
  className,
}: IndicadorInfoProps) {
  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {carregandoInformacao ? (
          <Skeleton className="h-10 w-10" />
        ) : (
          <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        )}
        {Icon && (
          <Icon
            className={cn(
              'h-8 w-8 text-muted-foreground',
              carregandoInformacao ? 'hidden' : 'flex'
            )}
          />
        )}
      </CardHeader>

      {carregandoInformacao ? (
        <CardContent className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-2 w-48" />
        </CardContent>
      ) : (
        <CardContent className="space-y-1">
          <div className="text-2xl font-bold">{info}</div>
          {subtitulo && (
            <p className="text-sm text-muted-foreground">{subtitulo}</p>
          )}
        </CardContent>
      )}
    </Card>
  )
}
