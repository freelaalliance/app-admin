'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import type { ColaboradoresPorCargo } from '../_types/rhTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface GridCargosProps {
  cargos: ColaboradoresPorCargo[]
  isLoading?: boolean
}

export function GridCargos({ cargos, isLoading }: GridCargosProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-24 w-full" />
          </Card>
        ))}
      </div>
    )
  }

  if (cargos.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Nenhum cargo cadastrado.</p>
      </Card>
    )
  }

  // Ordenar por quantidade (do maior para o menor)
  const cargosOrdenados = [...cargos].sort((a, b) => b.quantidade - a.quantidade)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cargosOrdenados.map((cargo, index) => (
        <Card 
          key={`${cargo.cargo}-${index}`} 
          className="p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-1">{cargo.cargo}</h4>
              <p className="text-sm text-muted-foreground">{cargo.departamento}</p>
            </div>
            <div className="ml-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{cargo.quantidade}</span>
            <Badge variant="outline">
              {cargo.quantidade === 1 ? 'colaborador' : 'colaboradores'}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  )
}
