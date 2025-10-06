import { axiosInstance } from '@/lib/axios'
import type {
  ResumoRH,
  Colaborador,
  DadosRotatividade,
  Treinamento,
  ColaboradoresPorCargo
} from '../_types/rhTypes'

export async function getResumoRH(empresaId: string): Promise<ResumoRH> {
  const { data } = await axiosInstance.get<ResumoRH>(
    `/admin/rh/empresas/${empresaId}/analytics/colaboradores`
  )
  return data
}

export async function getColaboradores(
  empresaId: string,
  status?: 'ativo' | 'demitido'
): Promise<{ colaboradores: Colaborador[] }> {
  const endpoint = status === 'ativo'
    ? `/admin/rh/empresas/${empresaId}/colaboradores/ativos`
    : status === 'demitido'
      ? `/admin/rh/empresas/${empresaId}/colaboradores/demitidos`
      : `/admin/rh/empresas/${empresaId}/colaboradores/ativos`

  const { data } = await axiosInstance.get<{ colaboradores: Colaborador[] }>(endpoint)
  return data
}

export async function getDadosRotatividade(
  empresaId: string,
  periodo?: string
): Promise<{ dados: DadosRotatividade[] }> {
  const params = new URLSearchParams()
  if (periodo) params.append('periodo', periodo)

  const { data } = await axiosInstance.get<{ dados: DadosRotatividade[] }>(
    `/admin/rh/empresas/${empresaId}/analytics/rotatividade?${params.toString()}`
  )
  return data
}

export async function getTreinamentos(
  empresaId: string,
  status?: 'concluido' | 'em_andamento' | 'nao_iniciado'
): Promise<{ treinamentos: Treinamento[] }> {
  const endpoint = status === 'em_andamento'
    ? `/admin/rh/empresas/${empresaId}/colaboradores/em-treinamento`
    : `/admin/rh/empresas/${empresaId}/analytics/treinamentos`

  const params = new URLSearchParams()
  if (status) params.append('status', status)

  const { data } = await axiosInstance.get<{ treinamentos: Treinamento[] }>(
    `${endpoint}?${params.toString()}`
  )
  return data
}

export async function getColaboradoresPorCargo(
  empresaId: string
): Promise<{ cargos: ColaboradoresPorCargo[] }> {
  const { data } = await axiosInstance.get<{ cargos: ColaboradoresPorCargo[] }>(
    `/admin/rh/empresas/${empresaId}/analytics/colaboradores-por-cargo`
  )
  return data
}
