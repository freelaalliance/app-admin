"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getEmpresas,
  getEmpresa,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  toggleEmpresaStatus
} from '../_api/empresasApi'
import {
  getModulos,
  getModulo,
  createModulo,
  updateModulo,
  getFuncoesModulo,
  createFuncaoModulo,
  getFuncao,
  updateFuncao,
  getModulosEmpresa,
  ativarModulo,
  desativarModulo
} from '../_api/modulosApi'
import type { CreateModuloData, UpdateModuloData, CreateFuncaoData, UpdateFuncaoData } from '../_types/moduloTypes'
import {
  getPerfisEmpresa,
  getPerfil,
  createPerfil,
  updatePerfil,
  deletePerfil,
  getPermissoesPerfil,
  vincularFuncaoPerfil,
  removerFuncaoPerfil
} from '../_api/perfisApi'
import type { CreatePerfilData, UpdatePerfilData, PerfilPermissao } from '../_types/perfilTypes'
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  toggleUsuarioStatus,
  updateUsuarioSenha
} from '../_api/usuariosApi'
import type {
  FormularioNovoUsuarioType,
  FormularioEdicaoUsuarioType,
  UpdateUsuarioStatusData
} from '../_types/usuarioTypes'
import {
  getDashboardStats,
} from '../_api/dashboardApi'

// Query Keys Factory
export const adminKeys = {
  all: ['admin'] as const,
  empresas: () => [...adminKeys.all, 'empresas'] as const,
  empresa: (id: string) => [...adminKeys.all, 'empresa', id] as const,
  modulos: () => [...adminKeys.all, 'modulos'] as const,
  modulo: (id: string) => [...adminKeys.all, 'modulo', id] as const,
  funcoesModulo: (moduloId: string) => [...adminKeys.all, 'funcoesModulo', moduloId] as const,
  funcao: (id: string) => [...adminKeys.all, 'funcao', id] as const,
  modulosEmpresa: (empresaId: string) => [...adminKeys.all, 'modulosEmpresa', empresaId] as const,
  perfisEmpresa: (empresaId: string) => [...adminKeys.all, 'perfisEmpresa', empresaId] as const,
  perfil: (id: string) => [...adminKeys.all, 'perfil', id] as const,
  permissoesPerfil: (perfilId: string) => [...adminKeys.all, 'permissoesPerfil', perfilId] as const,
  usuarios: (empresaId: string) => [...adminKeys.all, 'usuarios', empresaId] as const,
  usuario: (id: string) => [...adminKeys.all, 'usuario', id] as const,
  // Dashboard
  dashboardStats: () => [...adminKeys.all, 'dashboardStats'] as const
}

// Empresas
export function useEmpresas() {
  return useQuery({
    queryKey: adminKeys.empresas(),
    queryFn: () => getEmpresas(),
  })
}

export function useEmpresa(id: string) {
  return useQuery({
    queryKey: adminKeys.empresa(id),
    queryFn: () => getEmpresa(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}

export function useCreateEmpresa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.empresas() })
    },
  })
}

export function useUpdateEmpresa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateEmpresa(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.empresas() })
      queryClient.invalidateQueries({ queryKey: adminKeys.empresa(variables.id) })
    },
  })
}

export function useDeleteEmpresa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.empresas() })
    },
  })
}

export function useToggleEmpresaStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: toggleEmpresaStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.empresas() })
    },
  })
}

// Módulos
export function useModulos() {
  return useQuery({
    queryKey: adminKeys.modulos(),
    queryFn: () => getModulos(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useModulo(id: string) {
  return useQuery({
    queryKey: adminKeys.modulo(id),
    queryFn: () => getModulo(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}

export function useCreateModulo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateModuloData) => createModulo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.modulos() })
    },
  })
}

export function useUpdateModulo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateModuloData }) => updateModulo(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.modulos() })
      queryClient.invalidateQueries({ queryKey: adminKeys.modulo(variables.id) })
    },
  })
}

// Funções de Módulo
export function useFuncoesModulo(moduloId: string) {
  return useQuery({
    queryKey: adminKeys.funcoesModulo(moduloId),
    queryFn: () => getFuncoesModulo(moduloId),
    staleTime: 5 * 60 * 1000,
    enabled: !!moduloId,
  })
}

