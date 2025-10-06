'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown, Package, CheckCircle, XCircle, Star } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useResumoRecebimentos, useRecebimentos, useDadosGrafico } from './_hooks/useRecebimentosData'
import { FiltroData } from './_components/FiltroData'
import { TabelaRecebimentos } from './_components/TabelaRecebimentos'
import { GraficoAvaliacoes } from './_components/GraficoAvaliacoes'

export default function RecebimentosPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const [dataInicio, setDataInicio] = useState<string>()
  const [dataFim, setDataFim] = useState<string>()

  const { data: resumo, isLoading: isLoadingResumo } = useResumoRecebimentos(empresaId)
  const { data: recebimentosData, isLoading: isLoadingRecebimentos } = useRecebimentos(
    empresaId,
    dataInicio,
    dataFim
  )
  const { data: graficosData, isLoading: isLoadingGrafico } = useDadosGrafico(
    empresaId,
    dataInicio,
    dataFim
  )

  const recebimentos = recebimentosData?.recebimentos || []
  const dadosGrafico = graficosData?.dados || []

  const handleFiltrar = (inicio?: string, fim?: string) => {
    setDataInicio(inicio)
    setDataFim(fim)
  }

  const handleExportarPDF = () => {
    // TODO: Implementar exportação para PDF
    console.log('Exportar PDF - Recebimentos')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recebimentos</h1>
          <p className="text-muted-foreground">
            Acompanhe os recebimentos e avaliações de fornecedores
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
          titulo="Total de Recebimentos"
          info={resumo?.total_recebimentos?.toString() || '0'}
          subtitulo="Todos os recebimentos"
          icon={Package}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Aprovados"
          info={resumo?.recebimentos_aprovados?.toString() || '0'}
          subtitulo="Recebimentos aprovados"
          icon={CheckCircle}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Reprovados"
          info={resumo?.recebimentos_reprovados?.toString() || '0'}
          subtitulo="Recebimentos reprovados"
          icon={XCircle}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-red-500"
        />
        <IndicadorInfo
          titulo="Média de Avaliação"
          info={resumo?.media_avaliacao?.toFixed(1) || '0.0'}
          subtitulo="Avaliação geral"
          icon={Star}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-yellow-500"
        />
      </div>

      {/* Filtro de Data */}
      <FiltroData onFiltrar={handleFiltrar} />

      {/* Gráfico de Avaliações */}
      <GraficoAvaliacoes dados={dadosGrafico} isLoading={isLoadingGrafico} />

      {/* Tabela de Recebimentos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Histórico de Recebimentos</h2>
        <TabelaRecebimentos recebimentos={recebimentos} isLoading={isLoadingRecebimentos} />
      </div>
    </div>
  )
}
