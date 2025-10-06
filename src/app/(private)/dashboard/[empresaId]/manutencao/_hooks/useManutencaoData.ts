import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getEquipamentos,
  getIndicadores,
  getInspecoes,
  getManutencoes,
  getDadosGraficoDuracao
} from '../_api/manutencaoApi'

// Query Keys Factory
export const manutencaoKeys = {
  all: ['manutencao'] as const,
  equipamentos: (empresaId: string) => [...manutencaoKeys.all, 'equipamentos', empresaId] as const,
  indicadores: (empresaId: string, equipamentoId?: number) =>
    [...manutencaoKeys.all, 'indicadores', empresaId, equipamentoId] as const,
  inspecoes: (empresaId: string, equipamentoId?: number) =>
    [...manutencaoKeys.all, 'inspecoes', empresaId, equipamentoId] as const,
  manutencoes: (empresaId: string, equipamentoId?: number) =>
    [...manutencaoKeys.all, 'manutencoes', empresaId, equipamentoId] as const,
  graficoDuracao: (empresaId: string) =>
    [...manutencaoKeys.all, 'graficoDuracao', empresaId] as const,
}

export function useEquipamentos(empresaId: string) {
  return useQuery({
    queryKey: manutencaoKeys.equipamentos(empresaId),
    queryFn: () => getEquipamentos(empresaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useIndicadores(empresaId: string, equipamentoId?: number) {
  return useQuery({
    queryKey: manutencaoKeys.indicadores(empresaId, equipamentoId),
    queryFn: () => getIndicadores(empresaId, equipamentoId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useInspecoes(empresaId: string, equipamentoId?: number) {
  return useQuery({
    queryKey: manutencaoKeys.inspecoes(empresaId, equipamentoId),
    queryFn: () => getInspecoes(empresaId, equipamentoId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useManutencoes(empresaId: string, equipamentoId?: number) {
  return useQuery({
    queryKey: manutencaoKeys.manutencoes(empresaId, equipamentoId),
    queryFn: () => getManutencoes(empresaId, equipamentoId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useDadosGraficoDuracao(empresaId: string) {
  return useQuery({
    queryKey: manutencaoKeys.graficoDuracao(empresaId),
    queryFn: () => getDadosGraficoDuracao(empresaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useInvalidateManutencao() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: manutencaoKeys.all })
  }
}
