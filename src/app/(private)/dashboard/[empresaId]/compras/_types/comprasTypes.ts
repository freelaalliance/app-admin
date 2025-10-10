// Types para o módulo de Compras

export type ResumoCompras = {
  totalPedidos: number
  pedidosPendentes: number
  pedidosRecebidos: number
  pedidosCancelados: number
  valorTotalPedidos: number
  pedidosNoMes: number
}

export type Pedido = {
  id: string
  numPedido: string
  codigo: string
  permiteEntregaParcial: boolean
  prazoEntrega: Date | string
  condicoesEntrega: string
  recebido: boolean
  cancelado: boolean
  cadastro: {
    usuario: string
    dataCadastro: Date | string
  }
  fornecedor: {
    id: string
    nome: string
    documento: string
  }
}

export type DadosCompras = ResumoCompras
