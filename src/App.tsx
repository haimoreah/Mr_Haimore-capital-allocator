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
    <div style={{ background: 'var(--bg-base)', minHeight: '100svh' }}>

      {/* ── Mobile sticky header (< 768px only) ── */}
      <div className="m-header">
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
            style={{
              width: 120,
              height: 'auto',
              filter: theme === 'dark' ? 'invert(1) brightness(.9)' : 'none',
            }}
          />
        </a>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>

      {/* ── Mobile hero: title + description (< 768px only) ── */}
      <div className="m-hero">
        <h1 className="m-hero-title">{copy.appTitle}</h1>
        <p className="m-hero-sub">{copy.appSubtitle}</p>
      </div>

      {/* ── Desktop header (≥ 768px only) ── */}
      <div
        className="d-header mx-auto w-full px-6 pt-10 pb-0"
        style={{ maxWidth: 'var(--max-w)' }}
      >
        <header className="mb-10">
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
                className="h-10 w-auto"
                style={{
                  filter: theme === 'dark' ? 'invert(1) brightness(.9)' : 'none',
                }}
              />
            </a>
            <ThemeToggle theme={theme} onToggle={toggle} />
          </div>
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
      </div>

      {/* ── Main content ── */}
      <div
        className="mx-auto w-full px-4 sm:px-6 pb-8 sm:pb-14"
        style={{ maxWidth: 'var(--max-w)' }}
      >
          {/* Single column → two columns once result appears (lg+) */}
          <main
            className={
              hasContent
                ? 'flex flex-col gap-4 lg:grid lg:items-start lg:gap-8'
                : 'flex flex-col gap-4'
            }
            style={hasContent ? { gridTemplateColumns: '440px 1fr' } : undefined}
          >
            {/* Form card */}
            <div
              className="rounded-[18px] p-5 sm:p-8"
              style={{
                background: 'var(--bg-surface)',
                border:     '1px solid var(--border)',
                boxShadow:  'var(--shadow-card)',
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

          {/* Disclaimer */}
          <div
            className="mt-4 flex flex-col gap-4"
            style={!hasContent ? { maxWidth: 580, marginInline: 'auto', width: '100%' } : undefined}
          >
            <Disclaimer />
          </div>

          <Footer theme={theme} />
      </div>
    </div>
  )
}

export default App
