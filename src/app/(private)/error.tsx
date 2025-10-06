'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erro na página de administração:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2">Algo deu errado!</h2>
      <p className="text-muted-foreground text-center mb-4 max-w-md">
        Ocorreu um erro ao carregar a página de administração. Por favor, tente novamente.
      </p>
      <Button onClick={reset}>Tentar Novamente</Button>
    </div>
  )
}
