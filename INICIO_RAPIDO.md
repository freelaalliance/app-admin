# ⚡ Guia de Início Rápido - ERP Alliance

## 🚀 Passo a Passo para Executar

### 1️⃣ Instalar Dependências

Abra o PowerShell e execute:

```powershell
npm install
```

Este comando irá instalar todas as dependências listadas no `package.json`.

### 2️⃣ Verificar Instalação

Após a instalação, verifique se não há erros:

```powershell
npm list --depth=0
```

### 3️⃣ Executar em Modo Desenvolvimento

```powershell
npm run dev
```

O servidor será iniciado em: **http://localhost:3000**

### 4️⃣ Acessar a Aplicação

Abra seu navegador e acesse:
- **Dashboard:** http://localhost:3000/dashboard
- **Módulo Calibração (exemplo):** http://localhost:3000/dashboard/[empresa-id]/calibracao

---

## 📋 Estrutura Criada

### ✅ Configurações
- ✅ `package.json` - Todas as dependências configuradas
- ✅ `tsconfig.json` - TypeScript configurado
- ✅ `tailwind.config.ts` - Tailwind CSS 4
- ✅ `next.config.js` - Next.js 15
- ✅ `components.json` - shadcn/ui
- ✅ `.env.local` - Variáveis de ambiente
- ✅ `.gitignore` - Arquivos ignorados

### ✅ Bibliotecas Core
- ✅ `lib/axios.ts` - Cliente HTTP configurado
- ✅ `lib/react-query.tsx` - Provider do React Query
- ✅ `lib/utils.ts` - Utilitários (cn function)
- ✅ `lib/utils/cnpj.ts` - Validação de CNPJ
- ✅ `lib/api/viacep.ts` - Integração ViaCEP
- ✅ `lib/atoms/empresaAtom.ts` - Estado global (Jotai)

### ✅ Componentes UI (shadcn/ui)
- ✅ `components/ui/button.tsx`
- ✅ `components/ui/card.tsx`
- ✅ `components/ui/select.tsx`
- ✅ `components/ui/tabs.tsx`
- ✅ `components/ui/badge.tsx`
- ✅ `components/ui/input.tsx`
- ✅ `components/ui/label.tsx`
- ✅ `components/ui/skeleton.tsx`

### ✅ Componentes Compartilhados
- ✅ `components/shared/IndicadorInfo.tsx`
- ✅ `components/shared/StatCard.tsx`
- ✅ `components/shared/CalendarioEventos.tsx`
- ✅ `components/shared/EmpresaSelector.tsx`

### ✅ Layouts e Páginas
- ✅ `app/layout.tsx` - Layout raiz com providers
- ✅ `app/page.tsx` - Redirect para dashboard
- ✅ `app/globals.css` - Estilos globais
- ✅ `app/dashboard/page.tsx` - Página inicial do dashboard
- ✅ `app/dashboard/loading.tsx` - Estado de loading

### ✅ Módulo Calibração (Exemplo Completo)
- ✅ `dashboard/[empresaId]/calibracao/page.tsx`
- ✅ `dashboard/[empresaId]/calibracao/loading.tsx`
- ✅ `dashboard/[empresaId]/calibracao/error.tsx`
- ✅ `dashboard/[empresaId]/calibracao/_types/calibracaoTypes.ts`
- ✅ `dashboard/[empresaId]/calibracao/_api/calibracaoApi.ts`
- ✅ `dashboard/[empresaId]/calibracao/_hooks/useCalibracoesData.ts`
- ✅ `dashboard/[empresaId]/calibracao/_components/cards/EstatisticasCard.tsx`
- ✅ `dashboard/[empresaId]/calibracao/_components/HistoricoList.tsx`

---

## 📦 Próximos Módulos a Criar

Use o módulo de Calibração como referência para criar:

### 1. **Compras** (`/dashboard/[empresaId]/compras`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] Componentes (Tabs: Fornecedores e Compras)
- [ ] Página principal

### 2. **Documentos** (`/dashboard/[empresaId]/documentos`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] Tabela de documentos
- [ ] Página principal

### 3. **Expedição** (`/dashboard/[empresaId]/expedicao`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] Cards de indicadores
- [ ] Lista de expedições
- [ ] Página principal

### 4. **Manutenção** (`/dashboard/[empresaId]/manutencao`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] Seletor de equipamento
- [ ] Tabs (Métricas, Inspeções, Manutenções)
- [ ] Página principal

### 5. **Recebimentos** (`/dashboard/[empresaId]/recebimentos`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] Filtros de data
- [ ] Tabela e gráficos
- [ ] Página principal

### 6. **RH** (`/dashboard/[empresaId]/rh`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] StatCards com tendências
- [ ] Análise de rotatividade
- [ ] Tabs de colaboradores
- [ ] Página principal

### 7. **Vendas** (`/dashboard/[empresaId]/vendas`)
- [ ] Types
- [ ] API Functions
- [ ] Custom Hooks
- [ ] Cards de estatísticas
- [ ] Página principal

### 8. **Empresas - Admin** (`/dashboard/admin/empresas`)
- [ ] Types (Empresa, Módulo, Perfil, Usuário)
- [ ] API Functions (CRUD completo)
- [ ] Custom Hooks
- [ ] Seletor de empresa
- [ ] Tabs (Módulos, Perfis, Usuários)
- [ ] Formulários
- [ ] Página principal

---

## 🎯 Padrão de Implementação

Cada módulo deve seguir esta estrutura:

```
[modulo]/
├── page.tsx              # Página principal (use client)
├── loading.tsx           # Loading state
├── error.tsx             # Error boundary
├── _types/
│   └── [modulo]Types.ts  # Tipos TypeScript
├── _api/
│   └── [modulo]Api.ts    # Funções de API (Axios)
├── _hooks/
│   └── use[Modulo]Data.ts # Custom hooks (React Query)
└── _components/
    ├── cards/            # Componentes de cards
    ├── charts/           # Componentes de gráficos
    └── tables/           # Componentes de tabelas
```

---

## 🔧 Comandos Essenciais

```powershell
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start

# Verificar erros de lint
npm run lint

# Adicionar componente shadcn/ui
npx shadcn-ui@latest add [nome-componente]
```

---

## 📚 Documentação Detalhada

Consulte o arquivo `PROMPT_CRIACAO_PAINEIS.md` para:
- 📖 Especificações completas de cada módulo
- 🎨 Padrões de design e estilo
- 🔌 Endpoints de API
- 💡 Exemplos de código
- 🎯 Boas práticas

---

## ⚠️ Notas Importantes

1. **Erros de TypeScript:** Os erros mostrados são normais antes de executar `npm install`. Eles desaparecerão após a instalação das dependências.

2. **API URL:** Configure a URL da sua API no arquivo `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://sua-api.com/api
   ```

3. **Estrutura de Resposta da API:** Todas as chamadas de API esperam este formato:
   ```typescript
   {
     status: boolean
     msg: string
     dados: T  // Seus dados aqui
     erro?: string | null
   }
   ```

4. **Autenticação:** O token de autenticação é gerenciado automaticamente pelo interceptor do Axios (localStorage).

---

## 🎉 Pronto para Começar!

Agora você pode:
1. ✅ Executar `npm install`
2. ✅ Executar `npm run dev`
3. ✅ Acessar http://localhost:3000
4. ✅ Começar a desenvolver os módulos restantes

---

**Boa Codificação! 🚀**
