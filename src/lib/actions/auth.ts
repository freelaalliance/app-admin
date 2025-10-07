'use server'

import { cookies } from 'next/headers'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3333/api'

export async function loginAction(email: string, senha: string) {
  try {
    console.log('🚀 SERVER ACTION: Login ->', email)

    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })

    console.log('📊 Status:', response.status)

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error('❌ Login falhou:', data.msg || 'Erro desconhecido')
      return {
        success: false,
        message: data.msg || 'Erro ao autenticar',
      }
    }

    // Extrai o cookie sessionAdmin da resposta
    const setCookieHeader = response.headers.get('set-cookie')
    if (setCookieHeader) {
      const sessionMatch = setCookieHeader.match(/sessionAdmin=([^;]+)/)
      if (sessionMatch) {
        const cookieStore = await cookies()
        cookieStore.set('sessionAdmin', sessionMatch[1], {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 8, // 8 horas (igual ao backend)
          path: '/',
        })
        console.log('🍪 Cookie sessionAdmin configurado')
      }
    }

    console.log('✅ Login OK')

    return {
      success: true,
      message: data.msg || 'Login realizado com sucesso',
    }

  } catch (error: any) {
    console.error('❌ Erro:', error.message)
    return {
      success: false,
      message: 'Erro de conexão com o servidor',
    }
  }
}

export async function logoutAction() {
  try {
    console.log('🚪 SERVER ACTION: Logout')

    const response = await fetch(`${API_BASE_URL}/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    const data = await response.json()

    if (response.ok && data.status) {
      // Limpa o cookie sessionAdmin no frontend
      const cookieStore = await cookies()
      cookieStore.delete('sessionAdmin')
      console.log('✅ Logout OK - Cookie removido')
    } else {
      console.error('❌ Logout falhou:', data.msg || 'Erro desconhecido')
    }
  } catch (error: any) {
    console.error('❌ Erro no logout:', error.message)
    // Mesmo com erro, limpa o cookie local
    const cookieStore = await cookies()
    cookieStore.delete('sessionAdmin')
  }

  return { success: true }
}