import type { AllocationResult } from '../domain/allocation'
import { copy } from '../config/copy'
import { BucketCard } from './BucketCard'

interface AllocationResultsProps {
  result: AllocationResult
}

export function AllocationResults({ result }: AllocationResultsProps) {
  return (
    <section className="flex flex-col gap-3" aria-live="polite">
      <h2
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}
      >
        {copy.resultsTitle}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {result.buckets.map((bucket, index) => (
          <BucketCard key={bucket.key} bucket={bucket} index={index} />
        ))}
      </div>
    </section>
  )
}
