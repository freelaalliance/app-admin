// Types para o módulo de Documentos

export type Categoria = {
  id: string
  nome: string
  cor?: string
}

export type Documento = {
  id: string
  titulo: string
  descricao?: string
  categoria: string
  categoria_nome?: string
  revisao: number
  data_criacao: string
  data_atualizacao: string
  arquivo_url: string
  arquivo_nome: string
  tamanho_bytes: number
  tipo_arquivo: string
  status: 'ativo' | 'arquivado' | 'obsoleto'
  criado_por?: string
  atualizado_por?: string
}

export type DadosDocumentos = {
  documentos: Documento[]
  total: number
  categorias: Categoria[]
}

export type DadosUsuario = {
  nome: string
  email: string
  avatar_url?: string
}

export type EstatisticasDocumentos = {
  total_documentos: number
  documentos_ativos: number
  documentos_arquivados: number
  total_categorias: number
}
