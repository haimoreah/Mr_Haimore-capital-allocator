import { Send } from 'lucide-react'
import { copy, SUPPORT_URL } from '../config/copy'

export function SupportCTA() {
  return (
    <div
      className="mt-8 flex flex-col items-center gap-4 rounded-[20px] px-6 py-8 text-center"
      style={{ background: 'var(--brand)' }}
    >
      <h2
        className="font-semibold"
        style={{ fontSize: 18, color: '#FFFFFF', margin: 0, maxWidth: 480 }}
      >
        {copy.supportTitle}
      </h2>

      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-[14px]"
        style={{
          border: '1.5px solid rgba(255,255,255,.6)',
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 600,
          padding: '10px 20px',
          textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.14)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <Send size={16} strokeWidth={2} style={{ transform: 'scaleX(-1)' }} />
        <span>{copy.supportButton}</span>
      </a>
    </div>
  )
}
