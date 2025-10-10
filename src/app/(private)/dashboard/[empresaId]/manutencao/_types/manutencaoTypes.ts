export interface Equipamento {
  id: string
  nome: string
  codigo: string
}

export interface IndicadoresManutencao {
  total_tempo_parado: number // em minutos
  qtd_manutencoes: number
  total_tempo_operacao: number // em minutos
}

export interface IndicadoresEquipamentos extends IndicadoresManutencao {
  nome: string
}

export interface EstatisticasStatus {
  qtd_equipamentos_parados: number
  qtd_equipamentos_funcionando: number
}

export interface EstatisticasGerais {
  qtd_equipamentos_manutencao_em_dia: number
  media_duracao: number // em minutos
  total_duracao_manutencoes: number // em minutos
  qtd_manutencoes_realizadas: number
}

export interface Manutencao {
  id: string
  tipo: string // 'PREVENTIVA' | 'CORRETIVA'
  descricao: string
  observacao: string | null
  dataInicio: Date | string
  dataFim: Date | string | null
  duracao: number | null
  status: string // 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA'
  equipamento: {
    id: string
    nome: string
    codigo: string
  }
  usuario: {
    nome: string
  }
}

export interface DuracaoManutencao {
  id: string
  tipo: string
  duracao: number // em minutos
  dataInicio: Date | string
  dataFim: Date | string
}
