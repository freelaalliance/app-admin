// Types para fornecedores

export type ResumoFornecedores = {
  totalFornecedores: number
  fornecedoresAtivos: number
  fornecedoresComPedidos: number
  mediaAvaliacoes: number
  totalCompras: number
  fornecedorMaisUtilizado: {
    id: string
    nome: string
    totalPedidos: number
  } | null
}

export type DadosFornecedores = ResumoFornecedores
