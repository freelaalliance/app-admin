// Custom hooks para dados de documentos
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { documentosApi } from '../_api/documentosApi'
import type { ResponseType } from '../_types/documentosTypes'

// Query Keys Factory
const documentosKeys = {
  all: ['documentos'] as const,
  list: (empresaId: string) => ['documentos', 'list', empresaId] as const,
  categorias: (empresaId: string) => ['documentos', 'categorias', empresaId] as const,
  usuarios: (empresaId: string) => ['documentos', 'usuarios', empresaId] as const,
  pastas: (empresaId: string) => ['pastasDocumentos', empresaId] as const,
}

// Hook para lista de documentos
export function useDocumentos(empresaId: string) {
  return useQuery({
    queryKey: documentosKeys.list(empresaId),
    queryFn: () => documentosApi.getDocumentos(empresaId),
    enabled: !!empresaId,
    staleTime: 0
  })
}

// Hook para categorias
export function useCategorias(empresaId: string) {
  return useQuery({
    queryKey: documentosKeys.categorias(empresaId),
    queryFn: () => documentosApi.getCategorias(empresaId),
    enabled: !!empresaId,
    staleTime: 0
  })
}

// Hook para usuários
export function useUsuarios(empresaId: string) {
  return useQuery({
    queryKey: documentosKeys.usuarios(empresaId),
    queryFn: () => documentosApi.getUsuarios(empresaId),
    enabled: !!empresaId,
    staleTime: 0
  })
}

// Hook para invalidar queries de documentos
export function useInvalidateDocumentos() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: documentosKeys.all }),
    invalidateLista: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: documentosKeys.list(empresaId) }),
    invalidateCategorias: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: documentosKeys.categorias(empresaId) }),
  }
}

// Hook para remover categoria
export function useRemoveCategoria(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentosApi.removerCategoria,
    onError: (error: Error) => {
      toast.error('Erro ao remover categoria, tente novamente!', {
        description: error.message,
      })
    },
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.msg ?? 'Erro ao remover categoria')
        return
      }
      queryClient.invalidateQueries({
        queryKey: documentosKeys.categorias(empresaId),
      })
      toast.success(data.msg)
    },
  })
}

// Hook para criar/atualizar categoria
export function useSetCategoria(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentosApi.setCategoria,
    onError: (error: Error) => {
      toast.error('Erro ao salvar categoria, tente novamente!', {
        description: error.message,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentosKeys.categorias(empresaId),
      })
      toast.success('Categoria salva com sucesso!')
    },
  })
}

// Hook para criar documento
export function useSetDocumento(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentosApi.setDocumento,
    onError: (error: Error) => {
      toast.error('Erro ao criar documento, tente novamente!', {
        description: error.message,
      })
    },
    onSuccess: (data: ResponseType | null) => {
      if (!data || !data.status) {
        toast.error(data?.msg ?? 'Erro ao criar documento')
        return
      }
      queryClient.invalidateQueries({
        queryKey: documentosKeys.list(empresaId),
      })
      toast.success(data.msg)
    },
  })
}

// Hook para remover documento
export function useRemoveDocumento(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentosApi.removerDocumento,
    onError: (error: Error) => {
      toast.error('Erro ao remover documento, tente novamente!', {
        description: error.message,
      })
    },
    onSuccess: (data: ResponseType | null) => {
      if (!data || !data.status) {
        toast.error(data?.msg ?? 'Erro ao remover documento')
        return
      }
      queryClient.invalidateQueries({
        queryKey: documentosKeys.list(empresaId),
      })
      toast.success(data.msg)
    },
  })
}

// Hook para criar revisão de documento
export function useSetRevisaoDocumento(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentosApi.setRevisaoDocumento,
    onError: (error: Error) => {
      toast.error('Erro ao criar revisão do documento, tente novamente!', {
        description: error.message,
      })
    },
    onSuccess: (data: ResponseType | null) => {
      if (!data || !data.status) {
        toast.error(data?.msg ?? 'Erro ao criar revisão')
        return
      }
      queryClient.invalidateQueries({
        queryKey: documentosKeys.list(empresaId),
      })
      toast.success(data.msg)
    },
  })
}

// ========================
// Hooks de Pastas de Documentos
// ========================

// Hook para listar pastas por empresa
export function usePastasDocumentos(empresaId: string) {
  return useQuery({
    queryKey: documentosKeys.pastas(empresaId),
    queryFn: () => documentosApi.listarPastasPorEmpresa(empresaId),
    enabled: !!empresaId,
  })
}

// Hook para criar pasta
export function useCriarPastaDocumento(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (nome: string) => documentosApi.criarPastaDocumento(nome),
    onError: (error: Error) => {
      toast.error('Erro ao criar pasta', {
        description: error.message,
      })
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.msg)
        queryClient.invalidateQueries({ queryKey: documentosKeys.pastas(empresaId) })
      } else {
        toast.warning(data?.msg ?? 'Erro ao criar pasta')
      }
    },
  })
}

// Hook para atualizar pasta
export function useAtualizarPastaDocumento(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, nome }: { id: string; nome: string }) => documentosApi.atualizarPastaDocumento(id, nome),
    onError: (error: Error) => {
      toast.error('Erro ao atualizar pasta', {
        description: error.message,
      })
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.msg)
        queryClient.invalidateQueries({ queryKey: documentosKeys.pastas(empresaId) })
      } else {
        toast.warning(data?.msg ?? 'Erro ao atualizar pasta')
      }
    },
  })
}

// Hook para excluir pasta
export function useExcluirPastaDocumento(empresaId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => documentosApi.excluirPastaDocumento(id),
    onError: (error: Error) => {
      toast.error('Erro ao excluir pasta', {
        description: error.message,
      })
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.msg)
        queryClient.invalidateQueries({ queryKey: documentosKeys.pastas(empresaId) })
      } else {
        toast.warning(data?.msg ?? 'Erro ao excluir pasta')
      }
    },
  })
}