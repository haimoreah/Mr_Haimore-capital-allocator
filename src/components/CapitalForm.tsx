import { useState, type FormEvent } from 'react'
import type { RiskProfile } from '../config/allocationRules'
import { copy, riskProfileCopy } from '../config/copy'

const RISK_PROFILES: RiskProfile[] = ['conservative', 'balanced', 'growth']

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
    if (!capitalInput.trim()) {
      setError(copy.validation.required)
      return
    }
    if (!Number.isFinite(value) || value <= 0) {
      setError(copy.validation.positive)
      return
    }

    setError(null)
    onSubmit(value, riskProfile)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="capital" className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-teal-900"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">{copy.capitalCurrencyHint}</p>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {copy.riskProfileLabel}
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {RISK_PROFILES.map((profile) => {
            const selected = profile === riskProfile
            return (
              <button
                key={profile}
                type="button"
                onClick={() => setRiskProfile(profile)}
                className={`rounded-xl border p-3 text-start transition ${
                  selected
                    ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500 dark:bg-teal-950'
                    : 'border-slate-300 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900'
                }`}
              >
                <span className="block font-semibold text-slate-900 dark:text-slate-100">
                  {riskProfileCopy[profile].label}
                </span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  {riskProfileCopy[profile].description}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-teal-600 px-4 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-teal-700 active:bg-teal-800"
      >
        {copy.submit}
      </button>
    </form>
  )
}
