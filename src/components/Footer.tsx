import { PERSONAL_PAGE_URL } from '../config/copy'

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      className="mt-12 pt-5 pb-2"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4"
        style={{ direction: 'ltr' }}
      >
        {/* Left: follow link */}
        <a
          href={PERSONAL_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5"
          style={{ color: 'var(--text-3)', fontSize: 12, fontWeight: 500, textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
        >
          <InstagramIcon size={13} />
          <span>تابع Mr_Amwal</span>
        </a>

        {/* Right: copyright */}
        <span style={{ fontSize: 12, color: 'var(--text-3)', direction: 'rtl' }}>
          © 2026 Mr_Amwal
        </span>
      </div>
    </footer>
  )
}
