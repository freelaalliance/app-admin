// Custom hooks para dados de documentos
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { documentosApi } from '../_api/documentosApi'

// Query Keys Factory
const documentosKeys = {
  all: ['documentos'] as const,
  lists: () => [...documentosKeys.all, 'list'] as const,
  list: (empresaId: string, categoriaId?: string) =>
    [...documentosKeys.lists(), empresaId, categoriaId] as const,
  categorias: (empresaId: string) => [...documentosKeys.all, 'categorias', empresaId] as const,
}

const usuarioKeys = {
  all: ['usuario'] as const,
  details: (empresaId: string) => [...usuarioKeys.all, 'details', empresaId] as const,
}

// Hook para dados do usuário
export function useUsuario(empresaId: string | undefined) {
  return useQuery({
    queryKey: usuarioKeys.details(empresaId ?? ''),
    queryFn: () => documentosApi.getUsuario(empresaId!),
    enabled: !!empresaId,
    staleTime: 10 * 60 * 1000, // 10 minutos - dados do usuário mudam raramente
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

// Hook para lista de documentos
export function useDocumentos(empresaId: string | undefined, categoriaId?: string) {
  return useQuery({
    queryKey: documentosKeys.list(empresaId ?? '', categoriaId),
    queryFn: () => documentosApi.getDocumentos(empresaId!, categoriaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para invalidar queries de documentos
export function useInvalidateDocumentos() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: documentosKeys.all }),
    invalidateLista: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: documentosKeys.lists() }),
    invalidateCategorias: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: documentosKeys.categorias(empresaId) }),
  }
}
