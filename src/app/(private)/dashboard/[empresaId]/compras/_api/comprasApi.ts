// API calls para o módulo de Compras
import { axiosInstance } from '@/lib/axios'
import type { DadosCompras, Pedido } from '../_types/comprasTypes'
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
  getPedidos: async (empresaId: string, dataInicial?: string, dataFinal?: string) => {
    const params = new URLSearchParams()
    if (dataInicial) params.append('dataInicial', dataInicial)
    if (dataFinal) params.append('dataFinal', dataFinal)

    const queryString = params.toString()
    const url = queryString
      ? `/admin/compras/empresas/${empresaId}/pedidos?${queryString}`
      : `/admin/compras/empresas/${empresaId}/pedidos`

    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: Pedido[]
      erro?: string | null
    }>(url)
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
}
