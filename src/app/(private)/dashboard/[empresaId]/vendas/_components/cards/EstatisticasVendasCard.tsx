'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Trophy, TrendingUp } from 'lucide-react'
import type { ClienteTop, ProdutoTop } from '../../_types/vendasTypes'

interface EstatisticasVendasCardProps {
  clienteTop: ClienteTop | null | undefined
  produtoTop: ProdutoTop | null | undefined
  isLoading: boolean
}

export function EstatisticasVendasCard({ 
  clienteTop,
  produtoTop,
  isLoading 
}: EstatisticasVendasCardProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Card Top Produto */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Produto Mais Vendido</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold">{produtoTop?.nome || 'N/A'}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4" />
                <span>Total vendido: {produtoTop?.totalVendido || 0} unidades</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Top Cliente */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Maior Comprador</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold">{clienteTop?.cliente || 'N/A'}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4" />
                <span>Total de vendas: {clienteTop?.totalVendas || 0}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
