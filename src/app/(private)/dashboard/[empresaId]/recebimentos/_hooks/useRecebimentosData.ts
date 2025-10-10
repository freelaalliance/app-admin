import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRecebimentos } from '../_api/recebimentosApi'

// Query Keys Factory
export const recebimentosKeys = {
  all: ['recebimentos'] as const,
  lista: (empresaId: string, dataInicial?: string, dataFinal?: string) =>
    [...recebimentosKeys.all, 'lista', empresaId, dataInicial, dataFinal] as const,
}

export function useRecebimentos(empresaId: string, dataInicial?: string, dataFinal?: string) {
  return useQuery({
    queryKey: recebimentosKeys.lista(empresaId, dataInicial, dataFinal),
    queryFn: () => getRecebimentos(empresaId, dataInicial, dataFinal),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useInvalidateRecebimentos() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: recebimentosKeys.all })
  }
}
