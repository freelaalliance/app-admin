'use client'

import { Card } from '@/components/ui/card'
import { Clock, Wrench, CheckCircle, Power, PowerOff } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import type { IndicadoresManutencao, EstatisticasStatus, EstatisticasGerais } from '../../_types/manutencaoTypes'

interface MetricasTabProps {
  indicadores?: IndicadoresManutencao
  estatisticasStatus?: EstatisticasStatus
  estatisticasGerais?: EstatisticasGerais
  isLoading?: boolean
}

export function MetricasTab({ indicadores, estatisticasStatus, estatisticasGerais, isLoading }: MetricasTabProps) {
  // Calcular MTTR e MTBF a partir dos dados disponíveis
  const mttrHoras = indicadores && indicadores.qtd_manutencoes > 0
    ? (indicadores.total_tempo_parado / indicadores.qtd_manutencoes / 60).toFixed(1)
    : '0.0'
  
  const mtbfHoras = indicadores && indicadores.qtd_manutencoes > 0
    ? (indicadores.total_tempo_operacao / indicadores.qtd_manutencoes / 60).toFixed(1)
    : '0.0'
  
  return (
    <div className="space-y-6">
      {/* Cards de Indicadores MTTR e MTBF */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">MTTR</p>
              <p className="text-sm text-muted-foreground">Mean Time To Repair</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div>
              <p className="text-4xl font-bold mb-1">
                {mttrHoras}h
              </p>
              <p className="text-sm text-muted-foreground">
                Tempo médio de reparo
              </p>
            </div>
          )}
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">MTBF</p>
              <p className="text-sm text-muted-foreground">Mean Time Between Failures</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
          {isLoading ? (
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div>
              <p className="text-4xl font-bold mb-1">
                {mtbfHoras}h
              </p>
              <p className="text-sm text-muted-foreground">
                Tempo médio entre falhas
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IndicadorInfo
          titulo="Total de Manutenções"
          info={indicadores?.qtd_manutencoes?.toString() || estatisticasGerais?.qtd_manutencoes_realizadas?.toString() || '0'}
          subtitulo="Realizadas"
          icon={Wrench}
          carregandoInformacao={isLoading || false}
        />
        <IndicadorInfo
          titulo="Equipamentos Funcionando"
          info={estatisticasStatus?.qtd_equipamentos_funcionando?.toString() || '0'}
          subtitulo="Equipamentos em operação"
          icon={Power}
          carregandoInformacao={isLoading || false}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Equipamentos Parados"
          info={estatisticasStatus?.qtd_equipamentos_parados?.toString() || '0'}
          subtitulo="Em manutenção"
          icon={PowerOff}
          carregandoInformacao={isLoading || false}
          className="border-l-4 border-l-red-500"
        />
        <IndicadorInfo
          titulo="Manutenção em Dia"
          info={estatisticasGerais?.qtd_equipamentos_manutencao_em_dia?.toString() || '0'}
          subtitulo="Equipamentos conformes"
          icon={CheckCircle}
          carregandoInformacao={isLoading || false}
          className="border-l-4 border-l-blue-500"
        />
      </div>
    </div>
  )
}
