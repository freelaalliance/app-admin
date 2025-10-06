export function formatarCNPJ(cnpj: string): string {
  const numeros = cnpj.replace(/\D/g, '')
  return numeros.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}

export function validarCNPJ(cnpj: string): boolean {
  const numeros = cnpj.replace(/\D/g, '')

  if (numeros.length !== 14) return false
  if (/^(\d)\1+$/.test(numeros)) return false

  let soma = 0
  let pos = 5
  for (let i = 0; i < 12; i++) {
    soma += parseInt(numeros.charAt(i)) * pos
    pos = pos === 2 ? 9 : pos - 1
  }
  const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  soma = 0
  pos = 6
  for (let i = 0; i < 13; i++) {
    soma += parseInt(numeros.charAt(i)) * pos
    pos = pos === 2 ? 9 : pos - 1
  }
  const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  return (
    digito1 === parseInt(numeros.charAt(12)) &&
    digito2 === parseInt(numeros.charAt(13))
  )
}

export function aplicarMascaraDocumento(valor: string): string {
  const valorNumeros = String(valor).replace(/\D/g, '')

  if (valorNumeros.length === 11) {
    return valorNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4')
  }
  return valorNumeros.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.***.***/$4-$5'
  )
}