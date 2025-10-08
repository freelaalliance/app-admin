import { axiosInstance } from '@/lib/axios'

export interface LoginResponse {
  status: boolean
  msg: string
}

export interface LogoutResponse {
  status: boolean
  msg: string
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  try {
    const { data } = await axiosInstance.post<LoginResponse>('/admin/login', {
      email,
      senha,
    })

    return data
  } catch (error: any) {
    const errorMessage = error.response?.data?.msg || 'Erro ao autenticar'
    throw new Error(errorMessage)
  }
}

export async function logout(): Promise<LogoutResponse> {
  try {
    const { data } = await axiosInstance.post<LogoutResponse>('/admin/logout')

    return data
  } catch (error: any) {
    const errorMessage = error.response?.data?.msg || 'Erro ao fazer logout'
    throw new Error(errorMessage)
  }
}
