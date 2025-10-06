export interface Equipamento {
  id: number
  nome: string
  codigo: string
  tipo: string
  localizacao: string
}

export interface IndicadoresManutencao {
  mttr: number // Mean Time To Repair (horas)
  mtbf: number // Mean Time Between Failures (horas)
  total_manutencoes: number
  manutencoes_preventivas: number
  manutencoes_corretivas: number
  equipamentos_em_manutencao: number
}

export interface Inspecao {
  id: number
  equipamento_id: number
  equipamento_nome: string
  tipo: 'diaria' | 'semanal' | 'mensal' | 'trimestral' | 'anual'
  data_programada: string
  data_realizada?: string
  status: 'pendente' | 'realizada' | 'atrasada'
  responsavel: string
  observacoes?: string
}

export interface Manutencao {
  id: number
  equipamento_id: number
  equipamento_nome: string
  tipo: 'preventiva' | 'corretiva' | 'preditiva'
  data_inicio: string
  data_fim?: string
  duracao_horas?: number
  status: 'em_andamento' | 'concluida' | 'cancelada'
  tecnico: string
  descricao: string
  custo?: number
}

export interface DadosGraficoDuracao {
  equipamento: string
  duracao_media: number
  manutencoes: number
}
