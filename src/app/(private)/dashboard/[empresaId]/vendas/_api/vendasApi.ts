// API calls para o módulo de Vendas
import { axiosInstance } from '@/lib/axios'
import type { EstatisticasVendas, TopProduto, TopCliente } from '../_types/vendasTypes'

export const vendasApi = {
  // GET /admin/vendas/empresas/:empresaId/produtos/total - Total de produtos
  getEstatisticas: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: EstatisticasVendas
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/produtos/total`)
    return data.dados
  },

  // GET /admin/vendas/empresas/:empresaId/produto-top - Produto mais vendido
  getTopProdutos: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: TopProduto[]
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/produto-top`)
    return data.dados
  },

  // GET /admin/vendas/empresas/:empresaId/cliente-top - Cliente com mais vendas
  getTopClientes: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: TopCliente[]
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/cliente-top`)
    return data.dados
  },

  // GET /admin/vendas/empresas/:empresaId/clientes/total - Total de clientes
  getTotalVendas: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: { total_vendas: number; valor_total: number }
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/clientes/total`)
    return data.dados
  },
}
