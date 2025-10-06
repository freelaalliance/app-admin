'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BookOpen, Clock, CheckCircle } from 'lucide-react'
import type { Treinamento } from '../../_types/rhTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface TreinamentosCardProps {
  treinamentos: Treinamento[]
  isLoading?: boolean
}

const statusConfig = {
  concluido: { label: 'Concluído', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600', icon: CheckCircle },
  em_andamento: { label: 'Em Andamento', variant: 'secondary' as const, className: '', icon: Clock },
  nao_iniciado: { label: 'Não Iniciado', variant: 'outline' as const, className: '', icon: BookOpen },
}

export function TreinamentosCard({ treinamentos, isLoading }: TreinamentosCardProps) {
  const [tabAtiva, setTabAtiva] = useState('todos')

  const concluidos = treinamentos.filter(t => t.status === 'concluido')
  const emAndamento = treinamentos.filter(t => t.status === 'em_andamento')
  const naoIniciados = treinamentos.filter(t => t.status === 'nao_iniciado')

  const renderTreinamento = (treinamento: Treinamento) => {
    const statusInfo = statusConfig[treinamento.status]
    const StatusIcon = statusInfo.icon

    return (
      <Card key={treinamento.id} className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">{treinamento.titulo}</h4>
            <p className="text-sm text-muted-foreground">
              {treinamento.colaborador} • {treinamento.cargo}
            </p>
          </div>
          <Badge variant={statusInfo.variant} className={statusInfo.className}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div>
            <span className="font-medium">Início:</span>{' '}
            {format(new Date(treinamento.data_inicio), 'dd/MM/yyyy', { locale: ptBR })}
          </div>
          {treinamento.data_conclusao && (
            <div>
              <span className="font-medium">Conclusão:</span>{' '}
              {format(new Date(treinamento.data_conclusao), 'dd/MM/yyyy', { locale: ptBR })}
            </div>
          )}
          <div>
            <span className="font-medium">Carga Horária:</span> {treinamento.carga_horaria}h
          </div>
          <div>
            <span className="font-medium">Progresso:</span> {treinamento.progresso_percentual}%
          </div>
        </div>

        {treinamento.status !== 'nao_iniciado' && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                treinamento.status === 'concluido' ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${treinamento.progresso_percentual}%` }}
            />
          </div>
        )}
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-96 w-full" />
      </Card>
    )
  }

  if (treinamentos.length === 0) {
    return (
      <Card className="p-8 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Nenhum treinamento cadastrado.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Treinamentos</h3>
      
      <Tabs value={tabAtiva} onValueChange={setTabAtiva}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="todos">
            Todos ({treinamentos.length})
          </TabsTrigger>
          <TabsTrigger value="concluidos">
            Concluídos ({concluidos.length})
          </TabsTrigger>
          <TabsTrigger value="em_andamento">
            Em Andamento ({emAndamento.length})
          </TabsTrigger>
          <TabsTrigger value="nao_iniciados">
            Não Iniciados ({naoIniciados.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          {treinamentos.map(renderTreinamento)}
        </TabsContent>

        <TabsContent value="concluidos" className="space-y-4">
          {concluidos.length > 0 ? (
            concluidos.map(renderTreinamento)
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhum treinamento concluído.</p>
          )}
        </TabsContent>

        <TabsContent value="em_andamento" className="space-y-4">
          {emAndamento.length > 0 ? (
            emAndamento.map(renderTreinamento)
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhum treinamento em andamento.</p>
          )}
        </TabsContent>

        <TabsContent value="nao_iniciados" className="space-y-4">
          {naoIniciados.length > 0 ? (
            naoIniciados.map(renderTreinamento)
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhum treinamento não iniciado.</p>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
