'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileDown, FileText, Archive, Folder } from 'lucide-react'
import { IndicadorInfo } from '@/components/shared/IndicadorInfo'
import { useDocumentos, useCategorias } from './_hooks/useDocumentosData'
import { DocumentosTable } from './_components/tables/DocumentosTable'

export default function DocumentosPage() {
  const params = useParams()
  const empresaId = params.empresaId as string
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>()

  const { data: documentos, isLoading: isLoadingDocs } = useDocumentos(empresaId)
  const { data: categorias, isLoading: isLoadingCategorias } = useCategorias(empresaId)

  // Filtrar documentos localmente por categoria se necessário
  const documentosFiltrados =
    categoriaFiltro && categoriaFiltro !== 'todas'
      ? (documentos || []).filter((doc) => doc.categoriaDocumentoNome === categoriaFiltro)
      : documentos || []

  // Calcular estatísticas
  const stats = {
    total: documentosFiltrados.length,
    ativos: documentosFiltrados.length, // API não retorna status, assumindo todos ativos
    arquivados: 0, // API não retorna status
    categorias: categorias?.length || 0,
  }

  const handleExportarPDF = () => {
    // TODO: Implementar exportação para PDF
    console.log('Exportar PDF - Documentos')
  }

  const handleLimparFiltro = () => {
    setCategoriaFiltro(undefined)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
          <p className="text-muted-foreground">Gerencie e acesse os documentos da empresa</p>
        </div>
        <Button onClick={handleExportarPDF} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IndicadorInfo
          titulo="Total de Documentos"
          info={stats.total.toString()}
          icon={FileText}
          carregandoInformacao={isLoadingDocs}
        />
        <IndicadorInfo
          titulo="Documentos Ativos"
          info={stats.ativos.toString()}
          subtitulo="Disponíveis para uso"
          icon={FileText}
          carregandoInformacao={isLoadingDocs}
          className="border-l-4 border-l-green-500"
        />
        <IndicadorInfo
          titulo="Arquivados"
          info={stats.arquivados.toString()}
          subtitulo="Documentos arquivados"
          icon={Archive}
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

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex-1 max-w-xs">
            <Select
              value={categoriaFiltro}
              onValueChange={setCategoriaFiltro}
              disabled={isLoadingCategorias}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categorias?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {categoriaFiltro && (
            <Button variant="outline" onClick={handleLimparFiltro}>
              Limpar Filtro
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Lista de Documentos */}
      <div>
        <DocumentosTable documentos={documentosFiltrados} isLoading={isLoadingDocs} />
      </div>
    </div>
  )
}
