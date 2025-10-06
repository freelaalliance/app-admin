'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Expedicao } from '../_types/expedicaoTypes'
import { Package, Truck, Calendar, Star, Weight, Box } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ListaExpedicoesProps {
  expedicoes: Expedicao[]
  isLoading: boolean
}

const statusConfig = {
  pendente: { label: 'Pendente', variant: 'secondary' as const, icon: Package },
  em_preparacao: { label: 'Em Preparação', variant: 'default' as const, icon: Box },
  expedida: { label: 'Expedida', variant: 'default' as const, icon: Truck },
  entregue: { label: 'Entregue', variant: 'outline' as const, icon: Package },
  cancelada: { label: 'Cancelada', variant: 'destructive' as const, icon: Package },
}

export function ListaExpedicoes({ expedicoes, isLoading }: ListaExpedicoesProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (expedicoes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">Nenhuma expedição encontrada</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {expedicoes.map((exp) => {
        const config = statusConfig[exp.status]
        const StatusIcon = config.icon

        return (
          <Card key={exp.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-lg">
                      Expedição #{exp.numero_expedicao}
                    </CardTitle>
                    <Badge variant={config.variant}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                    {exp.avaliacao && (
                      <Badge variant="outline" className="gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {exp.avaliacao.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Pedido:</strong> #{exp.numero_pedido} • <strong>Cliente:</strong>{' '}
                    {exp.cliente}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">
                      {exp.data_expedicao
                        ? format(new Date(exp.data_expedicao), 'dd/MM/yyyy', { locale: ptBR })
                        : 'Não expedida'}
                    </p>
                    <p className="text-xs">
                      Previsão:{' '}
                      {format(new Date(exp.data_previsao), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">{exp.quantidade_itens} itens</p>
                    <p className="text-xs">Quantidade de produtos</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Weight className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">{exp.peso_total_kg} kg</p>
                    <p className="text-xs">{exp.volume_m3.toFixed(2)} m³</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">
                      {exp.transportadora || 'Não definida'}
                    </p>
                    {exp.codigo_rastreio && (
                      <p className="text-xs font-mono">{exp.codigo_rastreio}</p>
                    )}
                  </div>
                </div>
              </div>

              {exp.observacoes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground italic">{exp.observacoes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
