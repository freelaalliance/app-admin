'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown, ShoppingCart, Users, Package, DollarSign } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useEstatisticasVendas, useTopProdutos, useTopClientes } from './_hooks/useVendasData'
import { EstatisticasVendasCard } from './_components/cards/EstatisticasVendasCard'

export default function VendasPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: estatisticas, isLoading: isLoadingEstatisticas } = useEstatisticasVendas(empresaId)
  const { data: topProdutos, isLoading: isLoadingProdutos } = useTopProdutos(empresaId)
  const { data: topClientes, isLoading: isLoadingClientes } = useTopClientes(empresaId)

  const isLoading = isLoadingEstatisticas || isLoadingProdutos || isLoadingClientes

  const handleExportarPDF = () => {
    if (!estatisticas || !topProdutos || !topClientes) {
      alert('Aguarde o carregamento dos dados antes de exportar.')
      return
    }

    try {
      // Dados do resumo executivo
      const resumoData = [
        { label: 'Total de Vendas', valor: estatisticas.total_vendas.toString() },
        {
          label: 'Valor Total',
          valor: `R$ ${estatisticas.valor_total_vendas.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
        },
        { label: 'Total de Clientes', valor: estatisticas.total_clientes.toString() },
        { label: 'Total de Produtos', valor: estatisticas.total_produtos.toString() },
        { label: 'Produto Mais Vendido', valor: estatisticas.produto_mais_vendido || 'N/A' },
        { label: 'Maior Comprador', valor: estatisticas.cliente_maior_comprador || 'N/A' },
      ]

      // Dados dos top produtos
      const produtosData = topProdutos.map((produto) => ({
        nome: produto.nome,
        quantidade: produto.quantidade_vendida.toString(),
        valor_total: `R$ ${produto.valor_total.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      }))

      // Dados dos top clientes
      const clientesData = topClientes.map((cliente) => ({
        nome: cliente.nome,
        compras: cliente.total_compras.toString(),
        valor_total: `R$ ${cliente.valor_total.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      }))

      // Criar PDF com múltiplas seções
      const { jsPDF } = require('jspdf')
      require('jspdf-autotable')
      const doc = new jsPDF()

      // Título principal
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('Relatório de Vendas', 14, 20)

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
      doc.text('Resumo Executivo', 14, currentY)
      currentY += 8

      doc.autoTable({
        startY: currentY,
        head: [['Indicador', 'Valor']],
        body: resumoData.map((item) => [item.label, item.valor]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
      })

      currentY = (doc as any).lastAutoTable.finalY + 15

      // Seção 2: Top Produtos
      if (produtosData.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Top Produtos Vendidos', 14, currentY)
        currentY += 8

        doc.autoTable({
          startY: currentY,
          head: [['Produto', 'Quantidade Vendida', 'Valor Total']],
          body: produtosData.map((p) => [p.nome, p.quantidade, p.valor_total]),
          theme: 'grid',
          headStyles: { fillColor: [234, 179, 8] },
          margin: { left: 14, right: 14 },
        })

        currentY = (doc as any).lastAutoTable.finalY + 15
      }

      // Seção 3: Top Clientes
      if (clientesData.length > 0) {
        // Verifica se precisa de nova página
        if (currentY > 250) {
          doc.addPage()
          currentY = 20
        }

        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Top Clientes Compradores', 14, currentY)
        currentY += 8

        doc.autoTable({
          startY: currentY,
          head: [['Cliente', 'Total de Compras', 'Valor Total']],
          body: clientesData.map((c) => [c.nome, c.compras, c.valor_total]),
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246] },
          margin: { left: 14, right: 14 },
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
      const filename = `relatorio_vendas_${new Date().getTime()}.pdf`
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
          <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
          <p className="text-muted-foreground">
            Acompanhe as estatísticas e métricas de vendas
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
          titulo="Total de Vendas"
          info={estatisticas?.total_vendas?.toString() || '0'}
          subtitulo="Vendas realizadas"
          icon={ShoppingCart}
          carregandoInformacao={isLoading}
        />
        <IndicadorInfo
          titulo="Valor Total"
          info={`R$ ${(estatisticas?.valor_total_vendas || 0).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitulo="Receita total"
          icon={DollarSign}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Total de Clientes"
          info={estatisticas?.total_clientes?.toString() || '0'}
          subtitulo="Clientes ativos"
          icon={Users}
          carregandoInformacao={isLoading}
        />
        <IndicadorInfo
          titulo="Total de Produtos"
          info={estatisticas?.total_produtos?.toString() || '0'}
          subtitulo="Produtos cadastrados"
          icon={Package}
          carregandoInformacao={isLoading}
        />
      </div>

      {/* Cards de Destaques */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Destaques</h2>
        <EstatisticasVendasCard 
          dados={estatisticas} 
          topProdutos={topProdutos}
          topClientes={topClientes}
          isLoading={isLoading} 
        />
      </div>
    </div>
  )
}
