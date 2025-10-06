'use client'

import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import FornecedoresTab from './_components/tabs/FornecedoresTab'
import ComprasTab from './_components/tabs/ComprasTab'

export default function ComprasPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  const handleExportarPDF = () => {
    // TODO: Implementar exportação para PDF
    console.log('Exportar PDF - Compras')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
          <p className="text-muted-foreground">
            Gerencie fornecedores e acompanhe suas compras
          </p>
        </div>
        <Button onClick={handleExportarPDF} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fornecedores" className="space-y-6">
        <TabsList>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          <TabsTrigger value="compras">Compras</TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores" className="space-y-6">
          <FornecedoresTab empresaId={empresaId} />
        </TabsContent>

        <TabsContent value="compras" className="space-y-6">
          <ComprasTab empresaId={empresaId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
