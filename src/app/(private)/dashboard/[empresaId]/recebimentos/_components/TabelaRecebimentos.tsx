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

  // Tratativa de null/undefined para recebimentos
  const recebimentosValidos = recebimentos ?? []

  if (recebimentosValidos.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum recebimento encontrado para o período selecionado.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {recebimentosValidos.map((recebimento) => {
        // Tratativas de null/undefined com optional chaining e nullish coalescing
        const avaliacoes = recebimento?.AvaliacaoRecebimento ?? []

        return (
          <Card key={recebimento?.id ?? Math.random()} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Informações Principais */}
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Pedido:</span> #{recebimento?.compra?.numPedido ?? 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Data:</span>{' '}
                    {recebimento?.recebidoEm
                      ? format(new Date(recebimento.recebidoEm), 'dd/MM/yyyy', { locale: ptBR })
                      : 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Itens avaliados:</span> {avaliacoes.length}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Nota Final</p>
                  <Badge variant="outline" className="bg-red-50 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-red-400 text-red-400" />
                    {Number(recebimento.avaliacaoEntrega).toFixed(2)}
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
