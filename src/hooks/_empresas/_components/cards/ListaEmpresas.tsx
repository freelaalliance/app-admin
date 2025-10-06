'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Building2, MapPin } from 'lucide-react'
import type { empresaType } from '../../_types/empresaTypes'

interface ListaEmpresasProps {
  empresas: empresaType[]
  onEdit: (empresa: empresaType) => void
  onDelete: (empresa: empresaType) => void
  onToggleStatus: (empresa: empresaType) => void
}

export function ListaEmpresas({ empresas, onEdit, onDelete }: ListaEmpresasProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {empresas.map((empresa) => (
        <Card key={empresa.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">{empresa.nome}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-mono text-xs">{empresa.cnpj}</p>
              
              {empresa.logradouro && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span className="flex-1">
                    {empresa.logradouro}, {empresa.numero}
                    {empresa.complemento && ` - ${empresa.complemento}`}
                    <br />
                    {empresa.bairro}, {empresa.cidade}/{empresa.estado}
                    <br />
                    CEP: {empresa.cep}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(empresa)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(empresa)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
