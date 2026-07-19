import { PERSONAL_PAGE_URL } from '../config/copy'

export function Footer() {
  function handlePlaceholderClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
  }

  return (
    <footer
      className="mt-2 pb-5 pt-5"
      style={{ borderTop: '1px solid #1C222A' }}
    >
      {/* Main footer row — always LTR so logo stays left */}
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
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/logo.png"
              alt="Mr_Haimore Logo"
              className="w-16 sm:w-20"
              style={{ height: 'auto', filter: 'invert(1) brightness(0.85)' }}
            />
          </a>
          <a
            href={PERSONAL_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-all hover:underline"
            style={{ color: '#20D6C7', cursor: 'pointer' }}
          >
            تابع Mr_Haimore
          </a>
        </div>

        {/* Right: copyright + legal links */}
        <div
          className="flex flex-col items-end gap-1.5"
          style={{ direction: 'rtl' }}
        >
          <span className="text-xs" style={{ color: '#707986' }}>
            © 2026 Mr_Haimore. جميع الحقوق محفوظة.
          </span>
          <div className="flex gap-3 text-xs" style={{ color: '#707986' }}>
            <a
              href="#"
              onClick={handlePlaceholderClick}
              className="transition-colors hover:underline"
              onMouseEnter={(e) => { e.currentTarget.style.color = '#20D6C7' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#707986' }}
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              onClick={handlePlaceholderClick}
              className="transition-colors hover:underline"
              onMouseEnter={(e) => { e.currentTarget.style.color = '#20D6C7' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#707986' }}
            >
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
