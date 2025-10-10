export interface EstatisticasRecebimentos {
  totalRecebimentos: number
  recebimentosNoMes: number
  recebimentosNaSemana: number
  mediaAvaliacao: number
  recebimentosPendentes: number
}

export interface Recebimento {
  id: string
  recebidoEm: Date | string
  observacoes: string | null
  pedido: {
    id: string
    numPedido: number
    codigo: string
    fornecedor: {
      nome: string
      documento: string
    }
  }
  usuario: {
    nome: string
  }
  avaliacaoRecebimento: Array<{
    id: string
    avaliacao: number
    item: {
      descricao: string
    }
  }>
}

export interface DadosRecebimentos {
  estatisticasRecebimentos: EstatisticasRecebimentos
  recebimentos: Recebimento[]
}
