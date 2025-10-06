'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, ClipboardCheck, AlertCircle } from 'lucide-react'
import type { Inspecao } from '../../_types/manutencaoTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface InspecoesTabProps {
  inspecoes: Inspecao[]
  isLoading?: boolean
}

const statusConfig = {
  pendente: { label: 'Pendente', variant: 'secondary' as const, className: '', icon: Calendar },
  realizada: { label: 'Realizada', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600', icon: ClipboardCheck },
  atrasada: { label: 'Atrasada', variant: 'destructive' as const, className: '', icon: AlertCircle },
}

const tipoConfig = {
  diaria: { label: 'Diária', color: 'bg-blue-100 text-blue-800' },
  semanal: { label: 'Semanal', color: 'bg-purple-100 text-purple-800' },
  mensal: { label: 'Mensal', color: 'bg-green-100 text-green-800' },
  trimestral: { label: 'Trimestral', color: 'bg-yellow-100 text-yellow-800' },
  anual: { label: 'Anual', color: 'bg-red-100 text-red-800' },
}

export function InspecoesTab({ inspecoes, isLoading }: InspecoesTabProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-24 w-full" />
          </Card>
        ))}
      </div>
    )
  }

  if (inspecoes.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Nenhuma inspeção agendada.</p>
      </Card>
    )
  }

  // Ordenar por data programada (mais próximas primeiro)
  const inspecoesOrdenadas = [...inspecoes].sort((a, b) => 
    new Date(a.data_programada).getTime() - new Date(b.data_programada).getTime()
  )

  return (
    <div className="space-y-4">
      {inspecoesOrdenadas.map((inspecao) => {
        const statusInfo = statusConfig[inspecao.status]
        const tipoInfo = tipoConfig[inspecao.tipo]
        const StatusIcon = statusInfo.icon

        return (
          <Card key={inspecao.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Informações Principais */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{inspecao.equipamento_nome}</h3>
                  <Badge variant={statusInfo.variant} className={statusInfo.className}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                  <Badge variant="outline" className={tipoInfo.color}>
                    {tipoInfo.label}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Programada:</span>{' '}
                    {format(new Date(inspecao.data_programada), 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                  {inspecao.data_realizada && (
                    <div>
                      <span className="font-medium">Realizada:</span>{' '}
                      {format(new Date(inspecao.data_realizada), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Responsável:</span> {inspecao.responsavel}
                  </div>
                </div>

                {inspecao.observacoes && (
                  <p className="mt-2 text-sm text-muted-foreground italic">
                    {inspecao.observacoes}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
