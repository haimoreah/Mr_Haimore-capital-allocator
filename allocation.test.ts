import { describe, expect, it } from 'vitest'
import { calculateAllocation } from './allocation'
import { ALLOCATION_RULES, type RiskProfile } from '../config/allocationRules'

const PROFILES = Object.keys(ALLOCATION_RULES) as RiskProfile[]

describe('calculateAllocation', () => {
  it.each(PROFILES)('rules for %s profile sum to 100%%', (profile) => {
    const total = Object.values(ALLOCATION_RULES[profile]).reduce(
      (a, b) => a + b,
      0,
    )
    expect(total).toBe(100)
  })

  it.each(PROFILES)(
    'bucket amounts sum exactly to totalCapital for %s profile',
    (profile) => {
      const result = calculateAllocation(10000, profile)
      const sum = result.buckets.reduce((acc, b) => acc + b.amount, 0)
      expect(sum).toBe(10000)
    },
  )

  it('handles zero capital', () => {
    const result = calculateAllocation(0, 'balanced')
    expect(result.buckets.every((b) => b.amount === 0)).toBe(true)
  })

  it('handles amounts that do not divide evenly', () => {
    const result = calculateAllocation(1000.37, 'balanced')
    const sum = result.buckets.reduce((acc, b) => acc + b.amount, 0)
    expect(sum).toBe(Math.round(1000.37))
  })

  it('handles small capital without losing units to rounding', () => {
    const result = calculateAllocation(3, 'growth')
    const sum = result.buckets.reduce((acc, b) => acc + b.amount, 0)
    expect(sum).toBe(3)
  })

  it('throws for negative capital', () => {
    expect(() => calculateAllocation(-1, 'balanced')).toThrow(RangeError)
  })

  it('throws for non-finite capital', () => {
    expect(() => calculateAllocation(NaN, 'balanced')).toThrow(RangeError)
    expect(() => calculateAllocation(Infinity, 'balanced')).toThrow(RangeError)
  })

  it('preserves the requested risk profile and total in the result', () => {
    const result = calculateAllocation(5000, 'conservative')
    expect(result.totalCapital).toBe(5000)
    expect(result.riskProfile).toBe('conservative')
    expect(result.buckets).toHaveLength(4)
  })
})
