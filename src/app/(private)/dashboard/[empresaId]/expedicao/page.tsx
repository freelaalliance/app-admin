'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown, Package, Truck, CheckCircle, Star } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useExpedicoes, useResumoExpedicao, useMediaAvaliacao } from './_hooks/useExpedicaoData'
import { ListaExpedicoes } from './_components/ListaExpedicoes'

export default function ExpedicaoPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: expedicoesData, isLoading: isLoadingExpedicoes } = useExpedicoes(empresaId)
  const { data: resumo, isLoading: isLoadingResumo } = useResumoExpedicao(empresaId)
  const { data: mediaData, isLoading: isLoadingMedia } = useMediaAvaliacao(empresaId)

  const expedicoes = expedicoesData?.expedicoes || []

  const handleExportarPDF = () => {
    // TODO: Implementar exportação para PDF
    console.log('Exportar PDF - Expedição')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expedição</h1>
          <p className="text-muted-foreground">
            Acompanhe o status das expedições e entregas
          </p>
        </div>
        <Button onClick={handleExportarPDF} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IndicadorInfo
          titulo="Expedições Pendentes"
          info={resumo?.expedicoes_pendentes?.toString() || '0'}
          subtitulo="Aguardando expedição"
          icon={Package}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-yellow-500"
        />
        <IndicadorInfo
          titulo="Expedições Realizadas"
          info={resumo?.expedicoes_expedidas?.toString() || '0'}
          subtitulo="Já despachadas"
          icon={Truck}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-blue-500"
        />
        <IndicadorInfo
          titulo="Total de Expedições"
          info={resumo?.total_expedicoes?.toString() || '0'}
          subtitulo="Todas as expedições"
          icon={CheckCircle}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Média de Avaliação"
          info={mediaData?.media_avaliacao?.toFixed(1) || '0.0'}
          subtitulo={`${mediaData?.total_avaliacoes || 0} avaliações`}
          icon={Star}
          carregandoInformacao={isLoadingMedia}
          className="border-l-4 border-l-green-500"
        />
      </div>

      {/* Lista de Expedições */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Expedições Recentes</h2>
        <ListaExpedicoes expedicoes={expedicoes} isLoading={isLoadingExpedicoes} />
      </div>
    </div>
  )
}
