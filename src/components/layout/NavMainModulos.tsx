'use client'

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
  MonitorCog,
  MoreVertical,
  Trash2,
  MessageCircleWarning
} from 'lucide-react'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuAction } from "../ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useExclusaoLoteDados } from "@/hooks/use-exclusao-lote"
import { ModuloExclusao } from "@/types/exclusao-lote"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

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

// Configuração de exclusão por módulo (baseado em API-EXCLUSAO-LOGICA.md)
type OpcaoExclusao = {
  modulo: ModuloExclusao;
  nomeExibicao: string;
  descricaoAcao: string;
};

const modulosComExclusao: Record<string, OpcaoExclusao[]> = {
  calibracao: [
    {
      modulo: 'calibracao',
      nomeExibicao: 'Excluir Calibrações',
      descricaoAcao: 'Todas as calibrações ativas desta empresa serão marcadas como excluídas. Esta ação é irreversível.',
    },
  ],
  compras: [
    {
      modulo: 'compras',
      nomeExibicao: 'Excluir Compras',
      descricaoAcao: 'Todas as compras ativas desta empresa serão marcadas como excluídas. Esta ação é irreversível.',
    },
    {
      modulo: 'compras-fornecedores',
      nomeExibicao: 'Excluir Fornecedores',
      descricaoAcao: 'Todos os fornecedores ativos desta empresa serão marcados como excluídos. Esta ação é irreversível.',
    },
  ],
  manutencao: [
    {
      modulo: 'manutencao',
      nomeExibicao: 'Cancelar Manutenções',
      descricaoAcao: 'Todas as manutenções não canceladas desta empresa serão canceladas. Esta ação é irreversível.',
    },
  ],
  rh: [
    {
      modulo: 'rh',
      nomeExibicao: 'Excluir Cargos',
      descricaoAcao: 'Todos os cargos ativos desta empresa serão marcados como excluídos. Esta ação é irreversível.',
    },
    {
      modulo: 'rh-colaboradores',
      nomeExibicao: 'Excluir Colaboradores',
      descricaoAcao: 'Todos os colaboradores ativos desta empresa serão marcados como excluídos. Esta ação é irreversível.',
    },
  ],
  vendas: [
    {
      modulo: 'vendas',
      nomeExibicao: 'Cancelar Vendas',
      descricaoAcao: 'Todas as vendas não canceladas desta empresa serão canceladas. Esta ação é irreversível.',
    },
    {
      modulo: 'clientes',
      nomeExibicao: 'Excluir Clientes',
      descricaoAcao: 'Todos os clientes ativos desta empresa serão marcados como excluídos. Esta ação é irreversível.',
    },
  ],
  documentos: [
    {
      modulo: 'documentos',
      nomeExibicao: 'Excluir Documentos',
      descricaoAcao: 'Todos os documentos ativos desta empresa serão marcados como excluídos. Esta ação é irreversível.',
    },
  ],
};

export function NavMainModulos({ modulosEmpresa, empresaSelecionada, pathName }: NavMainModulosProps) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<OpcaoExclusao | null>(null);
  const { mutate: excluirDados, isPending } = useExclusaoLoteDados();

  const handleExclusao = () => {
    if (!opcaoSelecionada || !empresaSelecionada) return;

    excluirDados(
      {
        empresaId: empresaSelecionada,
        modulo: opcaoSelecionada.modulo,
      },
      {
        onSuccess: () => {
          setAlertOpen(false);
          setOpcaoSelecionada(null);
        },
      }
    );
  };

  const abrirDialogExclusao = (opcao: OpcaoExclusao) => {
    setOpcaoSelecionada(opcao);
    setAlertOpen(true);
  };

  return (
    <>
      {modulosEmpresa && modulosEmpresa.length > 0 && (
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
                  const opcoesExclusao = modulosComExclusao[codigoModulo]
                  const temOpcoesExclusao = opcoesExclusao && opcoesExclusao.length > 0

                  return (
                    <SidebarMenuItem key={modulo.id}>
                      <SidebarMenuButton isActive={pathName.includes(`/dashboard/${empresaSelecionada}/${codigoModulo}`)} asChild>
                        <Link href={`/dashboard/${empresaSelecionada}/${codigoModulo}?empresa=${empresaSelecionada}`} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{modulo.nome}</span>
                        </Link>
                      </SidebarMenuButton>

                      {temOpcoesExclusao && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuAction showOnHover>
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Mais opções</span>
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start">
                            {opcoesExclusao.map((opcao, index) => (
                              <div key={opcao.modulo}>
                                {index > 0 && <DropdownMenuSeparator />}
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => abrirDialogExclusao(opcao)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>{opcao.nomeExibicao}</span>
                                </DropdownMenuItem>
                              </div>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </SidebarMenuItem>
                  )
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* AlertDialog para confirmação de exclusão */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão de Dados</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <div className="font-semibold text-foreground">
                  {opcaoSelecionada?.nomeExibicao}
                </div>
                <div>{opcaoSelecionada?.descricaoAcao}</div>
                <Alert variant="destructive" className="font-medium">
                  <MessageCircleWarning className="h-4 w-4 mr-2" />
                  <AlertTitle>Atenção</AlertTitle>
                  <AlertDescription>
                    Esta ação não pode ser desfeita. Por favor, confirme que deseja prosseguir.
                  </AlertDescription>
                </Alert>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleExclusao}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isPending ? 'Excluindo...' : 'Confirmar Exclusão'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}