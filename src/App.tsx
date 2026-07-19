import { useState } from 'react'
import type { RiskProfile } from './config/allocationRules'
import { copy, PERSONAL_PAGE_URL } from './config/copy'
import { calculateAllocation, type AllocationResult } from './domain/allocation'
import { CapitalForm } from './components/CapitalForm'
import { AllocationResults } from './components/AllocationResults'
import { Disclaimer } from './components/Disclaimer'
import { Footer } from './components/Footer'
import { ThemeToggle } from './components/ThemeToggle'
import { SkeletonResults } from './components/Skeleton'
import { useTheme } from './hooks/useTheme'

type Phase = 'idle' | 'loading' | 'result'

function App() {
  const { theme, toggle } = useTheme()
  const [phase, setPhase]   = useState<Phase>('idle')
  const [result, setResult] = useState<AllocationResult | null>(null)

  function handleSubmit(totalCapital: number, riskProfile: RiskProfile) {
    setPhase('loading')
    setResult(null)
    // Brief skeleton flash makes the result feel computed, not instant
    setTimeout(() => {
      setResult(calculateAllocation(totalCapital, riskProfile))
      setPhase('result')
    }, 380)
  }

  const hasContent = phase !== 'idle'

  return (
    <div
      className="mx-auto w-full px-4 sm:px-6 py-10 sm:py-14"
      style={{ maxWidth: 'var(--max-w)' }}
    >
      {/* ── Header ── */}
      <header className="mb-10 sm:mb-12">
        {/* Top bar: logo + theme toggle */}
        <div
          className="mb-8 flex items-center justify-between"
          style={{ direction: 'ltr' }}
        >
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mr_Haimore على إنستغرام"
            className="opacity-90 hover:opacity-60"
          >
            <img
              src="/mrhaimore/capital-calculator/logo.png"
              alt="Mr_Haimore"
              className="h-9 w-auto sm:h-10"
              style={{
                filter: theme === 'dark' ? 'invert(1) brightness(.9)' : 'none',
              }}
            />
          </a>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        {/* Title block — right-aligned RTL */}
        <div className="flex flex-col gap-3 text-right">
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(30px, 5vw, 48px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-1)',
              lineHeight: 1.15,
            }}
          >
            {copy.appTitle}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 480 }}>
            {copy.appSubtitle}
          </p>
        </div>
      </header>

      {/* ── Main layout ── */}
      {/* Single column → two columns once result appears (lg+) */}
      <main
        className={
          hasContent
            ? 'flex flex-col gap-5 lg:grid lg:items-start lg:gap-8'
            : 'flex flex-col gap-5'
        }
        style={hasContent ? { gridTemplateColumns: '440px 1fr' } : undefined}
      >
        {/* Form card */}
        <div
          className="rounded-[18px] p-6 sm:p-8"
          style={{
            background:  'var(--bg-surface)',
            border:      '1px solid var(--border)',
            boxShadow:   'var(--shadow-card)',
            // When no content, cap the width and center
            ...(!hasContent && {
              maxWidth: 580,
              marginInline: 'auto',
              width: '100%',
            }),
          }}
        >
          <CapitalForm onSubmit={handleSubmit} isLoading={phase === 'loading'} />
        </div>

        {/* Results column */}
        {phase === 'loading' && <SkeletonResults />}
        {phase === 'result' && result && (
          <div className="fade-up">
            <AllocationResults result={result} />
          </div>
        )}
      </main>

      {/* ── Below fold ── */}
      <div
        className="mt-5 flex flex-col gap-4"
        style={!hasContent ? { maxWidth: 580, marginInline: 'auto', width: '100%' } : undefined}
      >
        <Disclaimer />
      </div>

      <Footer theme={theme} />
    </div>
  )
}

export default App
