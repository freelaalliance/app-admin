import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SmartphoneNfc, ClipboardCheck, Clock11, TrendingUp, AlertTriangle } from 'lucide-react'
import type { EstatisticasCalibracao } from '../../_types/calibracaoTypes'

interface EstatisticasCardProps {
  dados: EstatisticasCalibracao | undefined
  isLoading: boolean
}

export function EstatisticasCard({ dados, isLoading }: EstatisticasCardProps) {
  const totalCalibracoes = (dados?.quantidadeCalibracoesAprovadas ?? 0) + (dados?.quantidadeCalibracoesReprovadas ?? 0)
  const taxaAprovacao = totalCalibracoes > 0 
    ? ((dados?.quantidadeCalibracoesAprovadas ?? 0) / totalCalibracoes * 100).toFixed(1)
    : '0.0'

  return (
    <div className="space-y-4">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <IndicadorInfo
          titulo="Instrumentos"
          info={dados?.quantidadeInstrumentosEmpresa ?? 0}
          subtitulo={`${dados?.quantidadeInstrumentosCadastradoAtual ?? 0} cadastrados recentemente`}
          icon={SmartphoneNfc}
          carregandoInformacao={isLoading}
        />
        <IndicadorInfo
          titulo="Aprovadas"
          info={dados?.quantidadeCalibracoesAprovadas ?? 0}
          subtitulo={`Taxa: ${taxaAprovacao}%`}
          icon={ClipboardCheck}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Reprovadas"
          info={dados?.quantidadeCalibracoesReprovadas ?? 0}
          subtitulo={`Total calibrações: ${totalCalibracoes}`}
          icon={ClipboardCheck}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-red-500"
        />
        <IndicadorInfo
          titulo="Vencendo / Vencidos"
          info={`${dados?.calibracoesVencendo ?? 0} / ${dados?.calibracoesVencido ?? 0}`}
          subtitulo={`Dentro do prazo: ${dados?.calibracoesDentroPrazo ?? 0}`}
          icon={Clock11}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-yellow-500"
        />
      </div>

      {/* Cards de detalhes adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card de Status Geral */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Status Geral</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-20 bg-muted animate-pulse rounded" />
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Taxa de Aprovação</span>
                  <span className="text-2xl font-bold text-green-600">{taxaAprovacao}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${taxaAprovacao}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div>
                    <span className="text-muted-foreground">Total de Calibrações</span>
                    <p className="text-lg font-semibold">{totalCalibracoes}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Instrumentos Ativos</span>
                    <p className="text-lg font-semibold">{dados?.quantidadeInstrumentosEmpresa ?? 0}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card de Alertas */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">Alertas e Pendências</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-20 bg-muted animate-pulse rounded" />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-red-900">Vencidas</span>
                  </div>
                  <span className="text-xl font-bold text-red-600">
                    {dados?.calibracoesVencido ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-yellow-900">Vencendo em breve</span>
                  </div>
                  <span className="text-xl font-bold text-yellow-600">
                    {dados?.calibracoesVencendo ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-900">Dentro do prazo</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {dados?.calibracoesDentroPrazo ?? 0}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
