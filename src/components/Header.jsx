import { useEffect, useState } from 'react'
import { T } from '../data'

const MSG = 'KASPI RED / РАССРОЧКА 0-0-12  •  ДОСТАВКА ПО ВСЕМУ МИРУ  •  DROP 003: YENLIK LIVE  •  ЯНДЕКС КУРЬЕР ПО АЛМАТЫ'

export function AnnouncementBar() {
  return (
    <div className="bg-[#0A0A0A] text-white h-8 overflow-hidden flex items-center">
      <div className="ticker flex whitespace-nowrap shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="micro text-[10px] px-10">{MSG}</span>
        ))}
      </div>
    </div>
  )
}

export function Header({ lang, setLang, count, wishCount, openCart, openSize, forceSolid, goHome }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = forceSolid || scrolled
  const t = T[lang]

  const posClass = solid
    ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md text-[#0A0A0A] border-b border-neutral-200 transition-all duration-300'
    : 'absolute top-8 left-0 right-0 z-50 bg-transparent text-white transition-all duration-300'

  return (
    <header className={posClass}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <nav className="hidden md:flex items-center gap-6 micro flex-1">
          <a href="#shop" onClick={goHome} className="hover:opacity-60">{t.shop}</a>
          <a href="#drop" onClick={goHome} className="hover:opacity-60">{t.drop}</a>
          <a href="#community" onClick={goHome} className="hover:opacity-60">{t.community}</a>
        </nav>
        <div className="md:hidden flex-1 micro">
          <a href="#shop" onClick={goHome}>SHOP</a>
        </div>

        <a
          href="#"
          onClick={(e) => { e.preventDefault(); goHome() }}
          className="text-2xl md:text-3xl font-extrabold tracking-[-0.06em] leading-none text-center shrink-0"
        >
          TUMARU
        </a>

        <div className="flex-1 flex items-center justify-end gap-3 md:gap-5 micro">
          <div className="hidden sm:flex items-center gap-2">
            {['KZ', 'RU', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`pb-0.5 border-b ${lang === l ? 'border-tur' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={openSize}
            className="hidden lg:block border border-current px-3 py-1.5 hover:bg-ink hover:text-white hover:border-ink transition-colors"
          >
            {t.size}
          </button>

          <a href="#shop" onClick={goHome} className="hidden sm:flex items-center gap-1" title="Избранное" aria-label="Избранное">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3h12v18l-6-4-6 4V3Z" />
            </svg>
            {wishCount > 0 && <span className="text-[9px] text-tur">{wishCount}</span>}
          </a>

          <a href="https://wa.me/77713630033" target="_blank" rel="noreferrer" className="hidden sm:flex items-center" title="WhatsApp / Кабинет" aria-label="Аккаунт">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 20a7 7 0 0 1 14 0" />
            </svg>
          </a>

          <button onClick={openCart} className="flex items-center gap-1.5" aria-label="Корзина">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className={`min-w-4 h-4 px-1 text-[9px] flex items-center justify-center ${count ? 'bg-tur text-ink' : 'bg-transparent'}`}>
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
