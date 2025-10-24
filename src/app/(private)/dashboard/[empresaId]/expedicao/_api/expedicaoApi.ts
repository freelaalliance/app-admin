// API calls para o módulo de Expedição
import { axiosInstance } from '@/lib/axios'
import type { DadosExpedicao, ResumoExpedicao, MediaAvaliacao } from '../_types/expedicaoTypes'

export const expedicaoApi = {
  // GET /admin/expedicao/empresas/:empresaId - Lista de expedições
  getExpedicoes: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg?: string
      dados: DadosExpedicao
      erro?: string | null
    }>(`/admin/expedicao/empresas/${empresaId}`)
    return data.dados
  },

  // GET /admin/expedicao/empresas/:empresaId/resumo - Resumo de expedições
  getResumo: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg?: string
      dados: ResumoExpedicao
      erro?: string | null
    }>(`/admin/expedicao/empresas/${empresaId}/resumo`)
    return data.dados
  },

  // GET /admin/expedicao/empresas/:empresaId/media-avaliacao - Média de avaliação
  getMediaAvaliacao: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg?: string
      dados: MediaAvaliacao
      erro?: string | null
    }>(`/admin/expedicao/empresas/${empresaId}/media-avaliacao`)
    return data.dados
  },
}
