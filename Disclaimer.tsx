import { copy } from '../config/copy'

export function Disclaimer() {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
      <p className="font-semibold">{copy.disclaimerTitle}</p>
      <p className="mt-1 text-sm">{copy.disclaimer}</p>
    </div>
  )
}
