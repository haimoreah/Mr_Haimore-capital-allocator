import {
  ALLOCATION_RULES,
  BUCKET_ORDER,
  type BucketKey,
  type RiskProfile,
} from '../config/allocationRules'

export interface AllocationBucket {
  key: BucketKey
  percentage: number
  amount: number
}

export interface AllocationResult {
  totalCapital: number
  riskProfile: RiskProfile
  buckets: AllocationBucket[]
}

/**
 * Splits totalCapital into whole-unit amounts matching each bucket's
 * percentage as closely as possible, while guaranteeing the amounts
 * sum exactly to totalCapital (largest-remainder rounding).
 */
function distributeRounded(
  totalCapital: number,
  percentages: Record<BucketKey, number>,
): Record<BucketKey, number> {
  const rawAmounts = BUCKET_ORDER.map((key) => ({
    key,
    raw: (totalCapital * percentages[key]) / 100,
  }))

  const floored = rawAmounts.map(({ key, raw }) => ({
    key,
    amount: Math.floor(raw),
    remainder: raw - Math.floor(raw),
  }))

  const flooredTotal = floored.reduce((sum, b) => sum + b.amount, 0)
  let unitsLeft = Math.round(totalCapital - flooredTotal)

  const byRemainderDesc = [...floored].sort((a, b) => b.remainder - a.remainder)
  const amounts: Record<BucketKey, number> = {} as Record<BucketKey, number>
  for (const b of floored) amounts[b.key] = b.amount

  for (const b of byRemainderDesc) {
    if (unitsLeft <= 0) break
    amounts[b.key] += 1
    unitsLeft -= 1
  }

  return amounts
}

export function calculateAllocation(
  totalCapital: number,
  riskProfile: RiskProfile,
): AllocationResult {
  if (!Number.isFinite(totalCapital) || totalCapital < 0) {
    throw new RangeError('totalCapital must be a finite number >= 0')
  }

  const percentages = ALLOCATION_RULES[riskProfile]
  const amounts = distributeRounded(totalCapital, percentages)

  const buckets: AllocationBucket[] = BUCKET_ORDER.map((key) => ({
    key,
    percentage: percentages[key],
    amount: amounts[key],
  }))

  return { totalCapital, riskProfile, buckets }
}
