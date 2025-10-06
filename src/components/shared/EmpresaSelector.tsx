'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Building2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

export type Empresa = {
  id: string
  nome: string
  documento: string
}

interface EmpresaSelectorProps {
  empresas: Empresa[]
  empresaSelecionada?: string
  isLoading?: boolean
}

export function EmpresaSelector({
  empresas,
  empresaSelecionada,
  isLoading = false,
}: EmpresaSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleEmpresaChange = (empresaId: string) => {
    // Extrai o módulo atual do pathname se existir
    const moduloAtual = pathname.split('/').pop()
    const isModulo = moduloAtual && moduloAtual !== empresaSelecionada
    
    if (isModulo) {
      router.push(`/dashboard/${empresaId}/${moduloAtual}`)
    } else {
      router.push(`/dashboard/${empresaId}`)
    }
  }

  return (
    <Card className="mb-6 border-alliance-primary-200 dark:border-alliance-primary-800 shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-alliance-primary-100 dark:bg-alliance-primary-900 rounded-lg">
            <Building2 className="h-6 w-6 text-alliance-primary-600 dark:text-alliance-primary-400" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-semibold mb-2 block text-alliance-neutral-700 dark:text-alliance-neutral-300">
              Selecione a Empresa
            </label>
            <Select
              value={empresaSelecionada}
              onValueChange={handleEmpresaChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full border-alliance-neutral-300 dark:border-alliance-neutral-600 focus:ring-alliance-primary-500">
                <SelectValue placeholder="Selecione uma empresa..." />
              </SelectTrigger>
              <SelectContent className="border-alliance-neutral-200 dark:border-alliance-neutral-700">
                {empresas.map((empresa) => (
                  <SelectItem key={empresa.id} value={empresa.id} className="hover:bg-alliance-primary-50 dark:hover:bg-alliance-primary-900">
                    <div className="flex flex-col">
                      <span className="font-medium text-alliance-neutral-900 dark:text-alliance-neutral-100">{empresa.nome}</span>
                      <span className="text-xs text-alliance-neutral-500 dark:text-alliance-neutral-400">
                        {empresa.documento}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
