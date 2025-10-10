import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getResumoRH,
  getColaboradores,
  getDadosRotatividade,
  getResumoTreinamentos,
  getColaboradoresEmTreinamento,
  getColaboradoresPorCargo
} from '../_api/rhApi'

// Query Keys Factory
export const rhKeys = {
  all: ['rh'] as const,
  resumo: (empresaId: string) => [...rhKeys.all, 'resumo', empresaId] as const,
  colaboradores: (empresaId: string, status?: 'ativo' | 'demitido') =>
    [...rhKeys.all, 'colaboradores', empresaId, status] as const,
  rotatividade: (empresaId: string, periodo?: 'mes' | 'trimestre' | 'semestre' | 'anual') =>
    [...rhKeys.all, 'rotatividade', empresaId, periodo] as const,
  resumoTreinamentos: (empresaId: string) =>
    [...rhKeys.all, 'resumo-treinamentos', empresaId] as const,
  colaboradoresTreinamento: (empresaId: string) =>
    [...rhKeys.all, 'colaboradores-treinamento', empresaId] as const,
  cargos: (empresaId: string) => [...rhKeys.all, 'cargos', empresaId] as const,
}

export function useResumoRH(empresaId: string) {
  return useQuery({
    queryKey: rhKeys.resumo(empresaId),
    queryFn: () => getResumoRH(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useColaboradores(empresaId: string, status?: 'ativo' | 'demitido') {
  return useQuery({
    queryKey: rhKeys.colaboradores(empresaId, status),
    queryFn: () => getColaboradores(empresaId, status),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDadosRotatividade(empresaId: string, periodo?: 'mes' | 'trimestre' | 'semestre' | 'anual') {
  return useQuery({
    queryKey: rhKeys.rotatividade(empresaId, periodo),
    queryFn: () => getDadosRotatividade(empresaId, periodo),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useResumoTreinamentos(empresaId: string) {
  return useQuery({
    queryKey: rhKeys.resumoTreinamentos(empresaId),
    queryFn: () => getResumoTreinamentos(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useColaboradoresEmTreinamento(empresaId: string) {
  return useQuery({
    queryKey: rhKeys.colaboradoresTreinamento(empresaId),
    queryFn: () => getColaboradoresEmTreinamento(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useColaboradoresPorCargo(empresaId: string) {
  return useQuery({
    queryKey: rhKeys.cargos(empresaId),
    queryFn: () => getColaboradoresPorCargo(empresaId),
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useInvalidateRH() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: rhKeys.all })
  }
}
