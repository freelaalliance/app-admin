'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown, ShoppingCart, Users, Package, DollarSign } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useEstatisticasVendas } from './_hooks/useVendasData'
import { EstatisticasVendasCard } from './_components/cards/EstatisticasVendasCard'

export default function VendasPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: estatisticas, isLoading } = useEstatisticasVendas(empresaId)

  const handleExportarPDF = () => {
    // TODO: Implementar exportação para PDF
    console.log('Exportar PDF - Vendas')
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
        <EstatisticasVendasCard dados={estatisticas} isLoading={isLoading} />
      </div>
    </div>
  )
}
