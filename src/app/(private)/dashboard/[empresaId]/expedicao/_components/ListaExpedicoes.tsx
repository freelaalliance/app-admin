'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Expedicao } from '../_types/expedicaoTypes'
import { Package, Calendar, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ListaExpedicoesProps {
  expedicoes: Expedicao[]
  isLoading: boolean
}

export function ListaExpedicoes({ expedicoes, isLoading }: ListaExpedicoesProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (expedicoes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">Nenhuma expedição encontrada</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {expedicoes.map((exp) => {
        return (
          <Card key={exp.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-lg">
                      Expedição #{exp.venda.numeroVenda}
                    </CardTitle>
                    <Badge variant="default">
                      <Package className="h-3 w-3 mr-1" />
                      Expedida
                    </Badge>
                    {(exp && exp.avaliacaoExpedicao) && (
                      <Badge variant="outline" className="gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {Number(exp.avaliacaoExpedicao).toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Venda:</strong> #{exp.venda.numeroVenda} • <strong>Cliente:</strong>{' '}
                    {exp.venda.cliente.nome}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">
                      {format(new Date(exp.expedidoEm), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-xs">Data da expedição</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">
                      Responsável: {exp.usuario || 'Não informado'}
                    </p>
                    <p className="text-xs">Usuário que expediu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
