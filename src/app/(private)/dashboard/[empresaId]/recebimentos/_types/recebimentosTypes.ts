export interface ResumoRecebimentos {
  total_recebimentos: number
  recebimentos_aprovados: number
  recebimentos_reprovados: number
  media_avaliacao: number
}

export interface Recebimento {
  id: number
  data_recebimento: string
  fornecedor: string
  numero_pedido: string
  quantidade_itens: number
  avaliacao_media: number
  avaliacao_minima: number
  avaliacao_maxima: number
  status: 'aprovado' | 'reprovado' | 'pendente'
  observacoes?: string
}

export interface DadosGrafico {
  data: string
  avaliacao_media: number
  avaliacao_minima: number
  avaliacao_maxima: number
}
