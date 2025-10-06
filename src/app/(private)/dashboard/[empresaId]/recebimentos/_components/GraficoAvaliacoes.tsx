'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { DadosGrafico } from '../_types/recebimentosTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface GraficoAvaliacoesProps {
  dados: DadosGrafico[]
  isLoading?: boolean
}

export function GraficoAvaliacoes({ dados, isLoading }: GraficoAvaliacoesProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-[300px] w-full" />
      </Card>
    )
  }

  if (dados.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum dado disponível para o gráfico.</p>
      </Card>
    )
  }

  const dadosFormatados = dados.map((item) => ({
    ...item,
    data_formatada: format(new Date(item.data), 'dd/MMM', { locale: ptBR }),
  }))

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Avaliações ao Longo do Tempo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dadosFormatados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="data_formatada" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[0, 10]} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="avaliacao_maxima" 
            stroke="hsl(var(--chart-1))" 
            name="Máxima"
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="avaliacao_media" 
            stroke="hsl(var(--chart-2))" 
            name="Média"
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="avaliacao_minima" 
            stroke="hsl(var(--chart-3))" 
            name="Mínima"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
