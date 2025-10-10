'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useResumoCompras, usePedidos } from '../../_hooks/useComprasData'
import { ShoppingCart, CheckCircle, Clock, XCircle } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ComprasTabProps {
  empresaId: string
}

export default function ComprasTab({ empresaId }: ComprasTabProps) {
  const [dataInicio] = useState<string>()
  const [dataFim] = useState<string>()

  const { data: resumo, isLoading: isLoadingResumo } = useResumoCompras(empresaId)
  const { data: pedidos, isLoading: isLoadingPedidos } = usePedidos(
    empresaId,
    dataInicio,
    dataFim
  )

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <IndicadorInfo
          titulo="Total de Pedidos"
          info={resumo?.totalPedidos?.toString() || '0'}
          icon={ShoppingCart}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Valor Total"
          info={`R$ ${(resumo?.valorTotalPedidos || 0).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={ShoppingCart}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Pedidos Pendentes"
          info={resumo?.pedidosPendentes?.toString() || '0'}
          subtitulo="Aguardando recebimento"
          icon={Clock}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-yellow-500"
        />
        <IndicadorInfo
          titulo="Pedidos Recebidos"
          info={resumo?.pedidosRecebidos?.toString() || '0'}
          subtitulo="Já recebidos"
          icon={CheckCircle}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Pedidos Cancelados"
          info={resumo?.pedidosCancelados?.toString() || '0'}
          subtitulo="Cancelados"
          icon={XCircle}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-red-500"
        />
        <IndicadorInfo
          titulo="Pedidos no Mês"
          info={resumo?.pedidosNoMes?.toString() || '0'}
          subtitulo="Mês atual"
          icon={ShoppingCart}
          carregandoInformacao={isLoadingResumo}
        />
      </div>

      {/* Lista de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos de Compra</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingPedidos ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : pedidos && pedidos.length > 0 ? (
            <div className="space-y-3">
              {pedidos.map((pedido) => {
                const recebido = pedido.recebido
                const cancelado = pedido.cancelado
                const pendente = !recebido && !cancelado

                return (
                  <div
                    key={pedido.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Pedido #{pedido.numPedido}</h4>
                        <span className="text-sm text-muted-foreground">({pedido.codigo})</span>
                        {cancelado && (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Cancelado
                          </Badge>
                        )}
                        {recebido && (
                          <Badge variant="outline">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Recebido
                          </Badge>
                        )}
                        {pendente && (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pendente
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Fornecedor:</strong> {pedido.fornecedor.nome} ({pedido.fornecedor.documento})
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>
                          <strong>Prazo:</strong>{' '}
                          {format(new Date(pedido.prazoEntrega), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                        <span>
                          <strong>Cadastro:</strong>{' '}
                          {format(new Date(pedido.cadastro.dataCadastro), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        </span>
                        <span>
                          <strong>Entrega parcial:</strong> {pedido.permiteEntregaParcial ? 'Sim' : 'Não'}
                        </span>
                      </div>
                      {pedido.condicoesEntrega && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Condições:</strong> {pedido.condicoesEntrega}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Cadastrado por: {pedido.cadastro.usuario}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum pedido encontrado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
