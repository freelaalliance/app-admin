'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Truck,
  ShoppingCart,
  Receipt,
  UserCog,
  Wrench
} from 'lucide-react'
import { useModulos, useModulosEmpresa, useAtivarModulo, useDesativarModulo } from '../../_hooks/useAdminData'

interface ModulosTabProps {
  empresaId: string
}

const moduloIcons: Record<string, any> = {
  producao: Package,
  qualidade: TrendingUp,
  vendas: ShoppingCart,
  compras: Truck,
  estoque: Package,
  financeiro: DollarSign,
  documentos: FileText,
  expedicao: Truck,
  recebimentos: Receipt,
  rh: Users,
  manutencao: Wrench,
  admin: UserCog,
}

// Helper para extrair código do módulo a partir do nome
const getModuloCodigoFromNome = (nome: string): string => {
  return nome.toLowerCase().replace(/\s+/g, '-')
}

export function ModulosTab({ empresaId }: ModulosTabProps) {
  const { data: modulosDisponiveis, isLoading: loadingDisponiveis } = useModulos()
  const { data: modulosEmpresa, isLoading: loadingEmpresa } = useModulosEmpresa(empresaId)
  const ativarModulo = useAtivarModulo()
  const desativarModulo = useDesativarModulo()

  if (loadingDisponiveis || loadingEmpresa) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const modulos = modulosDisponiveis || []

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Ative ou desative os módulos disponíveis para esta empresa
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulos.map((modulo) => {
          const codigoModulo = getModuloCodigoFromNome(modulo.nome)
          const Icon = moduloIcons[codigoModulo] || Package

          return (
            <Card key={modulo.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">{modulo.nome}</CardTitle>
                  </div>
                  
                </div>
                <CardDescription className="text-sm">
                  {modulo.url}
                </CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
