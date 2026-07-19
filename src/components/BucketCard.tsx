import type { AllocationBucket } from '../domain/allocation'
import { bucketCopy } from '../config/copy'
import { formatNumber } from './formatNumber'
import {
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Wallet,
} from 'lucide-react'
import type { BucketKey } from '../config/allocationRules'

interface BucketCardProps {
  bucket: AllocationBucket
  index: number
}

const BUCKET_ICONS: Record<BucketKey, React.ReactNode> = {
  firstEntry:          <ArrowUpRight size={16} strokeWidth={2} />,
  firstReinforcement:  <TrendingUp   size={16} strokeWidth={2} />,
  secondReinforcement: <RefreshCw    size={16} strokeWidth={2} />,
  reserveLiquidity:    <Wallet       size={16} strokeWidth={2} />,
}

export function BucketCard({ bucket, index }: BucketCardProps) {
  const { label, description } = bucketCopy[bucket.key]
  const icon = BUCKET_ICONS[bucket.key]

  return (
    <div
      className="fade-in rounded-[18px] p-5"
      style={{
        animationDelay: `${index * 60}ms`,
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Label + icon */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: '#F0FBFF', color: '#11B5D9' }}
          >
            {icon}
          </span>
          <h3 className="text-sm font-semibold" style={{ color: '#111111' }}>
            {label}
          </h3>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums"
          style={{ background: '#F3F4F6', color: '#6B7280' }}
        >
          {bucket.percentage}٪
        </span>
      </div>

      {/* Amount */}
      <p
        className="mt-3 text-2xl font-bold tabular-nums tracking-tight"
        style={{ color: '#11B5D9', letterSpacing: '-0.03em' }}
      >
        {formatNumber(bucket.amount)}
      </p>

      {/* Description */}
      <p className="mt-2 text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
        {description}
      </p>
    </div>
  )
}
