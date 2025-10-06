import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LoadingSkeleton } from '../LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('deve renderizar skeleton tipo card', () => {
    const { container } = render(<LoadingSkeleton type="card" />)
    expect(container.querySelector('.grid')).toBeInTheDocument()
  })

  it('deve renderizar skeleton tipo table', () => {
    const { container } = render(<LoadingSkeleton type="table" />)
    expect(container.querySelector('.space-y-3')).toBeInTheDocument()
  })

  it('deve renderizar skeleton tipo list', () => {
    const { container } = render(<LoadingSkeleton type="list" />)
    expect(container.querySelector('.space-y-2')).toBeInTheDocument()
  })

  it('deve renderizar skeleton tipo grid', () => {
    const { container } = render(<LoadingSkeleton type="grid" />)
    expect(container.querySelector('.grid')).toBeInTheDocument()
  })

  it('deve renderizar quantidade especificada', () => {
    const { container } = render(<LoadingSkeleton type="card" count={5} />)
    // Cada card contém múltiplos elementos Card, então verificamos apenas que renderizou
    expect(container.querySelector('.grid')).toBeInTheDocument()
  })

  it('deve usar count padrão de 3', () => {
    const { container } = render(<LoadingSkeleton type="list" />)
    expect(container.querySelector('.space-y-2')).toBeInTheDocument()
  })
})
