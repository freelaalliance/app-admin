
import { Modulo } from "@/hooks/_empresas/_types/moduloTypes"
import Link from 'next/link'
import {
  Package,
  ShoppingCart,
  Users,
  Settings,
  Truck,
  FileText,
  Receipt,
  Wrench, LayoutDashboard,
  MonitorCog
} from 'lucide-react'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

interface NavMainModulosProps {
  modulosEmpresa: Modulo[] | undefined
  empresaSelecionada?: string | null
  pathName: string
}

const moduloIcons: Record<string, React.ElementType> = {
  compras: Package,
  vendas: ShoppingCart,
  rh: Users,
  expedicao: Truck,
  recebimentos: Receipt,
  documentos: FileText,
  manutencao: Wrench,
  calibracao: MonitorCog,
  dashboard: LayoutDashboard,
  default: Settings,
}

export function NavMainModulos({ modulosEmpresa, empresaSelecionada, pathName }: NavMainModulosProps) {

  return (
    modulosEmpresa && modulosEmpresa.length > 0 && (
      <SidebarGroup>
        <SidebarGroupLabel>Módulos Vinculados</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {modulosEmpresa
              .map((modulo) => {
                const codigoModulo = modulo.nome
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9]/g, '-')
                  .replace(/-+/g, '-')
                  .replace(/^-|-$/g, '')

                const Icon = moduloIcons[codigoModulo] || moduloIcons.default
                return (
                  <SidebarMenuItem key={modulo.id}>
                    <SidebarMenuButton isActive={pathName.includes(`/dashboard/${empresaSelecionada}/${codigoModulo}`)} asChild>
                      <Link href={`/dashboard/${empresaSelecionada}/${codigoModulo}?empresa=${empresaSelecionada}`} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{modulo.nome}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  )
}