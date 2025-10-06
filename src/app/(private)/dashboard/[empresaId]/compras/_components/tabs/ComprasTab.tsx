'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useCompras, useResumoCompras } from '../../_hooks/useComprasData'
import { ShoppingCart, CheckCircle, Clock, XCircle } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ComprasTabProps {
  empresaId: string
}

const statusConfig = {
  pendente: { label: 'Pendente', variant: 'secondary' as const, icon: Clock },
  em_andamento: { label: 'Em Andamento', variant: 'default' as const, icon: ShoppingCart },
  concluido: { label: 'Concluído', variant: 'outline' as const, icon: CheckCircle },
  cancelado: { label: 'Cancelado', variant: 'destructive' as const, icon: XCircle },
}

export default function ComprasTab({ empresaId }: ComprasTabProps) {
  const [dataInicio] = useState<string>()
  const [dataFim] = useState<string>()

  const { data: resumoData, isLoading: isLoadingResumo } = useResumoCompras(empresaId)
  const { data: comprasData, isLoading: isLoadingCompras } = useCompras(
    empresaId,
    dataInicio,
    dataFim
  )

  const resumo = resumoData?.resumo
  const compras = comprasData?.compras || []

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IndicadorInfo
          titulo="Total de Pedidos"
          info={resumo?.total_pedidos?.toString() || '0'}
          icon={ShoppingCart}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Valor Total"
          info={`R$ ${(resumo?.valor_total || 0).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={ShoppingCart}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Pedidos Pendentes"
          info={resumo?.pedidos_pendentes?.toString() || '0'}
          subtitulo="Aguardando processamento"
          icon={Clock}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Pedidos Concluídos"
          info={resumo?.pedidos_concluidos?.toString() || '0'}
          subtitulo="Finalizados com sucesso"
          icon={CheckCircle}
          carregandoInformacao={isLoadingResumo}
        />
      </div>

      {/* Lista de Compras */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Compras</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingCompras ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : compras.length > 0 ? (
            <div className="space-y-3">
              {compras.map((compra) => {
                const config = statusConfig[compra.status]
                const StatusIcon = config.icon

                return (
                  <div
                    key={compra.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Pedido #{compra.numero_pedido}</h4>
                        <Badge variant={config.variant}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Fornecedor:</strong> {compra.fornecedor}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>
                          <strong>Pedido:</strong>{' '}
                          {format(new Date(compra.data_pedido), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                        {compra.data_entrega && (
                          <span>
                            <strong>Entrega:</strong>{' '}
                            {format(new Date(compra.data_entrega), 'dd/MM/yyyy', {
                              locale: ptBR,
                            })}
                          </span>
                        )}
                        <span>
                          <strong>Itens:</strong> {compra.itens}
                        </span>
                      </div>
                      {compra.observacoes && (
                        <p className="text-sm text-muted-foreground italic">
                          {compra.observacoes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        R${' '}
                        {compra.valor_total.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma compra encontrada
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
