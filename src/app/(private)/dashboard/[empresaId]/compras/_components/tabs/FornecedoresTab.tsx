'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useFornecedores, useResumoFornecedores } from '../../_hooks/useFornecedoresData'
import { Building2, TrendingUp, Users, Activity } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'

interface FornecedoresTabProps {
  empresaId: string
}

export default function FornecedoresTab({ empresaId }: FornecedoresTabProps) {
  const { data: resumoData, isLoading: isLoadingResumo } = useResumoFornecedores(empresaId)
  const { data: fornecedoresData, isLoading: isLoadingFornecedores } = useFornecedores(empresaId)

  const resumo = resumoData?.resumo
  const fornecedores = fornecedoresData?.fornecedores || []

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IndicadorInfo
          titulo="Total de Fornecedores"
          info={resumo?.total_fornecedores?.toString() || '0'}
          icon={Building2}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Fornecedores Ativos"
          info={resumo?.fornecedores_ativos?.toString() || '0'}
          icon={Activity}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Críticos"
          info={resumo?.fornecedores_criticos?.toString() || '0'}
          subtitulo="Fornecedores críticos"
          icon={TrendingUp}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Não Críticos"
          info={resumo?.fornecedores_nao_criticos?.toString() || '0'}
          subtitulo="Fornecedores não críticos"
          icon={Users}
          carregandoInformacao={isLoadingResumo}
        />
      </div>

      {/* Tabela de Fornecedores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingFornecedores ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : fornecedores.length > 0 ? (
            <div className="space-y-3">
              {fornecedores.map((fornecedor) => (
                <div
                  key={fornecedor.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{fornecedor.nome}</h4>
                      <Badge
                        variant={fornecedor.tipo === 'critico' ? 'destructive' : 'secondary'}
                      >
                        {fornecedor.tipo === 'critico' ? 'Crítico' : 'Não Crítico'}
                      </Badge>
                      <Badge variant={fornecedor.status === 'ativo' ? 'default' : 'outline'}>
                        {fornecedor.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">CNPJ: {fornecedor.cnpj}</p>
                    {fornecedor.cidade && fornecedor.estado && (
                      <p className="text-sm text-muted-foreground">
                        {fornecedor.cidade}/{fornecedor.estado}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">
                      {fornecedor.total_compras} {fornecedor.total_compras === 1 ? 'compra' : 'compras'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      R$ {fornecedor.valor_total_compras.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    {fornecedor.ultima_compra && (
                      <p className="text-xs text-muted-foreground">
                        Última: {new Date(fornecedor.ultima_compra).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum fornecedor encontrado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
