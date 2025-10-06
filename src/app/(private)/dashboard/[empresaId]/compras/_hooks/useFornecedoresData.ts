// Custom hooks para dados de fornecedores
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { comprasApi } from '../_api/comprasApi'

// Query Keys Factory
const fornecedoresKeys = {
  all: ['fornecedores'] as const,
  lists: () => [...fornecedoresKeys.all, 'list'] as const,
  list: (empresaId: string) => [...fornecedoresKeys.lists(), empresaId] as const,
  resumo: (empresaId: string) => [...fornecedoresKeys.all, 'resumo', empresaId] as const,
}

// Hook para resumo de fornecedores
export function useResumoFornecedores(empresaId: string | undefined) {
  return useQuery({
    queryKey: fornecedoresKeys.resumo(empresaId ?? ''),
    queryFn: () => comprasApi.getResumoFornecedores(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para lista de fornecedores
export function useFornecedores(empresaId: string | undefined) {
  return useQuery({
    queryKey: fornecedoresKeys.list(empresaId ?? ''),
    queryFn: () => comprasApi.getFornecedores(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para invalidar queries de fornecedores
export function useInvalidateFornecedores() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: fornecedoresKeys.all }),
    invalidateResumo: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: fornecedoresKeys.resumo(empresaId) }),
    invalidateLista: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: fornecedoresKeys.list(empresaId) }),
  }
}
