// API calls para o módulo de Vendas
import { axiosInstance } from '@/lib/axios'
import type { ClienteTop, ProdutoTop, TotalClientes, TotalProdutos } from '../_types/vendasTypes'

export const vendasApi = {
  // GET /admin/vendas/empresas/:empresaId/cliente-top - Cliente com mais vendas
  getClienteTop: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: ClienteTop | null
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/cliente-top`)
    return data.dados
  },

  // GET /admin/vendas/empresas/:empresaId/produto-top - Produto mais vendido
  getProdutoTop: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: ProdutoTop | null
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/produto-top`)
    return data.dados
  },

  // GET /admin/vendas/empresas/:empresaId/clientes/total - Total de clientes
  getTotalClientes: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg?: string
      dados: TotalClientes
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/clientes/total`)
    return data.dados
  },

  // GET /admin/vendas/empresas/:empresaId/produtos/total - Total de produtos
  getTotalProdutos: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg?: string
      dados: TotalProdutos
      erro?: string | null
    }>(`/admin/vendas/empresas/${empresaId}/produtos/total`)
    return data.dados
  },
}

