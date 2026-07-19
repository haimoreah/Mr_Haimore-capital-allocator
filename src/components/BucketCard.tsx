import type { AllocationBucket } from '../domain/allocation'
import { bucketCopy } from '../config/copy'
import { formatNumber } from './formatNumber'

interface BucketCardProps {
  bucket: AllocationBucket
}

export function BucketCard({ bucket }: BucketCardProps) {
  const { label, description } = bucketCopy[bucket.key]

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: '#101318', border: '1px solid #262D36' }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold" style={{ color: '#F8FAFC' }}>
          {label}
        </h3>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums"
          style={{ background: '#1C222A', color: '#A7B0BC' }}
        >
          {bucket.percentage}٪
        </span>
      </div>
      <p
        className="mt-2 text-2xl font-bold tabular-nums"
        style={{ color: '#20D6C7' }}
      >
        {formatNumber(bucket.amount)}
      </p>
      <p className="mt-2 text-sm" style={{ color: '#707986' }}>
        {description}
      </p>
    </div>
  )
}
