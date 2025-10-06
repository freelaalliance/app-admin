import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from '../EmptyState'
import { FileQuestion, FileX } from 'lucide-react'

describe('EmptyState', () => {
  it('deve renderizar título e descrição', () => {
    render(
      <EmptyState
        icon={FileX}
        title="Nenhum dado encontrado"
        description="Não há dados para exibir"
      />
    )

    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument()
    expect(screen.getByText('Não há dados para exibir')).toBeInTheDocument()
  })

  it('deve renderizar ícone customizado', () => {
    render(
      <EmptyState
        icon={FileQuestion}
        title="Sem arquivos"
        description="Nenhum arquivo encontrado"
      />
    )

    expect(screen.getByText('Sem arquivos')).toBeInTheDocument()
  })

  it('deve renderizar botão de ação quando fornecido', () => {
    render(
      <EmptyState
        icon={FileX}
        title="Sem dados"
        description="Descrição"
        action={{ label: 'Adicionar', onClick: () => {} }}
      />
    )

    expect(screen.getByText('Adicionar')).toBeInTheDocument()
  })

  it('não deve renderizar botão quando action não for fornecido', () => {
    render(
      <EmptyState
        icon={FileX}
        title="Sem dados"
        description="Descrição"
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