export function useCreateFuncaoModulo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ moduloId, funcao }: { moduloId: string; funcao: CreateFuncaoData }) =>
      createFuncaoModulo(moduloId, funcao),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.funcoesModulo(variables.moduloId) })
    },
  })
}

// Funções
export function useFuncao(id: string) {
  return useQuery({
    queryKey: adminKeys.funcao(id),
    queryFn: () => getFuncao(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}

export function useUpdateFuncao() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFuncaoData }) => updateFuncao(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.funcao(variables.id) })
      // Invalidar também a lista de funções do módulo pai
      queryClient.invalidateQueries({ queryKey: [...adminKeys.all, 'funcoesModulo'] })
    },
  })
}

// Módulos de Empresa
export function useModulosEmpresa(empresaId: string) {
  return useQuery({
    queryKey: adminKeys.modulosEmpresa(empresaId),
    queryFn: () => getModulosEmpresa(empresaId),
    staleTime: 5 * 60 * 1000,
    enabled: !!empresaId,
  })
}

export function useAtivarModulo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ empresaId, idModulo }: { empresaId: string; idModulo: string }) =>
      ativarModulo(empresaId, idModulo),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.modulosEmpresa(variables.empresaId) })
    },
  })
}

export function useDesativarModulo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ empresaId, modulos }: { empresaId: string; modulos: Array<{ idModulo: string }> }) =>
      desativarModulo(empresaId, modulos),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.modulosEmpresa(variables.empresaId) })
    },
  })
}

// Perfis
export function usePerfisEmpresa(empresaId: string) {
  return useQuery({
    queryKey: adminKeys.perfisEmpresa(empresaId),
    queryFn: () => getPerfisEmpresa(empresaId),
    staleTime: 5 * 60 * 1000,
    enabled: !!empresaId,
  })
}

export function usePerfil(id: string) {
  return useQuery({
    queryKey: adminKeys.perfil(id),
    queryFn: () => getPerfil(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}

export function useCreatePerfil() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePerfilData) => createPerfil(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function useUpdatePerfil() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePerfilData }) => updatePerfil(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function useDeletePerfil() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePerfil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function usePermissoesPerfil(perfilId: string) {
  return useQuery({
    queryKey: adminKeys.permissoesPerfil(perfilId),
    queryFn: () => getPermissoesPerfil(perfilId),
    staleTime: 5 * 60 * 1000,
    enabled: !!perfilId,
  })
}

export function useVincularFuncaoPerfil() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ perfilId, funcoes }: { perfilId: string; funcoes: PerfilPermissao[] }) =>
      vincularFuncaoPerfil(perfilId, funcoes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.permissoesPerfil(variables.perfilId) })
    },
  })
}

export function useRemoverFuncaoPerfil() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ perfilId, funcoes }: { perfilId: string; funcoes: PerfilPermissao[] }) =>
      removerFuncaoPerfil(perfilId, funcoes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.permissoesPerfil(variables.perfilId) })
    },
  })
}

// Usuários
export function useUsuarios(empresaId: string) {
  return useQuery({
    queryKey: adminKeys.usuarios(empresaId),
    queryFn: () => getUsuarios(empresaId),
    staleTime: 5 * 60 * 1000,
    enabled: !!empresaId,
  })
}

export function useUsuario(id: string) {
  return useQuery({
    queryKey: adminKeys.usuario(id),
    queryFn: () => getUsuario(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}

export function useCreateUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormularioNovoUsuarioType) => createUsuario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormularioEdicaoUsuarioType }) => updateUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function useToggleUsuarioStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UpdateUsuarioStatusData }) =>
      toggleUsuarioStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

export function useUpdateUsuarioSenha() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, senhaData }: { id: string; senhaData: { novaSenha: string; senhaAntiga: string } }) =>
      updateUsuarioSenha(id, senhaData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
    },
  })
}

// Dashboard
export function useDashboardStats() {
  return useQuery({
    queryKey: adminKeys.dashboardStats(),
    queryFn: () => getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchInterval: 5 * 60 * 1000, // Atualiza a cada 5 minutos
  })
}
