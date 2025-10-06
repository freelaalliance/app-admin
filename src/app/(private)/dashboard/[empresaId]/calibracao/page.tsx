'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowBigDownDash } from 'lucide-react'
import { CalendarioEventos } from '@/components/shared/CalendarioEventos'
import { EstatisticasCard } from './_components/cards/EstatisticasCard'
import { HistoricoList } from './_components/HistoricoList'
import {
    useEstatisticasCalibracao,
    useAgendaCalibracao,
    useHistoricoCalibracao,
} from './_hooks/useCalibracoesData'

export default function CalibracoesPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: estatisticas, isLoading: loadingEstatisticas } = 
    useEstatisticasCalibracao(empresaId)
  const { data: agenda, isLoading: loadingAgenda } = 
    useAgendaCalibracao(empresaId)
  const { data: historico, isLoading: loadingHistorico } = 
    useHistoricoCalibracao(empresaId)

  // Transforma agenda em eventos do calendário
  const eventos = agenda?.map(item => ({
    id: item.id,
    allDay: true,
    title: `${item.codigo} - ${item.nome}`,
    start: new Date(item.agendadoPara),
    backgroundColor: '#027435',
    textColor: '#fff',
    borderColor: '#027435',
  })) ?? []

  const handleExportPDF = () => {
    // Implementar exportação PDF
    console.log('Exportar PDF')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calibrações</h1>
          <p className="text-muted-foreground">
            Visualize as métricas e agenda de calibrações dos instrumentos
          </p>
        </div>
        <Button className="gap-2" onClick={handleExportPDF}>
          <ArrowBigDownDash className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Estatísticas */}
      <EstatisticasCard dados={estatisticas} isLoading={loadingEstatisticas} />

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Histórico */}
        <div className="lg:col-span-2">
          <HistoricoList dados={historico ?? []} isLoading={loadingHistorico} />
        </div>

        {/* Calendário */}
        <div>
          <CalendarioEventos
            eventos={eventos}
            titulo="Agenda de Calibrações"
            descricao="Programação de calibrações dos instrumentos"
            isLoading={loadingAgenda}
          />
        </div>
      </div>
    </div>
  )
}
