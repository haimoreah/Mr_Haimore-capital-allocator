import { copy } from '../config/copy'

export function Disclaimer() {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: '#101318',
        border: '1px solid #262D36',
        borderRight: '2px solid #E63946',
      }}
    >
      <p className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>
        {copy.disclaimerTitle}
      </p>
      <p className="mt-1 text-sm" style={{ color: '#A7B0BC' }}>
        {copy.disclaimer}
      </p>
    </div>
  )
}
