import type { AllocationResult } from '../domain/allocation'
import { copy } from '../config/copy'
import { BucketCard } from './BucketCard'

interface AllocationResultsProps {
  result: AllocationResult
}

export function AllocationResults({ result }: AllocationResultsProps) {
  return (
    <section className="flex flex-col gap-3" aria-live="polite">
      {/* Section label */}
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--text-3)', letterSpacing: '0.08em' }}
      >
        {copy.resultsTitle}
      </p>

      {/* Result cards grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {result.buckets.map((bucket, i) => (
          <BucketCard key={bucket.key} bucket={bucket} index={i} />
        ))}
      </div>

      {/* Success callout */}
      <div
        className="fade-up mt-1 flex items-center gap-2.5 rounded-2xl px-4 py-3"
        style={{
          animationDelay: '280ms',
          background:    'var(--success-subtle)',
          border:        '1px solid var(--success-border)',
        }}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: 'var(--success)', color: '#fff' }}
        >
          ✓
        </span>
        <p className="text-sm font-medium" style={{ color: 'var(--success)' }}>
          تم حساب التوزيع بنجاح — المبالغ أعلاه تعكس أسلوبك المختار.
        </p>
      </div>
    </section>
  )
}
