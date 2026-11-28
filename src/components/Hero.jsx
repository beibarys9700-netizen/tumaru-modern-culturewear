import { BRAND } from '../brand.config'

export default function Hero({ lang, openSize, openCatalog }) {
  const h = BRAND.hero
  return (
    <section className="relative w-full h-[calc(100vh-32px)] min-h-[580px] overflow-hidden bg-[#D0D1D3]">
      <img
        src="/images/hero-banner.jpg"
        alt={`${BRAND.name} — ${h.title[lang]}`}
        className="w-full h-full object-cover object-[center_18%]"
      />
      {/* Защитный градиент слева внизу и снизу для высокой контрастности текста >= 4.5:1 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="max-w-xl text-white">
            <p className="text-[13px] font-medium tracking-wide text-white/85 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" />
              {h.eyebrow[lang]}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] tracking-[-0.02em]">
              {h.title[lang]}
            </h1>
            <p className="mt-3 text-sm md:text-[15px] text-white/90 leading-relaxed">
              {h.subtitle[lang]}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={openCatalog}
                className="min-h-[48px] px-7 bg-white text-[var(--color-ink)] text-sm font-semibold hover:bg-[var(--color-accent)] transition-colors"
              >
                {h.primaryCta[lang]}
              </button>
              <button
                onClick={openSize}
                className="min-h-[48px] px-3 text-sm font-medium text-white underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
              >
                {h.secondaryCta[lang]} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
