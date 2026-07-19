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
  firstEntry:          <ArrowUpRight size={15} strokeWidth={2.2} />,
  firstReinforcement:  <TrendingUp   size={15} strokeWidth={2.2} />,
  secondReinforcement: <RefreshCw    size={15} strokeWidth={2.2} />,
  reserveLiquidity:    <Wallet       size={15} strokeWidth={2.2} />,
}

export function BucketCard({ bucket, index }: BucketCardProps) {
  const { label, description } = bucketCopy[bucket.key]

  return (
    <div
      className="fade-up rounded-[18px] p-5 flex flex-col gap-3"
      style={{
        animationDelay: `${index * 55}ms`,
        background:    'var(--bg-surface)',
        border:        '1px solid var(--border)',
        boxShadow:     'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'var(--brand-subtle)', color: 'var(--brand)' }}
          >
            {ICONS[bucket.key]}
          </span>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
            {label}
          </span>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums"
          style={{ background: 'var(--bg-subtle)', color: 'var(--text-2)' }}
        >
          {bucket.percentage}٪
        </span>
      </div>

      {/* Amount */}
      <p
        className="tabular-nums font-bold tracking-tight"
        style={{
          fontSize:      28,
          letterSpacing: '-0.03em',
          color:         'var(--brand)',
          lineHeight:    1.1,
        }}
      >
        {formatNumber(bucket.amount)}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
        {description}
      </p>
    </div>
  )
}
