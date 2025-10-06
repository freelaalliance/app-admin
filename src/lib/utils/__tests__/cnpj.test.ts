import { describe, it, expect } from 'vitest'
import { validarCNPJ, formatarCNPJ } from '../cnpj'

describe('cnpj utils', () => {
  describe('validarCNPJ', () => {
    it('deve validar CNPJs válidos', () => {
      expect(validarCNPJ('11.222.333/0001-81')).toBe(true)
      expect(validarCNPJ('11222333000181')).toBe(true)
    })

    it('deve rejeitar CNPJs inválidos', () => {
      expect(validarCNPJ('11.222.333/0001-82')).toBe(false)
      expect(validarCNPJ('00.000.000/0000-00')).toBe(false)
      expect(validarCNPJ('11111111111111')).toBe(false)
    })

    it('deve rejeitar CNPJs com formato incorreto', () => {
      expect(validarCNPJ('123')).toBe(false)
      expect(validarCNPJ('')).toBe(false)
      expect(validarCNPJ('abc')).toBe(false)
    })
  })

  describe('formatarCNPJ', () => {
    it('deve formatar CNPJ corretamente', () => {
      expect(formatarCNPJ('11222333000181')).toBe('11.222.333/0001-81')
      expect(formatarCNPJ('11.222.333/0001-81')).toBe('11.222.333/0001-81')
    })

    it('deve retornar string formatada mesmo para entrada parcial', () => {
      expect(formatarCNPJ('123')).toBe('123')
    })
  })
})
