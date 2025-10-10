import { axiosInstance } from '@/lib/axios'
import type { DadosRecebimentos } from '../_types/recebimentosTypes'

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

  const { data } = await axiosInstance.get<{
    status: boolean
    msg: string
    dados: DadosRecebimentos
    erro?: string | null
  }>(url)
  return data.dados
}
