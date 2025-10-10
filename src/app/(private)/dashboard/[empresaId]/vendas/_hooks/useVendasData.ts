// Custom hooks para dados de vendas
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { vendasApi } from '../_api/vendasApi'

// Query Keys Factory
const vendasKeys = {
  all: ['vendas'] as const,
  clienteTop: (empresaId: string) => [...vendasKeys.all, 'cliente-top', empresaId] as const,
  produtoTop: (empresaId: string) => [...vendasKeys.all, 'produto-top', empresaId] as const,
  totalClientes: (empresaId: string) => [...vendasKeys.all, 'total-clientes', empresaId] as const,
  totalProdutos: (empresaId: string) => [...vendasKeys.all, 'total-produtos', empresaId] as const,
}

// Hook para cliente top
export function useClienteTop(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.clienteTop(empresaId ?? ''),
    queryFn: () => vendasApi.getClienteTop(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para produto top
export function useProdutoTop(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.produtoTop(empresaId ?? ''),
    queryFn: () => vendasApi.getProdutoTop(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para total de clientes
export function useTotalClientes(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.totalClientes(empresaId ?? ''),
    queryFn: () => vendasApi.getTotalClientes(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para total de produtos
export function useTotalProdutos(empresaId: string | undefined) {
  return useQuery({
    queryKey: vendasKeys.totalProdutos(empresaId ?? ''),
    queryFn: () => vendasApi.getTotalProdutos(empresaId!),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para invalidar queries de vendas
export function useInvalidateVendas() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => queryClient.invalidateQueries({ queryKey: vendasKeys.all }),
    invalidateClienteTop: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: vendasKeys.clienteTop(empresaId) }),
    invalidateProdutoTop: (empresaId: string) =>
      queryClient.invalidateQueries({ queryKey: vendasKeys.produtoTop(empresaId) }),
  }
}
