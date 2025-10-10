export interface ResumoRH {
  totalColaboradores: number
  colaboradoresAtivos: number
  colaboradoresDemitidos: number
  colaboradoresEmTreinamento: number
  novasContratacoesMes: number
}

export interface Colaborador {
  id: string
  admitidoEm: Date | string
  demitidoEm: Date | string | null
  colaborador: {
    id: string
    documento: string
    nome: string
    email: string | null
    telefone: string | null
  }
  cargo: {
    nome: string
  }
}

export interface DadosRotatividade {
  admissoes: number
  demissoes: number
  taxaRotatividade: number
  colaboradoresInicio: number
  colaboradoresFim: number
  periodo: 'mes' | 'trimestre' | 'semestre' | 'anual'
  dataInicio: Date | string
  dataFim: Date | string
}

export interface ResumoTreinamentos {
  totalTreinamentos: number
  treinamentosAtivos: number
  treinamentosConcluidos: number
  colaboradoresEmTreinamento: number
  mediaHorasTreinamento: number
}

export interface ColaboradorTreinamento {
  id: string
  iniciadoEm: Date | string
  colaborador: {
    nome: string
    documento: string
  }
  cargo: {
    nome: string
  }
  treinamento: {
    id: string
    nome: string
    tipo: string
  }
}

export interface ColaboradoresPorCargo {
  cargo: string
  quantidade: number
  percentual: number
}
