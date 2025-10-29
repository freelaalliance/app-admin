// Types para o módulo de Documentos

export type Categoria = {
  id: string
  nome: string
  descricao: string
  empresaId: string
  criadoEm: Date | string
  atualizadoEm: Date | string
}

export type Documento = {
  id: string
  nome: string
  descricaoDocumento: string
  copias: string
  recuperacao: string
  elegibilidade: string
  disposicao: string
  retencao: string
  uso: string
  categoriaDocumentoNome: string
  empresaId: string
  revisoes: Array<{
    id: string
    numeroRevisao: number
    revisadoEm: Date | string
    arquivoId: string
    arquivoNome: string
    arquivoUrl: string
    usuario: string
  }>
}

export type DadosDocumentos = Documento[]

export type DadosUsuario = {
  id: string
  nome: string
  email: string
}

export type DadosUsuarios = DadosUsuario[]

export type RevisoesDocumentoType = {
  id: string
  numeroRevisao: number
  revisadoEm: Date
  arquivoId: string
  arquivoNome: string
  arquivoUrl: string
  usuario: string
}

export type DocumentoType = {
  id: string
  nome: string
  descricaoDocumento: string
  copias: number
  recuperacao: string
  elegibilidade: string
  disposicao: string
  retencao: Date
  uso: string
  empresaId: string
  categoriaDocumentoNome: string
  revisoes: RevisoesDocumentoType[]
}

export type CategoriaDocumentoType = {
  id: string
  nome: string
  empresaId: string
}

export type ResponseType = {
  status: boolean
  msg: string
}