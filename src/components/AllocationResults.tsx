import { CheckCircle } from 'lucide-react'
import type { AllocationResult } from '../domain/allocation'
import { copy } from '../config/copy'
import { BucketCard } from './BucketCard'

interface AllocationResultsProps {
  result: AllocationResult
}

export function AllocationResults({ result }: AllocationResultsProps) {
  return (
    <section className="flex flex-col gap-4" aria-live="polite">

      {/* Section label */}
      <div className="flex items-center gap-3" style={{ direction: 'rtl' }}>
        <span
          style={{
            fontSize:      11,
            fontWeight:    600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         'var(--text-3)',
            whiteSpace:    'nowrap',
          }}
        >
          {copy.resultsTitle}
        </span>
        <div
          style={{
            flex:       1,
            height:     1,
            background: 'var(--border)',
          }}
        />
      </div>

      {/* 2×2 grid — always */}
      <div className="grid grid-cols-2 gap-3">
        {result.buckets.map((bucket, i) => (
          <BucketCard key={bucket.key} bucket={bucket} index={i} />
        ))}
      </div>

      {/* Success callout */}
      <div
        className="fade-up flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{
          animationDelay: '300ms',
          background:     'var(--success-subtle)',
          border:         '1px solid var(--success-border)',
        }}
      >
        <CheckCircle
          size={16}
          strokeWidth={2.5}
          style={{ color: 'var(--success)', flexShrink: 0 }}
        />
        <p
          className="font-medium"
          style={{ fontSize: 13, color: 'var(--success)', margin: 0 }}
        >
          تم حساب التوزيع بنجاح — المبالغ تعكس أسلوبك المختار.
        </p>
      </div>
    </section>
  )
}
