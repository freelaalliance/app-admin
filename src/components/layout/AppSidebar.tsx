'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter, SidebarGroup, SidebarHeader,
  SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import type { EmpresaFormType, empresaType } from '@/hooks/_empresas/_types/empresaTypes'
import { EmpresasSwitcher } from './EmpresasSwitcher'
import { NavMainModulos } from './NavMainModulos'
import { useCreateEmpresa, useDeleteEmpresa, useEmpresas, useModulosEmpresa, useUpdateEmpresa } from '@/hooks/_empresas/_hooks/useAdminData'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EmpresaDialog } from '@/hooks/_empresas/_components/dialogs/EmpresaDialog'
import { ConfirmDeleteDialog } from '@/hooks/_empresas/_components/dialogs/ConfirmDeleteDialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [empresaDialog, setEmpresaDialog] = React.useState<{
    open: boolean
    empresa: empresaType | null
  }>({ open: false, empresa: null })
  const [deleteDialog, setDeleteDialog] = React.useState<{
    open: boolean
    empresa: empresaType | null
  }>({ open: false, empresa: null })

  const searchParams = useSearchParams()
  const empresaIdParam = searchParams.get('empresa')
  const router = useRouter()

  const { data } = useEmpresas()

  const createEmpresa = useCreateEmpresa()
  const updateEmpresa = useUpdateEmpresa()
  const deleteEmpresa = useDeleteEmpresa()

  const { data: modulosEmpresa } = useModulosEmpresa(empresaIdParam || '')
  const { isMobile } = useSidebar()

  const handleEmpresaChange = (empresaId: string) => {
    router.push(`?empresa=${empresaId}`, { scroll: false })
  }

  const handleNovaEmpresa = () => {
    setEmpresaDialog({ open: true, empresa: null })
  }

  const handleEditEmpresa = (empresa?: empresaType) => {
    if(!empresa){
      toast.error("Selecione uma empresa antes de editar os dados da empresa!")
      return;
    }
    setEmpresaDialog({ open: true, empresa })
  }

  const handleDeleteEmpresa = (empresa?: empresaType) => {
    if(!empresa){
      toast.error("Selecione uma empresa antes de editar os dados da empresa!")
      return;
    }

    setDeleteDialog({ open: true, empresa })
  }

  const handleSubmitEmpresa = async (formData: EmpresaFormType) => {
    try {
      if (empresaDialog.empresa) {
        await updateEmpresa.mutateAsync({
          id: empresaDialog.empresa.id,
          data: formData,
        })
      } else {
        await createEmpresa.mutateAsync(formData)
      }
      setEmpresaDialog({ open: false, empresa: null })
    } catch (error) {
      console.error('Erro ao salvar empresa:', error)
    }
  }

  const handleConfirmDelete = async () => {
    if (deleteDialog.empresa) {
      try {
        await deleteEmpresa.mutateAsync(deleteDialog.empresa.id)
        setDeleteDialog({ open: false, empresa: null })
      } catch (error) {
        console.error('Erro ao deletar empresa:', error)
      }
    }
  }

  const pathname = usePathname()

  return (
    <>
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <EmpresasSwitcher
            empresas={data ?? []}
            empresaAtual={data?.find(e => e.id === empresaIdParam)}
            empresaSelecionada={empresaIdParam}
            onEmpresaChange={handleEmpresaChange}
            onNovaEmpresa={handleNovaEmpresa}
          />
        </SidebarHeader>

        <SidebarContent>

          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem key={"home"}>
                <SidebarMenuButton asChild>
                  <a href={`/?empresa=${empresaIdParam}`} className="font-medium">
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="font-medium">
                  Gerenciar empresa
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem key={"modulos"}>
                    <SidebarMenuSubButton isActive={pathname.includes(`/modulos`)} asChild>
                      <a href={`/modulos?empresa=${empresaIdParam}`}>Módulos</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key={"perfis"}>
                    <SidebarMenuSubButton isActive={pathname.includes(`/perfil`)} asChild>
                      <a href={`/perfil?empresa=${empresaIdParam}`}>Perfis</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key={"usuarios"}>
                    <SidebarMenuSubButton isActive={pathname.includes(`/usuarios`)} asChild>
                      <a href={`/usuarios?empresa=${empresaIdParam}`}>Usuários</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuItem key={"editar"}>
                    <SidebarMenuButton>
                      Configurações
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal />
                          <span className="sr-only">Configurações</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-48 rounded-lg p-4"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                      >
                        <DropdownMenuItem onClick={() => handleEditEmpresa(data?.find(e => e.id === empresaIdParam))}>
                          <Pencil className="text-muted-foreground" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant='destructive' onClick={() => handleDeleteEmpresa(data?.find(e => e.id === empresaIdParam))}>
                          <Trash2 className="text-muted-foreground" />
                          <span>Excluir empresa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <NavMainModulos
            modulosEmpresa={modulosEmpresa}
            empresaSelecionada={empresaIdParam}
            pathName={pathname}
          />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-2 py-2 text-center">
                <p className="text-xs text-white/80">
                  ERP Alliance - Administrador
                </p>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <EmpresaDialog
        open={empresaDialog.open}
        onOpenChange={(open) => setEmpresaDialog({ open, empresa: null })
        }
        onSubmit={handleSubmitEmpresa}
        empresa={empresaDialog.empresa}
        isSubmitting={createEmpresa.isPending || updateEmpresa.isPending}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, empresa: null })}
        onConfirm={handleConfirmDelete}
        title="Deletar Empresa?"
        description={`Tem certeza que deseja deletar a empresa "${deleteDialog.empresa?.nome}"? Esta ação não pode ser desfeita e removerá todos os dados associados.`}
      />
    </>
  )
}
