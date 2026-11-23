import { useState } from 'react'
import { PRODUCTS, COLORS, fmt, T } from '../data'

function Card({ p, lang, onOpen }) {
  const [color, setColor] = useState(p.defaultColor || p.colors[0])
  const [saved, setSaved] = useState(false)
  const frontImg = p.images[color]?.[0] || p.images[p.colors[0]][0]
  const t = T[lang]

  return (
    <article className="group">
      <div className="relative aspect-[4/5] bg-card cursor-pointer overflow-hidden" onClick={() => onOpen(p, color)}>
        <img
          src={frontImg}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-3 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        <button
          aria-label="В закладки"
          onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
          className="absolute top-3 right-3 z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#0A0A0A' : 'none'} stroke="#0A0A0A" strokeWidth="1.5"><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>
        </button>
        <button
          aria-label="Быстро добавить"
          onClick={(e) => { e.stopPropagation(); onOpen(p, color) }}
          className="absolute bottom-3 right-3 z-10 w-7 h-7 flex items-center justify-center text-lg bg-white/85 hover:bg-ink hover:text-white transition-colors"
        >
          +
        </button>
      </div>
      <div className="pt-3 px-1">
        <p className="micro text-[9px] text-black/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-tur inline-block" />{t.inStock}
        </p>
        <div className="flex justify-between gap-3 mt-1.5 text-[12px] font-medium">
          <h3 className="leading-tight">{p.name}</h3>
          <span className="whitespace-nowrap">{fmt(p.price)}</span>
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          {p.colors.map((c) => (
            <button
              key={c}
              title={COLORS[c].label[lang]}
              aria-label={COLORS[c].label[lang]}
              onClick={() => setColor(c)}
              className={`w-3.5 h-3.5 rounded-full border border-black/20 ring-offset-2 ring-1 ${color === c ? 'ring-tur' : 'ring-transparent'}`}
              style={{ background: COLORS[c].hex }}
            />
          ))}
          <span className="micro text-[9px] text-black/50 ml-1">{COLORS[color].label[lang]}</span>
        </div>
      </div>
    </article>
  )
}

export default function ProductGrid({ lang, onOpen }) {
  const t = T[lang]
  return (
    <section id="shop" className="px-4 md:px-6 py-14">
      <h2 className="micro mb-6">{t.avail}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10">
        {PRODUCTS.map((p) => <Card key={p.id} p={p} lang={lang} onOpen={onOpen} />)}
      </div>
      <div className="flex justify-center mt-12">
        <a href="#shop" className="micro border-b border-ink pb-1 hover:opacity-60">→ {t.all}</a>
      </div>
    </section>
  )
}
