import { useState, type FormEvent } from 'react'
import type { RiskProfile } from '../config/allocationRules'
import { ALLOCATION_RULES, BUCKET_ORDER } from '../config/allocationRules'
import { copy, riskProfileCopy } from '../config/copy'

const RISK_PROFILES: RiskProfile[] = ['defensive', 'balanced', 'aggressive']

// Segment colors per spec
const BAR_COLORS = ['#20D6C7', '#7CEAE1', '#E63946', '#3B434D'] as const

// Per-profile accent: dot color, selected border color
const PROFILE_ACCENT: Record<RiskProfile, { dot: string; border: string }> = {
  defensive: { dot: '#20D6C7', border: '#20D6C7' },
  balanced:  { dot: '#A7B0BC', border: '#20D6C7' },
  aggressive:{ dot: '#E63946', border: '#E63946' },
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Capital input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="capital"
          className="text-sm font-medium"
          style={{ color: '#E5E7EB' }}
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
          onChange={(e) => setCapitalInput(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-lg outline-none transition"
          style={{
            background: '#0A0C0F',
            border: '1px solid #262D36',
            color: '#F8FAFC',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#20D6C7'
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(32,214,199,0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#262D36'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        <p className="text-xs" style={{ color: '#707986' }}>
          {copy.capitalCurrencyHint}
        </p>
        {error && (
          <p className="text-sm" style={{ color: '#E63946' }}>{error}</p>
        )}
      </div>

      {/* Style selection */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium" style={{ color: '#E5E7EB' }}>
          {copy.riskProfileLabel}
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {RISK_PROFILES.map((profile) => {
            const selected = profile === riskProfile
            const rules = ALLOCATION_RULES[profile]
            const { label, bullets } = riskProfileCopy[profile]
            const accent = PROFILE_ACCENT[profile]
            const pctSummary = BUCKET_ORDER.map((k) => `${rules[k]}٪`).join(' • ')

            return (
              <button
                key={profile}
                type="button"
                onClick={() => setRiskProfile(profile)}
                className="rounded-xl p-4 text-start transition-all"
                style={{
                  background: selected ? '#15191F' : '#101318',
                  border: `1px solid ${selected ? accent.border : '#262D36'}`,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid ${accent.border}`
                  e.currentTarget.style.outlineOffset = '2px'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none'
                }}
              >
                {/* Title row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold" style={{ color: '#F8FAFC' }}>
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
                  className="mt-1 block text-xs tabular-nums"
                  style={{ color: '#A7B0BC' }}
                >
                  {pctSummary}
                </span>

                {/* Allocation bar */}
                <div
                  className="mt-2 flex h-1.5 w-full overflow-hidden rounded-full"
                  style={{ background: '#1C222A' }}
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
                <ul className="mt-3 flex flex-col gap-1">
                  {bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-xs"
                      style={{ color: '#A7B0BC' }}
                    >
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: accent.dot }}
                      >
                        ●
                      </span>
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
        className="w-full rounded-xl px-4 py-3 text-lg font-bold transition-colors"
        style={{ background: '#20D6C7', color: '#050608' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#129C93' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#20D6C7' }}
        onMouseDown={(e) => { e.currentTarget.style.background = '#0E7A73' }}
        onMouseUp={(e) => { e.currentTarget.style.background = '#129C93' }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #20D6C7'
          e.currentTarget.style.outlineOffset = '2px'
        }}
        onBlur={(e) => { e.currentTarget.style.outline = 'none' }}
      >
        {copy.submit}
      </button>
    </form>
  )
}
