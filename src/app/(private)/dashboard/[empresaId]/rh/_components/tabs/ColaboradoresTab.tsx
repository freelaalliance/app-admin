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
      {colaboradores.map((colaborador) => {
        // Validação segura de datas
        const admissaoDate = colaborador.admitidoEm ? new Date(colaborador.admitidoEm) : null
        const demissaoDate = colaborador.demitidoEm ? new Date(colaborador.demitidoEm) : null
        
        const isAdmissaoValid = admissaoDate && !isNaN(admissaoDate.getTime())
        const isDemissaoValid = demissaoDate && !isNaN(demissaoDate.getTime())

        return (
          <Card key={colaborador.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Informações Principais */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{colaborador.colaborador.nome}</h3>
                  <Badge variant={colaborador.demitidoEm ? 'secondary' : 'default'}>
                    {colaborador.demitidoEm ? 'Demitido' : 'Ativo'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">CPF/CNPJ:</span> {colaborador.colaborador.documento}
                  </div>
                  <div>
                    <span className="font-medium">Cargo:</span> {colaborador.cargo.nome}
                  </div>
                  <div>
                    <span className="font-medium">Admissão:</span>{' '}
                    {isAdmissaoValid 
                      ? format(admissaoDate, 'dd/MM/yyyy', { locale: ptBR })
                      : 'Data inválida'}
                  </div>
                  {isDemissaoValid && (
                    <div>
                      <span className="font-medium">Demissão:</span>{' '}
                      {format(demissaoDate, 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                  )}
                  {colaborador.colaborador.email && (
                    <div className="col-span-2">
                      <span className="font-medium">Email:</span> {colaborador.colaborador.email}
                    </div>
                  )}
                  {colaborador.colaborador.telefone && (
                    <div>
                      <span className="font-medium">Telefone:</span> {colaborador.colaborador.telefone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
