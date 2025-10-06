import { axiosInstance } from '@/lib/axios'
import type {
  Equipamento,
  IndicadoresManutencao,
  Inspecao,
  Manutencao,
  DadosGraficoDuracao
} from '../_types/manutencaoTypes'

export async function getEquipamentos(empresaId: string): Promise<{ equipamentos: Equipamento[] }> {
  const { data } = await axiosInstance.get<{ equipamentos: Equipamento[] }>(
    `/admin/manutencao/empresas/${empresaId}/equipamentos`
  )
  return data
}

export async function getIndicadores(
  empresaId: string,
  equipamentoId?: number
): Promise<IndicadoresManutencao> {
  const params = new URLSearchParams()
  if (equipamentoId) params.append('equipamento_id', equipamentoId.toString())

  const endpoint = equipamentoId
    ? `/admin/manutencao/empresas/${empresaId}/indicadores/equipamento`
    : `/admin/manutencao/empresas/${empresaId}/indicadores/equipamentos`

  const { data } = await axiosInstance.get<IndicadoresManutencao>(
    `${endpoint}?${params.toString()}`
  )
  return data
}

export async function getInspecoes(
  empresaId: string,
  equipamentoId?: number
): Promise<{ inspecoes: Inspecao[] }> {
  const params = new URLSearchParams()
  if (equipamentoId) params.append('equipamento_id', equipamentoId.toString())

  const { data } = await axiosInstance.get<{ inspecoes: Inspecao[] }>(
    `/admin/manutencao/empresas/${empresaId}/equipamento/${equipamentoId}?${params.toString()}`
  )
  return data
}

export async function getManutencoes(
  empresaId: string,
  equipamentoId?: number
): Promise<{ manutencoes: Manutencao[] }> {
  const params = new URLSearchParams()
  if (equipamentoId) params.append('equipamento_id', equipamentoId.toString())

  const { data } = await axiosInstance.get<{ manutencoes: Manutencao[] }>(
    `/admin/manutencao/empresas/${empresaId}/equipamento/${equipamentoId}?${params.toString()}`
  )
  return data
}

export async function getDadosGraficoDuracao(
  empresaId: string,
  equipamentoId?: number
): Promise<{ dados: DadosGraficoDuracao[] }> {
  const endpoint = equipamentoId
    ? `/admin/manutencao/empresas/${empresaId}/equipamento/${equipamentoId}/duracao`
    : `/admin/manutencao/empresas/${empresaId}/estatisticas`

  const { data } = await axiosInstance.get<{ dados: DadosGraficoDuracao[] }>(endpoint)
  return data
}
