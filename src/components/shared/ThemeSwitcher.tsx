'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-alliance-neutral-800 border-alliance-neutral-200 dark:border-alliance-neutral-700">
        <DropdownMenuItem onClick={() => setTheme('light')} className="hover:bg-alliance-primary-50 hover:text-alliance-primary-700 cursor-pointer dark:hover:bg-alliance-primary-900 dark:hover:text-alliance-primary-200">
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="hover:bg-alliance-primary-50 hover:text-alliance-primary-700 cursor-pointer dark:hover:bg-alliance-primary-900 dark:hover:text-alliance-primary-200">
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="hover:bg-alliance-primary-50 hover:text-alliance-primary-700 cursor-pointer dark:hover:bg-alliance-primary-900 dark:hover:text-alliance-primary-200">
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
