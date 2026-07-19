import { Info } from 'lucide-react'
import { copy } from '../config/copy'

export function Disclaimer() {
  return (
    <div
      className="flex items-start gap-3 rounded-[16px] px-4 py-3.5"
      style={{
        background: 'var(--bg-subtle)',
        border:     '1px solid var(--border)',
      }}
    >
      <Info
        size={14}
        strokeWidth={2.5}
        style={{ color: 'var(--text-3)', flexShrink: 0, marginTop: 2 }}
      />
      <div className="flex flex-col gap-0.5">
        <p
          className="font-semibold"
          style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}
        >
          {copy.disclaimerTitle}
        </p>
        <p
          className="leading-relaxed"
          style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}
        >
          {copy.disclaimer}
        </p>
      </div>
    </div>
  )
}
