import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getResumoRH,
  getColaboradores,
  getDadosRotatividade,
  getTreinamentos,
  getColaboradoresPorCargo
} from '../_api/rhApi'

// Query Keys Factory
export const rhKeys = {
  all: ['rh'] as const,
  resumo: (empresaId: string) => [...rhKeys.all, 'resumo', empresaId] as const,
  colaboradores: (empresaId: string, status?: string) =>
    [...rhKeys.all, 'colaboradores', empresaId, status] as const,
  rotatividade: (empresaId: string, periodo?: string) =>
    [...rhKeys.all, 'rotatividade', empresaId, periodo] as const,
  treinamentos: (empresaId: string, status?: string) =>
    [...rhKeys.all, 'treinamentos', empresaId, status] as const,
  cargos: (empresaId: string) => [...rhKeys.all, 'cargos', empresaId] as const,
}

export function useResumoRH(empresaId: string) {
  return useQuery({
    queryKey: rhKeys.resumo(empresaId),
    queryFn: () => getResumoRH(empresaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useColaboradores(empresaId: string, status?: 'ativo' | 'demitido') {
  return useQuery({
    queryKey: rhKeys.colaboradores(empresaId, status),
    queryFn: () => getColaboradores(empresaId, status),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useDadosRotatividade(empresaId: string, periodo?: string) {
  return useQuery({
    queryKey: rhKeys.rotatividade(empresaId, periodo),
    queryFn: () => getDadosRotatividade(empresaId, periodo),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useTreinamentos(empresaId: string, status?: 'concluido' | 'em_andamento' | 'nao_iniciado') {
  return useQuery({
    queryKey: rhKeys.treinamentos(empresaId, status),
    queryFn: () => getTreinamentos(empresaId, status),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useColaboradoresPorCargo(empresaId: string) {
  return useQuery({
    queryKey: rhKeys.cargos(empresaId),
    queryFn: () => getColaboradoresPorCargo(empresaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useInvalidateRH() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: rhKeys.all })
  }
}
