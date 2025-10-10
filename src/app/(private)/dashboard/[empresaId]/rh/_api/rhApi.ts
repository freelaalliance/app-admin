import { axiosInstance } from '@/lib/axios'
import type {
  ResumoRH,
  Colaborador,
  DadosRotatividade,
  ResumoTreinamentos,
  ColaboradorTreinamento,
  ColaboradoresPorCargo
} from '../_types/rhTypes'

// GET /admin/rh/empresas/:empresaId/analytics/colaboradores
export async function getResumoRH(empresaId: string): Promise<ResumoRH> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: ResumoRH
    erro?: string | null
  }>(`/admin/rh/empresas/${empresaId}/analytics/colaboradores`)
  return data.dados
}

// GET /admin/rh/empresas/:empresaId/colaboradores/ativos ou /demitidos
export async function getColaboradores(
  empresaId: string,
  status?: 'ativo' | 'demitido'
): Promise<Colaborador[]> {
  const endpoint = status === 'demitido'
    ? `/admin/rh/empresas/${empresaId}/colaboradores/demitidos`
    : `/admin/rh/empresas/${empresaId}/colaboradores/ativos`

  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: Colaborador[]
    erro?: string | null
  }>(endpoint)
  return data.dados
}

// GET /admin/rh/empresas/:empresaId/analytics/rotatividade
export async function getDadosRotatividade(
  empresaId: string,
  periodo?: 'mes' | 'trimestre' | 'semestre' | 'anual'
): Promise<DadosRotatividade> {
  const params = new URLSearchParams()
  if (periodo) params.append('periodo', periodo)

  const queryString = params.toString()
  const url = queryString
    ? `/admin/rh/empresas/${empresaId}/analytics/rotatividade?${queryString}`
    : `/admin/rh/empresas/${empresaId}/analytics/rotatividade`

  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: DadosRotatividade
    erro?: string | null
  }>(url)
  return data.dados
}

// GET /admin/rh/empresas/:empresaId/analytics/treinamentos
export async function getResumoTreinamentos(
  empresaId: string
): Promise<ResumoTreinamentos> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: ResumoTreinamentos
    erro?: string | null
  }>(`/admin/rh/empresas/${empresaId}/analytics/treinamentos`)
  return data.dados
}

// GET /admin/rh/empresas/:empresaId/colaboradores/em-treinamento
export async function getColaboradoresEmTreinamento(
  empresaId: string
): Promise<ColaboradorTreinamento[]> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: ColaboradorTreinamento[]
    erro?: string | null
  }>(`/admin/rh/empresas/${empresaId}/colaboradores/em-treinamento`)
  return data.dados
}

// GET /admin/rh/empresas/:empresaId/analytics/colaboradores-por-cargo
export async function getColaboradoresPorCargo(
  empresaId: string
): Promise<ColaboradoresPorCargo[]> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: ColaboradoresPorCargo[]
    erro?: string | null
  }>(`/admin/rh/empresas/${empresaId}/analytics/colaboradores-por-cargo`)
  return data.dados
}
