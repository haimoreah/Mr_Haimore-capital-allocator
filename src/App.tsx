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
    setTimeout(() => {
      setResult(calculateAllocation(totalCapital, riskProfile))
      setPhase('result')
    }, 380)
  }

  const hasContent = phase !== 'idle'

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100svh' }}>

      {/* ── Unified sticky header ── */}
      <header className="site-header">
        <div className="site-header-inner">
          {/* Brand: logo + name */}
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-link"
            aria-label="Mr_Haimore على إنستغرام"
          >
            <img
              src="/mrhaimore/capital-calculator/logo.png"
              alt="Mr_Haimore"
              className="brand-logo"
              style={{ filter: theme === 'dark' ? 'invert(1) brightness(.9)' : 'none' }}
            />
            <span className="brand-name">Mr_Haimore</span>
          </a>

          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="site-hero">
        <div className="site-hero-inner">
          <span className="hero-badge">أداة تعليمية مجانية</span>
          <h1 className="hero-title">{copy.appTitle}</h1>
          <p className="hero-sub">{copy.appSubtitle}</p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="site-content">
        <main
          className={
            hasContent
              ? 'content-grid content-grid--split'
              : 'content-grid'
          }
        >
          {/* Form card */}
          <div
            className="form-card"
            style={
              !hasContent
                ? { maxWidth: 600, marginInline: 'auto', width: '100%' }
                : undefined
            }
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
          className="disclaimer-wrap"
          style={
            !hasContent
              ? { maxWidth: 600, marginInline: 'auto', width: '100%' }
              : undefined
          }
        >
          <Disclaimer />
        </div>

        <Footer theme={theme} />
      </div>
    </div>
  )
}

export default App
