import { useQuery, useQueryClient } from '@tanstack/react-query'
import { calibracaoApi } from '../_api/calibracaoApi'

// Query Keys
const calibracaoKeys = {
  all: (empresaId: string) => ['calibracoes', empresaId] as const,
  estatisticas: (empresaId: string) => [...calibracaoKeys.all(empresaId), 'estatisticas'] as const,
  agenda: (empresaId: string) => [...calibracaoKeys.all(empresaId), 'agenda'] as const,
  historico: (empresaId: string) => [...calibracaoKeys.all(empresaId), 'historico'] as const,
}

export function useEstatisticasCalibracao(empresaId: string | undefined) {
  return useQuery({
    queryKey: calibracaoKeys.estatisticas(empresaId || ''),
    queryFn: () => calibracaoApi.getEstatisticas(empresaId!),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useAgendaCalibracao(empresaId: string | undefined) {
  return useQuery({
    queryKey: calibracaoKeys.agenda(empresaId || ''),
    queryFn: () => calibracaoApi.getAgenda(empresaId!),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5,
  })
}

export function useHistoricoCalibracao(empresaId: string | undefined) {
  return useQuery({
    queryKey: calibracaoKeys.historico(empresaId || ''),
    queryFn: () => calibracaoApi.getHistorico(empresaId!),
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 5,
  })
}

// Hook para invalidar todas as queries de calibração
export function useInvalidateCalibracao() {
  const queryClient = useQueryClient()

  return (empresaId: string) => {
    queryClient.invalidateQueries({
      queryKey: calibracaoKeys.all(empresaId)
    })
  }
}
