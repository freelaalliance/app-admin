'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function ComprasError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erro no módulo Compras:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>Erro ao carregar Compras</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ocorreu um erro ao carregar os dados de compras. Por favor, tente novamente.
          </p>
          {error.message && (
            <p className="text-sm text-destructive font-mono bg-destructive/10 p-2 rounded">
              {error.message}
            </p>
          )}
          <Button onClick={reset} className="w-full">
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
