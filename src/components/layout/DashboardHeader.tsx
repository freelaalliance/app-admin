'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api/auth'

export function DashboardHeader() {
  const router = useRouter()
  const queryCliente = useQueryClient()

  const handleLogout = async () => {
    try {
      await logout()
      queryCliente.clear()
      window.location.href = '/login'
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Mesmo com erro, redireciona para login
      window.location.href = '/login'
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full rounded-t-lg bg-background shadow-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_alliance_colorido.png"
              alt="Alliance Logo"
              width={100}
              height={20}
              className="rounded hidden md:flex"
              priority
            />
            <span className="flex text-xl font-bold md:hidden">ERP Alliance</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
