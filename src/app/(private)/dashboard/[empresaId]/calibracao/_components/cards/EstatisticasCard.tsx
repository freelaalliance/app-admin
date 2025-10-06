import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { SmartphoneNfc, ClipboardCheck, Clock11 } from 'lucide-react'
import type { EstatisticasCalibracao } from '../../_types/calibracaoTypes'

interface EstatisticasCardProps {
  dados: EstatisticasCalibracao | undefined
  isLoading: boolean
}

export function EstatisticasCard({ dados, isLoading }: EstatisticasCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <IndicadorInfo
        titulo="Instrumentos"
        info={dados?.quantidadeInstrumentosEmpresa ?? 0}
        icon={SmartphoneNfc}
        carregandoInformacao={isLoading}
      />
      <IndicadorInfo
        titulo="Aprovadas"
        info={dados?.quantidadeCalibracoesAprovadas ?? 0}
        icon={ClipboardCheck}
        carregandoInformacao={isLoading}
        className="border-l-4 border-l-green-500"
      />
      <IndicadorInfo
        titulo="Reprovadas"
        info={dados?.quantidadeCalibracoesReprovadas ?? 0}
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
  )
}
