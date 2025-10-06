'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Documento } from '../../_types/documentosTypes'
import { FileText, Download, Calendar, User, FileType } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface DocumentosTableProps {
  documentos: Documento[]
  isLoading: boolean
}

const statusConfig = {
  ativo: { label: 'Ativo', variant: 'default' as const },
  arquivado: { label: 'Arquivado', variant: 'secondary' as const },
  obsoleto: { label: 'Obsoleto', variant: 'destructive' as const },
}

function formatarTamanho(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function DocumentosTable({ documentos, isLoading }: DocumentosTableProps) {
  const handleDownload = (documento: Documento) => {
    // TODO: Implementar download real
    console.log('Download:', documento.arquivo_url)
    window.open(documento.arquivo_url, '_blank')
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (documentos.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Nenhum documento encontrado
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {documentos.map((doc) => {
        const config = statusConfig[doc.status]

        return (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{doc.titulo}</CardTitle>
                    <Badge variant={config.variant}>{config.label}</Badge>
                    {doc.categoria_nome && (
                      <Badge variant="outline">{doc.categoria_nome}</Badge>
                    )}
                  </div>
                  {doc.descricao && (
                    <p className="text-sm text-muted-foreground">{doc.descricao}</p>
                  )}
                </div>
                <Button
                  onClick={() => handleDownload(doc)}
                  size="sm"
                  variant="outline"
                  className="ml-4"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileType className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">{doc.arquivo_nome}</p>
                    <p className="text-xs">
                      {doc.tipo_arquivo.toUpperCase()} • {formatarTamanho(doc.tamanho_bytes)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">Revisão {doc.revisao}</p>
                    <p className="text-xs">Versão do documento</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">
                      {format(new Date(doc.data_criacao), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                    <p className="text-xs">Data de criação</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-foreground">
                      {doc.atualizado_por || doc.criado_por || 'Sistema'}
                    </p>
                    <p className="text-xs">
                      Atualizado em{' '}
                      {format(new Date(doc.data_atualizacao), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
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
