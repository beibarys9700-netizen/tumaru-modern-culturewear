import { useEffect, useState } from 'react'
import { BRAND } from '../brand.config'
import { T } from '../data'

export function AnnouncementBar({ lang }) {
  const msg = BRAND.announcement[lang]
  return (
    <div className="bg-[var(--color-ink)] text-white h-8 overflow-hidden flex items-center">
      <div className="ticker flex whitespace-nowrap shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="text-[11px] tracking-[0.08em] font-medium px-10">{msg}</span>
        ))}
      </div>
    </div>
  )
}

export function Header({ lang, setLang, count, wishCount, openCart, openSize, forceSolid, goHome, openCatalog, openSavedCatalog }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = forceSolid || scrolled
  const t = T[lang]

  const posClass = solid
    ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md text-[var(--color-ink)] border-b border-neutral-200 transition-all duration-300'
    : 'absolute top-8 left-0 right-0 z-50 bg-transparent text-[var(--color-ink)] transition-all duration-300'

  return (
    <>
      <header className={posClass}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* Левое меню (Десктоп) */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium flex-1">
            <button onClick={openCatalog} className="hover:opacity-60 transition">{t.shop}</button>
            <a href="#reviews" onClick={goHome} className="hover:opacity-60 transition">{t.reviewsNav}</a>
            <a href="#shipping-faq" onClick={goHome} className="hover:opacity-60 transition">{t.shippingNav}</a>
          </nav>

          {/* Бургер (Мобилка) */}
          <div className="md:hidden flex-1 flex items-center">
            <button
              onClick={() => setMobileMenu(true)}
              className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center"
              aria-label={t.menu}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

          {/* Центральный логотип */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); goHome() }}
            className="font-display text-2xl md:text-[26px] font-extrabold tracking-[-0.04em] leading-none text-center shrink-0"
          >
            {BRAND.name}
          </a>

          {/* Правая группа */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 text-[13px] font-medium">
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              {['KZ', 'RU', 'EN'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 py-1 text-[12px] border-b-2 transition ${
                    lang === l ? 'border-[var(--color-accent)] font-semibold' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={openSize}
              className="hidden lg:inline-flex items-center border border-current px-3.5 h-9 text-[12px] font-medium hover:bg-[var(--color-ink)] hover:text-white hover:border-[var(--color-ink)] transition-colors"
            >
              {t.size}
            </button>

            <button
              onClick={openSavedCatalog}
              className="min-w-[40px] min-h-[44px] flex items-center justify-center gap-1"
              title={t.savedOnly}
              aria-label={t.savedOnly}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill={wishCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
                <path d="M6 3h12v18l-6-4-6 4V3Z" />
              </svg>
              {wishCount > 0 && <span className="text-[11px] font-semibold text-[var(--color-accent-dark)]">{wishCount}</span>}
            </button>

            <button
              onClick={openCart}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5"
              aria-label={t.yourBag}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className={`min-w-5 h-5 px-1 text-[11px] font-semibold rounded-full flex items-center justify-center ${
                count ? 'bg-[var(--color-accent)] text-[var(--color-ink)]' : 'bg-transparent'
              }`}>
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное бургер-меню */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div onClick={() => setMobileMenu(false)} className="absolute inset-0 bg-black/50" />
          <div className="relative w-[85vw] max-w-[340px] h-full bg-white flex flex-col p-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-display text-xl font-extrabold">{BRAND.name}</span>
              <button onClick={() => setMobileMenu(false)} className="min-w-[44px] min-h-[44px] flex items-center justify-end text-2xl">×</button>
            </div>
            <nav className="flex flex-col py-6 gap-2 text-base font-medium">
              <button onClick={() => { setMobileMenu(false); openCatalog() }} className="min-h-[44px] text-left">{t.shop}</button>
              <button onClick={() => { setMobileMenu(false); openSize() }} className="min-h-[44px] text-left">{t.size}</button>
              <button onClick={() => { setMobileMenu(false); openSavedCatalog() }} className="min-h-[44px] text-left">{t.savedOnly} ({wishCount})</button>
              <a href="#reviews" onClick={() => { setMobileMenu(false); goHome() }} className="min-h-[44px] flex items-center">{t.reviewsNav}</a>
              <a href="#shipping-faq" onClick={() => { setMobileMenu(false); goHome() }} className="min-h-[44px] flex items-center">{t.shippingNav}</a>
            </nav>
            <div className="mt-auto pt-4 border-t border-black/10 space-y-4">
              <div className="flex gap-2">
                {['KZ', 'RU', 'EN'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 h-11 text-xs font-semibold border ${lang === l ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]' : 'border-black/20'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <a href={BRAND.social.whatsapp} target="_blank" rel="noreferrer" className="block w-full text-center py-3 bg-[var(--color-card)] text-xs font-medium">
                WhatsApp: +7 771 363 00 33
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
