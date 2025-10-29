// API calls para o módulo de Documentos
import { axiosInstance } from '@/lib/axios'
import type { DocumentoType, CategoriaDocumentoType, ResponseType, Categoria } from '../_types/documentosTypes'
import { CategoriaDocumentosFormType } from '../_components/forms/cadastro-categoria-documento'
import { NovoDocumentoFormType } from '../_components/forms/novo-documento-form'
import { NovaRevisaoDocumentoFormType } from '../_components/forms/nova-revisao-documento-form'
import { UsuarioType } from '@/hooks/_empresas/_types/usuarioTypes'

export const documentosApi = {
  // GET /admin/documentos/empresas/:empresaId - Lista de documentos da empresa
  getDocumentos: async (empresaId: string): Promise<DocumentoType[]> => {
    try {
      const { data } = await axiosInstance.get<DocumentoType[] | {
        status: boolean
        msg?: string
        dados: DocumentoType[]
        erro?: string | null
      }>(`/admin/documentos/empresas/${empresaId}`)

      // Se data é um array, retorna direto
      if (Array.isArray(data)) {
        return data
      }

      // Se data é um objeto com a propriedade dados
      return data.dados ?? []
    } catch (error) {
      console.error('Erro ao buscar documentos:', error)
      return []
    }
  },

  // GET /admin/documentos/empresas/:empresaId/categorias - Lista de categorias
  getCategorias: async (empresaId: string): Promise<Categoria[]> => {
    try {
      const { data } = await axiosInstance.get<Categoria[] | {
        status: boolean
        msg?: string
        dados: Categoria[]
        erro?: string | null
      }>(`/admin/documentos/categorias/${empresaId}`)

      // Se data é um array, retorna direto
      if (Array.isArray(data)) {
        return data
      }

      // Se data é um objeto com a propriedade dados
      return data.dados ?? []
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }
  },

  // GET /admin/documentos/empresas/:empresaId/permissoes/usuarios - Usuários com acesso
  getUsuarios: async (empresaId: string): Promise<Omit<UsuarioType, 'perfil'>[]> => {
    try {
      const { data } = await axiosInstance.get<Omit<UsuarioType, 'perfil'>[] | {
        status: boolean
        msg?: string
        dados: Omit<UsuarioType, 'perfil'>[]
        erro?: string | null
      }>(`/admin/documentos/empresas/${empresaId}/permissoes/usuarios`)

      // Se data é um array, retorna direto
      if (Array.isArray(data)) {
        return data
      }

      // Se data é um objeto com a propriedade dados
      return data.dados ?? []
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      return []
    }
  },

  removerCategoria: async ({ id }: Pick<CategoriaDocumentoType, 'id'>): Promise<ResponseType | null> => {
    return await axiosInstance.delete<ResponseType>(`admin/documentos/categorias/${id}`).then(({ data }) => data).catch(() => null)
  },

  setCategoria: async ({
    empresaId,
    categorias,
  }: CategoriaDocumentosFormType): Promise<void> => {
    await axiosInstance.post<ResponseType>(`admin/documentos/categorias/${empresaId}`, {
      categorias,
    })
  },

  setDocumento: async (documento: NovoDocumentoFormType): Promise<ResponseType | null> => {
    return await axiosInstance
      .post<ResponseType>('admin/documentos/empresa', documento)
      .then(({ data }) => data)
      .catch(() => null)
  },

  removerDocumento: async ({ id, empresaId }: Pick<DocumentoType, 'id'> & { empresaId: string }): Promise<ResponseType | null> => {
    return await axiosInstance
      .delete<ResponseType>(`admin/documentos/${id}/empresa/${empresaId}`)
      .then(({ data }) => data)
      .catch(() => null)
  },

  setRevisaoDocumento: async (
    revisaoDocumentoForm: NovaRevisaoDocumentoFormType
  ): Promise<ResponseType | null> => {
    return await axiosInstance
      .post<ResponseType>(`admin/documentos/revisao/${revisaoDocumentoForm.id}`, {
        arquivo: revisaoDocumentoForm.arquivo,
      })
      .then(({ data }) => data)
      .catch(() => null)
  },
}