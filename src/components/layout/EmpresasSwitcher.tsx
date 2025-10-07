import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Check, Plus, Building2 } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { empresaType } from "@/hooks/_empresas/_types/empresaTypes";
import { aplicarMascaraDocumento } from "@/lib/utils/cnpj";

interface EmpresasSwitcherProps {
  empresas: empresaType[]
  empresaAtual: empresaType | undefined
  empresaSelecionada: string | null
  onEmpresaChange: (empresaId: string) => void
  onNovaEmpresa?: () => void
}

export function EmpresasSwitcher({ empresas, empresaAtual, empresaSelecionada, onEmpresaChange, onNovaEmpresa }: EmpresasSwitcherProps) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"lg"}
              variant={"outline"}
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>
              {
                !empresaSelecionada || empresaSelecionada === '' ? (
                  <div className="grid flex-1 text-left text-sm leading-tight text-foreground">
                    <span className="truncate font-medium">Selecione uma empresa</span>
                    <span className="truncate text-xs">{"--"}</span>
                  </div>
                ) : (
                  <div className="grid flex-1 text-left text-sm leading-tight text-foreground">
                    <span className="truncate font-medium">{empresaAtual?.nome}</span>
                    <span className="truncate text-xs">{aplicarMascaraDocumento(empresaAtual?.cnpj ?? "")}</span>
                  </div>
                )
              }

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Lista de empresas</DropdownMenuLabel>

            {empresas.map((empresa) => (
              <DropdownMenuItem
                key={empresa.id}
                onSelect={() => onEmpresaChange(empresa.id)}
                className="gap-2 p-2"
              >
                {empresa.nome}
                {empresaSelecionada === empresa.id && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onNovaEmpresa} className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Nova empresa</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}