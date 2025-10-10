// Types para o módulo de Expedição

export type ResumoExpedicao = {
  realizadas: number
  pendentes: number
  total: number
}

export type Expedicao = {
  id: string
  expedidoEm: Date | string
  venda: {
    id: string
    numeroVenda: number
    cliente: {
      nome: string
    }
  }
  usuario: string
  avaliacaoExpedicao: number | null
}

export type DadosExpedicao = Expedicao[]

export type MediaAvaliacao = {
  media: number
}
