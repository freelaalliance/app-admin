// Types para fornecedores

export type ResumoFornecedores = {
  total_fornecedores: number
  fornecedores_criticos: number
  fornecedores_nao_criticos: number
  fornecedores_ativos: number
}

export type Fornecedor = {
  id: string
  nome: string
  cnpj: string
  tipo: 'critico' | 'nao_critico'
  status: 'ativo' | 'inativo'
  total_compras: number
  valor_total_compras: number
  ultima_compra: string | null
  email?: string
  telefone?: string
  cidade?: string
  estado?: string
}

export type DadosFornecedores = {
  resumo: ResumoFornecedores
  fornecedores: Fornecedor[]
}
