'use client'

import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import Image from 'next/image'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-md">
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
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
