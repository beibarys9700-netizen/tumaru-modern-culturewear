import { useEffect, useState } from 'react'
import { COLORS, PRODUCTS, T } from '../data'
import { ProductCard } from './ProductGrid'

const CATS = [
  { id: 'all', title: 'ALL DROP 003', img: '/images/hero-banner.jpg' },
  { id: 'hoodies', title: 'ZIP HOODIES', img: '/products/hoodie1/02-oversized.jpg' },
  { id: 'pants', title: 'WIDE PANTS', img: '/products/pants/07-ghost.jpg' },
  { id: 'denim', title: 'BAGGY DENIM', img: '/products/jeans/07-ghost.jpg' },
  { id: 'sets', title: 'FULL SETS', img: '/products/hoodie2/05-detail.jpg' },
]

export default function CatalogPage({
  lang,
  onBack,
  onOpenPage,
  onQuickAdd,
  savedIds,
  onToggleSave,
}) {
  const [cat, setCat] = useState('all')
  const [colorFilter, setColorFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [onlySaved, setOnlySaved] = useState(false)
  const t = T[lang]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  let list = PRODUCTS.filter((p) => {
    if (cat !== 'all' && p.category !== cat) return false
    if (colorFilter !== 'all' && !p.colors.includes(colorFilter)) return false
    if (onlySaved && !savedIds.includes(p.id)) return false
    return true
  })

  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <div className="pt-20 pb-20 max-w-[1440px] mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between py-4 border-b border-black/10 mb-6">
        <button onClick={onBack} className="micro hover:opacity-60">← {t.backToHome}</button>
        <span className="micro text-black/45">TUMARU / {t.avail}</span>
      </div>

      <div className="mb-8 max-w-2xl">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase">{t.allInStockTitle}</h1>
        <p className="text-xs md:text-sm text-black/60 mt-2">{t.allInStockDesc}</p>
      </div>

      {/* Горизонтальная полоса категорий (как в оригинале Represent) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-8">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`group relative aspect-[4/5] overflow-hidden text-left bg-[#141414] border transition ${
              cat === c.id ? 'border-ink ring-1 ring-ink' : 'border-transparent'
            }`}
          >
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="micro text-[10px]">{c.title}</span>
              {cat === c.id && <span className="w-1.5 h-1.5 bg-tur rounded-full" />}
            </div>
          </button>
        ))}
      </div>

      {/* Панель фильтров */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-black/10 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'burgundy', 'black', 'washed_black'].map((c) => (
            <button
              key={c}
              onClick={() => setColorFilter(c)}
              className={`px-3 py-1.5 border micro text-[9px] flex items-center gap-1.5 transition ${
                colorFilter === c ? 'bg-ink text-white border-ink' : 'border-black/15 hover:border-ink'
              }`}
            >
              {c !== 'all' && (
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" style={{ background: COLORS[c].hex }} />
              )}
              {c === 'all' ? 'Все цвета' : COLORS[c].label[lang]}
            </button>
          ))}
          <button
            onClick={() => setOnlySaved((v) => !v)}
            className={`px-3 py-1.5 border micro text-[9px] transition ${
              onlySaved ? 'bg-ink text-white border-ink' : 'border-black/15 hover:border-ink'
            }`}
          >
            Закладки ({savedIds.length})
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="micro text-[10px] text-black/50">{list.length} ITEMS</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-black/15 h-8 px-2.5 micro text-[9px] bg-white outline-none"
          >
            <option value="default">Сортировка: По умолчанию</option>
            <option value="asc">Цена: по возрастанию</option>
            <option value="desc">Цена: по убыванию</option>
          </select>
        </div>
      </div>

      {/* Сетка товаров */}
      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="micro text-black/45 mb-4">Нет товаров по выбранным фильтрам</p>
          <button
            onClick={() => { setCat('all'); setColorFilter('all'); setOnlySaved(false) }}
            className="micro border-b border-ink pb-0.5"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-10">
          {list.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              lang={lang}
              onOpenPage={onOpenPage}
              onQuickAdd={onQuickAdd}
              saved={savedIds.includes(p.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

