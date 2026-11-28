import { useEffect, useState } from 'react'
import { COLORS, PRODUCTS, SIZES, T } from '../data'
import { ProductCard } from './ProductGrid'

const CATS = [
  { id: 'all', label: { RU: 'Все товары', KZ: 'Барлығы', EN: 'All' } },
  { id: 'hoodies', label: { RU: 'Зип-худи', KZ: 'Зип-худи', EN: 'Zip Hoodies' } },
  { id: 'pants', label: { RU: 'Брюки', KZ: 'Шалбарлар', EN: 'Pants' } },
  { id: 'denim', label: { RU: 'Деним', KZ: 'Деним', EN: 'Denim' } },
  { id: 'sets', label: { RU: 'Комплекты', KZ: 'Жиынтықтар', EN: 'Sets' } },
  { id: 'footwear', label: { RU: 'Обувь', KZ: 'Аяқ киім', EN: 'Footwear' } },
  { id: 'accessories', label: { RU: 'Аксессуары', KZ: 'Аксессуарлар', EN: 'Accessories' } },
]

export default function CatalogPage({
  lang,
  onBack,
  onOpenPage,
  onQuickAdd,
  savedIds,
  onToggleSave,
  initialSavedOnly = false,
}) {
  const [cat, setCat] = useState('all')
  const [colorFilter, setColorFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [onlySaved, setOnlySaved] = useState(initialSavedOnly)
  const t = T[lang]

  useEffect(() => {
    setOnlySaved(initialSavedOnly)
  }, [initialSavedOnly])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  let list = PRODUCTS.filter((p) => {
    if (cat !== 'all' && p.category !== cat) return false
    if (colorFilter !== 'all' && !p.colors.includes(colorFilter)) return false
    if (sizeFilter !== 'all' && (!p.stockBySize || (p.stockBySize[sizeFilter] || 0) <= 0)) return false
    if (onlySaved && !savedIds.includes(p.id)) return false
    return true
  })

  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <div className="pt-20 pb-20 max-w-[1440px] mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between py-4 border-b border-black/10 mb-6">
        <button onClick={onBack} className="min-h-[44px] flex items-center text-[13px] font-medium hover:opacity-65">
          ← {t.backToHome}
        </button>
        <span className="text-[13px] text-[var(--color-muted)]">{list.length} {t.itemsCount}</span>
      </div>

      <div className="mb-6 max-w-2xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
          {onlySaved ? `${t.savedOnly} (${savedIds.length})` : t.allInStockTitle}
        </h1>
        <p className="text-sm text-[var(--color-muted)] mt-2">{t.allInStockDesc}</p>
      </div>

      {/* Компактная строка чипсов категорий (высота 44px) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCat(c.id); setOnlySaved(false) }}
            className={`h-11 px-5 shrink-0 border text-[13px] font-medium transition ${
              cat === c.id && !onlySaved
                ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                : 'bg-white text-[var(--color-ink)] border-black/15 hover:border-[var(--color-ink)]'
            }`}
          >
            {c.label[lang]}
          </button>
        ))}
        {onlySaved && (
          <button
            onClick={() => setOnlySaved(false)}
            className="h-11 px-4 shrink-0 border border-[var(--color-ink)] bg-[var(--color-accent)] text-[var(--color-ink)] text-[13px] font-semibold"
          >
            {t.savedOnly} ×
          </button>
        )}
      </div>

      {/* Фильтры: размер, цвет, сортировка */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-black/10 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {/* Размер */}
          <div className="flex items-center border border-black/15 divide-x divide-black/15">
            <button
              onClick={() => setSizeFilter('all')}
              className={`h-10 px-3 text-[12px] font-medium ${sizeFilter === 'all' ? 'bg-[var(--color-ink)] text-white' : 'bg-white'}`}
            >
              {t.allSizes}
            </button>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSizeFilter(sizeFilter === s ? 'all' : s)}
                className={`h-10 w-10 text-[12px] font-medium ${sizeFilter === s ? 'bg-[var(--color-ink)] text-white' : 'bg-white hover:bg-[var(--color-card)]'}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Цвет */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'burgundy', 'black', 'washed_black'].map((c) => (
              <button
                key={c}
                onClick={() => setColorFilter(c)}
                className={`h-10 px-3 border text-[12px] font-medium flex items-center gap-1.5 transition ${
                  colorFilter === c
                    ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                    : 'border-black/15 hover:border-[var(--color-ink)]'
                }`}
              >
                {c !== 'all' && (
                  <span className="w-3 h-3 rounded-full border border-white/30" style={{ background: COLORS[c].hex }} />
                )}
                {c === 'all' ? t.allColors : COLORS[c].label[lang]}
              </button>
            ))}
          </div>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-black/15 h-10 px-3 text-[13px] bg-white outline-none"
        >
          <option value="default">{t.sortDefault}</option>
          <option value="asc">{t.sortAsc}</option>
          <option value="desc">{t.sortDesc}</option>
        </select>
      </div>

      {/* Сетка 2–4 колонки */}
      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-[var(--color-muted)] mb-4">
            {onlySaved ? t.emptyCart : t.clearFilters}
          </p>
          <button
            onClick={() => { setCat('all'); setColorFilter('all'); setSizeFilter('all'); setOnlySaved(false) }}
            className="h-11 px-6 bg-[var(--color-ink)] text-white text-sm font-medium"
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-10">
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
