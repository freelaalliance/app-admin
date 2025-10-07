import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Building2,
  UserPlus,
  Package,
  Shield,
  Activity
} from "lucide-react"
import type { AtividadesRecentes } from "@/hooks/_empresas/_types/dashboardTypes"

interface AtividadesRecentesCardProps {
  atividades: AtividadesRecentes[]
  isLoading?: boolean
}

const activityIcons = {
  empresa_criada: Building2,
  usuario_adicionado: UserPlus,
  modulo_ativado: Package,
  perfil_criado: Shield,
} as const

const activityColors = {
  empresa_criada: 'bg-primary/10 text-primary',
  usuario_adicionado: 'bg-blue-100 text-blue-700',
  modulo_ativado: 'bg-green-100 text-green-700',
  perfil_criado: 'bg-purple-100 text-purple-700',
} as const

const activityLabels = {
  empresa_criada: 'Empresa',
  usuario_adicionado: 'Usuário',
  modulo_ativado: 'Módulo',
  perfil_criado: 'Perfil',
} as const

export function AtividadesRecentesCard({ atividades, isLoading }: AtividadesRecentesCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="h-8 w-8 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-4">
            {atividades.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma atividade recente</p>
              </div>
            ) : (
              atividades.map((atividade) => {
                const Icon = activityIcons[atividade.tipo] || Activity
                const color = activityColors[atividade.tipo] || 'bg-muted text-muted-foreground'
                const label = activityLabels[atividade.tipo] || 'Atividade'

                return (
                  <div key={atividade.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div className={`p-2 rounded-full ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(atividade.timestamp), {
                            addSuffix: true,
                            locale: ptBR
                          })}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm">{atividade.titulo}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {atividade.descricao}
                      </p>
                      {atividade.empresaNome && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Empresa: {atividade.empresaNome}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}