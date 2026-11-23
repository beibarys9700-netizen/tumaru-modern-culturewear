import { useEffect, useState } from 'react'
import { COLORS, PRODUCTS, SIZES, SPECS, T, fmt } from '../data'
import { ProductCard } from './ProductGrid'

const RulerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="inline-block shrink-0">
    <path d="M2 8h20v8H2V8Z" />
    <path d="M6 8v4M10 8v3M14 8v4M18 8v3" />
  </svg>
)

export default function ProductPage({
  product,
  color,
  setColor,
  size,
  setSize,
  recommendedSize,
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
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    setImgIdx(0)
    setZoomed(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product.id, color])

  const nextImg = () => setImgIdx((i) => (i + 1) % imgs.length)
  const prevImg = () => setImgIdx((i) => (i - 1 + imgs.length) % imgs.length)

  const pairProduct = PRODUCTS.find((x) => x.id === product.pairId)
  const pairColor = pairProduct ? (pairProduct.defaultColor || pairProduct.colors[0]) : null
  const pairImg = pairProduct ? (pairProduct.images[pairColor]?.[0] || pairProduct.images[pairProduct.colors[0]][0]) : null

  const related = (product.relatedIds || [])
    .map((id) => PRODUCTS.find((x) => x.id === id))
    .filter(Boolean)

  return (
    <div className="pt-16 pb-20">
      {/* 2-колоночный блок 50/50 как на representclo.com */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Левая половина — Большое фото со стрелками < > и счётчиком */}
        <div className="lg:col-span-7 relative bg-[#F4F4F4] min-h-[68vh] lg:min-h-[82vh] flex items-center justify-center select-none overflow-hidden">
          <button
            onClick={onBack}
            className="absolute top-5 left-5 z-20 micro text-[10px] bg-white/80 backdrop-blur-xs px-3 py-1.5 hover:bg-white transition"
          >
            ← {t.backToShop}
          </button>

          <img
            src={imgs[imgIdx] || imgs[0]}
            alt={product.name}
            onClick={() => setZoomed((z) => !z)}
            className={`w-full h-[68vh] lg:h-[82vh] object-contain p-6 md:p-10 brightness-[1.06] contrast-[1.04] mix-blend-multiply transition-transform duration-300 cursor-zoom-in ${
              zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
            }`}
          />

          {/* Стрелки переключения фото */}
          {imgs.length > 1 && (
            <>
              <button
                onClick={prevImg}
                aria-label="Предыдущее фото"
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-ink/70 hover:text-ink hover:bg-white/70 transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button
                onClick={nextImg}
                aria-label="Следующее фото"
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-ink/70 hover:text-ink hover:bg-white/70 transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </>
          )}

          {/* Счётчик фото 1 / N и кнопка зума */}
          <div className="absolute bottom-4 left-5 z-20 micro text-[10px] text-black/60">
            {imgIdx + 1} / {imgs.length}
          </div>
          <button
            onClick={() => setZoomed((z) => !z)}
            aria-label="Увеличить"
            className="absolute bottom-4 right-5 z-20 w-8 h-8 flex items-center justify-center text-black/60 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>

        {/* Правая половина — Информация, цвета-миниатюры, размеры и заметная кнопка подбора размера с рулеткой */}
        <div className="lg:col-span-5 px-5 md:px-10 py-8 lg:py-12 lg:sticky lg:top-16 h-fit">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-lg md:text-xl font-semibold tracking-tight">{product.name}</h1>
              <p className="text-xs text-black/55 mt-0.5">{product.subtitle[lang]}</p>
            </div>
            <span className="text-base md:text-lg font-semibold whitespace-nowrap">{fmt(product.price)}</span>
          </div>

          {/* Выбор цвета с мини-превью фото */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs">
                <span className="font-semibold mr-2">{t.colorLabel}</span>
                <span className="text-black/65">{COLORS[color].label[lang]}</span>
              </span>
              <button
                onClick={() => onToggleSave(product.id)}
                className="text-xs text-black/65 hover:text-ink flex items-center gap-1.5"
              >
                <span>{savedIds.includes(product.id) ? 'В закладках' : 'В закладки'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={savedIds.includes(product.id) ? '#0A0A0A' : 'none'} stroke="#0A0A0A" strokeWidth="1.5">
                  <path d="M6 3h12v18l-6-4-6 4V3Z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => {
                const cThumb = product.images[c]?.[0] || imgs[0]
                return (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    title={COLORS[c].label[lang]}
                    className={`w-14 aspect-[4/5] bg-[#F4F4F4] border p-1 transition ${
                      color === c ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={cThumb} alt={COLORS[c].label[lang]} className="w-full h-full object-contain brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Размер + Заметная кнопка подбора размера с иконкой рулетки */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Размер</span>
              <button onClick={openSize} className="text-xs text-black/60 underline underline-offset-4 hover:text-ink">
                Таблица размеров
              </button>
            </div>
            <div className="grid grid-cols-4 border border-black/15 divide-x divide-black/15">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-11 text-xs font-medium transition-colors ${
                    size === s ? 'bg-ink text-white' : 'bg-white hover:bg-card'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Кнопка подбора размера с минималистичной рулеткой (1-в-1 как на 1-м скриншоте Represent) */}
            <button
              onClick={openSize}
              className="w-full mt-2 h-11 bg-[#F4F4F4] hover:bg-[#EAEAEA] transition-colors flex items-center justify-center gap-2.5 text-xs font-medium text-ink"
            >
              <span>
                {recommendedSize
                  ? `Рекомендуем размер: ${recommendedSize}`
                  : 'Подобрать размер по росту и весу'}
              </span>
              <RulerIcon />
            </button>
          </div>

          {/* Главная чёрная кнопка ADD TO CART */}
          <button
            disabled={!size}
            onClick={() => onAdd(product, color, size)}
            className="w-full mt-4 h-12 bg-ink text-white micro hover:bg-tur hover:text-ink transition-colors disabled:opacity-35"
          >
            {size ? `${t.addToBag} — ${fmt(product.price)}` : t.chooseSize}
          </button>

          {/* Информационные строки как на оригинале Represent */}
          <div className="mt-5 divide-y divide-black/10 border-y border-black/10 text-xs">
            <div className="py-3 flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-tur inline-block" />
                <span>Kaspi RED / Рассрочка 0-0-12</span>
              </span>
              <span className="text-black/40">›</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span>Бесплатная доставка при заказе от 50 000 ₸</span>
              <span className="text-black/40">›</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span>Отправка из Алматы (Яндекс / Казпочта / Worldwide)</span>
              <span className="text-black/40">›</span>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-black/70">
            {product.description[lang]}
          </p>

          {/* Характеристики */}
          <div className="mt-4 pt-3 border-t border-black/10 space-y-1.5 text-xs text-black/80">
            <div className="flex justify-between">
              <span className="text-black/50">{t.compLabel}</span>
              <span className="font-medium">{product.isDenim ? SPECS.denimComposition[lang] : SPECS.composition[lang]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">{t.fabLabel}</span>
              <span className="font-medium">{product.isDenim ? SPECS.denimFabric[lang] : SPECS.fabric[lang]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">{t.fitLabel}</span>
              <span className="font-medium text-right">{SPECS.fit[lang]}</span>
            </div>
          </div>

          {/* Докупить вместе */}
          {pairProduct && (
            <div className="mt-6 border border-black/10 p-3.5 bg-[#F8F8F8]">
              <p className="micro text-[9px] mb-2.5 text-black/60">{t.completeLook}</p>
              <div className="flex gap-3 items-center">
                <img
                  src={pairImg}
                  alt={pairProduct.name}
                  onClick={() => onOpenPage(pairProduct, pairColor)}
                  className="w-14 aspect-[4/5] object-contain bg-[#F4F4F4] p-1 brightness-[1.06] contrast-[1.04] mix-blend-multiply cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p
                    onClick={() => onOpenPage(pairProduct, pairColor)}
                    className="text-xs font-semibold truncate cursor-pointer hover:underline"
                  >
                    {pairProduct.name}
                  </p>
                  <p className="text-xs text-black/60 mt-0.5">{fmt(pairProduct.price)}</p>
                  <div className="flex items-center gap-1 mt-1.5">
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

      {/* Рекомендации во всю ширину с узкими зазорами */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-black/10">
          <h2 className="micro mb-4 px-3 md:px-5">{t.youMayLike}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[2px] gap-y-8">
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
