'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileDown, Users, UserCheck, UserX, Repeat } from 'lucide-react'
import {
    useResumoRH,
    useColaboradores,
    useDadosRotatividade,
    useTreinamentos,
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
  const [periodoRotatividade, setPeriodoRotatividade] = useState('mensal')

  const { data: resumo, isLoading: isLoadingResumo } = useResumoRH(empresaId)
  const { data: ativosData, isLoading: isLoadingAtivos } = useColaboradores(empresaId, 'ativo')
  const { data: demitidosData, isLoading: isLoadingDemitidos } = useColaboradores(empresaId, 'demitido')
  const { data: rotatividadeData, isLoading: isLoadingRotatividade } = useDadosRotatividade(
    empresaId,
    periodoRotatividade
  )
  const { data: treinamentosData, isLoading: isLoadingTreinamentos } = useTreinamentos(empresaId)
  const { data: cargosData, isLoading: isLoadingCargos } = useColaboradoresPorCargo(empresaId)

  const colaboradoresAtivos = ativosData?.colaboradores || []
  const colaboradoresDemitidos = demitidosData?.colaboradores || []
  const dadosRotatividade = rotatividadeData?.dados || []
  const treinamentos = treinamentosData?.treinamentos || []
  const cargos = cargosData?.cargos || []

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCardRH
          titulo="Total de Colaboradores"
          valor={resumo?.total_colaboradores || 0}
          subtitulo="Cadastrados no sistema"
          icon={Users}
          isLoading={isLoadingResumo}
        />
        <StatCardRH
          titulo="Colaboradores Ativos"
          valor={resumo?.colaboradores_ativos || 0}
          subtitulo="Trabalhando atualmente"
          icon={UserCheck}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-green-500"
        />
        <StatCardRH
          titulo="Colaboradores Demitidos"
          valor={resumo?.colaboradores_demitidos || 0}
          subtitulo="Desligados"
          icon={UserX}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-red-500"
        />
        <StatCardRH
          titulo="Rotatividade"
          valor={`${(resumo?.rotatividade_percentual || 0).toFixed(1)}%`}
          subtitulo="Taxa de rotatividade"
          icon={Repeat}
          tendencia={resumo?.tendencia_rotatividade}
          isLoading={isLoadingResumo}
          className="border-l-4 border-l-yellow-500"
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
        <GridCargos cargos={cargos} isLoading={isLoadingCargos} />
      </div>

      {/* Treinamentos */}
      <TreinamentosCard treinamentos={treinamentos} isLoading={isLoadingTreinamentos} />

      {/* Tabs de Colaboradores */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Colaboradores</h2>
        <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="ativos">
              Ativos ({colaboradoresAtivos.length})
            </TabsTrigger>
            <TabsTrigger value="demitidos">
              Demitidos ({colaboradoresDemitidos.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos" className="mt-6">
            <ColaboradoresTab 
              colaboradores={colaboradoresAtivos} 
              isLoading={isLoadingAtivos} 
            />
          </TabsContent>

          <TabsContent value="demitidos" className="mt-6">
            <ColaboradoresTab 
              colaboradores={colaboradoresDemitidos} 
              isLoading={isLoadingDemitidos} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
