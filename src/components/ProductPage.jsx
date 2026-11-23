import { useEffect, useState } from 'react'
import { COLORS, PRODUCTS, SIZES, SPECS, T, fmt } from '../data'
import { ProductCard } from './ProductGrid'

export default function ProductPage({
  product,
  color,
  setColor,
  size,
  setSize,
  lang,
  onBack,
  onAdd,
  openSize,
  onOpenPage,
  onQuickAdd,
  savedIds,
  onToggleSave,
}) {
  const t = T[lang]
  const imgs = product.images[color] || product.images[product.colors[0]]
  const [imgIdx, setImgIdx] = useState(0)
  const [pairSize, setPairSize] = useState('L')

  useEffect(() => {
    setImgIdx(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product.id, color])

  const pairProduct = PRODUCTS.find((x) => x.id === product.pairId)
  const pairColor = pairProduct ? (pairProduct.defaultColor || pairProduct.colors[0]) : null
  const pairImg = pairProduct ? (pairProduct.images[pairColor]?.[0] || pairProduct.images[pairProduct.colors[0]][0]) : null

  const related = (product.relatedIds || [])
    .map((id) => PRODUCTS.find((x) => x.id === id))
    .filter(Boolean)

  return (
    <div className="pt-20 pb-20 max-w-[1440px] mx-auto px-4 md:px-6">
      {/* Хлебные крошки / Назад */}
      <div className="flex items-center justify-between py-4 border-b border-black/10 mb-8">
        <button onClick={onBack} className="micro flex items-center gap-2 hover:opacity-60">
          ← {t.backToShop}
        </button>
        <span className="micro text-black/45">TUMARU / {product.name}</span>
      </div>

      {/* Основной 2-колоночный блок товара */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Левая колонка — Галерея */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-3">
            <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto pb-1">
              {imgs.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`w-16 md:w-20 aspect-[4/5] bg-card shrink-0 border transition ${
                    imgIdx === i ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-contain p-1.5 mix-blend-multiply" />
                </button>
              ))}
            </div>
            <div className="order-1 md:order-2 relative aspect-[4/5] bg-card overflow-hidden">
              <img
                src={imgs[imgIdx] || imgs[0]}
                alt={product.name}
                className="w-full h-full object-contain p-6 mix-blend-multiply"
              />
              <button
                onClick={() => onToggleSave(product.id)}
                aria-label="В закладки"
                className="absolute top-4 right-4 w-9 h-9 bg-white/85 flex items-center justify-center hover:bg-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={savedIds.includes(product.id) ? '#0A0A0A' : 'none'} stroke="#0A0A0A" strokeWidth="1.5">
                  <path d="M6 3h12v18l-6-4-6 4V3Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Правая колонка — Детали и покупка */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          <p className="micro text-[10px] text-black/60 flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 bg-tur inline-block" />{t.inStock} · DROP 003
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-sm text-black/55 mt-1">{product.subtitle[lang]}</p>
            </div>
            <span className="text-xl font-semibold whitespace-nowrap">{fmt(product.price)}</span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-black/75">
            {product.description[lang]}
          </p>

          {/* Цвет */}
          <div className="mt-6">
            <p className="micro text-[10px] text-black/55 mb-2.5">
              {t.colorLabel}: <span className="text-ink">{COLORS[color].label[lang]}</span>
            </p>
            <div className="flex items-center gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={COLORS[c].label[lang]}
                  className={`w-6 h-6 rounded-full border border-black/20 ring-2 ring-offset-2 ${
                    color === c ? 'ring-tur' : 'ring-transparent'
                  }`}
                  style={{ background: COLORS[c].hex }}
                />
              ))}
            </div>
          </div>

          {/* Размер + Подбор по росту и весу */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="micro text-[10px]">Размер</span>
              <button
                onClick={openSize}
                className="micro text-[10px] underline underline-offset-4 flex items-center gap-1.5 hover:opacity-60"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-tur inline-block" />
                {t.size}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 border text-xs font-medium transition-colors ${
                    size === s ? 'bg-ink text-white border-ink' : 'border-black/20 hover:border-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!size}
            onClick={() => onAdd(product, color, size)}
            className="w-full mt-5 h-13 py-4 bg-ink text-white micro hover:bg-tur hover:text-ink transition-colors disabled:opacity-30"
          >
            {size ? `${t.addToBag} — ${fmt(product.price)}` : t.chooseSize}
          </button>

          {/* Плашки оплаты и доставки */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="border border-black/15 px-3 py-2.5 micro text-[10px]">
              <span className="text-tur">●</span> Kaspi RED / 0-0-12
            </div>
            <div className="border border-black/15 px-3 py-2.5 micro text-[10px]">
              <span className="text-tur">●</span> Worldwide / Алматы
            </div>
          </div>

          {/* Характеристики */}
          <div className="mt-6 border-t border-black/10 pt-4 space-y-2 text-xs text-black/80">
            <div className="flex justify-between">
              <span className="text-black/50">{t.compLabel}</span>
              <span className="font-medium">{SPECS.composition[lang]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">{t.fabLabel}</span>
              <span className="font-medium">{SPECS.fabric[lang]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">{t.fitLabel}</span>
              <span className="font-medium text-right">{SPECS.fit[lang]}</span>
            </div>
          </div>

          {/* Докупить вместе */}
          {pairProduct && (
            <div className="mt-8 border border-black/10 p-4 bg-card/50">
              <p className="micro text-[10px] mb-3">{t.completeLook}</p>
              <div className="flex gap-3 items-center">
                <img
                  src={pairImg}
                  alt={pairProduct.name}
                  onClick={() => onOpenPage(pairProduct, pairColor)}
                  className="w-16 aspect-[4/5] object-contain bg-card p-1 mix-blend-multiply cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p
                    onClick={() => onOpenPage(pairProduct, pairColor)}
                    className="text-xs font-semibold truncate cursor-pointer hover:underline"
                  >
                    {pairProduct.name}
                  </p>
                  <p className="text-xs text-black/60 mt-0.5">{fmt(pairProduct.price)}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPairSize(s)}
                        className={`px-2 py-0.5 text-[10px] border ${
                          pairSize === s ? 'bg-ink text-white border-ink' : 'border-black/20 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onAdd(pairProduct, pairColor, pairSize)}
                  className="px-3 py-2 bg-ink text-white micro text-[9px] shrink-0 hover:bg-tur hover:text-ink transition-colors"
                >
                  + В корзину
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Рекомендации */}
      {related.length > 0 && (
        <section className="mt-20 pt-10 border-t border-black/10">
          <h2 className="micro mb-6">{t.youMayLike}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                p={item}
                lang={lang}
                onOpenPage={onOpenPage}
                onQuickAdd={onQuickAdd}
                saved={savedIds.includes(item.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
