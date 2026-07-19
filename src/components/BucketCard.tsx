import type { AllocationBucket } from '../domain/allocation'
import type { BucketKey } from '../config/allocationRules'
import { bucketCopy } from '../config/copy'
import { formatNumber } from './formatNumber'
import { ArrowUpRight, TrendingUp, RefreshCw, Wallet } from 'lucide-react'

interface BucketCardProps {
  bucket: AllocationBucket
  index:  number
}

const ICONS: Record<BucketKey, React.ReactNode> = {
  firstEntry:          <ArrowUpRight size={18} strokeWidth={2} />,
  firstReinforcement:  <TrendingUp   size={18} strokeWidth={2} />,
  secondReinforcement: <RefreshCw    size={18} strokeWidth={2} />,
  reserveLiquidity:    <Wallet       size={18} strokeWidth={2} />,
}

export function BucketCard({ bucket, index }: BucketCardProps) {
  const { label, description } = bucketCopy[bucket.key]

  return (
    <div
      className="bucket-card fade-up rounded-[20px] flex flex-col gap-3"
      style={{
        padding:        20,
        animationDelay: `${index * 60}ms`,
        background:     'var(--bg-surface)',
        border:         '1px solid var(--border)',
        boxShadow:      'var(--shadow-card)',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        {/* Icon + label */}
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'var(--brand-subtle)', color: 'var(--brand)' }}
          >
            {ICONS[bucket.key]}
          </span>
          <span
            className="font-semibold leading-tight"
            style={{ fontSize: 13, color: 'var(--text-1)' }}
          >
            {label}
          </span>
        </div>

        {/* Percentage badge */}
        <span
          className="shrink-0 rounded-full px-2.5 py-1 tabular-nums font-bold"
          style={{
            fontSize:    12,
            background:  'var(--brand-subtle)',
            color:       'var(--brand)',
            border:      '1px solid rgba(17,181,217,.18)',
            lineHeight:  1,
          }}
        >
          {bucket.percentage}٪
        </span>
      </div>

      {/* Amount */}
      <p
        className="bucket-amount tabular-nums font-extrabold"
        style={{
          fontSize:      28,
          letterSpacing: '-0.035em',
          color:         'var(--brand)',
          lineHeight:    1,
        }}
      >
        {formatNumber(bucket.amount)}
      </p>

      {/* Description */}
      <p
        className="leading-relaxed"
        style={{ fontSize: 13, color: 'var(--text-3)' }}
      >
        {description}
      </p>
    </div>
  )
}
