// Types para o módulo de Compras

export type ResumoCompras = {
  total_pedidos: number
  valor_total: number
  pedidos_pendentes: number
  pedidos_concluidos: number
}

export type Compra = {
  id: string
  numero_pedido: string
  fornecedor: string
  data_pedido: string
  data_entrega: string | null
  valor_total: number
  status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado'
  itens: number
  observacoes?: string
}

export type DadosCompras = {
  resumo: ResumoCompras
  compras: Compra[]
}
