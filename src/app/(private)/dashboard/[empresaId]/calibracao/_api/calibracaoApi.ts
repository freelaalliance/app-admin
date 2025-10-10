import { axiosInstance } from '@/lib/axios'
import type {
  EstatisticasCalibracao,
  AgendaCalibracao,
  HistoricoCalibracao
} from '../_types/calibracaoTypes'

export const calibracaoApi = {
  // GET /admin/calibracao/empresas/:empresaId/estatisticas - Estatísticas
  // Retorna DIRETAMENTE os dados (sem wrapper ApiResponse)
  getEstatisticas: async (empresaId: string) => {
    const { data } = await axiosInstance.get<EstatisticasCalibracao>(
      `/admin/calibracao/empresas/${empresaId}/estatisticas`
    )
    return data
  },

  // GET /admin/calibracao/empresas/:empresaId/agenda - Agenda
  // Retorna DIRETAMENTE array (sem wrapper ApiResponse)
  getAgenda: async (empresaId: string) => {
    const { data } = await axiosInstance.get<AgendaCalibracao[]>(
      `/admin/calibracao/empresas/${empresaId}/agenda`
    )
    return data
  },

  // GET /admin/calibracao/empresas/:empresaId/calibracoes - Histórico (lista de calibrações)
  // Retorna DIRETAMENTE array (sem wrapper ApiResponse)
  getHistorico: async (empresaId: string) => {
    const { data } = await axiosInstance.get<HistoricoCalibracao[]>(
      `/admin/calibracao/empresas/${empresaId}/calibracoes`
    )
    return data
  },
}
