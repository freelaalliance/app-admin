'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileText, Folder } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useDocumentos, useCategorias, useUsuarios, usePastasDocumentos } from './_hooks/useDocumentosData'
import { TabelaDocumentos } from './_components/tables/DocumentosTable'
import { ColunasDocumentosEmpresaAdmin } from './_components/tables/colunas-tabela-documentos-empresa-admin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabelaCategoriaDocumentos } from './_components/tables/categoria/tabela-categorias-documentos'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { NovoDocumentoForm } from './_components/forms/novo-documento-form'

export default function DocumentosPage() {
  const params = useSearchParams()
  const empresaId = params.get('empresa') as string

  const { data: documentos, isFetching: isLoadingDocs } = useDocumentos(empresaId)
  const { data: categorias, isFetching: isLoadingCategorias } = useCategorias(empresaId)
  const { data: listaUsuarios, isFetching: carregandoUsuariosEmpresa } = useUsuarios(empresaId)
  const { data: listaPastas, isLoading: carregandoPastas } = usePastasDocumentos(empresaId)

  console.log('Pastas de documentos:', listaPastas)

  // Calcular estatísticas
  const stats = {
    total: documentos?.length ?? 0,
    categorias: categorias?.length || 0,
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
          <p className="text-muted-foreground">Gerencie e acesse os documentos da empresa</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2">
        <IndicadorInfo
          titulo="Total de Documentos"
          info={stats.total.toString()}
          icon={FileText}
          carregandoInformacao={isLoadingDocs}
        />
        <IndicadorInfo
          titulo="Categorias"
          info={stats.categorias.toString()}
          subtitulo="Total de categorias"
          icon={Folder}
          carregandoInformacao={isLoadingCategorias}
        />
      </div>

      {/* Lista de Documentos */}
      <div>

        <Tabs defaultValue="documentos">
          <TabsList >
            <TabsTrigger value="categorias">Categorias de documentos</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="categorias">
            <TabelaCategoriaDocumentos
              carregandoCategorias={isLoadingCategorias}
              listaCategorias={categorias ?? []}
              empresaId={empresaId ?? ''}
            />
          </TabsContent>
          <TabsContent value="documentos">
            <div className="flex justify-end p-4 rounded-lg shadow-md">
              <Dialog>
                <DialogTrigger asChild >
                  <Button
                    className="shadow flex md:justify-between justify-center md:gap-4 gap-2 w-full md:w-auto"
                    disabled={!empresaId || carregandoUsuariosEmpresa}
                  >
                    Novo documento
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-3xl overflow-auto max-h-full">
                  <DialogHeader>
                    <DialogTitle>Criar novo documento</DialogTitle>
                    <DialogDescription>
                      Crie um novo documento para o seu cliente
                    </DialogDescription>
                  </DialogHeader>
                  <NovoDocumentoForm
                    listaCategoriasDocumentos={!isLoadingCategorias ? (categorias ?? []) : []}
                    listaUsuarios={listaUsuarios ?? []}
                    listaPastasDocumentos={carregandoPastas ? [] : (listaPastas ?? [])}
                    empresaId={empresaId ?? ''}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <TabelaDocumentos
              dadosDocumentos={documentos ?? []}
              carregandoDados={isLoadingDocs}
              colunasDocumento={ColunasDocumentosEmpresaAdmin}
              categoriasDocumento={categorias ?? []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
