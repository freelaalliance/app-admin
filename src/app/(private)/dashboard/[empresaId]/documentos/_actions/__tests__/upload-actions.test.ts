/**
 * Testes unitários para as Server Actions de upload/download/delete
 * 
 * Para executar: npm test upload-actions.test.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { uploadFile, downloadFile, deleteFile } from '../upload-actions'

// Mock do AWS SDK
vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: vi.fn().mockImplementation(() => ({
    send: vi.fn(),
  })),
  PutObjectCommand: vi.fn(),
  GetObjectCommand: vi.fn(),
  DeleteObjectCommand: vi.fn(),
  HeadObjectCommand: vi.fn(),
}))

// Mock do getSignedUrl
vi.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: vi.fn(),
}))

describe('uploadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve retornar erro quando arquivo não for fornecido', async () => {
    const formData = new FormData()
    formData.append('keyArquivo', 'test.pdf')

    const result = await uploadFile(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeDefined()
      expect(result.message).toBeDefined()
    }
  })

  it('deve retornar erro quando keyArquivo não for fornecida', async () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadFile(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeDefined()
    }
  })

  it('deve validar tipo de arquivo File', async () => {
    const formData = new FormData()
    formData.append('file', 'not-a-file')
    formData.append('keyArquivo', 'test.pdf')

    const result = await uploadFile(formData)

    expect(result.success).toBe(false)
  })
})

describe('downloadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve retornar erro quando fileName for vazio', async () => {
    const result = await downloadFile('')

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.message).toContain('Nome do arquivo')
    }
  })

  it('deve retornar erro quando fileName for apenas espaços', async () => {
    const result = await downloadFile('   ')

    expect(result.success).toBe(false)
  })
})

describe('deleteFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve retornar erro quando fileName for vazio', async () => {
    const result = await deleteFile('')

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.message).toContain('Nome do arquivo')
    }
  })

  it('deve validar fileName corretamente', async () => {
    const result = await deleteFile('   ')

    expect(result.success).toBe(false)
  })
})

describe('Type Guards', () => {
  it('deve ter tipos discriminados corretamente', async () => {
    const formData = new FormData()
    const result = await uploadFile(formData)

    if (result.success) {
      // TypeScript deve inferir que 'key' existe aqui
      expect(result.key).toBeDefined()
      expect(result.message).toBeDefined()
    } else {
      // TypeScript deve inferir que 'error' existe aqui
      expect(result.error).toBeDefined()
      expect(result.message).toBeDefined()
    }
  })
})
