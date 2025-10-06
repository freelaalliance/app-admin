"use client"

import { axiosInstance } from '@/lib/axios'
import type { EmpresaFormType, empresaType } from '../_types/empresaTypes'

/**
 * Busca todas as empresas cadastradas
 * Endpoint: GET /admin/empresa/all
 */
export async function getEmpresas(): Promise<empresaType[]> {
  const { data } = await axiosInstance.get<empresaType[]>('/admin/empresa/all')
  return data
}

/**
 * Busca uma empresa específica por ID
 * Endpoint: GET /admin/empresa/{id}
 */
export async function getEmpresa(id: string): Promise<empresaType> {
  const { data } = await axiosInstance.get<empresaType>(`/admin/empresa/${id}`)
  return data
}

/**
 * Cria uma nova empresa
 * Endpoint: POST /admin/empresa
 */
export async function createEmpresa(formData: EmpresaFormType): Promise<empresaType> {

  const { data } = await axiosInstance.post<empresaType>('/admin/empresa', formData)
  return data
}

/**
 * Atualiza uma empresa existente
 * Endpoint: PUT /admin/empresa/{id}
 */
export async function updateEmpresa(id: string, formData: Partial<EmpresaFormType>): Promise<empresaType> {

  const { data } = await axiosInstance.put<empresaType>(`/admin/empresa/${id}`, formData)
  return data
}

/**
 * Remove uma empresa
 * Endpoint: DELETE /admin/empresa/{id}
 */
export async function deleteEmpresa(id: string): Promise<void> {


  await axiosInstance.delete(`/admin/empresa/${id}`)
}

/**
 * Alterna o status de uma empresa (ativa/inativa)
 * Endpoint: PATCH /admin/empresa/{id}/status
 */
export async function toggleEmpresaStatus(id: string): Promise<empresaType> {
  const { data } = await axiosInstance.patch<empresaType>(`/admin/empresa/${id}/status`)
  return data
}



