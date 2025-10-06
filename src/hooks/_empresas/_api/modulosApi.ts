import { axiosInstance } from '@/lib/axios'
import type {
  Modulo, Funcao,
  CreateModuloData,
  UpdateModuloData,
  CreateFuncaoData,
  UpdateFuncaoData
} from '../_types/moduloTypes'

// ==================== MÓDULOS ====================

/**
 * Cria um novo módulo no sistema com suas funções associadas
 * Endpoint: POST /modulo
 */
export async function createModulo(data: CreateModuloData): Promise<{ id: string }> {
  const response = await axiosInstance.post<{ id: string }>('/modulo', data)
  return response.data
}

/**
 * Atualiza os dados de um módulo existente
 * Endpoint: PUT /modulo/:id
 */
export async function updateModulo(id: string, data: UpdateModuloData): Promise<void> {
  await axiosInstance.put(`/modulo/${id}`, data)
}

/**
 * Busca todos os módulos disponíveis no sistema
 * Endpoint: GET /modulo/all
 */
export async function getModulos(): Promise<Modulo[]> {
  const { data } = await axiosInstance.get<Modulo[]>('/modulo/all')
  return data
}

/**
 * Busca os dados de um módulo específico
 * Endpoint: GET /modulo/:id
 */
export async function getModulo(id: string): Promise<Modulo> {
  const { data } = await axiosInstance.get<Modulo>(`/modulo/${id}`)
  return data
}

/**
 * Lista todas as funções associadas a um módulo
 * Endpoint: GET /modulo/:id/funcoes
 */
export async function getFuncoesModulo(moduloId: string): Promise<Funcao[]> {
  const { data } = await axiosInstance.get<Funcao[]>(`/modulo/${moduloId}/funcoes`)
  return data
}

/**
 * Adiciona uma nova função a um módulo existente
 * Endpoint: POST /modulo/:id/funcao
 */
export async function createFuncaoModulo(moduloId: string, funcao: CreateFuncaoData): Promise<void> {
  await axiosInstance.post(`/modulo/${moduloId}/funcao`, funcao)
}

// ==================== FUNÇÕES ====================

/**
 * Busca os dados de uma função específica
 * Endpoint: GET /funcao/:id
 */
export async function getFuncao(id: string): Promise<Funcao> {
  const { data } = await axiosInstance.get<Funcao>(`/funcao/${id}`)
  return data
}

/**
 * Atualiza os dados de uma função existente
 * Endpoint: PUT /funcao/:id
 * NOTA: Esta rota não está registrada no backend, mas está implementada
 */
export async function updateFuncao(id: string, data: UpdateFuncaoData): Promise<void> {
  await axiosInstance.put(`/funcao/${id}`, data)
}

// ==================== EMPRESA MÓDULOS (mantido para compatibilidade) ====================

/**
 * Busca os módulos vinculados a uma empresa específica
 * Endpoint: GET /admin/empresa/{id}/modulos
 */
export async function getModulosEmpresa(empresaId: string): Promise<Modulo[]> {
  const { data } = await axiosInstance.get<Modulo[]>(
    `/admin/empresa/${empresaId}/modulos`
  )
  return data
}

/**
 * Vincula um módulo a uma empresa
 * Endpoint: POST /admin/empresa/{id}/vincular/modulo
 */
export async function ativarModulo(empresaId: string, idModulo: string): Promise<void> {
  await axiosInstance.post(`/admin/empresa/${empresaId}/vincular/modulo`, { idModulo })
}

/**
 * Desvincula módulos de uma empresa
 * Endpoint: DELETE /admin/empresa/{id}/desvincular/modulo
 */
export async function desativarModulo(empresaId: string, modulos: Array<{ idModulo: string }>): Promise<void> {
  await axiosInstance.delete(`/admin/empresa/${empresaId}/desvincular/modulo`, {
    data: modulos
  })
}
