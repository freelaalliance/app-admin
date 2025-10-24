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
import { format } from 'date-fns'

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
  const eventos = agenda?.map(item => {
    // Usa agendadoPara como fallback para proximaCalibracao
    const dataCalibração = item.proximaCalibracao || item.agendadoPara
    
    // Calcula dias restantes e status se não vieram da API
    const diasRestantes = item.diasRestantes ?? Math.ceil(
      (new Date(dataCalibração).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    
    let status = item.status
    if (!status) {
      if (diasRestantes < 0) status = 'vencido'
      else if (diasRestantes <= 30) status = 'vencendo'
      else status = 'em_dia'
    }
    
    return {
      id: item.id,
      allDay: true,
      title: `${item.codigo} - ${item.nome}`,
      start: new Date(dataCalibração),
      backgroundColor: status === 'vencido' ? '#dc2626' : status === 'vencendo' ? '#f59e0b' : '#027435',
      textColor: '#fff',
      borderColor: status === 'vencido' ? '#dc2626' : status === 'vencendo' ? '#f59e0b' : '#027435',
    }
  }) ?? []

  const handleExportPDF = () => {
    if (!estatisticas || !agenda || !historico) {
      alert('Aguarde o carregamento dos dados antes de exportar.')
      return
    }

    try {
      const { jsPDF } = require('jspdf')
      require('jspdf-autotable')
      const doc = new jsPDF()

      // Título principal
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('Relatório de Calibrações', 14, 20)

      // Data de geração
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      const dataAtual = new Date().toLocaleString('pt-BR')
      doc.text(`Gerado em: ${dataAtual}`, 14, 28)

      let currentY = 38

      // Seção 1: Resumo Executivo
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(0)
      doc.text('Resumo de Estatísticas', 14, currentY)
      currentY += 8

      const resumoData = [
        { label: 'Total de Instrumentos', valor: estatisticas.quantidadeInstrumentosEmpresa.toString() },
        { label: 'Calibrações Aprovadas', valor: estatisticas.quantidadeCalibracoesAprovadas.toString() },
        { label: 'Calibrações Reprovadas', valor: estatisticas.quantidadeCalibracoesReprovadas.toString() },
        { label: 'Calibrações Vencidas', valor: estatisticas.calibracoesVencido.toString() },
        { label: 'Calibrações Vencendo', valor: estatisticas.calibracoesVencendo.toString() },
        { label: 'Calibrações Dentro do Prazo', valor: estatisticas.calibracoesDentroPrazo.toString() },
      ]

      doc.autoTable({
        startY: currentY,
        head: [['Indicador', 'Valor']],
        body: resumoData.map((item) => [item.label, item.valor]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
      })

      currentY = (doc as any).lastAutoTable.finalY + 15

      // Seção 2: Agenda de Calibrações
      if (agenda.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Agenda de Calibrações', 14, currentY)
        currentY += 8

        const agendaData = agenda.map((item) => {
          const dataCalibração = item.proximaCalibracao || item.agendadoPara
          const diasRestantes = item.diasRestantes ?? Math.ceil(
            (new Date(dataCalibração).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          )
          
          let status = item.status || 'em_dia'
          if (!item.status) {
            if (diasRestantes < 0) status = 'vencido'
            else if (diasRestantes <= 30) status = 'vencendo'
            else status = 'em_dia'
          }
          
          return {
            codigo: item.codigo,
            instrumento: item.nome,
            agendado: format(new Date(dataCalibração), 'dd/MM/yyyy'),
            status: status === 'vencido' ? 'Vencido' : status === 'vencendo' ? 'Vencendo' : 'Em Dia',
            diasRestantes: diasRestantes,
          }
        })

        doc.autoTable({
          startY: currentY,
          head: [['Código', 'Instrumento', 'Data Agendada', 'Status', 'Dias Restantes']],
          body: agendaData.map((a) => [a.codigo, a.instrumento, a.agendado, a.status, a.diasRestantes.toString()]),
          theme: 'grid',
          headStyles: { fillColor: [2, 116, 53] },
          margin: { left: 14, right: 14 },
          didParseCell: function(data: any) {
            // Colorir status
            if (data.column.index === 3 && data.cell.section === 'body') {
              if (data.cell.raw === 'Vencido') {
                data.cell.styles.textColor = [220, 38, 38] // Vermelho
                data.cell.styles.fontStyle = 'bold'
              } else if (data.cell.raw === 'Vencendo') {
                data.cell.styles.textColor = [245, 158, 11] // Laranja
                data.cell.styles.fontStyle = 'bold'
              } else if (data.cell.raw === 'Em Dia') {
                data.cell.styles.textColor = [2, 116, 53] // Verde
                data.cell.styles.fontStyle = 'bold'
              }
            }
          }
        })

        currentY = (doc as any).lastAutoTable.finalY + 15
      }

      // Seção 3: Histórico de Calibrações
      if (historico.length > 0) {
        // Verifica se precisa de nova página
        if (currentY > 250) {
          doc.addPage()
          currentY = 20
        }

        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Histórico de Calibrações', 14, currentY)
        currentY += 8

        const historicoData = historico.map((item) => ({
          codigo: item.instrumento.codigo,
          instrumento: item.instrumento.nome,
          certificado: item.calibracao.numeroCertificado,
          data: format(new Date(item.calibracao.realizadoEm), 'dd/MM/yyyy'),
          status: item.calibracao.status.toUpperCase(),
          usuario: item.calibracao.usuarioNome,
        }))

        doc.autoTable({
          startY: currentY,
          head: [['Código', 'Instrumento', 'Certificado', 'Data', 'Status', 'Usuário']],
          body: historicoData.map((h) => [
            h.codigo,
            h.instrumento,
            h.certificado,
            h.data,
            h.status,
            h.usuario,
          ]),
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246] },
          margin: { left: 14, right: 14 },
          styles: { fontSize: 8 },
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 40 },
            2: { cellWidth: 30 },
            3: { cellWidth: 25 },
            4: { cellWidth: 25 },
            5: { cellWidth: 35 },
          },
          didParseCell: function(data: any) {
            // Colorir status
            if (data.column.index === 4 && data.cell.section === 'body') {
              if (data.cell.raw === 'APROVADO') {
                data.cell.styles.textColor = [0, 128, 0] // Verde
                data.cell.styles.fontStyle = 'bold'
              } else if (data.cell.raw === 'REPROVADO') {
                data.cell.styles.textColor = [255, 0, 0] // Vermelho
                data.cell.styles.fontStyle = 'bold'
              }
            }
          }
        })
      }

      // Rodapé em todas as páginas
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150)
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        )
      }

      // Salvar PDF
      const filename = `relatorio_calibracoes_${new Date().getTime()}.pdf`
      doc.save(filename)

      console.log('PDF exportado com sucesso:', filename)
    } catch (error) {
      console.error('Erro ao exportar PDF:', error)
      alert('Ocorreu um erro ao gerar o relatório.')
    }
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
