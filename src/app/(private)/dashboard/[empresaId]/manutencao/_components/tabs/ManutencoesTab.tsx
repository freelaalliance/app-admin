'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Wrench, Clock } from 'lucide-react'
import type { Manutencao } from '../../_types/manutencaoTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface ManutencoesTabProps {
  manutencoes: Manutencao[]
  isLoading?: boolean
}

const statusConfig = {
  em_andamento: { label: 'Em Andamento', variant: 'secondary' as const, className: 'bg-blue-500 hover:bg-blue-600 text-white' },
  concluida: { label: 'Concluída', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' },
  cancelada: { label: 'Cancelada', variant: 'destructive' as const, className: '' },
}

const tipoConfig = {
  preventiva: { label: 'Preventiva', color: 'bg-green-100 text-green-800' },
  corretiva: { label: 'Corretiva', color: 'bg-yellow-100 text-yellow-800' },
  preditiva: { label: 'Preditiva', color: 'bg-blue-100 text-blue-800' },
}

export function ManutencoesTab({ manutencoes, isLoading }: ManutencoesTabProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-32 w-full" />
          </Card>
        ))}
      </div>
    )
  }

  if (manutencoes.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Nenhuma manutenção registrada.</p>
      </Card>
    )
  }

  // Ordenar por data (mais recentes primeiro)
  const manutencoesOrdenadas = [...manutencoes].sort((a, b) => 
    new Date(b.data_inicio).getTime() - new Date(a.data_inicio).getTime()
  )

  return (
    <div className="space-y-4">
      {manutencoesOrdenadas.map((manutencao) => {
        const statusInfo = statusConfig[manutencao.status]
        const tipoInfo = tipoConfig[manutencao.tipo]

        return (
          <Card key={manutencao.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{manutencao.equipamento_nome}</h3>
                    <Badge variant={statusInfo.variant} className={statusInfo.className}>
                      {statusInfo.label}
                    </Badge>
                    <Badge variant="outline" className={tipoInfo.color}>
                      {tipoInfo.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{manutencao.descricao}</p>
                </div>
              </div>

              {/* Informações */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Início</p>
                  <p className="font-medium">
                    {format(new Date(manutencao.data_inicio), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
                
                {manutencao.data_fim && (
                  <div>
                    <p className="text-muted-foreground mb-1">Fim</p>
                    <p className="font-medium">
                      {format(new Date(manutencao.data_fim), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                )}

                {manutencao.duracao_horas !== undefined && (
                  <div>
                    <p className="text-muted-foreground mb-1">Duração</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{manutencao.duracao_horas.toFixed(1)}h</p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-muted-foreground mb-1">Técnico</p>
                  <p className="font-medium">{manutencao.tecnico}</p>
                </div>

                {manutencao.custo !== undefined && (
                  <div>
                    <p className="text-muted-foreground mb-1">Custo</p>
                    <p className="font-medium">
                      R$ {manutencao.custo.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
