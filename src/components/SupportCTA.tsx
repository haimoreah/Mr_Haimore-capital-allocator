import { Send } from 'lucide-react'
import { copy, SUPPORT_URL } from '../config/copy'

export function SupportCTA() {
  return (
    <div
      className="mt-6 flex flex-col items-center gap-3 rounded-[16px] px-5 py-5 text-center"
      style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-hover) 100%)' }}
    >
      <h2
        className="font-semibold"
        style={{ fontSize: 14, color: '#FFFFFF', margin: 0, maxWidth: 420 }}
      >
        {copy.supportTitle}
      </h2>

      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-[12px]"
        style={{
          border: '1.5px solid rgba(255,255,255,.6)',
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 600,
          padding: '7px 16px',
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
