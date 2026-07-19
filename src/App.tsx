import { useState } from 'react'
import type { RiskProfile } from './config/allocationRules'
import { copy, PERSONAL_PAGE_URL } from './config/copy'
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
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col px-4 py-10 sm:py-14">

      {/* Header */}
      <header className="mb-10 flex flex-col items-center gap-5 text-center">
        {/* Logo */}
        <a
          href={PERSONAL_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="زيارة حساب Mr_Haimore على إنستغرام"
          className="transition-opacity hover:opacity-70"
          style={{ direction: 'ltr' }}
        >
          <img
            src="/mrhaimore/capital-calculator/logo.png"
            alt="Mr_Haimore"
            className="h-10 w-auto sm:h-12"
          />
        </a>

        {/* Title + subtitle */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: '#111111', letterSpacing: '-0.02em' }}
          >
            {copy.appTitle}
          </h1>
          <p className="text-base sm:text-lg" style={{ color: '#6B7280' }}>
            {copy.appSubtitle}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col gap-4">
        {/* Form card */}
        <div
          className="rounded-[18px] p-6 sm:p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          <CapitalForm onSubmit={handleSubmit} />
        </div>

        {/* Results */}
        {result && (
          <div className="fade-in">
            <AllocationResults result={result} />
          </div>
        )}

        {/* Disclaimer */}
        <Disclaimer />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
