'use client'

import { Building2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { empresaType } from '../_types/empresaTypes'

interface SeletorEmpresaProps {
  empresas: empresaType[]
  empresaSelecionada: string | null
  onEmpresaChange: (empresaId: string) => void
  carregando?: boolean
}

export function SeletorEmpresa({ 
  empresas, 
  empresaSelecionada, 
  onEmpresaChange,
  carregando = false 
}: SeletorEmpresaProps) {
  return (
    <div className="flex items-center gap-2">
      <Building2 className="h-5 w-5 text-muted-foreground" />
      <Select
        value={empresaSelecionada || ''}
        onValueChange={(value) => onEmpresaChange(value)}
        disabled={carregando || empresas.length === 0}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Selecione uma empresa..." />
        </SelectTrigger>
        <SelectContent>
          {empresas.map((empresa) => (
            <SelectItem key={empresa.id} value={empresa.id}>
              {empresa.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
