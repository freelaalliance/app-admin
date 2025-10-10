// Tipos para o módulo de Calibração

export type EstatisticasCalibracao = {
  quantidadeCalibracoesAprovadas: number
  quantidadeCalibracoesReprovadas: number
  quantidadeInstrumentosEmpresa: number
  quantidadeInstrumentosCadastradoAtual: number
  calibracoesVencido: number
  calibracoesVencendo: number
  calibracoesDentroPrazo: number
}

export type AgendaCalibracao = {
  id: string
  codigo: string
  nome: string
  marca: string
  localizacao: string
  frequencia: number
  proximaCalibracao: Date | string
  diasRestantes: number
  status: 'vencido' | 'vencendo' | 'em_dia'
}

export type HistoricoCalibracao = {
  calibracao: {
    id: string
    numeroCertificado: string
    erroEncontrado: number
    incertezaTendenciaEncontrado: number
    toleranciaEstabelicida: number
    certificado: string | null
    observacao: string | null
    status: string
    realizadoEm: Date | string
    usuarioId: string
    usuarioNome: string
  }
  instrumento: {
    id: string
    codigo: string
    nome: string
    localizacao: string
    marca: string
    resolucao: number
    frequencia: number
    repeticao: number
  }
}
