'use client'

import { Card } from '@/components/ui/card'
import { Clock, Wrench, AlertTriangle, CheckCircle } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import type { IndicadoresManutencao } from '../../_types/manutencaoTypes'

interface MetricasTabProps {
  indicadores?: IndicadoresManutencao
  isLoading?: boolean
}

export function MetricasTab({ indicadores, isLoading }: MetricasTabProps) {
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
                {indicadores?.mttr?.toFixed(1) || '0.0'}h
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
                {indicadores?.mtbf?.toFixed(1) || '0.0'}h
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
          info={indicadores?.total_manutencoes?.toString() || '0'}
          subtitulo="Realizadas"
          icon={Wrench}
          carregandoInformacao={isLoading || false}
        />
        <IndicadorInfo
          titulo="Preventivas"
          info={indicadores?.manutencoes_preventivas?.toString() || '0'}
          subtitulo="Manutenções preventivas"
          icon={CheckCircle}
          carregandoInformacao={isLoading || false}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Corretivas"
          info={indicadores?.manutencoes_corretivas?.toString() || '0'}
          subtitulo="Manutenções corretivas"
          icon={AlertTriangle}
          carregandoInformacao={isLoading || false}
          className="border-l-4 border-l-yellow-500"
        />
        <IndicadorInfo
          titulo="Em Manutenção"
          info={indicadores?.equipamentos_em_manutencao?.toString() || '0'}
          subtitulo="Equipamentos parados"
          icon={Wrench}
          carregandoInformacao={isLoading || false}
          className="border-l-4 border-l-red-500"
        />
      </div>
    </div>
  )
}
