import { useState, type FormEvent } from 'react'
import type { RiskProfile } from '../config/allocationRules'
import { ALLOCATION_RULES, BUCKET_ORDER } from '../config/allocationRules'
import { copy, riskProfileCopy } from '../config/copy'

const RISK_PROFILES: RiskProfile[] = ['defensive', 'balanced', 'aggressive']

// Bar segment colors — work on white background
const BAR_COLORS = ['#11B5D9', '#7DD3EA', '#93C5FD', '#D1D5DB'] as const

// Per-profile accent
const PROFILE_ACCENT: Record<RiskProfile, { dot: string; border: string; bg: string }> = {
  defensive: { dot: '#11B5D9', border: '#11B5D9', bg: '#F0FBFF' },
  balanced:  { dot: '#6B7280', border: '#6B7280', bg: '#F9FAFB' },
  aggressive:{ dot: '#EF4444', border: '#EF4444', bg: '#FFF5F5' },
}

interface CapitalFormProps {
  onSubmit: (totalCapital: number, riskProfile: RiskProfile) => void
}

export function CapitalForm({ onSubmit }: CapitalFormProps) {
  const [capitalInput, setCapitalInput] = useState('')
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const value = Number(capitalInput)
    if (!capitalInput.trim() || !Number.isFinite(value) || value <= 0) {
      setError(copy.validation.required)
      return
    }
    setError(null)
    onSubmit(value, riskProfile)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">

      {/* Capital input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="capital"
          className="text-sm font-semibold"
          style={{ color: '#111111' }}
        >
          {copy.capitalLabel}
        </label>
        <input
          id="capital"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder={copy.capitalPlaceholder}
          value={capitalInput}
          onChange={(e) => { setCapitalInput(e.target.value); setError(null) }}
          className="w-full rounded-xl px-4 py-3.5 text-lg outline-none transition-all"
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E5E7EB',
            color: '#111111',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#11B5D9'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,181,217,0.10)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        <p className="text-xs" style={{ color: '#9CA3AF' }}>
          {copy.capitalCurrencyHint}
        </p>
        {error && (
          <p className="text-sm font-medium" style={{ color: '#EF4444' }}>{error}</p>
        )}
      </div>

      {/* Profile selection */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold" style={{ color: '#111111' }}>
          {copy.riskProfileLabel}
        </span>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {RISK_PROFILES.map((profile) => {
            const selected = profile === riskProfile
            const rules = ALLOCATION_RULES[profile]
            const { label, bullets } = riskProfileCopy[profile]
            const accent = PROFILE_ACCENT[profile]
            const pctSummary = BUCKET_ORDER.map((k) => `${rules[k]}٪`).join(' · ')

            return (
              <button
                key={profile}
                type="button"
                onClick={() => setRiskProfile(profile)}
                className="rounded-[14px] p-4 text-start transition-all duration-200"
                style={{
                  background: selected ? accent.bg : '#FAFAFA',
                  border: `1.5px solid ${selected ? accent.border : '#E5E7EB'}`,
                  outline: 'none',
                  boxShadow: selected ? `0 0 0 3px ${accent.border}22` : 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${accent.border}33`
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = selected ? `0 0 0 3px ${accent.border}22` : 'none'
                }}
              >
                {/* Title row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm" style={{ color: '#111111' }}>
                    {label}
                  </span>
                  {selected && (
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: accent.border }}
                      aria-label="محدد"
                    />
                  )}
                </div>

                {/* Percentages */}
                <span
                  className="mt-1 block text-xs tabular-nums font-medium"
                  style={{ color: '#9CA3AF' }}
                >
                  {pctSummary}
                </span>

                {/* Allocation bar */}
                <div
                  className="mt-2.5 flex h-1 w-full overflow-hidden rounded-full"
                  style={{ background: '#F3F4F6' }}
                >
                  {BUCKET_ORDER.map((key, i) => (
                    <div
                      key={key}
                      style={{
                        width: `${rules[key]}%`,
                        background: BAR_COLORS[i],
                      }}
                    />
                  ))}
                </div>

                {/* Bullet points */}
                <ul className="mt-3 flex flex-col gap-1.5">
                  {bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-xs"
                      style={{ color: '#6B7280' }}
                    >
                      <span
                        className="mt-[3px] shrink-0 h-1.5 w-1.5 rounded-full"
                        style={{ background: accent.dot, flexShrink: 0 }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200"
        style={{ background: '#11B5D9', color: '#FFFFFF', letterSpacing: '-0.01em' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#0E9FBF' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#11B5D9' }}
        onMouseDown={(e)  => { e.currentTarget.style.background = '#0C8AA6' }}
        onMouseUp={(e)    => { e.currentTarget.style.background = '#0E9FBF' }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #11B5D9'
          e.currentTarget.style.outlineOffset = '2px'
        }}
        onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
      >
        {copy.submit}
      </button>
    </form>
  )
}
