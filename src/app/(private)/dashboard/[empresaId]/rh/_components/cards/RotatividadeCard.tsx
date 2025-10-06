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
  dados: DadosRotatividade[]
  isLoading?: boolean
  onPeriodoChange: (periodo: string) => void
}

export function RotatividadeCard({ empresaId, dados, isLoading, onPeriodoChange }: RotatividadeCardProps) {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mensal')

  const handlePeriodoChange = (valor: string) => {
    setPeriodoSelecionado(valor)
    onPeriodoChange(valor)
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-80 w-full" />
      </Card>
    )
  }

  if (dados.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum dado de rotatividade disponível.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Análise de Rotatividade</h3>
        <Select value={periodoSelecionado} onValueChange={handlePeriodoChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mensal">Mensal</SelectItem>
            <SelectItem value="trimestral">Trimestral</SelectItem>
            <SelectItem value="anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Bar dataKey="admissoes" fill="hsl(var(--chart-1))" name="Admissões" />
          <Bar dataKey="demissoes" fill="hsl(var(--chart-2))" name="Demissões" />
          <Bar dataKey="rotatividade_percentual" fill="hsl(var(--chart-3))" name="Rotatividade %" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
