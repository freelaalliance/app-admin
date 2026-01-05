'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { validarCNPJ } from '@/lib/utils/cnpj'
import { buscarCep } from '@/lib/api/viacep'
import type { empresaType, EmpresaFormType } from '../../_types/empresaTypes'

interface EmpresaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: EmpresaFormType) => Promise<void>
  empresa?: empresaType | null
  isSubmitting?: boolean
}

export function EmpresaDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  empresa = null,
  isSubmitting = false 
}: EmpresaDialogProps) {
  const [formData, setFormData] = useState<EmpresaFormType>({
    nome: '',
    cnpj: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    idPessoa: '',
  })

  const [cnpjError, setCnpjError] = useState<string>('')
  const [cepLoading, setCepLoading] = useState(false)

  useEffect(() => {
    if (empresa) {
      setFormData({
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        cep: empresa.cep || '',
        logradouro: empresa.logradouro || '',
        numero: empresa.numero || '',
        complemento: empresa.complemento || '',
        bairro: empresa.bairro || '',
        cidade: empresa.cidade || '',
        estado: empresa.estado || '',
        idPessoa: empresa.idPessoa || '',
      })
    } else {
      setFormData({
        nome: '',
        cnpj: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        idPessoa: '',
      })
    }
    setCnpjError('')
  }, [empresa, open])

  const handleCNPJChange = (value: string) => {
    const cnpj = value.replace(/\D/g, '')
    setFormData(prev => ({ ...prev, cnpj }))
    
    if (cnpj.length === 14) {
      if (!validarCNPJ(cnpj)) {
        setCnpjError('CNPJ inválido')
      } else {
        setCnpjError('')
      }
    } else {
      setCnpjError('')
    }
  }

  const handleCEPChange = async (value: string) => {
    const cep = value.replace(/\D/g, '')
    setFormData(prev => ({ ...prev, cep }))
    
    if (cep.length === 8) {
      setCepLoading(true)
      try {
        const endereco = await buscarCep(cep)
        if (endereco) {
          setFormData(prev => ({
            ...prev,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf,
          }))
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      } finally {
        setCepLoading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cnpjError) return
    if (!validarCNPJ(formData.cnpj)) {
      setCnpjError('CNPJ inválido')
      return
    }

    await onSubmit(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{empresa ? 'Editar Empresa' : 'Nova Empresa'}</DialogTitle>
          <DialogDescription>
            {empresa 
              ? 'Atualize as informações da empresa' 
              : 'Preencha os dados para cadastrar uma nova empresa'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Empresa *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => handleCNPJChange(e.target.value)}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                required
              />
              {cnpjError && <p className="text-sm text-red-500">{cnpjError}</p>}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-4">Endereço</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <div className="relative">
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    required
                  />
                  {cepLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logradouro">Logradouro *</Label>
                <Input
                  id="logradouro"
                  value={formData.logradouro}
                  onChange={(e) => setFormData(prev => ({ ...prev, logradouro: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero">Número *</Label>
                <Input
                  id="numero"
                  value={formData.numero}
                  onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  value={formData.complemento}
                  onChange={(e) => setFormData(prev => ({ ...prev, complemento: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) => setFormData(prev => ({ ...prev, bairro: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.value }))}
                  maxLength={2}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="shadow-md text-sm uppercase leading-none rounded"
              type="button"
              variant={'secondary'}
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button className="shadow-md text-sm uppercase leading-none rounded" type="submit" disabled={isSubmitting || !!cnpjError}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {empresa ? 'Salvar' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
