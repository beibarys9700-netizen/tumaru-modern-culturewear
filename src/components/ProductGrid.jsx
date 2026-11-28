import { useRef, useState } from 'react'
import { PRODUCTS, COLORS, fmt, T } from '../data'

export function ProductCard({ p, lang, onOpenPage, onQuickAdd, saved, onToggleSave }) {
  const [color, setColor] = useState(p.defaultColor || p.colors[0])
  const imgs = p.images[color] || p.images[p.colors[0]]

  const badgeStyle =
    p.badgeTone === 'accent'
      ? 'bg-[var(--color-accent)] text-[var(--color-ink)]'
      : p.badgeTone === 'warn'
        ? 'bg-[#FFF0F0] text-[#9B1C1C]'
        : 'bg-white/90 text-[var(--color-ink)]'

  return (
    <article className="group flex flex-col">
      <div
        className="relative aspect-[4/5] bg-[var(--color-card)] cursor-pointer overflow-hidden"
        onClick={() => onOpenPage(p, color)}
      >
        {p.badge && (
          <span className={`absolute top-2.5 left-2.5 z-10 px-2.5 py-1 text-[11px] font-semibold ${badgeStyle}`}>
            {p.badge[lang]}
          </span>
        )}

        {p.isSet ? (
          <div className="absolute inset-0 grid grid-cols-2 items-center transition-transform duration-500 group-hover:scale-105">
            <img src={imgs[0]} alt={`${p.name} 1`} loading="lazy" className="w-full h-full object-contain brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
            <img src={imgs[1]} alt={`${p.name} 2`} loading="lazy" className="w-full h-full object-contain brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
          </div>
        ) : (
          <img
            src={imgs[0]}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-1 brightness-[1.06] contrast-[1.04] mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <button
          aria-label="Сохранить"
          onClick={(e) => { e.stopPropagation(); onToggleSave(p.id) }}
          className="absolute top-1.5 right-1.5 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center opacity-80 hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#0A0A0A' : 'none'} stroke="#0A0A0A" strokeWidth="1.6">
            <path d="M6 3h12v18l-6-4-6 4V3Z" />
          </svg>
        </button>

        <button
          aria-label="Быстрое добавление"
          onClick={(e) => { e.stopPropagation(); onQuickAdd(p, color) }}
          className="absolute bottom-2 right-2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center text-lg bg-white/85 hover:bg-[var(--color-ink)] hover:text-white transition-colors"
        >
          +
        </button>
      </div>

      <div className="pt-3 px-2.5">
        <div
          className="flex justify-between items-start gap-2 text-[14px] font-semibold cursor-pointer"
          onClick={() => onOpenPage(p, color)}
        >
          <h3 className="leading-snug hover:underline underline-offset-4 truncate">{p.name}</h3>
          <span className="whitespace-nowrap">{fmt(p.price)}</span>
        </div>
        <p className="text-[13px] text-[var(--color-muted)] mt-0.5 truncate">{p.subtitle[lang]}</p>

        <div className="flex items-center gap-2 mt-2">
          {p.colors.map((c) => (
            <button
              key={c}
              title={COLORS[c].label[lang]}
              aria-label={COLORS[c].label[lang]}
              onClick={() => setColor(c)}
              className={`w-4 h-4 rounded-full border border-black/20 ring-offset-2 ring-1 ${
                color === c ? 'ring-[var(--color-ink)]' : 'ring-transparent'
              }`}
              style={{ background: COLORS[c].hex }}
            />
          ))}
          <span className="text-[12px] text-[var(--color-muted)] ml-1 truncate">{COLORS[color].label[lang]}</span>
        </div>
      </div>
    </article>
  )
}

export default function ProductGrid({ lang, onOpenPage, onQuickAdd, savedIds, onToggleSave, openCatalog }) {
  const t = T[lang]
  const scroller = useRef(null)

  const scroll = (dir) => {
    if (!scroller.current) return
    const step = scroller.current.clientWidth * 0.5
    scroller.current.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="shop" className="py-10 md:py-12 relative">
      <div className="flex items-center justify-between px-4 md:px-6 mb-3">
        <h2 className="font-display text-lg md:text-xl font-bold tracking-tight">{t.avail}</h2>
        <div className="hidden md:flex items-center gap-1.5">
          <button onClick={() => scroll(-1)} aria-label="Назад" className="w-9 h-9 border border-black/15 flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-white transition-colors">←</button>
          <button onClick={() => scroll(1)} aria-label="Вперёд" className="w-9 h-9 border border-black/15 flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-white transition-colors">→</button>
        </div>
      </div>

      {/* Большие карточки от края до края с минимальным зазором (2px) */}
      <div
        ref={scroller}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-[2px]"
      >
        {PRODUCTS.map((p) => (
          <div key={p.id} className="w-[49vw] sm:w-[33vw] lg:w-[24.85vw] shrink-0 snap-start">
            <ProductCard
              p={p}
              lang={lang}
              onOpenPage={onOpenPage}
              onQuickAdd={onQuickAdd}
              saved={savedIds.includes(p.id)}
              onToggleSave={onToggleSave}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={openCatalog} className="text-[13px] font-semibold border-b border-[var(--color-ink)] pb-1 hover:opacity-65">
          → {t.all}
        </button>
      </div>
    </section>
  )
}
