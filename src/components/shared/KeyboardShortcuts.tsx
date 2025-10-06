'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Keyboard } from 'lucide-react'

interface KeyboardShortcut {
  key: string
  description: string
  action?: () => void
}

const shortcuts: KeyboardShortcut[] = [
  { key: 'Ctrl + K', description: 'Abrir busca' },
  { key: 'Ctrl + E', description: 'Exportar dados' },
  { key: 'Ctrl + P', description: 'Imprimir' },
  { key: 'Ctrl + /', description: 'Mostrar atalhos' },
  { key: 'Esc', description: 'Fechar diálogos' },
  { key: 'Ctrl + N', description: 'Novo registro' },
  { key: 'Ctrl + S', description: 'Salvar' },
  { key: 'Ctrl + D', description: 'Alternar tema' },
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + / para mostrar atalhos
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault()
        setIsOpen(true)
      }

      // ESC para fechar
      if (e.key === 'Escape') {
        setIsOpen(false)
      }

      // Ctrl + D para alternar tema
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault()
        const event = new KeyboardEvent('keydown', {
          key: 'd',
          ctrlKey: true,
        })
        document.dispatchEvent(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-20 right-4 z-40"
        onClick={() => setIsOpen(true)}
        title="Atalhos de teclado (Ctrl + /)"
      >
        <Keyboard className="h-5 w-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Atalhos de Teclado</DialogTitle>
            <DialogDescription>
              Use estes atalhos para navegar mais rapidamente pelo sistema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
                <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsOpen(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
