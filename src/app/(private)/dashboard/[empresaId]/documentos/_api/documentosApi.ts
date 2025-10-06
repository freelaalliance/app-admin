// API calls para o módulo de Documentos
import { axiosInstance } from '@/lib/axios'
import type { DadosDocumentos, DadosUsuario, Categoria } from '../_types/documentosTypes'

export const documentosApi = {
  // GET /admin/documentos/empresas/:empresaId/permissoes/usuarios - Usuários com acesso
  getUsuario: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: DadosUsuario
      erro?: string | null
    }>(`/admin/documentos/empresas/${empresaId}/permissoes/usuarios`)
    return data.dados
  },

  // GET /admin/documentos/empresas/:empresaId/categorias - Lista de categorias
  getCategorias: async (empresaId: string) => {
    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: Categoria[]
      erro?: string | null
    }>(`/admin/documentos/empresas/${empresaId}/categorias`)
    return data.dados
  },

  // GET /admin/documentos/empresas/:empresaId - Lista de documentos da empresa
  getDocumentos: async (empresaId: string, categoriaId?: string) => {
    const params = new URLSearchParams()
    if (categoriaId) params.append('categoria_id', categoriaId)

    const { data } = await axiosInstance.get<{
      status: boolean
      msg: string
      dados: DadosDocumentos
      erro?: string | null
    }>(`/admin/documentos/empresas/${empresaId}?${params.toString()}`)
    return data.dados
  },
}
