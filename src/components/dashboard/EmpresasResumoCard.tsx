import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Building2,
  Users,
  Package,
  ExternalLink,
  Activity
} from "lucide-react"
import type { ResumoEmpresa } from "@/hooks/_empresas/_types/dashboardTypes"
import { cn } from "@/lib/utils"

interface EmpresasResumoCardProps {
  empresas: ResumoEmpresa[]
  isLoading?: boolean
  onViewDetails?: (empresaId: string) => void
}

export function EmpresasResumoCard({ 
  empresas, 
  isLoading, 
  onViewDetails 
}: EmpresasResumoCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Empresas Mais Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border animate-pulse">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
                <div className="w-20 h-8 bg-muted rounded" />
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
          <Building2 className="h-5 w-5" />
          Empresas Mais Ativas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {empresas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma empresa encontrada</p>
            </div>
          ) : (
            empresas.map((empresa) => (
              <div 
                key={empresa.id} 
                className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm truncate">
                      {empresa.nomeFantasia || empresa.razaoSocial}
                    </h4>
                    <Badge 
                      variant={empresa.status === 'ativa' ? 'default' : 'secondary'}
                      className={cn(
                        "text-xs",
                        empresa.status === 'ativa' 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {empresa.status === 'ativa' ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    CNPJ: {empresa.cnpj}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span>{empresa.modulosAtivos} módulos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{empresa.totalUsuarios} usuários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(empresa.ultimaAtividade), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                {onViewDetails && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onViewDetails(empresa.id)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}