'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit, Trash2, UserPlus, Mail, Shield } from 'lucide-react'
import { useUsuarios, useToggleUsuarioStatus, useDeleteUsuario } from '../../_hooks/useAdminData'
import type { UsuarioSimples } from '../../_types/usuarioTypes'

interface UsuariosTabProps {
  empresaId: string
  onNovoUsuario: () => void
  onEditUsuario: (usuario: UsuarioSimples) => void
}

const statusColors: Record<string, string> = {
  ativo: 'bg-green-500',
  desativado: 'bg-gray-500',
}

export function UsuariosTab({ empresaId, onNovoUsuario, onEditUsuario }: UsuariosTabProps) {
  const { data, isLoading } = useUsuarios(empresaId)
  const toggleStatus = useToggleUsuarioStatus()
  const deleteUsuario = useDeleteUsuario()

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleToggleStatus = async (usuario: UsuarioSimples) => {
    try {
      await toggleStatus.mutateAsync({ 
        id: usuario.id, 
        status: { status: usuario.status !== 'ativo' } 
      })
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteUsuario.mutateAsync(id)
      setConfirmDelete(null)
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        ))}
      </div>
    )
  }

  const usuarios = data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {usuarios.length} usuário(s) cadastrado(s)
        </p>
        <Button onClick={onNovoUsuario}>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="space-y-3">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{usuario.nome}</h4>
                  <Badge 
                    className={statusColors[usuario.status]}
                    onClick={() => handleToggleStatus(usuario)}
                    style={{ cursor: 'pointer' }}
                  >
                    {usuario.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{usuario.email}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>{usuario.perfil}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditUsuario(usuario)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                {confirmDelete === usuario.id ? (
                  <div className="flex gap-1">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Confirmar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDelete(usuario.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {usuarios.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <UserPlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhum usuário cadastrado</p>
            <p className="text-sm">Clique no botão acima para adicionar o primeiro usuário</p>
          </div>
        )}
      </div>
    </div>
  )
}
