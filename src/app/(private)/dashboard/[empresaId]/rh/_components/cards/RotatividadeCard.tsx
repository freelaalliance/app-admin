'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { DadosRotatividade } from '../../_types/rhTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface RotatividadeCardProps {
  empresaId: string
  dados?: DadosRotatividade
  isLoading?: boolean
  onPeriodoChange: (periodo: 'mes' | 'trimestre' | 'semestre' | 'anual') => void
}

export function RotatividadeCard({ empresaId, dados, isLoading, onPeriodoChange }: RotatividadeCardProps) {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<'mes' | 'trimestre' | 'semestre' | 'anual'>('mes')

  const handlePeriodoChange = (valor: string) => {
    const periodo = valor as 'mes' | 'trimestre' | 'semestre' | 'anual'
    setPeriodoSelecionado(periodo)
    onPeriodoChange(periodo)
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-80 w-full" />
      </Card>
    )
  }

  if (!dados) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum dado de rotatividade disponível.</p>
      </Card>
    )
  }

  // Converte o objeto único em array para o gráfico
  const chartData = [
    {
      categoria: 'Admissões',
      valor: dados.admissoes,
    },
    {
      categoria: 'Demissões',
      valor: dados.demissoes,
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Análise de Rotatividade</h3>
          <p className="text-sm text-muted-foreground">
            Taxa de rotatividade: <span className="font-bold">{dados.taxaRotatividade}%</span>
          </p>
        </div>
        <Select value={periodoSelecionado} onValueChange={handlePeriodoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mes">Mensal</SelectItem>
            <SelectItem value="trimestre">Trimestral</SelectItem>
            <SelectItem value="semestre">Semestral</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Início do Período</p>
          <p className="text-2xl font-bold">{dados.colaboradoresInicio}</p>
          <p className="text-xs text-muted-foreground">Colaboradores</p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Fim do Período</p>
          <p className="text-2xl font-bold">{dados.colaboradoresFim}</p>
          <p className="text-xs text-muted-foreground">Colaboradores</p>
        </div>
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Taxa de Rotatividade</p>
          <p className="text-2xl font-bold text-primary">{dados.taxaRotatividade}%</p>
          <p className="text-xs text-muted-foreground">No período</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Bar dataKey="valor" fill="hsl(var(--chart-1))" name="Quantidade" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
