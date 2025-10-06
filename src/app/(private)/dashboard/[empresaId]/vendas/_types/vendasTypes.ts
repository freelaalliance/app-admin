// Types para o módulo de Vendas

export type EstatisticasVendas = {
  total_vendas: number
  total_clientes: number
  total_produtos: number
  produto_mais_vendido: string
  cliente_maior_comprador: string
  valor_total_vendas: number
}

export type TopProduto = {
  id: string
  nome: string
  quantidade_vendida: number
  valor_total: number
}

export type TopCliente = {
  id: string
  nome: string
  total_compras: number
  valor_total: number
}

export type DadosVendas = {
  estatisticas: EstatisticasVendas
  top_produtos: TopProduto[]
  top_clientes: TopCliente[]
}
