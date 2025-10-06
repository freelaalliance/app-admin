# 🔧 Guia de Manutenção - Cores Alliance

## 📋 Índice
1. [Ajustar Cores do Logo](#ajustar-cores-do-logo)
2. [Adicionar Novos Componentes](#adicionar-novos-componentes)
3. [Troubleshooting](#troubleshooting)
4. [Melhores Práticas](#melhores-práticas)

---

## 🎨 Ajustar Cores do Logo

Se precisar ajustar as cores exatas do logo:

### Passo 1: Extrair Cores do Logo

Use uma dessas ferramentas:
- **Online**: https://imagecolorpicker.com/
- **Chrome DevTools**: Eyedropper tool (F12 → Elements)
- **Design Tools**: Figma, Adobe Color

### Passo 2: Converter para HSL (opcional, mas recomendado)

As cores CSS modernas funcionam melhor em HSL. Converter de HEX para HSL:
- **Ferramenta**: https://www.w3schools.com/colors/colors_hsl.asp

### Passo 3: Atualizar Configuração

Edite `tailwind.config.ts`:

```typescript
// Encontre estas linhas (~linha 19 e ~36)
primary: {
  500: '#0066cc', // ← Substitua pelo azul do logo
},
secondary: {
  500: '#ff6b35', // ← Substitua pelo laranja do logo
},
```

### Passo 4: Atualizar CSS Global (se necessário)

Edite `src/styles/globals.css`:

```css
@theme {
  /* Ajuste o valor HSL se necessário */
  --color-primary: 210 100% 40%; /* H S L do azul */
  --color-secondary: 14 100% 60%; /* H S L do laranja */
}
```

### Passo 5: Testar

1. Reinicie o servidor: `npm run dev`
2. Acesse: http://localhost:3000/dashboard/exemplo-cores
3. Verifique se as cores estão corretas

---

## ➕ Adicionar Novos Componentes

Ao criar novos componentes, siga estes padrões:

### Template de Componente com Cores Alliance

```tsx
'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MeuComponenteProps {
  titulo: string
  className?: string
}

export function MeuComponente({ titulo, className }: MeuComponenteProps) {
  return (
    <Card className={cn(
      // Bordas neutras
      'border-alliance-neutral-200 dark:border-alliance-neutral-700',
      // Hover effect
      'hover:shadow-lg transition-shadow',
      className
    )}>
      <CardHeader>
        <CardTitle className="text-alliance-neutral-900 dark:text-alliance-neutral-100">
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Texto secundário */}
        <p className="text-alliance-neutral-600 dark:text-alliance-neutral-400">
          Conteúdo do componente
        </p>
        
        {/* Botão primário */}
        <Button className="mt-4">
          Ação Principal
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Checklist para Novos Componentes

- [ ] **Textos**: Use `alliance-neutral-900` (escuro) e `alliance-neutral-100` (claro)
- [ ] **Bordas**: Use `alliance-neutral-200/700`
- [ ] **Hover**: Adicione `hover:shadow-lg` ou `hover:bg-alliance-primary-50`
- [ ] **Focus**: Sempre inclua `focus:ring-2 focus:ring-alliance-primary-500`
- [ ] **Dark Mode**: Adicione variantes `dark:` para todas as cores
- [ ] **Ícones**: Use `alliance-primary-600` ou `alliance-secondary-500`

---

## 🔍 Troubleshooting

### Problema: Cores não aparecem

**Solução 1**: Verificar se o Tailwind está compilando
```bash
# Parar o servidor e reiniciar
npm run dev
```

**Solução 2**: Limpar cache do Tailwind
```bash
# Deletar pasta .next e reconstruir
rm -rf .next
npm run dev
```

**Solução 3**: Verificar se o arquivo está no content do Tailwind

Em `tailwind.config.ts`, verifique:
```typescript
content: [
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  // Seu arquivo deve estar em um desses caminhos
],
```

### Problema: Dark mode não funciona

**Verificar**:
1. `ThemeProvider` está no layout raiz? ✅
2. Atributo `suppressHydrationWarning` no `<html>`? ✅
3. Classes `dark:` estão aplicadas? 

```tsx
// ✅ Correto
<p className="text-alliance-neutral-900 dark:text-alliance-neutral-100">

// ❌ Errado (falta dark:)
<p className="text-alliance-neutral-900">
```

### Problema: Cores customizadas não funcionam

As cores customizadas da Alliance só funcionam com as classes exatas:

```tsx
// ✅ Correto
className="bg-alliance-primary-500"

// ❌ Errado (não existe no Tailwind)
className="bg-alliance-primary-550"
className="bg-alliance-primary"
```

Use apenas as variações disponíveis: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Problema: Gradientes não aparecem

Certifique-se de usar as classes corretas:

```tsx
// ✅ Correto - Gradiente de fundo
<div className="bg-gradient-to-r from-alliance-primary-600 to-alliance-primary-700">

// ✅ Correto - Gradiente de texto
<h1 className="bg-gradient-to-r from-alliance-primary-600 to-alliance-secondary-600 bg-clip-text text-transparent">

// ❌ Errado (bg-clip-text sem text-transparent)
<h1 className="bg-gradient-to-r from-alliance-primary-600 to-alliance-secondary-600 bg-clip-text">
```

---

## ✨ Melhores Práticas

### 1. Consistência Visual

**Use sempre as mesmas cores para os mesmos propósitos:**

```tsx
// Botões de ação principal
<Button>Sempre azul primary</Button>

// Botões de ação secundária
<Button variant="secondary">Sempre laranja secondary</Button>

// Status de sucesso
<Badge variant="success">Sempre verde</Badge>

// Status de erro
<Badge variant="destructive">Sempre vermelho</Badge>
```

### 2. Hierarquia Clara

**Mantenha hierarquia visual consistente:**

```tsx
// Nível 1 - Título principal
<h1 className="text-3xl font-bold text-alliance-neutral-900 dark:text-alliance-neutral-100">

// Nível 2 - Subtítulo
<h2 className="text-xl font-semibold text-alliance-neutral-800 dark:text-alliance-neutral-200">

// Nível 3 - Texto principal
<p className="text-alliance-neutral-700 dark:text-alliance-neutral-300">

// Nível 4 - Texto secundário
<span className="text-sm text-alliance-neutral-600 dark:text-alliance-neutral-400">

// Nível 5 - Texto terciário/placeholder
<span className="text-xs text-alliance-neutral-500">
```

### 3. Acessibilidade

**Sempre garanta contraste adequado:**

```tsx
// ✅ BOM - Alto contraste
<div className="bg-alliance-primary-500 text-white">
<div className="bg-white text-alliance-neutral-900">

// ⚠️ CUIDADO - Baixo contraste
<div className="bg-alliance-neutral-200 text-alliance-neutral-400">

// ❌ MAU - Muito baixo contraste
<div className="bg-alliance-primary-100 text-alliance-primary-200">
```

**Use ferramentas de verificação:**
- Chrome DevTools → Lighthouse (Accessibility)
- https://webaim.org/resources/contrastchecker/

### 4. Performance

**Evite classes dinâmicas que o Tailwind não pode detectar:**

```tsx
// ❌ MAU - Tailwind não consegue detectar
const color = isActive ? 'primary' : 'secondary'
<div className={`bg-alliance-${color}-500`}>

// ✅ BOM - Classes completas explícitas
<div className={isActive 
  ? 'bg-alliance-primary-500' 
  : 'bg-alliance-secondary-500'
}>
```

### 5. Reutilização

**Crie componentes reutilizáveis para padrões comuns:**

```tsx
// src/components/shared/StatusBadge.tsx
export function StatusBadge({ status }: { status: 'ativo' | 'inativo' | 'pendente' }) {
  const variants = {
    ativo: 'bg-alliance-success-500',
    inativo: 'bg-alliance-neutral-500',
    pendente: 'bg-alliance-warning-500',
  }
  
  return (
    <Badge className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
```

### 6. Documentação

**Sempre comente código complexo com cores customizadas:**

```tsx
// Gradiente especial para o header principal
// Usa a transição de azul primary para criar profundidade
<header className="bg-gradient-to-r from-alliance-primary-600 to-alliance-primary-700">
```

---

## 📚 Referências Rápidas

### Arquivos Importantes
- `tailwind.config.ts` - Configuração de cores
- `src/styles/globals.css` - Variáveis CSS
- `src/lib/alliance-colors.ts` - Referência de cores
- `CORES_ALLIANCE.md` - Documentação completa

### Páginas de Teste
- `/dashboard/exemplo-cores` - Visualização de todas as cores

### Comandos Úteis
```bash
# Reiniciar servidor
npm run dev

# Limpar cache e rebuild
rm -rf .next && npm run dev

# Build de produção (verificar se tudo funciona)
npm run build

# Verificar erros de TypeScript
npx tsc --noEmit
```

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique este guia primeiro
2. Consulte `CORES_ALLIANCE.md`
3. Veja exemplos em `/dashboard/exemplo-cores`
4. Revise `src/lib/alliance-colors.ts`

**Lembre-se**: Consistência é fundamental! Use sempre as mesmas cores para os mesmos propósitos.
