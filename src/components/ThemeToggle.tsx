import { Sun, Moon } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
      className="flex items-center justify-center rounded-xl"
      style={{
        width:      40,
        height:     40,
        background: 'var(--bg-subtle)',
        border:     '1px solid var(--border)',
        color:      'var(--text-3)',
        cursor:     'pointer',
        flexShrink: 0,
        outline:    'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color        = 'var(--brand)'
        e.currentTarget.style.borderColor  = 'var(--brand)'
        e.currentTarget.style.background   = 'var(--brand-subtle)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color        = 'var(--text-3)'
        e.currentTarget.style.borderColor  = 'var(--border)'
        e.currentTarget.style.background   = 'var(--bg-subtle)'
      }}
      onFocus={e => {
        e.currentTarget.style.boxShadow    = '0 0 0 3px var(--brand-ring)'
      }}
      onBlur={e => {
        e.currentTarget.style.boxShadow    = 'none'
      }}
    >
      {theme === 'light'
        ? <Moon size={15} strokeWidth={2} />
        : <Sun  size={15} strokeWidth={2} />
      }
    </button>
  )
}
