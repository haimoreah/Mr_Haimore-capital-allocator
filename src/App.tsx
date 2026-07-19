import { useState } from 'react'
import type { RiskProfile } from './config/allocationRules'
import { copy } from './config/copy'
import { calculateAllocation, type AllocationResult } from './domain/allocation'
import { CapitalForm } from './components/CapitalForm'
import { AllocationResults } from './components/AllocationResults'
import { Disclaimer } from './components/Disclaimer'
import { Footer } from './components/Footer'

function App() {
  const [result, setResult] = useState<AllocationResult | null>(null)

  function handleSubmit(totalCapital: number, riskProfile: RiskProfile) {
    setResult(calculateAllocation(totalCapital, riskProfile))
  }

  return (
    <div
      className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 px-4 py-8 sm:py-10"
      style={{ color: '#F8FAFC' }}
    >
      {/* Header */}
      <header className="flex flex-col gap-1.5 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: '#F8FAFC' }}>
          {copy.appTitle}
        </h1>
        <p className="text-sm sm:text-base" style={{ color: '#A7B0BC' }}>
          {copy.appSubtitle}
        </p>
      </header>

      {/* Main content */}
      <main className="flex flex-col gap-5">
        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{ background: '#0A0C0F', border: '1px solid #262D36' }}
        >
          <CapitalForm onSubmit={handleSubmit} />
        </div>

        {result && <AllocationResults result={result} />}

        <Disclaimer />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
