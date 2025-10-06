'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import type { DadosGraficoDuracao } from '../_types/manutencaoTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface GraficoDuracaoProps {
  dados: DadosGraficoDuracao[]
  isLoading?: boolean
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function GraficoDuracao({ dados, isLoading }: GraficoDuracaoProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-[350px] w-full" />
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

  // Ordenar por duração média (maior para menor)
  const dadosOrdenados = [...dados].sort((a, b) => b.duracao_media - a.duracao_media)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Duração Média de Manutenção por Equipamento</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dadosOrdenados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="equipamento" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis 
            label={{ value: 'Horas', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}h`, 'Duração Média']}
          />
          <Legend />
          <Bar dataKey="duracao_media" name="Duração Média (h)" radius={[8, 8, 0, 0]}>
            {dadosOrdenados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legenda de Quantidade */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-2">Quantidade de Manutenções:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {dadosOrdenados.map((item, index) => (
            <div key={item.equipamento} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">
                {item.equipamento.substring(0, 15)}: {item.manutencoes}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
