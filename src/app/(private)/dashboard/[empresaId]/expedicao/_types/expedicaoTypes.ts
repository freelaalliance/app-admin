// Types para o módulo de Expedição

export type ResumoExpedicao = {
  total_expedicoes: number
  expedicoes_pendentes: number
  expedicoes_expedidas: number
  media_avaliacao: number
}

export type Expedicao = {
  id: string
  numero_expedicao: string
  numero_pedido: string
  cliente: string
  data_expedicao: string | null
  data_previsao: string
  status: 'pendente' | 'em_preparacao' | 'expedida' | 'entregue' | 'cancelada'
  quantidade_itens: number
  peso_total_kg: number
  volume_m3: number
  transportadora?: string
  codigo_rastreio?: string
  avaliacao?: number
  observacoes?: string
}

export type DadosExpedicao = {
  resumo: ResumoExpedicao
  expedicoes: Expedicao[]
}
