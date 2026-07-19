export type RiskProfile = 'defensive' | 'balanced' | 'aggressive'

export type BucketKey =
  | 'firstEntry'
  | 'firstReinforcement'
  | 'secondReinforcement'
  | 'reserveLiquidity'

/**
 * Educational capital-management heuristics, not investment advice.
 * Each profile's percentages must sum to 100.
 */
export const ALLOCATION_RULES: Record<RiskProfile, Record<BucketKey, number>> = {
  defensive: {
    firstEntry: 15,
    firstReinforcement: 25,
    secondReinforcement: 40,
    reserveLiquidity: 20,
  },
  balanced: {
    firstEntry: 25,
    firstReinforcement: 30,
    secondReinforcement: 30,
    reserveLiquidity: 15,
  },
  aggressive: {
    firstEntry: 40,
    firstReinforcement: 25,
    secondReinforcement: 25,
    reserveLiquidity: 10,
  },
}

export const BUCKET_ORDER: BucketKey[] = [
  'firstEntry',
  'firstReinforcement',
  'secondReinforcement',
  'reserveLiquidity',
]
