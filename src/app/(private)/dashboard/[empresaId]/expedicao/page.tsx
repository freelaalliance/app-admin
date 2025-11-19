'use client'

import { useParams } from 'next/navigation'
import { Package, Truck, CheckCircle, Star } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useExpedicoes, useResumoExpedicao, useMediaAvaliacao } from './_hooks/useExpedicaoData'
import { ListaExpedicoes } from './_components/ListaExpedicoes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabelaItensAvaliacaoExpedicaoEmpresa } from './_components/tabelas/tabela-itens-avaliacao'
import { useItensAvaliativosExpedicao } from './_hooks/useItensAvaliativosExpedicao'

export default function ExpedicaoPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const { data: expedicoes, isLoading: isLoadingExpedicoes } = useExpedicoes(empresaId)
  const { data: resumo, isLoading: isLoadingResumo } = useResumoExpedicao(empresaId)
  const { data: mediaData, isLoading: isLoadingMedia } = useMediaAvaliacao(empresaId)

  const { data: itensAvaliativos, isLoading: isLoadingItensAvaliativos } = useItensAvaliativosExpedicao(empresaId)

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
      </div>

      {/* Cards de Indicadores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IndicadorInfo
          titulo="Expedições Pendentes"
          info={resumo?.pendentes?.toString() || '0'}
          subtitulo="Aguardando expedição"
          icon={Package}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-yellow-500"
        />
        <IndicadorInfo
          titulo="Expedições Realizadas"
          info={resumo?.realizadas?.toString() || '0'}
          subtitulo="Já despachadas"
          icon={Truck}
          carregandoInformacao={isLoadingResumo}
          className="border-l-4 border-l-blue-500"
        />
        <IndicadorInfo
          titulo="Total de Expedições"
          info={resumo?.total?.toString() || '0'}
          subtitulo="Todas as expedições"
          icon={CheckCircle}
          carregandoInformacao={isLoadingResumo}
        />
        <IndicadorInfo
          titulo="Média de Avaliação"
          info={mediaData && mediaData.media ? Number(mediaData.media).toFixed(1) : '0.0'}
          subtitulo="Avaliações de expedição"
          icon={Star}
          carregandoInformacao={isLoadingMedia}
          className="border-l-4 border-l-green-500"
        />
      </div>

      {/* Lista de Expedições */}
      <div>
        <Tabs defaultChecked defaultValue="expedicoes">
          <TabsList>
            <TabsTrigger value="expedicoes">Expedições</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value='expedicoes'>
            <ListaExpedicoes expedicoes={expedicoes || []} isLoading={isLoadingExpedicoes} />
          </TabsContent>
          <TabsContent value='avaliacoes'>
            <TabelaItensAvaliacaoExpedicaoEmpresa
              empresaId={empresaId}
              listaItensAvaliacaoExpedicao={itensAvaliativos?.dados || []}
              carregandoItens={isLoadingItensAvaliativos}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
