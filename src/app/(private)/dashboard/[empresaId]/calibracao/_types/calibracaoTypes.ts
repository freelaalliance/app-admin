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
  instrumento: string
  codigo: string
  nome: string
  agendadoPara: Date | string
}

export type HistoricoCalibracao = {
  calibracao: {
    id: string
    numeroCertificado: string
    erroEncontrado: string
    status: 'APROVADO' | 'REPROVADO'
    realizadoEm: Date | string
    usuarioNome: string
  }
  instrumento: {
    id: string
    codigo: string
    nome: string
  }
}
