import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CheckCircle2, XCircle } from 'lucide-react'
import { HistoricoCalibracao } from '../_types/calibracaoTypes'

interface HistoricoListProps {
  dados: HistoricoCalibracao[]
  isLoading: boolean
}

export function HistoricoList({ dados, isLoading }: HistoricoListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Calibrações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Calibrações</CardTitle>
        <p className="text-sm text-muted-foreground">
          Últimas {dados.length} calibrações realizadas
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {dados.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma calibração encontrada</p>
            </div>
          ) : (
            dados.map((item) => (
              <div
                key={item.calibracao.id}
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{item.instrumento.nome}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.instrumento.codigo}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Certificado:</span>{' '}
                        <span className="font-medium">
                          {item.calibracao.numeroCertificado}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Realizado em:</span>{' '}
                        <span className="font-medium">
                          {format(new Date(item.calibracao.realizadoEm), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Por:</span>{' '}
                        <span className="font-medium">
                          {item.calibracao.usuarioNome}
                        </span>
                      </div>
                    </div>
                    
                    {item.calibracao.erroEncontrado && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Erro:</span>{' '}
                        {item.calibracao.erroEncontrado}
                      </p>
                    )}
                  </div>
                  
                  <div className="ml-4">
                    {item.calibracao.status.toUpperCase() === 'APROVADO' ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Aprovado
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Reprovado
                      </Badge>
                    )}
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
