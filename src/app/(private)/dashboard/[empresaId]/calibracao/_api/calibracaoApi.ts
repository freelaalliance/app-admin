import { axiosInstance, type ApiResponse } from '@/lib/axios'
import type {
  EstatisticasCalibracao,
  AgendaCalibracao,
  HistoricoCalibracao
} from '../_types/calibracaoTypes'

export const calibracaoApi = {
  // GET /admin/calibracao/empresas/:empresaId/estatisticas - Estatísticas
  getEstatisticas: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<EstatisticasCalibracao>>(
      `/admin/calibracao/empresas/${empresaId}/estatisticas`
    )
    return data.dados
  },

  // GET /admin/calibracao/empresas/:empresaId/agenda - Agenda
  getAgenda: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<AgendaCalibracao[]>>(
      `/admin/calibracao/empresas/${empresaId}/agenda`
    )
    return data.dados
  },

  // GET /admin/calibracao/empresas/:empresaId/calibracoes - Histórico (lista de calibrações)
  getHistorico: async (empresaId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<HistoricoCalibracao[]>>(
      `/admin/calibracao/empresas/${empresaId}/calibracoes`
    )
    return data.dados
  },
}
