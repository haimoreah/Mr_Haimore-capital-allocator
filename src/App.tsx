import { useState } from 'react'
import type { RiskProfile } from './config/allocationRules'
import { copy } from './config/copy'
import { calculateAllocation, type AllocationResult } from './domain/allocation'
import { CapitalForm } from './components/CapitalForm'
import { AllocationResults } from './components/AllocationResults'
import { Disclaimer } from './components/Disclaimer'

function App() {
  const [result, setResult] = useState<AllocationResult | null>(null)

  function handleSubmit(totalCapital: number, riskProfile: RiskProfile) {
    setResult(calculateAllocation(totalCapital, riskProfile))
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-8 px-4 py-8 sm:py-12">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">
          {copy.appTitle}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">{copy.appSubtitle}</p>
      </header>

      <main className="flex flex-col gap-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <CapitalForm onSubmit={handleSubmit} />
        </div>

        {result && <AllocationResults result={result} />}

        <Disclaimer />
      </main>

      {/* Brand signature — left-aligned regardless of RTL context */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', direction: 'ltr', marginTop: '24px', marginBottom: '12px', marginLeft: '4px' }}>
        <img
          src="/logo.png"
          alt="Mr_Haimore Logo"
          style={{ width: '80px', height: 'auto' }}
          className="w-16 sm:w-20 opacity-80 dark:invert"
        />
      </div>
    </div>
  )
}

export default App
