'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileDown } from 'lucide-react'
import {
  useManutencoes,
  useDuracoes,
  useEstatisticasStatus,
  useEstatisticasGerais,
  useIndicadoresEquipamento,
  useIndicadoresEquipamentos
} from './_hooks/useManutencaoData'
import { SeletorEquipamento } from './_components/SeletorEquipamento'
import { MetricasTab } from './_components/tabs/MetricasTab'
import { ManutencoesTab } from './_components/tabs/ManutencoesTab'
import { GraficoDuracao } from './_components/GraficoDuracao'

export default function ManutencaoPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<string | undefined>()
  const [tabAtiva, setTabAtiva] = useState('metricas')

  // Estatísticas gerais (não dependem de equipamento)
  const { data: estatisticasStatus } = useEstatisticasStatus(empresaId)
  const { data: estatisticasGerais } = useEstatisticasGerais(empresaId)
  const { data: todosIndicadores } = useIndicadoresEquipamentos(empresaId)

  // Dados específicos do equipamento selecionado (requerem equipamentoId)
  const { data: manutencoes, isLoading: isLoadingManutencoes } = useManutencoes(
    empresaId,
    equipamentoSelecionado || ''
  )
  const { data: duracoes, isLoading: isLoadingDuracoes } = useDuracoes(
    empresaId,
    equipamentoSelecionado || ''
  )
  const { data: indicadoresEquipamento, isLoading: isLoadingIndicadores } = useIndicadoresEquipamento(
    empresaId,
    equipamentoSelecionado
  )

  // Criar lista de equipamentos a partir dos indicadores
  const equipamentos = todosIndicadores?.map((ind) => ({
    id: ind.nome, // Usando nome como ID temporário
    nome: ind.nome,
    codigo: ind.nome,
  })) || []

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
            Gestão de manutenções e indicadores MTTR/MTBF
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
        isLoading={false}
      />

      {/* Tabs */}
      <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
        <TabsList className="grid w-full max-w-xl grid-cols-2">
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
          <TabsTrigger value="manutencoes" disabled={!equipamentoSelecionado}>
            Manutenções {equipamentoSelecionado && manutencoes ? `(${manutencoes.length})` : ''}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metricas" className="mt-6 space-y-6">
          <MetricasTab 
            indicadores={indicadoresEquipamento} 
            estatisticasStatus={estatisticasStatus}
            estatisticasGerais={estatisticasGerais}
            isLoading={isLoadingIndicadores} 
          />
          {equipamentoSelecionado && (
            <GraficoDuracao dados={duracoes || []} isLoading={isLoadingDuracoes} />
          )}
        </TabsContent>

        <TabsContent value="manutencoes" className="mt-6">
          {equipamentoSelecionado ? (
            <ManutencoesTab manutencoes={manutencoes || []} isLoading={isLoadingManutencoes} />
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Selecione um equipamento para ver as manutenções
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
