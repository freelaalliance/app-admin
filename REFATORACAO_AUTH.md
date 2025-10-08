# Refatoração: Autenticação Client-Side

## 📋 Resumo da Mudança

Refatoração completa do sistema de autenticação de **Server Actions** para **Client-Side API calls**.

## 🔄 Mudanças Realizadas

### 1. **Criado novo serviço de API** (`src/lib/api/auth.ts`)
- Funções `login()` e `logout()` que fazem fetch diretamente para o backend
- Uso de `credentials: 'include'` para permitir cookies cross-origin
- Retorna interfaces tipadas `LoginResponse` e `LogoutResponse`

### 2. **Atualizado LoginForm** (`src/components/form/login.tsx`)
- Removido import de `loginAction` (Server Action)
- Adicionado import de `login` (API Client)
- Usa `window.location.href = '/'` para redirect após sucesso
- Tratamento de erro usando `error.message`

### 3. **Atualizado DashboardHeader** (`src/components/layout/DashboardHeader.tsx`)
- Removido import de `logoutAction` (Server Action)
- Adicionado import de `logout` (API Client)
- Usa `window.location.href = '/login'` para redirect após logout
- Garante redirect mesmo em caso de erro

### 4. **Removido arquivo de Server Actions** (`src/lib/actions/auth.ts`)
- Arquivo não é mais necessário
- Todas as chamadas agora são client-side

## ✅ Vantagens da Nova Abordagem

1. **Simplicidade**: Código mais direto e fácil de entender
2. **Cookies automáticos**: Backend gerencia completamente os cookies via `set-cookie`
3. **Menos erros**: Elimina erros como `NEXT_REDIRECT` e `UnrecognizedActionError`
4. **Melhor controle**: Redirect usando `window.location.href` garante reload completo
5. **Consistência**: Mesma abordagem em login e logout

## 🔧 Requisitos do Backend

Para que funcione corretamente, o backend deve ter **CORS configurado**:

```javascript
// Fastify
app.register(require('@fastify/cors'), {
  origin: 'http://localhost:3001', // URL do Next.js
  credentials: true, // IMPORTANTE: permite cookies
})
```

## 📝 Fluxo de Autenticação

### Login:
1. Usuário preenche formulário
2. `login()` faz POST para `/admin/login`
3. Backend autentica e seta cookie `sessionAdmin`
4. Navegador recebe e armazena o cookie automaticamente
5. Frontend redireciona com `window.location.href = '/'`
6. Middleware detecta cookie e permite acesso

### Logout:
1. Usuário clica em "Sair"
2. `logout()` faz POST para `/admin/logout`
3. Backend limpa o cookie `sessionAdmin`
4. Frontend redireciona com `window.location.href = '/login'`
5. Middleware detecta ausência de cookie e mantém em `/login`

## 🎯 Arquivos Modificados

- ✅ `src/lib/api/auth.ts` (CRIADO)
- ✅ `src/components/form/login.tsx` (ATUALIZADO)
- ✅ `src/components/layout/DashboardHeader.tsx` (ATUALIZADO)
- ❌ `src/lib/actions/auth.ts` (REMOVIDO)

## 📅 Data da Refatoração

7 de outubro de 2025
