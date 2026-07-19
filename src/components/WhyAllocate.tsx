import { ShieldCheck, TrendingDown, PiggyBank } from 'lucide-react'
import { copy } from '../config/copy'

const STEP_ICONS = [ShieldCheck, TrendingDown, PiggyBank]

export function WhyAllocate() {
  return (
    <div className="form-card flex flex-col gap-5">
      <h2
        className="font-semibold"
        style={{ fontSize: 15, color: 'var(--text-1)', margin: 0 }}
      >
        {copy.whyAllocateTitle}
      </h2>

      <ol className="flex flex-col gap-4">
        {copy.whyAllocateSteps.map((step, i) => {
          const Icon = STEP_ICONS[i]
          return (
            <li key={step.title} className="flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'var(--brand-subtle)', color: 'var(--brand)' }}
              >
                <Icon size={18} strokeWidth={2} />
              </span>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-semibold"
                  style={{ fontSize: 13, color: 'var(--text-1)' }}
                >
                  {step.title}
                </span>
                <span
                  className="leading-relaxed"
                  style={{ fontSize: 13, color: 'var(--text-3)' }}
                >
                  {step.description}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
