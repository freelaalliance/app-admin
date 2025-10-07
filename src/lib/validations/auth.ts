import { z } from "zod"

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Obrigatório informar o email!',
    })
    .email({ message: 'Email inválido!' }),
  senha: z
    .string({
      required_error: 'Obrigatório informar a senha!',
    })
    .min(8, { message: 'A senha precisa ter no minimo 8 dígitos' }),
})

export type LoginFormData = z.infer<typeof loginFormSchema>