import { Info } from 'lucide-react'
import { copy } from '../config/copy'

export function Disclaimer() {
  return (
    <div
      className="rounded-[18px] p-5"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: '#F3F4F6', color: '#9CA3AF' }}
        >
          <Info size={13} strokeWidth={2.5} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold" style={{ color: '#374151' }}>
            {copy.disclaimerTitle}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </div>
  )
}
