export type RiskProfile = 'conservative' | 'balanced' | 'growth'

export type BucketKey =
  | 'firstEntry'
  | 'futureOpportunities'
  | 'liquidity'
  | 'emergencyReserve'

/**
 * Educational capital-management heuristics, not investment advice.
 * Each profile's percentages must sum to 100.
 */
export const ALLOCATION_RULES: Record<RiskProfile, Record<BucketKey, number>> = {
  conservative: {
    firstEntry: 25,
    futureOpportunities: 25,
    liquidity: 20,
    emergencyReserve: 30,
  },
  balanced: {
    firstEntry: 35,
    futureOpportunities: 30,
    liquidity: 20,
    emergencyReserve: 15,
  },
  growth: {
    firstEntry: 45,
    futureOpportunities: 30,
    liquidity: 15,
    emergencyReserve: 10,
  },
}

export const BUCKET_ORDER: BucketKey[] = [
  'firstEntry',
  'futureOpportunities',
  'liquidity',
  'emergencyReserve',
]
