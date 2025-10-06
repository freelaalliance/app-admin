'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Settings } from 'lucide-react'
import type { Equipamento } from '../_types/manutencaoTypes'
import { Skeleton } from '@/components/ui/skeleton'

interface SeletorEquipamentoProps {
  equipamentos: Equipamento[]
  equipamentoSelecionado?: number
  onSelecionar: (equipamentoId: number | undefined) => void
  isLoading?: boolean
}

export function SeletorEquipamento({ 
  equipamentos, 
  equipamentoSelecionado, 
  onSelecionar,
  isLoading 
}: SeletorEquipamentoProps) {
  if (isLoading) {
    return <Skeleton className="h-10 w-[300px]" />
  }

  return (
    <div className="flex items-center gap-2">
      <Settings className="h-5 w-5 text-muted-foreground" />
      <Select
        value={equipamentoSelecionado?.toString() || 'todos'}
        onValueChange={(value) => onSelecionar(value === 'todos' ? undefined : Number(value))}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Selecione um equipamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Equipamentos</SelectItem>
          {equipamentos.map((equipamento) => (
            <SelectItem key={equipamento.id} value={equipamento.id.toString()}>
              {equipamento.codigo} - {equipamento.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
