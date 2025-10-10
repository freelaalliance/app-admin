import { axiosInstance } from '@/lib/axios'
import type { DadosRecebimentos } from '../_types/recebimentosTypes'

// GET /admin/recebimentos/empresas/:empresaId - Recebimentos
// Retorna DIRETAMENTE os dados (sem wrapper ApiResponse)
export async function getRecebimentos(
  empresaId: string,
  dataInicial?: string,
  dataFinal?: string
): Promise<DadosRecebimentos> {
  const params = new URLSearchParams()
  if (dataInicial) params.append('dataInicial', dataInicial)
  if (dataFinal) params.append('dataFinal', dataFinal)

  const queryString = params.toString()
  const url = queryString
    ? `/admin/recebimentos/empresas/${empresaId}?${queryString}`
    : `/admin/recebimentos/empresas/${empresaId}`

  const { data } = await axiosInstance.get<DadosRecebimentos>(url)
  return data
}
