// Custom hooks para dados de compras
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { comprasApi } from '../_api/comprasApi'

// Query Keys Factory
const comprasKeys = {
  all: ['compras'] as const,
  lists: () => [...comprasKeys.all, 'list'] as const,
  list: (empresaId: string) => [...comprasKeys.lists(), empresaId] as const,
  resumo: (empresaId: string) => [...comprasKeys.all, 'resumo', empresaId] as const,
  pedidos: (empresaId: string, dataInicial?: string, dataFinal?: string) =>
    [...comprasKeys.list(empresaId), 'pedidos', { dataInicial, dataFinal }] as const,
}

// Hook para resumo de compras
export function useResumoCompras(empresaId: string | undefined) {
  return useQuery({
    queryKey: comprasKeys.resumo(empresaId ?? ''),
    queryFn: () => comprasApi.getResumoCompras(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para lista de pedidos com filtro de data
export function usePedidos(
  empresaId: string | undefined,
  dataInicial?: string,
  dataFinal?: string
) {
  return useQuery({
    queryKey: comprasKeys.pedidos(empresaId ?? '', dataInicial, dataFinal),
    queryFn: () => comprasApi.getPedidos(empresaId!, dataInicial, dataFinal),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para invalidar queries de compras
export function useInvalidateCompras() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: comprasKeys.all }),
    invalidateResumo: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: comprasKeys.resumo(empresaId) }),
    invalidatePedidos: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: comprasKeys.list(empresaId) }),
  }
}
