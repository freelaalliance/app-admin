'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Trophy, TrendingUp, Package, Users } from 'lucide-react'
import type { EstatisticasVendas, TopProduto, TopCliente } from '../../_types/vendasTypes'

interface EstatisticasVendasCardProps {
  dados: EstatisticasVendas | undefined
  topProdutos?: TopProduto[]
  topClientes?: TopCliente[]
  isLoading: boolean
}

export function EstatisticasVendasCard({ 
  dados, 
  topProdutos = [], 
  topClientes = [], 
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
              <p className="text-2xl font-bold">{dados?.produto_mais_vendido || 'N/A'}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4" />
                <span>Destaque em vendas</span>
              </div>
            </div>

            {/* Lista de Top Produtos */}
            {topProdutos.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Top 5 Produtos
                  </span>
                </div>
                <div className="space-y-2">
                  {topProdutos.slice(0, 5).map((produto, index) => (
                    <div
                      key={produto.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium text-yellow-700">
                          {index + 1}
                        </span>
                        <span className="font-medium truncate max-w-[150px]">
                          {produto.nome}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{produto.quantidade_vendida} un.</div>
                        <div className="text-xs text-muted-foreground">
                          R$ {produto.valor_total.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              <p className="text-2xl font-bold">{dados?.cliente_maior_comprador || 'N/A'}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4" />
                <span>Cliente com mais compras</span>
              </div>
            </div>

            {/* Lista de Top Clientes */}
            {topClientes.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Top 5 Clientes
                  </span>
                </div>
                <div className="space-y-2">
                  {topClientes.slice(0, 5).map((cliente, index) => (
                    <div
                      key={cliente.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                          {index + 1}
                        </span>
                        <span className="font-medium truncate max-w-[150px]">
                          {cliente.nome}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{cliente.total_compras} compras</div>
                        <div className="text-xs text-muted-foreground">
                          R$ {cliente.valor_total.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
