'use server'

import { redirect } from 'next/navigation'
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

    if (!response.ok) {
      console.error('❌ Login falhou:', response.status)
      return {
        success: false,
        message: response.status === 401 ? 'Email ou senha incorretos' : 'Erro no servidor',
      }
    }

    // Pega o cookie da resposta
    const setCookieHeader = response.headers.get('set-cookie')
    if (setCookieHeader) {
      // Extrai o valor do cookie sessionUser
      const sessionMatch = setCookieHeader.match(/sessionUser=([^;]+)/)
      if (sessionMatch) {
        const cookieStore = await cookies()
        cookieStore.set('sessionUser', sessionMatch[1], {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 dias
        })
      }
    }

    console.log('✅ Login OK - Redirecionando...')

  } catch (error: any) {
    console.error('❌ Erro:', error.message)
    return {
      success: false,
      message: 'Erro de conexão com o servidor',
    }
  }

  // Redirect fora do try-catch para não ser capturado
  redirect('/')
}

export async function logoutAction() {
  try {
    await fetch(`${API_BASE_URL}/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Erro no logout:', error)
  }

  redirect('/login')
}