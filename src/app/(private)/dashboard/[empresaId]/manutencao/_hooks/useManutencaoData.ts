import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getManutencoes,
  getDuracoes,
  getEstatisticasStatus,
  getEstatisticasGerais,
  getIndicadoresEquipamento,
  getIndicadoresEquipamentos
} from '../_api/manutencaoApi'

// Query Keys Factory
export const manutencaoKeys = {
  all: ['manutencao'] as const,
  manutencoes: (empresaId: string, equipamentoId: string) =>
    [...manutencaoKeys.all, 'manutencoes', empresaId, equipamentoId] as const,
  duracoes: (empresaId: string, equipamentoId: string) =>
    [...manutencaoKeys.all, 'duracoes', empresaId, equipamentoId] as const,
  estatisticasStatus: (empresaId: string) =>
    [...manutencaoKeys.all, 'estatisticas-status', empresaId] as const,
  estatisticasGerais: (empresaId: string) =>
    [...manutencaoKeys.all, 'estatisticas-gerais', empresaId] as const,
  indicadoresEquipamento: (empresaId: string, equipamentoId?: string) =>
    [...manutencaoKeys.all, 'indicadores-equipamento', empresaId, equipamentoId] as const,
  indicadoresEquipamentos: (empresaId: string) =>
    [...manutencaoKeys.all, 'indicadores-equipamentos', empresaId] as const,
}

export function useManutencoes(empresaId: string, equipamentoId: string) {
  return useQuery({
    queryKey: manutencaoKeys.manutencoes(empresaId, equipamentoId),
    queryFn: () => getManutencoes(empresaId, equipamentoId),
    enabled: !!empresaId && !!equipamentoId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useDuracoes(empresaId: string, equipamentoId: string) {
  return useQuery({
    queryKey: manutencaoKeys.duracoes(empresaId, equipamentoId),
    queryFn: () => getDuracoes(empresaId, equipamentoId),
    enabled: !!empresaId && !!equipamentoId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useEstatisticasStatus(empresaId: string) {
  return useQuery({
    queryKey: manutencaoKeys.estatisticasStatus(empresaId),
    queryFn: () => getEstatisticasStatus(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useEstatisticasGerais(empresaId: string) {
  return useQuery({
    queryKey: manutencaoKeys.estatisticasGerais(empresaId),
    queryFn: () => getEstatisticasGerais(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useIndicadoresEquipamento(empresaId: string, equipamentoId?: string) {
  return useQuery({
    queryKey: manutencaoKeys.indicadoresEquipamento(empresaId, equipamentoId),
    queryFn: () => getIndicadoresEquipamento(empresaId, equipamentoId),
    enabled: !!empresaId && !!equipamentoId, // Só habilita quando houver equipamentoId
    staleTime: 5 * 60 * 1000,
  })
}

export function useIndicadoresEquipamentos(empresaId: string) {
  return useQuery({
    queryKey: manutencaoKeys.indicadoresEquipamentos(empresaId),
    queryFn: () => getIndicadoresEquipamentos(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useInvalidateManutencao() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: manutencaoKeys.all })
  }
}
