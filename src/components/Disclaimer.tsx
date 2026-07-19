import { Info } from 'lucide-react'
import { copy } from '../config/copy'

export function Disclaimer() {
  return (
    <div
      className="flex items-start gap-3 rounded-[18px] p-5"
      style={{
        background: 'var(--bg-surface)',
        border:     '1px solid var(--border)',
        boxShadow:  'var(--shadow-card)',
      }}
    >
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--bg-subtle)', color: 'var(--text-3)' }}
      >
        <Info size={13} strokeWidth={2.5} />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>
          {copy.disclaimerTitle}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
          {copy.disclaimer}
        </p>
      </div>
    </div>
  )
}
