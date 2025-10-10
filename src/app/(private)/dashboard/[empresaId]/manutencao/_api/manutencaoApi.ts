import { axiosInstance } from '@/lib/axios'
import type {
  Manutencao,
  DuracaoManutencao,
  EstatisticasStatus,
  EstatisticasGerais,
  IndicadoresManutencao,
  IndicadoresEquipamentos
} from '../_types/manutencaoTypes'

// GET /admin/manutencao/empresas/:empresaId/equipamento/:idEquipamento - Manutenções de um equipamento
export async function getManutencoes(
  empresaId: string,
  equipamentoId: string
): Promise<Manutencao[]> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: Manutencao[]
    erro?: string | null
  }>(`/admin/manutencao/empresas/${empresaId}/equipamento/${equipamentoId}`)
  return data.dados
}

// GET /admin/manutencao/empresas/:empresaId/equipamento/:idEquipamento/duracao - Durações
export async function getDuracoes(
  empresaId: string,
  equipamentoId: string
): Promise<DuracaoManutencao[]> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: DuracaoManutencao[]
    erro?: string | null
  }>(`/admin/manutencao/empresas/${empresaId}/equipamento/${equipamentoId}/duracao`)
  return data.dados
}

// GET /admin/manutencao/empresas/:empresaId/estatisticas/status - Status dos equipamentos
export async function getEstatisticasStatus(
  empresaId: string
): Promise<EstatisticasStatus> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: EstatisticasStatus
    erro?: string | null
  }>(`/admin/manutencao/empresas/${empresaId}/estatisticas/status`)
  return data.dados
}

// GET /admin/manutencao/empresas/:empresaId/estatisticas - Estatísticas gerais
export async function getEstatisticasGerais(
  empresaId: string
): Promise<EstatisticasGerais> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: EstatisticasGerais
    erro?: string | null
  }>(`/admin/manutencao/empresas/${empresaId}/estatisticas`)
  return data.dados
}

// GET /admin/manutencao/empresas/:empresaId/indicadores/equipamento - Indicadores de equipamento
export async function getIndicadoresEquipamento(
  empresaId: string,
  equipamentoId?: string
): Promise<IndicadoresManutencao> {
  const params = new URLSearchParams()
  if (equipamentoId) params.append('equipamentoId', equipamentoId)

  const queryString = params.toString()
  const url = queryString
    ? `/admin/manutencao/empresas/${empresaId}/indicadores/equipamento?${queryString}`
    : `/admin/manutencao/empresas/${empresaId}/indicadores/equipamento`

  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: IndicadoresManutencao
    erro?: string | null
  }>(url)
  return data.dados
}

// GET /admin/manutencao/empresas/:empresaId/indicadores/equipamentos - Indicadores de todos equipamentos
export async function getIndicadoresEquipamentos(
  empresaId: string
): Promise<IndicadoresEquipamentos[]> {
  const { data } = await axiosInstance.get<{
    status: boolean
    msg?: string
    dados: IndicadoresEquipamentos[]
    erro?: string | null
  }>(`/admin/manutencao/empresas/${empresaId}/indicadores/equipamentos`)
  return data.dados
}
