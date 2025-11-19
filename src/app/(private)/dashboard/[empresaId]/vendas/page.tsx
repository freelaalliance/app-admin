'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown, ShoppingCart, Users, Package } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useClienteTop, useProdutoTop, useTotalClientes, useTotalProdutos } from './_hooks/useVendasData'
import { EstatisticasVendasCard } from './_components/cards/EstatisticasVendasCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useConfiguracoesMap, useCriarOuAtualizarConfiguracao } from '@/hooks/use-configuracao-empresa'

// Chaves de configuração do módulo de vendas
const CONFIG_KEYS = {
  HABILITAR_FRETE: 'vendas_habilitar_frete',
  HABILITAR_ARMAZENAMENTO: 'vendas_habilitar_armazenamento',
  HABILITAR_LOCAL_ENTREGA: 'vendas_habilitar_local_entrega',
  HABILITAR_FORMA_PAGAMENTO: 'vendas_habilitar_forma_pagamento',
  HABILITAR_IMPOSTOS: 'vendas_habilitar_impostos',
} as const

export default function VendasPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: clienteTop, isFetching: isLoadingClienteTop } = useClienteTop(empresaId)
  const { data: produtoTop, isFetching: isLoadingProdutoTop } = useProdutoTop(empresaId)
  const { data: totalClientes, isFetching: isLoadingTotalClientes } = useTotalClientes(empresaId)
  const { data: totalProdutos, isFetching: isLoadingTotalProdutos } = useTotalProdutos(empresaId)

  // Hook para buscar configurações
  const { configuracoes, isLoading: loadingConfigs } = useConfiguracoesMap(empresaId)

  // Hook para criar/atualizar configurações
  const { mutate: salvarConfiguracao } = useCriarOuAtualizarConfiguracao()

  // Handler para alteração de configuração
  const handleConfigChange = (chave: string, valor: boolean) => {
    salvarConfiguracao({
      empresaId,
      chave,
      valor: valor.toString(),
    })
  }

  const isLoading = isLoadingClienteTop || isLoadingProdutoTop || isLoadingTotalClientes || isLoadingTotalProdutos

  const handleExportarPDF = () => {
    if (!clienteTop || !produtoTop || !totalClientes || !totalProdutos) {
      alert('Aguarde o carregamento dos dados antes de exportar.')
      return
    }

    try {
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

      const resumoData = [
        { label: 'Total de Clientes', valor: totalClientes.totalClientes.toString() },
        { label: 'Total de Produtos', valor: totalProdutos.totalProdutos.toString() },
        { label: 'Produto Mais Vendido', valor: produtoTop.nome || 'N/A' },
        { label: 'Quantidade Vendida', valor: produtoTop.totalVendido.toString() },
        { label: 'Maior Comprador', valor: clienteTop.cliente || 'N/A' },
        { label: 'Total de Vendas do Cliente', valor: clienteTop.totalVendas.toString() },
      ]

      doc.autoTable({
        startY: currentY,
        head: [['Indicador', 'Valor']],
        body: resumoData.map((item) => [item.label, item.valor]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
      })

      // Rodapé
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

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Cards de Indicadores */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <IndicadorInfo
              titulo="Total de Clientes"
              info={totalClientes?.totalClientes?.toString() || '0'}
              subtitulo="Clientes cadastrados"
              icon={Users}
              carregandoInformacao={isLoadingTotalClientes}
              className="border-l-4 border-l-primary"
            />
            <IndicadorInfo
              titulo="Total de Produtos"
              info={totalProdutos?.totalProdutos?.toString() || '0'}
              subtitulo="Produtos/Serviços cadastrados"
              icon={Package}
              carregandoInformacao={isLoadingTotalProdutos}
              className="border-l-4 border-l-primary"
            />
            <IndicadorInfo
              titulo="Cliente Top"
              info={clienteTop?.totalVendas?.toString() || '0'}
              subtitulo={clienteTop?.cliente || 'Nenhum cliente'}
              icon={Users}
              carregandoInformacao={isLoadingClienteTop}
              className="border-l-4 border-l-blue-500"
            />
            <IndicadorInfo
              titulo="Produto Top"
              info={produtoTop?.totalVendido?.toString() || '0'}
              subtitulo={produtoTop?.nome || 'Nenhum produto'}
              icon={ShoppingCart}
              carregandoInformacao={isLoadingProdutoTop}
              className="border-l-4 border-l-yellow-500"
            />
          </div>

          {/* Cards de Destaques */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Destaques</h2>
            <EstatisticasVendasCard
              clienteTop={clienteTop}
              produtoTop={produtoTop}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value='configuracoes' className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Configurações de Compras</h3>
              <p className="text-sm text-muted-foreground">
                Personalize os campos habilitados no módulo de compras
              </p>
            </div>

            <div className="grid gap-4">
              {/* Habilitar campo informação frete */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="frete">Informação de Frete</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação de frete nas vendas
                  </p>
                </div>
                <Switch
                  id="frete"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_FRETE] === 'true'}
                  onCheckedChange={(checked) =>
                    handleConfigChange(CONFIG_KEYS.HABILITAR_FRETE, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo informação local de armazenamento */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="armazenamento">Local de Armazenamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação do local de armazenamento
                  </p>
                </div>
                <Switch
                  id="armazenamento"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_ARMAZENAMENTO] === 'true'}
                  onCheckedChange={(checked) =>
                    handleConfigChange(CONFIG_KEYS.HABILITAR_ARMAZENAMENTO, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo informação local para entrega */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="entrega">Local para Entrega</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação do local de entrega
                  </p>
                </div>
                <Switch
                  id="entrega"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_LOCAL_ENTREGA] === 'true'}
                  onCheckedChange={(checked) =>
                    handleConfigChange(CONFIG_KEYS.HABILITAR_LOCAL_ENTREGA, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo Forma de pagamento */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="pagamento">Forma de Pagamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para seleção da forma de pagamento
                  </p>
                </div>
                <Switch
                  id="pagamento"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_FORMA_PAGAMENTO] === 'true'}
                  onCheckedChange={(checked) =>
                    handleConfigChange(CONFIG_KEYS.HABILITAR_FORMA_PAGAMENTO, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo impostos */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="impostos">Impostos</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação de impostos nas vendas
                  </p>
                </div>
                <Switch
                  id="impostos"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_IMPOSTOS] === 'true'}
                  onCheckedChange={(checked) =>
                    handleConfigChange(CONFIG_KEYS.HABILITAR_IMPOSTOS, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
