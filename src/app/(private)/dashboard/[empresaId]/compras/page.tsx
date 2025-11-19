'use client'

import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import FornecedoresTab from './_components/tabs/FornecedoresTab'
import ComprasTab from './_components/tabs/ComprasTab'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useConfiguracoesMap, useCriarOuAtualizarConfiguracao } from '@/hooks/use-configuracao-empresa'

// Chaves de configuração do módulo de compras
const CONFIG_KEYS = {
  HABILITAR_FRETE: 'compras_habilitar_frete',
  HABILITAR_ARMAZENAMENTO: 'compras_habilitar_armazenamento',
  HABILITAR_LOCAL_ENTREGA: 'compras_habilitar_local_entrega',
  HABILITAR_FORMA_PAGAMENTO: 'compras_habilitar_forma_pagamento',
  HABILITAR_IMPOSTOS: 'compras_habilitar_impostos',
} as const

export default function ComprasPage() {
  const params = useParams()
  const empresaId = params.empresaId as string

  // Hook para buscar configurações
  const { configuracoes, isLoading: loadingConfigs } = useConfiguracoesMap(empresaId)

  // Hook para criar/atualizar configurações
  const { mutate: salvarConfiguracao } = useCriarOuAtualizarConfiguracao()

  // Handler para alteração de configuração
  const handleConfigChange = (chave: string, valor: boolean) => {
    salvarConfiguracao({
      empresaId,
      chave,
      valor: valor.toString(),
    })
  }

  const handleExportarPDF = () => {
    // TODO: Implementar exportação para PDF
    console.log('Exportar PDF - Compras')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
          <p className="text-muted-foreground">
            Gerencie fornecedores e acompanhe suas compras
          </p>
        </div>
        <Button onClick={handleExportarPDF} variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fornecedores" className="space-y-6">
        <TabsList>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          <TabsTrigger value="compras">Compras</TabsTrigger>
          <TabsTrigger value='configuracoes'>Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores" className="space-y-6">
          <FornecedoresTab empresaId={empresaId} />
        </TabsContent>

        <TabsContent value="compras" className="space-y-6">
          <ComprasTab empresaId={empresaId} />
        </TabsContent>
        <TabsContent value='configuracoes' className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Configurações de Compras</h3>
              <p className="text-sm text-muted-foreground">
                Personalize os campos habilitados no módulo de compras
              </p>
            </div>

            <div className="grid gap-4">
              {/* Habilitar campo informação frete */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="frete">Informação de Frete</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação de frete nas compras
                  </p>
                </div>
                <Switch
                  id="frete"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_FRETE] === 'true'}
                  onCheckedChange={(checked) => 
                    handleConfigChange(CONFIG_KEYS.HABILITAR_FRETE, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo informação local de armazenamento */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="armazenamento">Local de Armazenamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação do local de armazenamento
                  </p>
                </div>
                <Switch
                  id="armazenamento"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_ARMAZENAMENTO] === 'true'}
                  onCheckedChange={(checked) => 
                    handleConfigChange(CONFIG_KEYS.HABILITAR_ARMAZENAMENTO, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo informação local para entrega */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="entrega">Local para Entrega</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação do local de entrega
                  </p>
                </div>
                <Switch
                  id="entrega"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_LOCAL_ENTREGA] === 'true'}
                  onCheckedChange={(checked) => 
                    handleConfigChange(CONFIG_KEYS.HABILITAR_LOCAL_ENTREGA, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo Forma de pagamento */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="pagamento">Forma de Pagamento</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para seleção da forma de pagamento
                  </p>
                </div>
                <Switch
                  id="pagamento"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_FORMA_PAGAMENTO] === 'true'}
                  onCheckedChange={(checked) => 
                    handleConfigChange(CONFIG_KEYS.HABILITAR_FORMA_PAGAMENTO, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>

              {/* Habilitar campo impostos */}
              <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="impostos">Impostos</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilita o campo para informação de impostos nas compras
                  </p>
                </div>
                <Switch
                  id="impostos"
                  checked={configuracoes?.[CONFIG_KEYS.HABILITAR_IMPOSTOS] === 'true'}
                  onCheckedChange={(checked) => 
                    handleConfigChange(CONFIG_KEYS.HABILITAR_IMPOSTOS, checked)
                  }
                  disabled={loadingConfigs}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
