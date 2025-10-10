// API calls para o módulo de Compras
import { axiosInstance } from '@/lib/axios'
import type { DadosCompras, Pedido } from '../_types/comprasTypes'
import type { DadosFornecedores } from '../_types/fornecedoresTypes'

export const comprasApi = {
  // GET /admin/compras/empresas/:empresaId/resumo - Resumo de compras
  // Retorna DIRETAMENTE os dados (sem wrapper ApiResponse)
  getResumoCompras: async (empresaId: string) => {
    const { data } = await axiosInstance.get<DadosCompras>(
      `/admin/compras/empresas/${empresaId}/resumo`
    )
    return data
  },

  // GET /admin/compras/empresas/:empresaId/pedidos - Lista de pedidos
  // Retorna DIRETAMENTE array (sem wrapper ApiResponse)
  getPedidos: async (empresaId: string, dataInicial?: string, dataFinal?: string) => {
    const params = new URLSearchParams()
    if (dataInicial) params.append('dataInicial', dataInicial)
    if (dataFinal) params.append('dataFinal', dataFinal)

    const queryString = params.toString()
    const url = queryString
      ? `/admin/compras/empresas/${empresaId}/pedidos?${queryString}`
      : `/admin/compras/empresas/${empresaId}/pedidos`

    const { data } = await axiosInstance.get<Pedido[]>(url)
    return data
  },

  // GET /admin/compras/empresas/:empresaId/fornecedor/resumo - Resumo de fornecedores
  // Retorna DIRETAMENTE os dados (sem wrapper ApiResponse)
  getResumoFornecedores: async (empresaId: string) => {
    const { data } = await axiosInstance.get<DadosFornecedores>(
      `/admin/compras/empresas/${empresaId}/fornecedor/resumo`
    )
    return data
  },
}
