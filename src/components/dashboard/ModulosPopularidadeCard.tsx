import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
  Building2
} from "lucide-react"
import type { ModuloPopularidade } from "@/hooks/_empresas/_types/dashboardTypes"
import { cn } from "@/lib/utils"

interface ModulosPopularidadeCardProps {
  modulos: ModuloPopularidade[]
  isLoading?: boolean
}

export function ModulosPopularidadeCard({ modulos, isLoading }: ModulosPopularidadeCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Módulos Mais Populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-muted rounded w-32" />
                  <div className="h-4 bg-muted rounded w-16" />
                </div>
                <div className="h-2 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxEmpresas = Math.max(...modulos.map(m => m.empresasUsando))

  const getTrendIcon = (crescimento: number) => {
    if (crescimento > 0) return <TrendingUp className="h-3 w-3" />
    if (crescimento < 0) return <TrendingDown className="h-3 w-3" />
    return <Minus className="h-3 w-3" />
  }

  const getTrendColor = (crescimento: number) => {
    if (crescimento > 0) return 'text-green-600'
    if (crescimento < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Módulos Mais Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modulos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum módulo encontrado</p>
            </div>
          ) : (
            modulos.map((modulo, index) => (
              <div key={modulo.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <h4 className="font-medium text-sm">{modulo.nome}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Building2 className="h-3 w-3 mr-1" />
                      {modulo.empresasUsando}
                    </Badge>
                  </div>
                </div>
                
                <Progress 
                  value={modulo.percentualUso} 
                  className="h-2"
                />
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {modulo.percentualUso.toFixed(1)}% das empresas
                  </span>
                  <div className={cn(
                    "flex items-center gap-1",
                    getTrendColor(modulo.crescimento)
                  )}>
                    {getTrendIcon(modulo.crescimento)}
                    <span>
                      {Math.abs(modulo.crescimento).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}