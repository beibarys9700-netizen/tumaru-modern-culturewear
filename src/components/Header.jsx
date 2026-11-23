import { useEffect, useState } from 'react'
import { T } from '../data'

const MSG = 'KASPI RED / РАССРОЧКА 0-0-12  •  ДОСТАВКА ПО ВСЕМУ МИРУ  •  DROP 003: YENLIK LIVE  •  ЯНДЕКС КУРЬЕР ПО АЛМАТЫ'

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white h-8 overflow-hidden flex items-center relative z-50">
      <div className="ticker flex whitespace-nowrap shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="micro text-[10px] px-10">{MSG}</span>
        ))}
      </div>
    </div>
  )
}

export function Header({ lang, setLang, count, openCart, openSize }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const t = T[lang]
  const tone = scrolled ? 'text-ink' : 'text-white'
  return (
    <header
      className={`fixed left-0 right-0 top-8 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-white border-b border-black/10' : 'bg-transparent border-b border-transparent'
      } ${tone}`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-14 px-4 md:px-6">
        <nav className="hidden md:flex gap-6 micro">
          <a href="#shop" className="hover:opacity-60">{t.shop}</a>
          <a href="#drop" className="hover:opacity-60">{t.drop}</a>
          <a href="#community" className="hover:opacity-60">{t.community}</a>
        </nav>
        <span className="md:hidden micro">MENU</span>
        <a href="#" className="text-2xl md:text-3xl font-extrabold tracking-[-0.06em] leading-none text-center">TUMARU</a>
        <div className="flex justify-end items-center gap-3 md:gap-5 micro">
          <div className="hidden sm:flex gap-2">
            {['KZ', 'RU', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`pb-0.5 border-b ${lang === l ? (scrolled ? 'border-tur' : 'border-tur') : 'border-transparent opacity-60'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button onClick={openSize} className="hidden md:block border border-current px-3 py-1.5 hover:bg-ink hover:text-white hover:border-ink">
            {t.size}
          </button>
          <button onClick={openCart} className="flex items-center gap-1.5" aria-label="Корзина">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" /></svg>
            <span className={`min-w-4 h-4 px-1 text-[9px] flex items-center justify-center ${count ? 'bg-tur text-ink' : 'bg-transparent'}`}>{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

