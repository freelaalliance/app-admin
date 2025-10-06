// API calls para o módulo de Compras
import { axiosInstance } from '@/lib/axios'
import type { DadosCompras } from '../_types/comprasTypes'
import type { DadosFornecedores } from '../_types/fornecedoresTypes'

export const comprasApi = {
  // GET /admin/compras/empresas/:empresaId/resumo - Resumo de compras
  getResumoCompras: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: DadosCompras
      erro?: string | null
    }>(`/admin/compras/empresas/${empresaId}/resumo`)
    return data.dados
  },

  // GET /admin/compras/empresas/:empresaId/pedidos - Lista de pedidos
  getCompras: async (empresaId: string, dataInicio?: string, dataFim?: string) => {
    const params = new URLSearchParams()
    if (dataInicio) params.append('data_inicio', dataInicio)
    if (dataFim) params.append('data_fim', dataFim)

    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: DadosCompras
      erro?: string | null
    }>(`/admin/compras/empresas/${empresaId}/pedidos?${params.toString()}`)
    return data.dados
  },

  // GET /admin/compras/empresas/:empresaId/fornecedor/resumo - Resumo de fornecedores
  getResumoFornecedores: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: DadosFornecedores
      erro?: string | null
    }>(`/admin/compras/empresas/${empresaId}/fornecedor/resumo`)
    return data.dados
  },

  // GET /admin/compras/empresas/:empresaId/fornecedor/resumo - Lista de fornecedores (usando mesmo endpoint)
  getFornecedores: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: DadosFornecedores
      erro?: string | null
    }>(`/admin/compras/empresas/${empresaId}/fornecedor/resumo`)
    return data.dados
  },
}
