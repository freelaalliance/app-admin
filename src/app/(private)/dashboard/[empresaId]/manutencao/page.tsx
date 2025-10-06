'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileDown } from 'lucide-react'
import {
    useEquipamentos,
    useIndicadores,
    useInspecoes,
    useManutencoes,
    useDadosGraficoDuracao
} from './_hooks/useManutencaoData'
import { SeletorEquipamento } from './_components/SeletorEquipamento'
import { MetricasTab } from './_components/tabs/MetricasTab'
import { InspecoesTab } from './_components/tabs/InspecoesTab'
import { ManutencoesTab } from './_components/tabs/ManutencoesTab'
import { GraficoDuracao } from './_components/GraficoDuracao'

export default function ManutencaoPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<number | undefined>()
  const [tabAtiva, setTabAtiva] = useState('metricas')

  const { data: equipamentosData, isLoading: isLoadingEquipamentos } = useEquipamentos(empresaId)
  const { data: indicadores, isLoading: isLoadingIndicadores } = useIndicadores(
    empresaId,
    equipamentoSelecionado
  )
  const { data: inspecoesData, isLoading: isLoadingInspecoes } = useInspecoes(
    empresaId,
    equipamentoSelecionado
  )
  const { data: manutencoesData, isLoading: isLoadingManutencoes } = useManutencoes(
    empresaId,
    equipamentoSelecionado
  )
  const { data: graficoDuracaoData, isLoading: isLoadingGrafico } = useDadosGraficoDuracao(empresaId)

  const equipamentos = equipamentosData?.equipamentos || []
  const inspecoes = inspecoesData?.inspecoes || []
  const manutencoes = manutencoesData?.manutencoes || []
  const dadosGrafico = graficoDuracaoData?.dados || []

  const handleExportarPDF = () => {
    console.log('Exportar PDF - Manutenção')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manutenção</h1>
          <p className="text-muted-foreground">
            Gestão de manutenções, inspeções e indicadores MTTR/MTBF
          </p>
        </div>
        <Button onClick={handleExportarPDF} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Seletor de Equipamento */}
      <SeletorEquipamento
        equipamentos={equipamentos}
        equipamentoSelecionado={equipamentoSelecionado}
        onSelecionar={setEquipamentoSelecionado}
        isLoading={isLoadingEquipamentos}
      />

      {/* Tabs */}
      <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
          <TabsTrigger value="inspecoes">
            Inspeções ({inspecoes.length})
          </TabsTrigger>
          <TabsTrigger value="manutencoes">
            Manutenções ({manutencoes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metricas" className="mt-6 space-y-6">
          <MetricasTab indicadores={indicadores} isLoading={isLoadingIndicadores} />
          <GraficoDuracao dados={dadosGrafico} isLoading={isLoadingGrafico} />
        </TabsContent>

        <TabsContent value="inspecoes" className="mt-6">
          <InspecoesTab inspecoes={inspecoes} isLoading={isLoadingInspecoes} />
        </TabsContent>

        <TabsContent value="manutencoes" className="mt-6">
          <ManutencoesTab manutencoes={manutencoes} isLoading={isLoadingManutencoes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
