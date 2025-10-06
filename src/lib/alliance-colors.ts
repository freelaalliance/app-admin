/**
 * GUIA DE REFERÊNCIA RÁPIDA - CORES ALLIANCE
 * 
 * Use este arquivo como referência rápida ao desenvolver novos componentes
 */

// ============================================================================
// CORES PRINCIPAIS
// ============================================================================

export const ALLIANCE_COLORS = {
  // Azul Principal (Primary) - Uso: Elementos principais, botões primários, links
  primary: {
    50: 'alliance-primary-50',   // #eff6ff - Backgrounds muito claros
    100: 'alliance-primary-100', // #dbeafe
    200: 'alliance-primary-200', // #bfdbfe
    300: 'alliance-primary-300', // #93c5fd
    400: 'alliance-primary-400', // #60a5fa
    500: 'alliance-primary-500', // #0066cc - ⭐ COR PRINCIPAL
    600: 'alliance-primary-600', // #0052a3 - Hover
    700: 'alliance-primary-700', // #00407a - Active
    800: 'alliance-primary-800', // #002f5c
    900: 'alliance-primary-900', // #001f3d
    950: 'alliance-primary-950', // #001429 - Dark mode backgrounds
  },

  // Laranja Secundário (Secondary) - Uso: CTAs alternativos, destaques
  secondary: {
    50: 'alliance-secondary-50',   // #fff7ed
    100: 'alliance-secondary-100', // #ffedd5
    200: 'alliance-secondary-200', // #fed7aa
    300: 'alliance-secondary-300', // #fdba74
    400: 'alliance-secondary-400', // #fb923c
    500: 'alliance-secondary-500', // #ff6b35 - ⭐ COR SECUNDÁRIA
    600: 'alliance-secondary-600', // #ea5a26 - Hover
    700: 'alliance-secondary-700', // #c2451e - Active
    800: 'alliance-secondary-800', // #9a3412
    900: 'alliance-secondary-900', // #7c2d12
    950: 'alliance-secondary-950', // #431407
  },

  // Verde Sucesso (Success) - Uso: Confirmações, status positivo
  success: {
    500: 'alliance-success-500', // #22c55e
    600: 'alliance-success-600', // #16a34a - Hover
  },

  // Amarelo Aviso (Warning) - Uso: Alertas, avisos
  warning: {
    500: 'alliance-warning-500', // #eab308
    600: 'alliance-warning-600', // #ca8a04 - Hover
  },

  // Vermelho Perigo (Danger) - Uso: Erros, exclusões, crítico
  danger: {
    500: 'alliance-danger-500', // #ef4444
    600: 'alliance-danger-600', // #dc2626 - Hover
  },

  // Cinza Neutro (Neutral) - Uso: Textos, bordas, backgrounds
  neutral: {
    50: 'alliance-neutral-50',   // #f9fafb - Background claro
    100: 'alliance-neutral-100', // #f3f4f6
    200: 'alliance-neutral-200', // #e5e7eb - Bordas
    300: 'alliance-neutral-300', // #d1d5db - Bordas input
    400: 'alliance-neutral-400', // #9ca3af - Placeholder
    500: 'alliance-neutral-500', // #6b7280
    600: 'alliance-neutral-600', // #4b5563 - Texto secundário
    700: 'alliance-neutral-700', // #374151 - Texto principal
    800: 'alliance-neutral-800', // #1f2937
    900: 'alliance-neutral-900', // #111827 - Texto escuro
    950: 'alliance-neutral-950', // #030712 - Dark mode bg
  },
}

// ============================================================================
// PADRÕES DE USO COMUNS
// ============================================================================

export const COMMON_PATTERNS = {
  // BOTÕES
  buttonPrimary: 'bg-alliance-primary-500 hover:bg-alliance-primary-600 active:bg-alliance-primary-700 text-white',
  buttonSecondary: 'bg-alliance-secondary-500 hover:bg-alliance-secondary-600 active:bg-alliance-secondary-700 text-white',
  buttonOutline: 'border-alliance-neutral-300 hover:bg-alliance-primary-50 hover:border-alliance-primary-400',
  buttonGhost: 'hover:bg-alliance-primary-50 hover:text-alliance-primary-700',
  buttonDestructive: 'bg-alliance-danger-500 hover:bg-alliance-danger-600 text-white',

  // TEXTOS
  textPrimary: 'text-alliance-neutral-900 dark:text-alliance-neutral-100',
  textSecondary: 'text-alliance-neutral-600 dark:text-alliance-neutral-400',
  textMuted: 'text-alliance-neutral-500 dark:text-alliance-neutral-500',
  textLink: 'text-alliance-primary-600 hover:text-alliance-primary-700',

  // BACKGROUNDS
  bgDefault: 'bg-white dark:bg-alliance-neutral-950',
  bgMuted: 'bg-alliance-neutral-50 dark:bg-alliance-neutral-900',
  bgAccent: 'bg-alliance-primary-50 dark:bg-alliance-primary-950',

  // BORDAS
  border: 'border-alliance-neutral-200 dark:border-alliance-neutral-700',
  borderInput: 'border-alliance-neutral-300 dark:border-alliance-neutral-600',
  borderFocus: 'focus:border-alliance-primary-500 focus:ring-2 focus:ring-alliance-primary-500',

  // CARDS
  card: 'border-alliance-neutral-200 dark:border-alliance-neutral-700 hover:shadow-lg transition-shadow',
  cardHeader: 'border-b border-alliance-neutral-200 dark:border-alliance-neutral-700',

  // BADGES
  badgeSuccess: 'bg-alliance-success-500 text-white',
  badgeWarning: 'bg-alliance-warning-500 text-white',
  badgeDanger: 'bg-alliance-danger-500 text-white',
  badgePrimary: 'bg-alliance-primary-500 text-white',
  badgeSecondary: 'bg-alliance-secondary-500 text-white',

  // ALERTS/NOTIFICAÇÕES
  alertSuccess: 'bg-alliance-success-50 border-alliance-success-200 text-alliance-success-800 dark:bg-alliance-success-900 dark:text-alliance-success-200',
  alertWarning: 'bg-alliance-warning-50 border-alliance-warning-200 text-alliance-warning-800 dark:bg-alliance-warning-900 dark:text-alliance-warning-200',
  alertDanger: 'bg-alliance-danger-50 border-alliance-danger-200 text-alliance-danger-800 dark:bg-alliance-danger-900 dark:text-alliance-danger-200',
  alertInfo: 'bg-alliance-primary-50 border-alliance-primary-200 text-alliance-primary-800 dark:bg-alliance-primary-900 dark:text-alliance-primary-200',

  // TABELAS
  tableHeader: 'bg-alliance-neutral-50 dark:bg-alliance-neutral-900 text-alliance-neutral-700 dark:text-alliance-neutral-300',
  tableRow: 'hover:bg-alliance-primary-50 dark:hover:bg-alliance-primary-950',
  tableRowSelected: 'bg-alliance-primary-100 dark:bg-alliance-primary-900',

  // GRADIENTES
  gradientHeader: 'bg-gradient-to-r from-alliance-primary-600 to-alliance-primary-700',
  gradientText: 'bg-gradient-to-r from-alliance-primary-600 to-alliance-secondary-600 bg-clip-text text-transparent',
  gradientBackground: 'bg-gradient-to-br from-alliance-primary-50 via-white to-alliance-secondary-50 dark:from-alliance-neutral-950 dark:via-alliance-neutral-900 dark:to-alliance-neutral-950',
}

