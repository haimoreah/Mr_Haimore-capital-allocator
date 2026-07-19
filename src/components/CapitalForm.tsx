import { useState, type FormEvent } from 'react'
import { AlertCircle } from 'lucide-react'
import type { RiskProfile } from '../config/allocationRules'
import { ALLOCATION_RULES, BUCKET_ORDER } from '../config/allocationRules'
import { copy, riskProfileCopy } from '../config/copy'

const RISK_PROFILES: RiskProfile[] = ['defensive', 'balanced', 'aggressive']

const BAR_COLORS = ['#11B5D9', '#7DD3EA', '#93C5FD', '#D1D5DB'] as const

const PROFILE_ACCENT: Record<RiskProfile, { dot: string; border: string; bg: string; darkBg: string }> = {
  defensive: { dot: '#11B5D9', border: '#11B5D9', bg: '#F0FBFF',  darkBg: '#0D1E2E' },
  balanced:  { dot: '#8B91A7', border: '#8B91A7', bg: '#F9FAFB',  darkBg: '#1E2235' },
  aggressive:{ dot: '#F87171', border: '#EF4444', bg: '#FFF5F5',  darkBg: '#2A1414' },
}

interface CapitalFormProps {
  onSubmit: (totalCapital: number, riskProfile: RiskProfile) => void
  isLoading?: boolean
}

export function CapitalForm({ onSubmit, isLoading = false }: CapitalFormProps) {
  const [capitalInput, setCapitalInput] = useState('')
  const [riskProfile,  setRiskProfile]  = useState<RiskProfile>('balanced')
  const [error,        setError]        = useState<string | null>(null)
  const [touched,      setTouched]      = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched(true)
    const value = Number(capitalInput)
    if (!capitalInput.trim() || !Number.isFinite(value) || value <= 0) {
      setError(copy.validation.required)
      return
    }
    setError(null)
    onSubmit(value, riskProfile)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">

      {/* ── Capital input ── */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="capital"
          className="text-sm font-semibold"
          style={{ color: 'var(--text-1)' }}
        >
          {copy.capitalLabel}
        </label>

        <div className="relative">
          <input
            id="capital"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder={copy.capitalPlaceholder}
            value={capitalInput}
            disabled={isLoading}
            onChange={e => { setCapitalInput(e.target.value); if (touched) setError(null) }}
            className="w-full rounded-xl px-4 outline-none"
            style={{
              height: 'var(--h-input)',
              fontSize: 18,
              background:  'var(--bg-surface)',
              border:      `1.5px solid ${error ? 'var(--error)' : 'var(--border)'}`,
              color:       'var(--text-1)',
              borderRadius: 'var(--radius-input)',
              opacity: isLoading ? 0.6 : 1,
            }}
            onFocus={e => {
              if (!error) e.currentTarget.style.borderColor = 'var(--brand)'
              e.currentTarget.style.boxShadow = `0 0 0 3px var(--brand-ring)`
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = error ? 'var(--error)' : 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>

        {/* Error state */}
        {error ? (
          <div className="flex items-center gap-1.5 fade-up">
            <AlertCircle size={13} style={{ color: 'var(--error)', flexShrink: 0 }} />
            <p className="text-sm font-medium" style={{ color: 'var(--error)' }}>{error}</p>
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>
            {copy.capitalCurrencyHint}
          </p>
        )}
      </div>

      {/* ── Profile selector ── */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
          {copy.riskProfileLabel}
        </span>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {RISK_PROFILES.map(profile => {
            const selected = profile === riskProfile
            const rules    = ALLOCATION_RULES[profile]
            const { label, bullets } = riskProfileCopy[profile]
            const accent   = PROFILE_ACCENT[profile]
            const pctSummary = BUCKET_ORDER.map(k => `${rules[k]}٪`).join(' · ')

            return (
              <button
                key={profile}
                type="button"
                disabled={isLoading}
                onClick={() => setRiskProfile(profile)}
                className="profile-card rounded-[14px] p-4 text-start"
                style={{
                  background:  selected ? accent.bg : 'var(--bg-subtle)',
                  border:      `1.5px solid ${selected ? accent.border : 'var(--border)'}`,
                  boxShadow:   selected ? `0 0 0 3px ${accent.border}1A` : 'none',
                  outline:     'none',
                  opacity:     isLoading ? 0.5 : 1,
                  cursor:      isLoading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!selected && !isLoading)
                    e.currentTarget.style.borderColor = accent.border
                }}
                onMouseLeave={e => {
                  if (!selected)
                    e.currentTarget.style.borderColor = 'var(--border)'
                }}
                onFocus={e  => { e.currentTarget.style.boxShadow = `0 0 0 3px ${accent.border}2A` }}
                onBlur={e   => { e.currentTarget.style.boxShadow = selected ? `0 0 0 3px ${accent.border}1A` : 'none' }}
              >
                {/* Title row */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                    {label}
                  </span>
                  {selected && (
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: accent.border }}
                    />
                  )}
                </div>

                {/* Percentages */}
                <span className="text-xs tabular-nums font-medium" style={{ color: 'var(--text-3)' }}>
                  {pctSummary}
                </span>

                {/* Allocation bar */}
                <div
                  className="mt-2.5 flex h-1 w-full overflow-hidden rounded-full"
                  style={{ background: 'var(--bg-muted)' }}
                >
                  {BUCKET_ORDER.map((key, i) => (
                    <div
                      key={key}
                      style={{ width: `${rules[key]}%`, background: BAR_COLORS[i] }}
                    />
                  ))}
                </div>

                {/* Bullets */}
                <ul className="mt-3 flex flex-col gap-1.5">
                  {bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
                      <span
                        className="mt-[4px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: accent.dot }}
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

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full font-semibold"
        style={{
          height:       'var(--h-btn)',
          borderRadius: 'var(--radius-btn)',
          fontSize:     16,
          letterSpacing: '-0.01em',
          background:   isLoading ? 'var(--text-3)' : 'var(--brand)',
          color:        '#FFFFFF',
          boxShadow:    isLoading ? 'none' : 'var(--shadow-btn)',
          cursor:       isLoading ? 'not-allowed' : 'pointer',
          border:       'none',
          outline:      'none',
        }}
        onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = 'var(--brand-hover)' }}
        onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = 'var(--brand)' }}
        onMouseDown={e  => { if (!isLoading) e.currentTarget.style.background = 'var(--brand-active)' }}
        onMouseUp={e    => { if (!isLoading) e.currentTarget.style.background = 'var(--brand-hover)' }}
        onFocus={e      => { e.currentTarget.style.boxShadow = `0 0 0 3px var(--brand-ring)` }}
        onBlur={e       => { e.currentTarget.style.boxShadow = isLoading ? 'none' : 'var(--shadow-btn)' }}
      >
        {isLoading ? '…' : copy.submit}
      </button>
    </form>
  )
}
