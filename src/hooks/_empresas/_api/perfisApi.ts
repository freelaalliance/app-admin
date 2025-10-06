import { axiosInstance } from '@/lib/axios'
import type { Perfil, PerfilEmpresa, CreatePerfilData, UpdatePerfilData, PerfilPermissao } from '../_types/perfilTypes'

/**
 * Busca os perfis vinculados a uma empresa específica
 * Endpoint: GET /admin/empresa/{empresaId}/perfis
 */
export async function getPerfisEmpresa(empresaId: string): Promise<PerfilEmpresa[]> {
  const { data } = await axiosInstance.get<PerfilEmpresa[]>(
    `/admin/empresa/${empresaId}/perfis`
  )
  return data
}

/**
 * Cria um novo perfil
 * Endpoint: POST /admin/perfil
 */
export async function createPerfil(perfilData: CreatePerfilData): Promise<void> {
  await axiosInstance.post('/admin/perfil', perfilData)
}

/**
 * Atualiza um perfil existente
 * Endpoint: PUT /admin/perfil/{id}
 */
export async function updatePerfil(id: string, perfilData: UpdatePerfilData): Promise<void> {
  await axiosInstance.put(`/admin/perfil/${id}`, perfilData)
}

/**
 * Busca os dados de um perfil específico
 * Endpoint: GET /admin/perfil/{id}
 */
export async function getPerfil(id: string): Promise<Perfil> {
  const { data } = await axiosInstance.get<Perfil>(`/admin/perfil/${id}`)
  return data
}

/**
 * Remove um perfil
 * Endpoint: DELETE /admin/perfil/{id}
 */
export async function deletePerfil(id: string): Promise<void> {
  await axiosInstance.delete(`/admin/perfil/${id}`)
}

/**
 * Busca permissões de um perfil
 * Endpoint: GET /admin/perfil/{id}/permissoes
 */
export async function getPermissoesPerfil(perfilId: string): Promise<any[]> {
  const { data } = await axiosInstance.get<any[]>(
    `/admin/perfil/${perfilId}/permissoes`
  )
  return data
}

/**
 * Adiciona permissões ao perfil
 * Endpoint: POST /admin/perfil/{id}/vincular/funcao
 */
export async function vincularFuncaoPerfil(perfilId: string, funcoes: PerfilPermissao[]): Promise<void> {
  await axiosInstance.post(`/admin/perfil/${perfilId}/vincular/funcao`, funcoes)
}

/**
 * Remove permissões do perfil
 * Endpoint: DELETE /admin/perfil/{id}/remover/funcao
 */
export async function removerFuncaoPerfil(perfilId: string, funcoes: PerfilPermissao[]): Promise<void> {
  await axiosInstance.delete(`/admin/perfil/${perfilId}/remover/funcao`, {
    data: funcoes
  })
}
