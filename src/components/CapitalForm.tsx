import { useState, type FormEvent } from 'react'
import { AlertCircle } from 'lucide-react'
import type { RiskProfile } from '../config/allocationRules'
import { ALLOCATION_RULES, BUCKET_ORDER } from '../config/allocationRules'
import { copy, riskProfileCopy } from '../config/copy'

const RISK_PROFILES: RiskProfile[] = ['defensive', 'balanced', 'aggressive']

const BAR_COLORS = ['#11B5D9', '#7DD3EA', '#93C5FD', '#D1D5DB'] as const

const PROFILE_ACCENT: Record<RiskProfile, { dot: string; border: string; bg: string }> = {
  defensive: { dot: '#11B5D9', border: '#11B5D9', bg: '#EFF9FD' },
  balanced:  { dot: '#8B91A7', border: '#8B91A7', bg: '#F3F5F7' },
  aggressive:{ dot: '#F87171', border: '#EF4444', bg: '#FFF5F5' },
}

/* Label style shared by all form section headings */
const labelStyle: React.CSSProperties = {
  fontSize:      11,
  fontWeight:    600,
  color:         'var(--text-3)',
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* ── Capital input ── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="capital" style={labelStyle}>
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
          disabled={isLoading}
          onChange={e => { setCapitalInput(e.target.value); if (touched) setError(null) }}
          className="w-full outline-none"
          style={{
            height:       'var(--h-input)',
            fontSize:     17,
            background:   'var(--bg-subtle)',
            border:       `1.5px solid ${error ? 'var(--error)' : 'var(--border)'}`,
            color:        'var(--text-1)',
            borderRadius: 'var(--radius-input)',
            padding:      '0 16px',
            opacity:      isLoading ? 0.6 : 1,
          }}
          onFocus={e => {
            e.currentTarget.style.background    = 'var(--bg-surface)'
            if (!error) e.currentTarget.style.borderColor = 'var(--brand)'
            e.currentTarget.style.boxShadow = `0 0 0 3px var(--brand-ring)`
          }}
          onBlur={e => {
            e.currentTarget.style.background    = 'var(--bg-subtle)'
            e.currentTarget.style.borderColor   = error ? 'var(--error)' : 'var(--border)'
            e.currentTarget.style.boxShadow     = 'none'
          }}
        />

        {/* Hint / error */}
        {error ? (
          <div className="flex items-center gap-1.5 fade-up">
            <AlertCircle size={13} style={{ color: 'var(--error)', flexShrink: 0 }} />
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--error)', margin: 0 }}>
              {error}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>
            {copy.capitalCurrencyHint}
          </p>
        )}
      </div>

      {/* ── Profile selector ── */}
      <div className="flex flex-col gap-3">
        <span style={labelStyle}>{copy.riskProfileLabel}</span>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {RISK_PROFILES.map(profile => {
            const selected     = profile === riskProfile
            const rules        = ALLOCATION_RULES[profile]
            const { label, bullets } = riskProfileCopy[profile]
            const accent       = PROFILE_ACCENT[profile]
            const pctSummary   = BUCKET_ORDER.map(k => `${rules[k]}٪`).join(' · ')

            return (
              <button
                key={profile}
                type="button"
                disabled={isLoading}
                onClick={() => setRiskProfile(profile)}
                className="profile-card rounded-[16px] p-4 text-start"
                style={{
                  background: selected ? accent.bg : 'var(--bg-subtle)',
                  border:     `1.5px solid ${selected ? accent.border : 'var(--border)'}`,
                  boxShadow:  selected ? `0 0 0 3px ${accent.border}22` : 'none',
                  outline:    'none',
                  opacity:    isLoading ? 0.5 : 1,
                  cursor:     isLoading ? 'not-allowed' : 'pointer',
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
                onBlur={e   => { e.currentTarget.style.boxShadow = selected ? `0 0 0 3px ${accent.border}22` : 'none' }}
              >
                {/* Title row */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className="font-semibold"
                    style={{ fontSize: 14, color: 'var(--text-1)' }}
                  >
                    {label}
                  </span>
                  {selected && (
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: accent.border, fontSize: 9, fontWeight: 700 }}
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* Percentages */}
                <span
                  className="tabular-nums font-medium"
                  style={{ fontSize: 11, color: 'var(--text-3)' }}
                >
                  {pctSummary}
                </span>

                {/* Allocation bar */}
                <div
                  className="mt-2 flex h-[3px] w-full overflow-hidden rounded-full"
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
                <ul className="mt-2.5 flex flex-col gap-1.5">
                  {bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5"
                      style={{ fontSize: 12, color: 'var(--text-2)' }}
                    >
                      <span
                        className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
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
          height:        'var(--h-btn)',
          borderRadius:  'var(--radius-btn)',
          fontSize:      15,
          background:    isLoading
            ? 'var(--text-3)'
            : 'linear-gradient(160deg, #1AC5EE 0%, #11B5D9 55%, #0EA5C9 100%)',
          color:         '#FFFFFF',
          boxShadow:     isLoading ? 'none' : 'var(--shadow-btn)',
          cursor:        isLoading ? 'not-allowed' : 'pointer',
          border:        'none',
          outline:       'none',
        }}
        onMouseEnter={e => {
          if (!isLoading)
            e.currentTarget.style.background =
              'linear-gradient(160deg, #22CEFC 0%, #13BDE0 55%, #0FA8CC 100%)'
        }}
        onMouseLeave={e => {
          if (!isLoading)
            e.currentTarget.style.background =
              'linear-gradient(160deg, #1AC5EE 0%, #11B5D9 55%, #0EA5C9 100%)'
        }}
        onMouseDown={e => {
          if (!isLoading)
            e.currentTarget.style.background =
              'linear-gradient(160deg, #0FB8E0 0%, #0EA5C9 55%, #0B8DAA 100%)'
        }}
        onMouseUp={e => {
          if (!isLoading)
            e.currentTarget.style.background =
              'linear-gradient(160deg, #22CEFC 0%, #13BDE0 55%, #0FA8CC 100%)'
        }}
        onFocus={e      => { e.currentTarget.style.boxShadow = `0 0 0 3px var(--brand-ring)` }}
        onBlur={e       => { e.currentTarget.style.boxShadow = isLoading ? 'none' : 'var(--shadow-btn)' }}
      >
        {isLoading ? 'جارٍ الحساب…' : copy.submit}
      </button>
    </form>
  )
}
