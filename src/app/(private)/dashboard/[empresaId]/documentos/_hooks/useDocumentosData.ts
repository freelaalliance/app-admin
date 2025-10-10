// Custom hooks para dados de documentos
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { documentosApi } from '../_api/documentosApi'

// Query Keys Factory
const documentosKeys = {
  all: ['documentos'] as const,
  lists: () => [...documentosKeys.all, 'list'] as const,
  list: (empresaId: string) => [...documentosKeys.lists(), empresaId] as const,
  categorias: (empresaId: string) => [...documentosKeys.all, 'categorias', empresaId] as const,
  usuarios: (empresaId: string) => [...documentosKeys.all, 'usuarios', empresaId] as const,
}

// Hook para lista de documentos
export function useDocumentos(empresaId: string | undefined) {
  return useQuery({
    queryKey: documentosKeys.list(empresaId ?? ''),
    queryFn: () => documentosApi.getDocumentos(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para categorias
export function useCategorias(empresaId: string | undefined) {
  return useQuery({
    queryKey: documentosKeys.categorias(empresaId ?? ''),
    queryFn: () => documentosApi.getCategorias(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para usuários
export function useUsuarios(empresaId: string | undefined) {
  return useQuery({
    queryKey: documentosKeys.usuarios(empresaId ?? ''),
    queryFn: () => documentosApi.getUsuarios(empresaId!),
    enabled: !!empresaId,
    staleTime: 10 * 60 * 1000, // 10 minutos - dados do usuário mudam raramente
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
