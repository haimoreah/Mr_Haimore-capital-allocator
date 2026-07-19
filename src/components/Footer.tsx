import { PERSONAL_PAGE_URL } from '../config/copy'

// Inline Instagram icon — lucide-react version may not export it
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
  function handlePlaceholderClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
  }

  return (
    <footer
      className="mt-10 pt-6 pb-4"
      style={{ borderTop: '1px solid #E5E7EB' }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4"
        style={{ direction: 'ltr' }}
      >
        {/* Left: logo + follow link */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="زيارة حساب Mr_Haimore على إنستغرام"
            className="transition-opacity hover:opacity-70"
          >
            <img
              src="/mrhaimore/capital-calculator/logo.png"
              alt="Mr_Haimore"
              className="h-8 w-auto sm:h-9"
            />
          </a>
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: '#9CA3AF' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#11B5D9' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF' }}
          >
            <InstagramIcon size={13} />
            <span>تابع Mr_Haimore</span>
          </a>
        </div>

        {/* Right: copyright + legal */}
        <div
          className="flex flex-col items-end gap-1"
          style={{ direction: 'rtl' }}
        >
          <span className="text-xs" style={{ color: '#D1D5DB' }}>
            © 2026 Mr_Haimore. جميع الحقوق محفوظة.
          </span>
          <div className="flex gap-3 text-xs" style={{ color: '#D1D5DB' }}>
            <a
              href="#"
              onClick={handlePlaceholderClick}
              className="transition-colors hover:underline"
              onMouseEnter={(e) => { e.currentTarget.style.color = '#6B7280' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#D1D5DB' }}
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              onClick={handlePlaceholderClick}
              className="transition-colors hover:underline"
              onMouseEnter={(e) => { e.currentTarget.style.color = '#6B7280' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#D1D5DB' }}
            >
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
