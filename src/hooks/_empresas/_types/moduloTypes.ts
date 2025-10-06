// Tipos de Módulos
export interface Modulo {
  id: string
  nome: string
  url: string
}

// Tipos de Funções
export interface Funcao {
  id: string
  nome: string
  url: string
  idModulo?: string
}

// DTOs para criação/atualização
export interface CreateModuloData {
  nome: string
  url: string
  funcoes: Array<{
    nome: string
    url: string
  }>
}

export interface UpdateModuloData {
  nome: string
  url: string
}

export interface CreateFuncaoData {
  nome: string
  url: string
}

export interface UpdateFuncaoData {
  nome: string
  url: string
}
