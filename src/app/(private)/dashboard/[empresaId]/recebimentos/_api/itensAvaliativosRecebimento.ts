import { axiosInstance } from "@/lib/axios"
import { ItemAvaliativoRecebimentoFormType } from "../_components/forms/atualizacao-item-avaliativo-recebimento"
import { ItensAvaliativoRecebimentoFormType } from "../_components/forms/cadastro-itens-avaliativos-recebimento"

export interface ItemAvaliacao {
  id: string
  descricao: string
  ativo: boolean
  empresaId: string
}

export type ItemAvaliacaoEmpresaType = Omit<ItemAvaliacao, 'empresaId'>

export type ItemAvaliacaoType = Pick<ItemAvaliacao, 'id' | 'descricao'>

export type AtualizarStatusItemAvaliacaoRecebimentoType = Pick<
  ItemAvaliacao,
  'id' | 'ativo'
>

export async function buscarItensAvaliativosRecebimentoEmpresa(
  empresaId: string
) {
  return await axiosInstance
    .get<Array<ItemAvaliacaoEmpresaType>>(
      `admin/compras/recebimento/avaliacao/empresa/${empresaId}`
    )
    .then(({ data }) => data)
}

export async function cadastrarItensAvaliativosRecebimento({
  empresaId,
  itens,
}: ItensAvaliativoRecebimentoFormType) {
  await axiosInstance.post(
    `admin/compras/recebimento/avaliacao/empresa/${empresaId}`,
    {
      itens,
    }
  )
}

export async function atualizarDescricaoItemAvaliativosRecebimento({
  id,
  descricao,
}: ItemAvaliativoRecebimentoFormType) {
  await axiosInstance.patch(
    `admin/compras/recebimento/avaliacao/${id}/descricao`,
    {
      descricao,
    }
  )
}

export async function atualizarStatusItemAvaliativosRecebimento({
  id,
  ativo,
}: AtualizarStatusItemAvaliacaoRecebimentoType) {
  await axiosInstance.patch(
    `admin/compras/recebimento/avaliacao/${id}/status`,
    {
      ativo,
    }
  )
}
