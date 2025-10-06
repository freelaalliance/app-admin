// Custom hooks para dados de vendas
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { vendasApi } from '../_api/vendasApi'

// Query Keys Factory
const vendasKeys = {
  all: ['vendas'] as const,
  estatisticas: (empresaId: string) => [...vendasKeys.all, 'estatisticas', empresaId] as const,
  topProdutos: (empresaId: string) => [...vendasKeys.all, 'top-produtos', empresaId] as const,
  topClientes: (empresaId: string) => [...vendasKeys.all, 'top-clientes', empresaId] as const,
  total: (empresaId: string) => [...vendasKeys.all, 'total', empresaId] as const,
}

// Hook para estatísticas de vendas
export function useEstatisticasVendas(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.estatisticas(empresaId ?? ''),
    queryFn: () => vendasApi.getEstatisticas(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para top produtos
export function useTopProdutos(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.topProdutos(empresaId ?? ''),
    queryFn: () => vendasApi.getTopProdutos(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para top clientes
export function useTopClientes(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.topClientes(empresaId ?? ''),
    queryFn: () => vendasApi.getTopClientes(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para total de vendas
export function useTotalVendas(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.total(empresaId ?? ''),
    queryFn: () => vendasApi.getTotalVendas(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para invalidar queries de vendas
export function useInvalidateVendas() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: vendasKeys.all }),
    invalidateEstatisticas: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: vendasKeys.estatisticas(empresaId) }),
  }
}
