const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api'

export interface LoginResponse {
  status: boolean
  msg: string
}

export interface LogoutResponse {
  status: boolean
  msg: string
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Permite enviar/receber cookies
    body: JSON.stringify({ email, senha }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.msg || 'Erro ao autenticar')
  }

  return data
}

export async function logout(): Promise<LogoutResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/logout`, {
    method: 'POST',
    credentials: 'include', // Envia os cookies
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.msg || 'Erro ao fazer logout')
  }

  return data
}
