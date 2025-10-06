import { axiosInstance } from '@/lib/axios'
import type {
  Usuario,
  UsuarioSimples,
  FormularioNovoUsuarioType,
  FormularioEdicaoUsuarioType,
  UpdateUsuarioStatusData
} from '../_types/usuarioTypes'

/**
 * Busca usuários de uma empresa específica
 * Endpoint: GET /admin/empresa/{id}/usuarios
 */
export async function getUsuarios(empresaId: string): Promise<UsuarioSimples[]> {
  const { data } = await axiosInstance.get<UsuarioSimples[]>(
    `/admin/empresa/${empresaId}/usuarios`
  )
  return data
}

/**
 * Cria um novo usuário
 * Endpoint: POST /admin/usuarios
 */
export async function createUsuario(formData: FormularioNovoUsuarioType): Promise<void> {
  await axiosInstance.post('/admin/usuarios', formData)
}

/**
 * Atualiza um usuário existente
 * Endpoint: PUT /admin/usuarios/{id}
 */
export async function updateUsuario(id: string, formData: FormularioEdicaoUsuarioType): Promise<void> {
  await axiosInstance.put(`/admin/usuarios/${id}`, formData)
}

/**
 * Busca os dados de um usuário específico
 * Endpoint: GET /admin/usuarios/{id}
 */
export async function getUsuario(id: string): Promise<Usuario> {
  const { data } = await axiosInstance.get<Usuario>(`/admin/usuarios/${id}`)
  return data
}

/**
 * Remove um usuário
 * Endpoint: DELETE /admin/usuarios/{id}
 */
export async function deleteUsuario(id: string): Promise<void> {
  await axiosInstance.delete(`/admin/usuarios/${id}`)
}

/**
 * Altera o status de um usuário (ativo/inativo)
 * Endpoint: PATCH /admin/usuarios/{id}/status
 */
export async function toggleUsuarioStatus(id: string, statusData: UpdateUsuarioStatusData): Promise<void> {
  await axiosInstance.patch(`/admin/usuarios/${id}/status`, statusData)
}

/**
 * Modifica a senha de um usuário
 * Endpoint: PATCH /admin/usuarios/{id}/senha
 */
export async function updateUsuarioSenha(id: string, senhaData: { novaSenha: string; senhaAntiga: string }): Promise<void> {
  await axiosInstance.patch(`/admin/usuarios/${id}/senha`, senhaData)
}
