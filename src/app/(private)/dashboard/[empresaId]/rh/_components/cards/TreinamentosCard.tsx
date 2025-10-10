import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Users, Award, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ResumoTreinamentos, ColaboradorTreinamento } from '../../_types/rhTypes'

interface TreinamentosCardProps {
  resumo?: ResumoTreinamentos
  colaboradores: ColaboradorTreinamento[]
}

export function TreinamentosCard({ resumo, colaboradores }: TreinamentosCardProps) {
  const stats = [
    {
      label: 'Total de Treinamentos',
      value: resumo?.totalTreinamentos || 0,
      icon: Award,
      color: 'text-blue-600',
    },
    {
      label: 'Em Andamento',
      value: resumo?.treinamentosAtivos || 0,
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      label: 'Concluídos',
      value: resumo?.treinamentosConcluidos || 0,
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      label: 'Colaboradores',
      value: resumo?.colaboradoresEmTreinamento || 0,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      label: 'Média Horas',
      value: `${resumo?.mediaHorasTreinamento || 0}h`,
      icon: Clock,
      color: 'text-indigo-600',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Treinamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <Icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {colaboradores.length > 0 ? (
          <div>
            <h3 className="font-semibold mb-3 text-sm">Colaboradores em Treinamento</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {colaboradores.map((col) => (
                <div
                  key={col.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{col.colaborador.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {col.treinamento.nome} • {col.cargo.nome}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(col.iniciadoEm).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-xs text-muted-foreground">Iniciado em</p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {col.treinamento.tipo}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhum colaborador em treinamento no momento</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
