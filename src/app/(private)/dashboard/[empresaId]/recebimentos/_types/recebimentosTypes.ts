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
  compra: {
    numPedido: number
  }
  usuario: {
    nome: string
  }
  AvaliacaoRecebimento: Array<{
    notaAvaliacao: number
    itemAvaliativo: {
      descricao: string
    }
  }>
}

export interface DadosRecebimentos {
  estatisticasRecebimentos: EstatisticasRecebimentos
  recebimentos: Recebimento[]
}
