import type { Theme } from '../hooks/useTheme'
import { PERSONAL_PAGE_URL } from '../config/copy'

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

interface FooterProps { theme: Theme }

export function Footer({ theme: _ }: FooterProps) {
  function noop(e: React.MouseEvent<HTMLAnchorElement>) { e.preventDefault() }

  return (
    <footer
      className="mt-10 pt-6 pb-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4"
        style={{ direction: 'ltr' }}
      >
        {/* Left: logo + follow */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank" rel="noopener noreferrer"
            aria-label="Mr_Haimore على إنستغرام"
            className="hover:opacity-60"
          >
            <img
              src="/mrhaimore/capital-calculator/logo.png"
              alt="Mr_Haimore"
              className="h-8 w-auto"
            />
          </a>
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
          >
            <InstagramIcon size={13} />
            <span>تابع Mr_Haimore</span>
          </a>
        </div>

        {/* Right: copyright + legal */}
        <div className="flex flex-col items-end gap-1" style={{ direction: 'rtl' }}>
          <span className="text-xs" style={{ color: 'var(--text-3)' }}>
            © 2026 Mr_Haimore. جميع الحقوق محفوظة.
          </span>
          <div className="flex gap-3 text-xs" style={{ color: 'var(--text-3)' }}>
            {['سياسة الخصوصية', 'شروط الاستخدام'].map(label => (
              <a
                key={label}
                href="#"
                onClick={noop}
                className="hover:underline"
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-2)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
