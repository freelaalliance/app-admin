# 🎨 Guia de Cores Alliance - ERP Admin

## Paleta de Cores Aplicada

### Cores Principais

#### Alliance Primary (Azul)
**Uso**: Elementos principais, botões primários, links, destaque
- `alliance-primary-50`: #eff6ff (Backgrounds claros)
- `alliance-primary-100`: #dbeafe
- `alliance-primary-200`: #bfdbfe
- `alliance-primary-300`: #93c5fd
- `alliance-primary-400`: #60a5fa
- `alliance-primary-500`: **#0066cc** ⭐ (COR PRINCIPAL)
- `alliance-primary-600`: #0052a3
- `alliance-primary-700`: #00407a
- `alliance-primary-800`: #002f5c
- `alliance-primary-900`: #001f3d
- `alliance-primary-950`: #001429 (Backgrounds escuros)

#### Alliance Secondary (Laranja/Vermelho)
**Uso**: Destaques secundários, CTAs alternativos, badges especiais
- `alliance-secondary-50`: #fff7ed
- `alliance-secondary-100`: #ffedd5
- `alliance-secondary-200`: #fed7aa
- `alliance-secondary-300`: #fdba74
- `alliance-secondary-400`: #fb923c
- `alliance-secondary-500`: **#ff6b35** ⭐ (COR SECUNDÁRIA)
- `alliance-secondary-600`: #ea5a26
- `alliance-secondary-700`: #c2451e
- `alliance-secondary-800`: #9a3412
- `alliance-secondary-900`: #7c2d12
- `alliance-secondary-950`: #431407

### Cores de Status

#### Success (Verde)
**Uso**: Sucesso, aprovações, status positivo
- `alliance-success-500`: #22c55e
- `alliance-success-600`: #16a34a

#### Warning (Amarelo)
**Uso**: Avisos, alertas, atenção
- `alliance-warning-500`: #eab308
- `alliance-warning-600`: #ca8a04

#### Danger (Vermelho)
**Uso**: Erros, exclusões, crítico
- `alliance-danger-500`: #ef4444
- `alliance-danger-600`: #dc2626

#### Neutral (Cinza)
**Uso**: Textos, bordas, backgrounds neutros
- `alliance-neutral-50`: #f9fafb
- `alliance-neutral-100`: #f3f4f6
- `alliance-neutral-200`: #e5e7eb
- `alliance-neutral-300`: #d1d5db
- `alliance-neutral-400`: #9ca3af
- `alliance-neutral-500`: #6b7280
- `alliance-neutral-600`: #4b5563
- `alliance-neutral-700`: #374151
- `alliance-neutral-800`: #1f2937
- `alliance-neutral-900`: #111827

## 📍 Onde as Cores Foram Aplicadas

### ✅ Componentes Atualizados

#### Layout
- **DashboardHeader**: Header com gradiente azul Alliance (primary-600 → primary-700)
- **Breadcrumbs**: Navegação em branco sobre header azul

#### Cards e Métricas
- **MetricCard**: Ícones em azul primary, trends em cores de status
- **StatCard**: Ícones em laranja secondary, bordas hover em primary
- **Card**: Bordas neutral com hover suave

#### Formulários e Inputs
- **Button**: 
  - Default: Azul primary com hover/active
  - Secondary: Laranja secondary
  - Outline: Borda neutral com hover azul
  - Ghost: Hover azul claro
- **Input**: Bordas neutral, foco em azul primary
- **Badge**: Variantes com cores Alliance (primary, secondary, success, warning, danger)

#### Tabelas e Listas
- **DataTable**: 
  - Busca com ícone e contador em cores Alliance
  - Bordas neutral
- **Table**: 
  - Header em fundo neutral-50
  - Hover em primary-50
  - Bordas neutral

#### Seletores e Controles
- **EmpresaSelector**: 
  - Card com borda primary
  - Ícone destacado em primary
  - Hover items em primary-50
- **ThemeSwitcher**: Botão ghost branco sobre header azul

#### Estados
- **EmptyState**: Gradiente primary-secondary no ícone
- **LoadingSkeleton**: Mantém cores neutras

#### Páginas
- **Dashboard**: Background gradiente primary-50 + secondary-50

## 🎯 Padrões de Uso

### Hierarquia Visual
1. **Destaque Principal**: `alliance-primary-500` ou `alliance-primary-600`
2. **Destaque Secundário**: `alliance-secondary-500`
3. **Texto Principal**: `alliance-neutral-900` (light) / `alliance-neutral-100` (dark)
4. **Texto Secundário**: `alliance-neutral-600` (light) / `alliance-neutral-400` (dark)
5. **Bordas**: `alliance-neutral-200` (light) / `alliance-neutral-700` (dark)

### Estados Interativos
- **Hover**: Escurecer 100 (ex: primary-500 → primary-600)
- **Active**: Escurecer 200 (ex: primary-500 → primary-700)
- **Disabled**: Opacity 50%
- **Focus**: Ring em primary-500 com opacity

### Modo Escuro (Dark Mode)
- Automaticamente ajustado via variantes `dark:`
- Cores mais claras para melhor contraste
- Backgrounds em neutral-900/950

## 💡 Exemplos de Uso

### Botões
```tsx
// Primário
<Button className="bg-alliance-primary-500 hover:bg-alliance-primary-600">
  Salvar
</Button>

// Secundário
<Button className="bg-alliance-secondary-500 hover:bg-alliance-secondary-600">
  Exportar
</Button>

// Outline
<Button variant="outline" className="border-alliance-neutral-300 hover:bg-alliance-primary-50">
  Cancelar
</Button>
```

### Cards
```tsx
<Card className="border-alliance-neutral-200 dark:border-alliance-neutral-700 hover:shadow-lg">
  {/* conteúdo */}
</Card>
```

### Badges de Status
```tsx
<Badge className="bg-alliance-success-500">Ativo</Badge>
<Badge className="bg-alliance-warning-500">Pendente</Badge>
<Badge className="bg-alliance-danger-500">Cancelado</Badge>
```

### Gradientes
```tsx
// Header
<header className="bg-gradient-to-r from-alliance-primary-600 to-alliance-primary-700">

// Background
<div className="bg-gradient-to-br from-alliance-primary-50 via-white to-alliance-secondary-50">

// Texto
<h1 className="bg-gradient-to-r from-alliance-primary-600 to-alliance-secondary-600 bg-clip-text text-transparent">
```

## 🔄 Próximos Componentes a Atualizar

- [ ] Dialog
- [ ] Alert
- [ ] Tabs
- [ ] Accordion
- [ ] Select
- [ ] Checkbox/Radio
- [ ] Progress
- [ ] Calendário
- [ ] Dropdown Menu (já parcialmente atualizado)

## 📝 Ajustes Finais

Se as cores exatas do seu logo forem diferentes dos valores atuais:

1. Abra uma ferramenta de color picker (ex: imagecolorpicker.com)
2. Extraia as cores HEX do logo
3. Atualize em `tailwind.config.ts`:
   - Linha ~19: `alliance-primary-500` (azul principal)
   - Linha ~36: `alliance-secondary-500` (laranja/vermelho)

As variações (50-950) serão ajustadas automaticamente para manter a harmonia da paleta.
