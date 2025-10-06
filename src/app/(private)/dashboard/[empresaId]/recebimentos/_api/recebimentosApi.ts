import { axiosInstance } from '@/lib/axios'
import type { ResumoRecebimentos, Recebimento, DadosGrafico } from '../_types/recebimentosTypes'

export async function getResumoRecebimentos(empresaId: string): Promise<ResumoRecebimentos> {
  const { data } = await axiosInstance.get<ResumoRecebimentos>(
    `/admin/recebimentos/empresas/${empresaId}`
  )
  return data
}

export async function getRecebimentos(
  empresaId: string,
  dataInicio?: string,
  dataFim?: string
): Promise<{ recebimentos: Recebimento[] }> {
  const params = new URLSearchParams()
  if (dataInicio) params.append('data_inicio', dataInicio)
  if (dataFim) params.append('data_fim', dataFim)

  const { data } = await axiosInstance.get<{ recebimentos: Recebimento[] }>(
    `/admin/recebimentos/empresas/${empresaId}?${params.toString()}`
  )
  return data
}

export async function getDadosGrafico(
  empresaId: string,
  dataInicio?: string,
  dataFim?: string
): Promise<{ dados: DadosGrafico[] }> {
  const params = new URLSearchParams()
  if (dataInicio) params.append('data_inicio', dataInicio)
  if (dataFim) params.append('data_fim', dataFim)

  const { data } = await axiosInstance.get<{ dados: DadosGrafico[] }>(
    `/admin/recebimentos/empresas/${empresaId}?${params.toString()}`
  )
  return data
}
