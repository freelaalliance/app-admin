'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import type { Recebimento } from '../_types/recebimentosTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface TabelaRecebimentosProps {
  recebimentos: Recebimento[]
  isLoading?: boolean
}

const statusConfig = {
  aprovado: { label: 'Aprovado', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' },
  reprovado: { label: 'Reprovado', variant: 'destructive' as const, className: '' },
  pendente: { label: 'Pendente', variant: 'secondary' as const, className: '' },
}

export function TabelaRecebimentos({ recebimentos, isLoading }: TabelaRecebimentosProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-24 w-full" />
          </Card>
        ))}
      </div>
    )
  }

  if (recebimentos.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum recebimento encontrado para o período selecionado.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {recebimentos.map((recebimento) => {
        const statusInfo = statusConfig[recebimento.status]
        
        return (
          <Card key={recebimento.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Informações Principais */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{recebimento.fornecedor}</h3>
                  <Badge variant={statusInfo.variant} className={statusInfo.className}>
                    {statusInfo.label}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Pedido:</span> {recebimento.numero_pedido}
                  </div>
                  <div>
                    <span className="font-medium">Data:</span>{' '}
                    {format(new Date(recebimento.data_recebimento), 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                  <div>
                    <span className="font-medium">Itens:</span> {recebimento.quantidade_itens}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{recebimento.avaliacao_media.toFixed(1)}</span>
                  </div>
                </div>
                {recebimento.observacoes && (
                  <p className="mt-2 text-sm text-muted-foreground italic">
                    {recebimento.observacoes}
                  </p>
                )}
              </div>

              {/* Avaliações */}
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Mínima</p>
                  <Badge variant="outline" className="bg-red-50">
                    {recebimento.avaliacao_minima.toFixed(1)}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Média</p>
                  <Badge variant="outline" className="bg-yellow-50">
                    {recebimento.avaliacao_media.toFixed(1)}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Máxima</p>
                  <Badge variant="outline" className="bg-green-50">
                    {recebimento.avaliacao_maxima.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