// ============================================================================
// EXEMPLOS DE USO
// ============================================================================

/*
// EXEMPLO 1: Botão Primário
<button className="bg-alliance-primary-500 hover:bg-alliance-primary-600 text-white px-4 py-2 rounded-md">
  Salvar
</button>

// EXEMPLO 2: Card com hover
<div className="border-alliance-neutral-200 dark:border-alliance-neutral-700 hover:shadow-lg transition-shadow rounded-lg p-4">
  <h3 className="text-alliance-neutral-900 dark:text-alliance-neutral-100">Título</h3>
  <p className="text-alliance-neutral-600 dark:text-alliance-neutral-400">Descrição</p>
</div>

// EXEMPLO 3: Input com foco
<input 
  className="border-alliance-neutral-300 dark:border-alliance-neutral-600 focus:border-alliance-primary-500 focus:ring-2 focus:ring-alliance-primary-500"
  placeholder="Digite aqui..."
/>

// EXEMPLO 4: Badge de Status
<span className="bg-alliance-success-500 text-white px-2 py-1 rounded-full text-xs">
  Ativo
</span>

// EXEMPLO 5: Título com Gradiente
<h1 className="text-4xl font-bold bg-gradient-to-r from-alliance-primary-600 to-alliance-secondary-600 bg-clip-text text-transparent">
  ERP Alliance
</h1>

// EXEMPLO 6: Alert de Sucesso
<div className="bg-alliance-success-50 border border-alliance-success-200 text-alliance-success-800 dark:bg-alliance-success-900 dark:text-alliance-success-200 p-4 rounded-md">
  <p>Operação realizada com sucesso!</p>
</div>

// EXEMPLO 7: Tabela com Hover
<table>
  <thead className="bg-alliance-neutral-50 dark:bg-alliance-neutral-900">
    <tr>
      <th className="text-alliance-neutral-700 dark:text-alliance-neutral-300">Nome</th>
    </tr>
  </thead>
  <tbody>
    <tr className="hover:bg-alliance-primary-50 dark:hover:bg-alliance-primary-950">
      <td>Dados</td>
    </tr>
  </tbody>
</table>

// EXEMPLO 8: Ícone Destacado
<div className="p-3 bg-alliance-primary-100 dark:bg-alliance-primary-900 rounded-lg">
  <Icon className="h-6 w-6 text-alliance-primary-600 dark:text-alliance-primary-400" />
</div>
*/

// ============================================================================
// HIERARQUIA VISUAL
// ============================================================================

export const VISUAL_HIERARCHY = {
  // Ordem de importância visual
  emphasis: {
    highest: 'alliance-primary-500',      // Elemento principal
    high: 'alliance-secondary-500',       // Destaque secundário
    medium: 'alliance-neutral-900',       // Texto principal
    low: 'alliance-neutral-600',          // Texto secundário
    lowest: 'alliance-neutral-400',       // Texto terciário/placeholder
  },

  // Estados interativos
  states: {
    default: '500',
    hover: '600',     // Escurecer 100
    active: '700',    // Escurecer 200
    disabled: '50% opacity',
    focus: 'ring-alliance-primary-500',
  },
}

// ============================================================================
// ACESSIBILIDADE
// ============================================================================

export const ACCESSIBILITY_NOTES = `
IMPORTANTE para acessibilidade:

1. Contraste de Texto:
   - Texto principal sobre branco: usar neutral-900 ou mais escuro
   - Texto sobre primary-500: sempre usar branco (text-white)
   - Texto sobre secondary-500: sempre usar branco (text-white)

2. Foco Visível:
   - Sempre adicionar focus:ring-2 focus:ring-alliance-primary-500
   - Nunca usar outline-none sem alternativa visual

3. Dark Mode:
   - Sempre fornecer variante dark: para cores customizadas
   - Verificar contraste no modo escuro

4. Estados Desabilitados:
   - Usar opacity-50 e cursor-not-allowed
   - Manter indicação visual clara
`

export default ALLIANCE_COLORS
