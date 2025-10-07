import axios, { AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Incluir cookies em todas as requisições
})

// Os cookies HTTP-Only são incluídos automaticamente pelo withCredentials: true

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirecionar para login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export type ApiResponse<T> = {
  status: boolean
  msg: string
  dados: T
  erro?: string | null
}
