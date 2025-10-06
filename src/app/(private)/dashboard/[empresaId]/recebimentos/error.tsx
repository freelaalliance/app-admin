'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function RecebimentosError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erro na página de Recebimentos:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <Card className="p-8 max-w-md w-full text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar Recebimentos</h2>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro ao carregar os dados de recebimentos. Por favor, tente novamente.
        </p>
        <Button onClick={reset} variant="default">
          Tentar Novamente
        </Button>
      </Card>
    </div>
  )
}
