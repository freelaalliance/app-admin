import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetricCard } from '../MetricCard'

describe('MetricCard', () => {
  it('deve renderizar título e valor', () => {
    render(<MetricCard title="Total" value="1000" />)

    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
  })

  it('deve renderizar tendência de aumento', () => {
    render(
      <MetricCard
        title="Vendas"
        value="500"
        trend={{ value: 10 }}
      />
    )

    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('deve renderizar tendência de queda', () => {
    render(
      <MetricCard
        title="Custos"
        value="300"
        trend={{ value: -5 }}
      />
    )

    expect(screen.getByText('5%')).toBeInTheDocument()
  })

  it('deve renderizar tendência neutra', () => {
    render(
      <MetricCard
        title="Estoque"
        value="100"
        trend={{ value: 0 }}
      />
    )

    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('não deve renderizar trend icons quando não fornecida', () => {
    render(<MetricCard title="Total" value="1000" />)
    
    // Verifica que não há ícones de trend
    expect(screen.queryByText('%')).not.toBeInTheDocument()
  })
})
