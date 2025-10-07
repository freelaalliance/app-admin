'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Plus, Pencil, Trash2 } from 'lucide-react'
import { usePerfisEmpresa, useCreatePerfil, useUpdatePerfil, useDeletePerfil } from '../../_hooks/useAdminData'
import type { Perfil, PerfilEmpresa } from '../../_types/perfilTypes'

interface PerfisTabProps {
  empresaId: string
}

export function PerfisTab({ empresaId }: PerfisTabProps) {
  const { data: perfisData, isLoading } = usePerfisEmpresa(empresaId)
  const createPerfil = useCreatePerfil()
  const updatePerfil = useUpdatePerfil()
  const deletePerfil = useDeletePerfil()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPerfil, setEditingPerfil] = useState<Perfil | PerfilEmpresa | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    administrativo: false,
  })

  const handleOpenDialog = (perfil?: Perfil | PerfilEmpresa) => {
    if (perfil) {
      setEditingPerfil(perfil)
      if ('perfil_nome' in perfil) {
        // É PerfilEmpresa
        const perfilEmpresa = perfil as PerfilEmpresa
        setFormData({
          nome: perfilEmpresa.perfil_nome,
          administrativo: perfilEmpresa.perfil_administrativo || false,
        })
      } else {
        // É Perfil
        const perfilSimples = perfil as Perfil
        setFormData({
          nome: perfilSimples.nome,
          administrativo: perfilSimples.administrativo,
        })
      }
    } else {
      setEditingPerfil(null)
      setFormData({
        nome: '',
        administrativo: false,
      })
    }
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingPerfil) {
        const perfilId = 'perfil_id' in editingPerfil ? editingPerfil.perfil_id : editingPerfil.id
        await updatePerfil.mutateAsync({
          id: perfilId,
          data: formData,
        })
      } else {
        await createPerfil.mutateAsync({ ...formData, empresa: empresaId })
      }
      setDialogOpen(false)
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
    }
  }

  const handleDelete = async (perfilId: string) => {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      try {
        await deletePerfil.mutateAsync(perfilId)
      } catch (error) {
        console.error('Erro ao excluir perfil:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const perfis = perfisData || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Gerencie os perfis de acesso dos usuários desta empresa
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Perfil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPerfil ? 'Editar Perfil' : 'Novo Perfil'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="administrativo">Administrativo</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="administrativo"
                    checked={formData.administrativo}
                    onChange={(e) => setFormData({ ...formData, administrativo: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground">
                    Perfil com permissões administrativas
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingPerfil ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {perfis.map((perfilEmpresa: PerfilEmpresa) => {
          const isProcessing = deletePerfil.isPending

          return (
            <Card key={perfilEmpresa.perfil_id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">{perfilEmpresa.perfil_nome}</CardTitle>
                  </div>
                  {perfilEmpresa.perfil_administrativo && (
                    <Badge variant="destructive">Admin</Badge>
                  )}
                </div>
                <CardDescription className="text-sm">
                  Perfil de acesso para usuários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{perfilEmpresa.usuarios_count || 0}</span> usuário(s) com este perfil
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => handleOpenDialog(perfilEmpresa)}
                    disabled={isProcessing}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={() => handleDelete(perfilEmpresa.perfil_id)}
                    disabled={isProcessing || (perfilEmpresa.usuarios_count || 0) > 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
