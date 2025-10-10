'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileDown, Users, UserCheck, UserX } from 'lucide-react'
import {
  useResumoRH,
  useColaboradores,
  useDadosRotatividade,
  useResumoTreinamentos,
  useColaboradoresEmTreinamento,
  useColaboradoresPorCargo
} from './_hooks/useRHData'
import { StatCardRH } from './_components/cards/StatCardRH'
import { RotatividadeCard } from './_components/cards/RotatividadeCard'
import { TreinamentosCard } from './_components/cards/TreinamentosCard'
import { GridCargos } from './_components/GridCargos'
import { ColaboradoresTab } from './_components/tabs/ColaboradoresTab'

export default function RHPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const [tabAtiva, setTabAtiva] = useState('ativos')
  const [periodoRotatividade, setPeriodoRotatividade] = useState<'mes' | 'trimestre' | 'semestre' | 'anual'>('mes')

  const { data: resumo, isLoading: isLoadingResumo } = useResumoRH(empresaId)
  const { data: colaboradoresAtivos, isLoading: isLoadingAtivos } = useColaboradores(empresaId, 'ativo')
  const { data: colaboradoresDemitidos, isLoading: isLoadingDemitidos } = useColaboradores(empresaId, 'demitido')
  const { data: dadosRotatividade, isLoading: isLoadingRotatividade } = useDadosRotatividade(
    empresaId,
    periodoRotatividade
  )
  const { data: resumoTreinamentos, isLoading: isLoadingResumoTreinamentos } = useResumoTreinamentos(empresaId)
  const { data: colaboradoresTreinamento, isLoading: isLoadingColabTreinamento } = useColaboradoresEmTreinamento(empresaId)
  const { data: cargos, isLoading: isLoadingCargos } = useColaboradoresPorCargo(empresaId)

  const handleExportarPDF = () => {
    console.log('Exportar PDF - RH')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recursos Humanos</h1>
          <p className="text-muted-foreground">
            Gestão de colaboradores, treinamentos e rotatividade
          </p>
        </div>
        <Button onClick={handleExportarPDF} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCardRH
          titulo="Total de Colaboradores"
          valor={resumo?.totalColaboradores || 0}
          subtitulo="Cadastrados no sistema"
          icon={Users}
          isLoading={isLoadingResumo}
        />
        <StatCardRH
          titulo="Colaboradores Ativos"
          valor={resumo?.colaboradoresAtivos || 0}
          subtitulo="Trabalhando atualmente"
          icon={UserCheck}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-green-500"
        />
        <StatCardRH
          titulo="Colaboradores Demitidos"
          valor={resumo?.colaboradoresDemitidos || 0}
          subtitulo="Desligados"
          icon={UserX}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-red-500"
        />
        <StatCardRH
          titulo="Em Treinamento"
          valor={resumo?.colaboradoresEmTreinamento || 0}
          subtitulo="Colaboradores em treinamento"
          icon={Users}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-blue-500"
        />
        <StatCardRH
          titulo="Contratações no Mês"
          valor={resumo?.novasContratacoesMes || 0}
          subtitulo="Novas contratações"
          icon={UserCheck}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-purple-500"
        />
      </div>

      {/* Análise de Rotatividade */}
      <RotatividadeCard
        empresaId={empresaId}
        dados={dadosRotatividade}
        isLoading={isLoadingRotatividade}
        onPeriodoChange={setPeriodoRotatividade}
      />

      {/* Grid de Colaboradores por Cargo */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Colaboradores por Cargo</h2>
        <GridCargos cargos={cargos || []} isLoading={isLoadingCargos} />
      </div>

      {/* Treinamentos */}
      <TreinamentosCard 
        resumo={resumoTreinamentos} 
        colaboradores={colaboradoresTreinamento || []}
      />

      {/* Tabs de Colaboradores */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Colaboradores</h2>
        <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="ativos">
              Ativos ({colaboradoresAtivos?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="demitidos">
              Demitidos ({colaboradoresDemitidos?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos" className="mt-6">
            <ColaboradoresTab 
              colaboradores={colaboradoresAtivos || []} 
              isLoading={isLoadingAtivos} 
            />
          </TabsContent>

          <TabsContent value="demitidos" className="mt-6">
            <ColaboradoresTab 
              colaboradores={colaboradoresDemitidos || []} 
              isLoading={isLoadingDemitidos} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
