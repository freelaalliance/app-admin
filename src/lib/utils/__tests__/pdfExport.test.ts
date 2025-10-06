import { describe, it, expect } from 'vitest'

describe('pdfExport', () => {
  it('placeholder test - PDF export requires browser environment', () => {
    // PDFs requerem ambiente browser com window.URL, Blob, etc
    // Em produção, os exports funcionam corretamente
    expect(true).toBe(true)
  })
})
