'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useResumoFornecedores } from '../../_hooks/useFornecedoresData'
import { Building2, TrendingUp, Users, Activity, Star, ShoppingCart } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'

interface FornecedoresTabProps {
  empresaId: string
}

export default function FornecedoresTab({ empresaId }: FornecedoresTabProps) {
  const { data: resumo, isLoading: isLoadingResumo } = useResumoFornecedores(empresaId)

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <IndicadorInfo
          titulo="Total de Fornecedores"
          info={resumo?.totalFornecedores?.toString() || '0'}
          icon={Building2}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Fornecedores Ativos"
          info={resumo?.fornecedoresAtivos?.toString() || '0'}
          subtitulo="Com cadastro ativo"
          icon={Activity}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Com Pedidos"
          info={resumo?.fornecedoresComPedidos?.toString() || '0'}
          subtitulo="Fornecedores com pedidos"
          icon={ShoppingCart}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Média de Avaliações"
          info={resumo?.mediaAvaliacoes?.toFixed(1) || '0.0'}
          subtitulo="Nota média geral"
          icon={Star}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-yellow-500"
        />
        <IndicadorInfo
          titulo="Total de Compras"
          info={resumo?.totalCompras?.toString() || '0'}
          subtitulo="Quantidade total"
          icon={TrendingUp}
          carregandoInformacao={isLoadingResumo}
        />
        {resumo?.fornecedorMaisUtilizado && (
          <IndicadorInfo
            titulo="Fornecedor Mais Usado"
            info={resumo.fornecedorMaisUtilizado.nome}
            subtitulo={`${resumo.fornecedorMaisUtilizado.totalPedidos} pedidos`}
            icon={Users}
            carregandoInformacao={isLoadingResumo}
            className="border-l-4 border-l-blue-500"
          />
        )}
      </div>

      {/* Informação sobre lista de fornecedores */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingResumo ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div className="space-y-4">
              <div className="text-center py-6">
                <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {resumo?.totalFornecedores || 0} fornecedor{resumo?.totalFornecedores !== 1 ? 'es' : ''} cadastrado{resumo?.totalFornecedores !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-muted-foreground">
                  {resumo?.fornecedoresAtivos || 0} ativo{resumo?.fornecedoresAtivos !== 1 ? 's' : ''} e {resumo?.fornecedoresComPedidos || 0} com pedidos realizados
                </p>
              </div>

              {resumo?.fornecedorMaisUtilizado && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Fornecedor Destaque
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{resumo.fornecedorMaisUtilizado.nome}</p>
                      <p className="text-sm text-muted-foreground">Mais utilizado</p>
                    </div>
                    <Badge variant="outline" className="text-lg">
                      {resumo.fornecedorMaisUtilizado.totalPedidos} pedidos
                    </Badge>
                  </div>
                </div>
              )}

              {resumo?.mediaAvaliacoes && resumo.mediaAvaliacoes > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Avaliação Geral
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(resumo.mediaAvaliacoes)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">
                      {resumo.mediaAvaliacoes.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
