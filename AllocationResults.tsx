import type { AllocationResult } from '../domain/allocation'
import { copy } from '../config/copy'
import { BucketCard } from './BucketCard'

interface AllocationResultsProps {
  result: AllocationResult
}

export function AllocationResults({ result }: AllocationResultsProps) {
  return (
    <section className="flex flex-col gap-4" aria-live="polite">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {copy.resultsTitle}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {result.buckets.map((bucket) => (
          <BucketCard key={bucket.key} bucket={bucket} />
        ))}
      </div>
    </section>
  )
}
