export interface DashboardStats {
  totalEmpresas: number
  totalUsuariosAtivos: number
  totalModulosEmUso: number
  empresasRecentesCadastradas: number
  modulosMaisUtilizados: Array<{
    nome: string
    quantidade: number
  }>
}

export interface EmpresasStats {
  total: number
  ativas: number
  inativas: number
  crescimento: number // percentual de crescimento no último período
}

export interface UsuariosStats {
  total: number
  ativos: number
  inativos: number
  novosUltimoMes: number
  crescimento: number
}

export interface ModulosStats {
  totalModulos: number
  modulosAtivos: number
  modulosInativos: number
  empresasComModulos: number
  moduloMaisUsado: {
    nome: string
    quantidade: number
  }
}

export interface AtividadesRecentes {
  id: string
  tipo: 'empresa_criada' | 'usuario_adicionado' | 'modulo_ativado' | 'perfil_criado'
  titulo: string
  descricao: string
  timestamp: string
  empresaId?: string
  empresaNome?: string
  usuarioId?: string
  usuarioNome?: string
}

export interface DashboardMetrics {
  totalEmpresas: number
  totalUsuarios: number
  totalModulosAtivos: number
  empresasAtivas: number
  usuariosAtivos: number
  crescimentoEmpresas: number
  crescimentoUsuarios: number
  atividade24h: number
}

export interface ModuloPopularidade {
  id: string
  nome: string
  icone: string
  empresasUsando: number
  percentualUso: number
  crescimento: number
}

export interface ResumoEmpresa {
  id: string
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  status: 'ativa' | 'inativa'
  modulosAtivos: number
  totalUsuarios: number
  ultimaAtividade: string
}