export interface ResumoRH {
  total_colaboradores: number
  colaboradores_ativos: number
  colaboradores_demitidos: number
  rotatividade_percentual: number
  tendencia_rotatividade?: 'up' | 'down' | 'neutral'
}

export interface Colaborador {
  id: number
  nome: string
  cargo: string
  departamento: string
  data_admissao: string
  data_demissao?: string
  salario: number
  status: 'ativo' | 'demitido'
}

export interface DadosRotatividade {
  periodo: string
  admissoes: number
  demissoes: number
  rotatividade_percentual: number
}

export interface Treinamento {
  id: number
  titulo: string
  colaborador: string
  cargo: string
  data_inicio: string
  data_conclusao?: string
  carga_horaria: number
  status: 'concluido' | 'em_andamento' | 'nao_iniciado'
  progresso_percentual: number
}

export interface ColaboradoresPorCargo {
  cargo: string
  quantidade: number
  departamento: string
}
