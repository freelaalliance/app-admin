'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown, Package, CheckCircle, XCircle, Star } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useRecebimentos } from './_hooks/useRecebimentosData'
import { FiltroData } from './_components/FiltroData'
import { TabelaRecebimentos } from './_components/TabelaRecebimentos'
import { GraficoAvaliacoes } from './_components/GraficoAvaliacoes'
import { Tabs } from '@radix-ui/react-tabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabelaItensAvaliacaoEmpresa } from './_components/tabelas/tabela-itens-avaliacao'
import { useItensAvaliativosRecebimento } from './_hooks/useItensAvaliativosRecebimento'

export default function RecebimentosPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const [dataInicio, setDataInicio] = useState<string>()
  const [dataFim, setDataFim] = useState<string>()

  // Único endpoint que retorna estatísticas + lista de recebimentos
  const { data: dadosRecebimentos, isLoading } = useRecebimentos(
    empresaId,
    dataInicio,
    dataFim
  )
  const { data: itensAvaliativosRecebimentoEmpresa, isFetching } = useItensAvaliativosRecebimento(empresaId)

  const estatisticas = dadosRecebimentos?.estatisticasRecebimentos
  const recebimentos = dadosRecebimentos?.recebimentos || []

  // Calcular dados para o gráfico a partir das avaliações dos recebimentos
  const dadosGrafico = recebimentos.map((rec) => {
    const mediaAvaliacao = rec.avaliacaoRecebimento.length > 0
      ? rec.avaliacaoRecebimento.reduce((acc, av) => acc + av.avaliacao, 0) / rec.avaliacaoRecebimento.length
      : 0

    return {
      data: rec.recebidoEm,
      fornecedor: rec.pedido.fornecedor.nome,
      avaliacao: mediaAvaliacao,
    }
  })

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
          info={estatisticas?.totalRecebimentos?.toString() || '0'}
          subtitulo="Todos os recebimentos"
          icon={Package}
          carregandoInformacao={isLoading}
        />
        <IndicadorInfo
          titulo="Recebimentos no Mês"
          info={estatisticas?.recebimentosNoMes?.toString() || '0'}
          subtitulo="Recebimentos deste mês"
          icon={CheckCircle}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Recebimentos na Semana"
          info={estatisticas?.recebimentosNaSemana?.toString() || '0'}
          subtitulo="Recebimentos desta semana"
          icon={XCircle}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-blue-500"
        />
        <IndicadorInfo
          titulo="Média de Avaliação"
          info={estatisticas?.mediaAvaliacao?.toFixed(1) || '0.0'}
          subtitulo="Avaliação geral"
          icon={Star}
          carregandoInformacao={isLoading}
          className="border-l-4 border-l-yellow-500"
        />
      </div>

      <Tabs defaultValue="recebimentos">
        <TabsList>
          <TabsTrigger value="recebimentos">Recebimentos</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="recebimentos">
          <div className="space-y-2">
            {/* Filtro de Data */}
            <FiltroData onFiltrar={handleFiltrar} />

            {/* Gráfico de Avaliações */}
            <GraficoAvaliacoes dados={dadosGrafico} isLoading={isLoading} />

            {/* Tabela de Recebimentos */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Histórico de Recebimentos</h2>
              <TabelaRecebimentos recebimentos={recebimentos} isLoading={isLoading} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="avaliacoes">
          <TabelaItensAvaliacaoEmpresa
            empresaId={empresaId}
            listaItensAvaliacao={itensAvaliativosRecebimentoEmpresa ?? []}
            carregandoItens={isFetching}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
