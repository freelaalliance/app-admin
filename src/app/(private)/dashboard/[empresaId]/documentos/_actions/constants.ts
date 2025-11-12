/**
 * Constantes e configurações para operações de upload/download
 */

// ============================================================================
// LIMITES DE ARQUIVO
// ============================================================================

/**
 * Tamanho máximo de arquivo em bytes (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024

/**
 * Tamanho máximo de arquivo formatado para exibição
 */
export const MAX_FILE_SIZE_DISPLAY = '10MB'

/**
 * Tipos MIME permitidos para upload
 */
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
] as const

/**
 * Extensões de arquivo permitidas
 */
export const ALLOWED_EXTENSIONS = [
  '.pdf',
] as const

// ============================================================================
// CONFIGURAÇÕES DE TIMEOUT E RETRY
// ============================================================================

/**
 * Tempo de expiração da URL assinada (1 hora em segundos)
 */
export const SIGNED_URL_EXPIRATION = 3600

/**
 * Número máximo de tentativas para operações com retry
 */
export const MAX_RETRY_ATTEMPTS = 3

/**
 * Delay base para retry exponencial (em ms)
 */
export const RETRY_BASE_DELAY = 1000

// ============================================================================
// PREFIXOS DE CHAVE S3
// ============================================================================

/**
 * Estrutura de prefixos para organização de arquivos
 */
export const S3_KEY_PREFIXES = {
  DOCUMENTOS: 'documentos',
  EMPRESAS: 'empresas',
  TEMP: 'temp',
  EXPORTS: 'exports',
} as const

// ============================================================================
// MENSAGENS
// ============================================================================

/**
 * Mensagens de sucesso padronizadas
 */
export const SUCCESS_MESSAGES = {
  UPLOAD: 'Upload realizado com sucesso',
  DOWNLOAD: 'URL de download gerada com sucesso',
  DELETE: 'Arquivo excluído com sucesso',
} as const

/**
 * Mensagens de erro padronizadas
 */
export const ERROR_MESSAGES = {
  UPLOAD_FAILED: 'Falha ao fazer upload do arquivo',
  DOWNLOAD_FAILED: 'Falha ao gerar URL de download',
  DELETE_FAILED: 'Falha ao excluir arquivo',
  FILE_NOT_FOUND: 'Arquivo não encontrado',
  FILE_TOO_LARGE: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE_DISPLAY}`,
  INVALID_FILE_TYPE: 'Tipo de arquivo não permitido',
  INVALID_FILE_NAME: 'Nome do arquivo inválido',
  INVALID_CONFIG: 'Configuração S3 inválida',
  NO_FILE_PROVIDED: 'Nenhum arquivo fornecido',
  NO_KEY_PROVIDED: 'Chave do arquivo é obrigatória',
} as const

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Verifica se o tipo MIME do arquivo é permitido
 */
export function isAllowedMimeType(mimeType: string): boolean {
  return ALLOWED_MIME_TYPES.includes(mimeType as any)
}

/**
 * Verifica se a extensão do arquivo é permitida
 */
export function isAllowedExtension(fileName: string): boolean {
  const extension = fileName.toLowerCase().match(/\.[^.]+$/)?.[0]
  return extension ? ALLOWED_EXTENSIONS.includes(extension as any) : false
}

/**
 * Verifica se o tamanho do arquivo é permitido
 */
export function isValidFileSize(size: number): boolean {
  return size > 0 && size <= MAX_FILE_SIZE
}

/**
 * Sanitiza o nome do arquivo removendo caracteres especiais
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase()
}

/**
 * Gera uma chave S3 única para um arquivo
 */
export function generateS3Key(
  prefix: keyof typeof S3_KEY_PREFIXES,
  fileName: string,
  subFolder?: string
): string {
  const timestamp = Date.now()
  const sanitized = sanitizeFileName(fileName)
  const basePrefix = S3_KEY_PREFIXES[prefix]

  if (subFolder) {
    return `${basePrefix}/${subFolder}/${timestamp}-${sanitized}`
  }

  return `${basePrefix}/${timestamp}-${sanitized}`
}

/**
 * Formata o tamanho do arquivo para exibição
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Valida arquivo antes do upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: ERROR_MESSAGES.NO_FILE_PROVIDED }
  }

  if (!isValidFileSize(file.size)) {
    return { valid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE }
  }

  if (!isAllowedMimeType(file.type)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE }
  }

  if (!isAllowedExtension(file.name)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE }
  }

  return { valid: true }
}

/**
 * Calcula o delay para retry exponencial
 */
export function calculateRetryDelay(attempt: number): number {
  return RETRY_BASE_DELAY * Math.pow(2, attempt - 1)
}
