import type { AllocationBucket } from '../domain/allocation'
import { bucketCopy } from '../config/copy'
import { formatNumber } from './formatNumber'

interface BucketCardProps {
  bucket: AllocationBucket
}

export function BucketCard({ bucket }: BucketCardProps) {
  const { label, description } = bucketCopy[bucket.key]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{label}</h3>
        <span className="shrink-0 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-200">
          {bucket.percentage}٪
        </span>
      </div>
      <p className="mt-1 text-2xl font-bold text-teal-700 dark:text-teal-400">
        {formatNumber(bucket.amount)}
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}
