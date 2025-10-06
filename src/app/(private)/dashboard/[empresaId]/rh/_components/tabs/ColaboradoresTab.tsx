'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Colaborador } from '../../_types/rhTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface ColaboradoresTabProps {
  colaboradores: Colaborador[]
  isLoading?: boolean
}

export function ColaboradoresTab({ colaboradores, isLoading }: ColaboradoresTabProps) {
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

  if (colaboradores.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum colaborador encontrado.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {colaboradores.map((colaborador) => (
        <Card key={colaborador.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Informações Principais */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{colaborador.nome}</h3>
                <Badge variant={colaborador.status === 'ativo' ? 'default' : 'secondary'}>
                  {colaborador.status === 'ativo' ? 'Ativo' : 'Demitido'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Cargo:</span> {colaborador.cargo}
                </div>
                <div>
                  <span className="font-medium">Departamento:</span> {colaborador.departamento}
                </div>
                <div>
                  <span className="font-medium">Admissão:</span>{' '}
                  {format(new Date(colaborador.data_admissao), 'dd/MM/yyyy', { locale: ptBR })}
                </div>
                {colaborador.data_demissao && (
                  <div>
                    <span className="font-medium">Demissão:</span>{' '}
                    {format(new Date(colaborador.data_demissao), 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                )}
              </div>
            </div>

            {/* Salário */}
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Salário</p>
              <p className="text-xl font-bold">
                R$ {colaborador.salario.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
