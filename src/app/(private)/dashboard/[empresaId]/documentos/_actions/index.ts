/**
 * Índice principal do módulo de upload/download/delete de arquivos
 * 
 * Centraliza as exportações para facilitar as importações
 */

// Funções principais (Server Actions)
export { uploadFile, downloadFile, deleteFile } from './upload-actions'

// Tipos e Type Guards
export type {
  S3Config,
  UploadResult,
  DownloadResult,
  DeleteResult,
  UploadFileInput,
  FileNameInput,
} from './types'

export {
  isUploadSuccess,
  isDownloadSuccess,
  isDeleteSuccess,
} from './types'

// Constantes e utilitários
export {
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_DISPLAY,
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  SIGNED_URL_EXPIRATION,
  MAX_RETRY_ATTEMPTS,
  RETRY_BASE_DELAY,
  S3_KEY_PREFIXES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  isAllowedMimeType,
  isAllowedExtension,
  isValidFileSize,
  sanitizeFileName,
  generateS3Key,
  formatFileSize,
  validateFile,
  calculateRetryDelay,
} from './constants'

