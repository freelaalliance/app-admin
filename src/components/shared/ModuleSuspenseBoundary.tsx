'use client'

import { Suspense, type ReactNode } from 'react'
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton'

interface ModuleSuspenseBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  type?: 'card' | 'table' | 'list' | 'grid'
}

export function ModuleSuspenseBoundary({
  children,
  fallback,
  type = 'card',
}: ModuleSuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback || <LoadingSkeleton type={type} count={3} />}>
      {children}
    </Suspense>
  )
}
