import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getResumoRecebimentos, getRecebimentos, getDadosGrafico } from '../_api/recebimentosApi'

// Query Keys Factory
export const recebimentosKeys = {
  all: ['recebimentos'] as const,
  resumo: (empresaId: string) => [...recebimentosKeys.all, 'resumo', empresaId] as const,
  lista: (empresaId: string, dataInicio?: string, dataFim?: string) =>
    [...recebimentosKeys.all, 'lista', empresaId, dataInicio, dataFim] as const,
  grafico: (empresaId: string, dataInicio?: string, dataFim?: string) =>
    [...recebimentosKeys.all, 'grafico', empresaId, dataInicio, dataFim] as const,
}

export function useResumoRecebimentos(empresaId: string) {
  return useQuery({
    queryKey: recebimentosKeys.resumo(empresaId),
    queryFn: () => getResumoRecebimentos(empresaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useRecebimentos(empresaId: string, dataInicio?: string, dataFim?: string) {
  return useQuery({
    queryKey: recebimentosKeys.lista(empresaId, dataInicio, dataFim),
    queryFn: () => getRecebimentos(empresaId, dataInicio, dataFim),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useDadosGrafico(empresaId: string, dataInicio?: string, dataFim?: string) {
  return useQuery({
    queryKey: recebimentosKeys.grafico(empresaId, dataInicio, dataFim),
    queryFn: () => getDadosGrafico(empresaId, dataInicio, dataFim),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useInvalidateRecebimentos() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: recebimentosKeys.all })
  }
}
