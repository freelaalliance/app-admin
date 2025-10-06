// Custom hooks para dados de expedição
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { expedicaoApi } from '../_api/expedicaoApi'

// Query Keys Factory
const expedicaoKeys = {
  all: ['expedicao'] as const,
  lists: () => [...expedicaoKeys.all, 'list'] as const,
  list: (empresaId: string) => [...expedicaoKeys.lists(), empresaId] as const,
  resumo: (empresaId: string) => [...expedicaoKeys.all, 'resumo', empresaId] as const,
  mediaAvaliacao: (empresaId: string) =>
    [...expedicaoKeys.all, 'media-avaliacao', empresaId] as const,
}

// Hook para lista de expedições
export function useExpedicoes(empresaId: string | undefined) {
  return useQuery({
    queryKey: expedicaoKeys.list(empresaId ?? ''),
    queryFn: () => expedicaoApi.getExpedicoes(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para resumo de expedições
export function useResumoExpedicao(empresaId: string | undefined) {
  return useQuery({
    queryKey: expedicaoKeys.resumo(empresaId ?? ''),
    queryFn: () => expedicaoApi.getResumo(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para média de avaliação
export function useMediaAvaliacao(empresaId: string | undefined) {
  return useQuery({
    queryKey: expedicaoKeys.mediaAvaliacao(empresaId ?? ''),
    queryFn: () => expedicaoApi.getMediaAvaliacao(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para invalidar queries de expedição
export function useInvalidateExpedicao() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: expedicaoKeys.all }),
    invalidateLista: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: expedicaoKeys.list(empresaId) }),
    invalidateResumo: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: expedicaoKeys.resumo(empresaId) }),
  }
}
