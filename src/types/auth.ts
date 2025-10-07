export interface AuthPropsInterface {
  email: string
  senha: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  usuario?: {
    id: string
    nome: string
    email: string
  }
}

export interface Usuario {
  id: string
  nome: string
  email: string
}