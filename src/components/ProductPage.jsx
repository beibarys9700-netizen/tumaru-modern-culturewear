import { useEffect, useRef, useState } from 'react'
import { BRAND } from '../brand.config'
import { COLORS, PRODUCTS, SIZES, SPECS, T, fmt } from '../data'
import { ProductCard } from './ProductGrid'

const RulerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block shrink-0">
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
  const productSizes = product.sizes || SIZES
  const [imgIdx, setImgIdx] = useState(0)
  const [pairSize, setPairSize] = useState('L')
  const [zoomed, setZoomed] = useState(false)
  const [sizeAlert, setSizeAlert] = useState(false)
  const [openAcc, setOpenAcc] = useState(0)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const sizeBlockRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    setImgIdx(0)
    setZoomed(false)
    setSizeAlert(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product.id, color])

  useEffect(() => {
    const onScroll = () => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      setShowStickyCta(rect.bottom < 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nextImg = () => setImgIdx((i) => (i + 1) % imgs.length)
  const prevImg = () => setImgIdx((i) => (i - 1 + imgs.length) % imgs.length)

  const handlePrimaryCta = () => {
    if (!size) {
      setSizeAlert(true)
      sizeBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSizeAlert(false)
    onAdd(product, color, size)
  }

  const monthly = Math.round(product.price / BRAND.installmentMonths)
  const selectedStock = size && product.stockBySize ? product.stockBySize[size] : null

  const pairProduct = PRODUCTS.find((x) => x.id === product.pairId)
  const pairColor = pairProduct ? (pairProduct.defaultColor || pairProduct.colors[0]) : null
  const pairImg = pairProduct ? (pairProduct.images[pairColor]?.[0] || pairProduct.images[pairProduct.colors[0]][0]) : null

  const related = (product.relatedIds || [])
    .map((id) => PRODUCTS.find((x) => x.id === id))
    .filter(Boolean)

  const accordions = [
    {
      title: { RU: 'Описание, состав и уход', KZ: 'Сипаттама, құрамы және күтімі', EN: 'Details, Composition & Care' }[lang],
      body: (
        <div className="space-y-2 text-[13px] text-[var(--color-muted)] leading-relaxed">
          <p>{product.description[lang]}</p>
          <p><b className="text-[var(--color-ink)]">{t.compLabel}:</b> {product.isDenim ? SPECS.denimComposition[lang] : SPECS.composition[lang]}</p>
          <p><b className="text-[var(--color-ink)]">{t.fabLabel}:</b> {product.isDenim ? SPECS.denimFabric[lang] : SPECS.fabric[lang]}</p>
          <p><b className="text-[var(--color-ink)]">{t.careLabel}:</b> {SPECS.care[lang]}</p>
        </div>
      ),
    },
    {
      title: { RU: 'Доставка и обмен 14 дней', KZ: 'Жеткізу және 14 күнде айырбастау', EN: 'Shipping & 14-Day Returns' }[lang],
      body: (
        <div className="space-y-1.5 text-[13px] text-[var(--color-muted)] leading-relaxed">
          {BRAND.shippingInfo[lang].map((s) => (
            <p key={s.title}><b className="text-[var(--color-ink)]">{s.title}:</b> {s.desc}</p>
          ))}
        </div>
      ),
    },
    {
      title: { RU: 'Посадка и параметры модели', KZ: 'Пішімі және модель параметрлері', EN: 'Fit & Model Info' }[lang],
      body: (
        <div className="space-y-1.5 text-[13px] text-[var(--color-muted)] leading-relaxed">
          <p>{product.modelInfo?.[lang]}</p>
          <p>{SPECS.fit[lang]}</p>
        </div>
      ),
    },
  ]

  return (
    <div className="pt-20 pb-24 max-w-[1440px] mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between py-3 border-b border-black/10 mb-6">
        <button onClick={onBack} className="min-h-[44px] flex items-center text-[13px] font-medium hover:opacity-65">
          ← {t.backToShop}
        </button>
        <span className="text-[13px] text-[var(--color-muted)]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Левая колонка — Галерея со стрелками + миниатюрами */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative bg-[var(--color-card)] aspect-[4/5] flex items-center justify-center overflow-hidden select-none">
            <img
              src={imgs[imgIdx] || imgs[0]}
              alt={product.name}
              onClick={() => setZoomed((z) => !z)}
              className={`w-full h-full object-contain p-4 md:p-8 brightness-[1.06] contrast-[1.04] mix-blend-multiply transition-transform duration-300 cursor-zoom-in ${
                zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
              }`}
            />

            {imgs.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  aria-label="Предыдущее фото"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/80 hover:bg-white flex items-center justify-center transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={nextImg}
                  aria-label="Следующее фото"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/80 hover:bg-white flex items-center justify-center transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </>
            )}

            <div className="absolute bottom-3 left-4 text-[12px] font-medium text-[var(--color-muted)]">
              {imgIdx + 1} / {imgs.length}
            </div>
          </div>

          {imgs.length > 1 && (
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {imgs.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-[4/5] bg-[var(--color-card)] border p-1 transition ${
                    imgIdx === i ? 'border-[var(--color-ink)]' : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-contain brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Правая sticky-колонка */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 h-fit">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-sm text-[var(--color-muted)] mt-1">{product.subtitle[lang]}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl font-bold whitespace-nowrap">{fmt(product.price)}</span>
            </div>
          </div>

          {/* Рассрочка Kaspi RED */}
          <p className="text-[13px] text-[var(--color-muted)] mt-2">
            {t.installmentPrefix} <span className="font-semibold text-[var(--color-ink)]">{fmt(monthly)}</span> {t.installmentSuffix}
          </p>

          {/* Параметры модели */}
          {product.modelInfo && (
            <p className="text-[13px] text-[var(--color-muted)] mt-2">{product.modelInfo[lang]}</p>
          )}

          {/* Выбор цвета */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px]">
                <span className="font-semibold mr-2">{t.colorLabel}:</span>
                <span className="text-[var(--color-muted)]">{COLORS[color].label[lang]}</span>
              </span>
              <button
                onClick={() => onToggleSave(product.id)}
                className="min-h-[36px] text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)] flex items-center gap-1.5"
              >
                <span>{t.savedOnly}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={savedIds.includes(product.id) ? '#0A0A0A' : 'none'} stroke="#0A0A0A" strokeWidth="1.6">
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
                    className={`w-16 aspect-[4/5] bg-[var(--color-card)] border p-1 transition ${
                      color === c ? 'border-[var(--color-ink)]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={cThumb} alt={COLORS[c].label[lang]} className="w-full h-full object-contain brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Выбор размера + Остатки + Рулетка */}
          <div ref={sizeBlockRef} className={`mt-6 p-3 -mx-3 transition ${sizeAlert && !size ? 'bg-[#FFF5F5] ring-1 ring-[#9B1C1C]' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-semibold">
                {t.sizeLabel}
                {selectedStock !== null && selectedStock < 5 && (
                  <span className="ml-2 text-[#9B1C1C] font-medium">· {t.leftInStock} {selectedStock} {t.pcs}</span>
                )}
              </span>
              {sizeAlert && !size && (
                <span className="text-[12px] font-semibold text-[#9B1C1C]">{t.chooseSizeHint}</span>
              )}
            </div>

            <div className={`grid ${productSizes.length > 4 ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-4'} border border-black/15 divide-x divide-black/15`}>
              {productSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setSizeAlert(false) }}
                  className={`h-12 text-sm font-semibold transition-colors ${
                    size === s ? 'bg-[var(--color-ink)] text-white' : 'bg-white hover:bg-[var(--color-card)]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={openSize}
              className="w-full mt-2.5 h-11 bg-[var(--color-card)] hover:bg-[#EAEAEA] transition-colors flex items-center justify-center gap-2.5 text-[13px] font-medium text-[var(--color-ink)]"
            >
              <span>
                {recommendedSize ? `${t.size}: ${recommendedSize}` : t.size}
              </span>
              <RulerIcon />
            </button>
          </div>

          {/* Всегда активная контрастная чёрная кнопка */}
          <button
            ref={ctaRef}
            onClick={handlePrimaryCta}
            className="w-full mt-3 h-13 py-4 bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors"
          >
            {size ? `${t.addToBag} — ${fmt(product.price)}` : t.chooseSize}
          </button>

          {/* Аккордеоны (Состав, Доставка/Возврат, Модель/Посадка) */}
          <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {accordions.map((acc, idx) => (
              <div key={acc.title}>
                <button
                  onClick={() => setOpenAcc(openAcc === idx ? -1 : idx)}
                  className="w-full min-h-[48px] py-3 flex items-center justify-between text-left text-[13px] font-semibold"
                >
                  <span>{acc.title}</span>
                  <span className="text-base">{openAcc === idx ? '−' : '+'}</span>
                </button>
                {openAcc === idx && <div className="pb-4">{acc.body}</div>}
              </div>
            ))}
          </div>

          {/* Докупить в комплект */}
          {pairProduct && (
            <div className="mt-6 border border-black/10 p-4 bg-[var(--color-card)]/60">
              <p className="text-[12px] font-semibold text-[var(--color-muted)] mb-3">{t.completeLook}</p>
              <div className="flex gap-3 items-center">
                <img
                  src={pairImg}
                  alt={pairProduct.name}
                  onClick={() => onOpenPage(pairProduct, pairColor)}
                  className="w-16 aspect-[4/5] object-contain bg-[var(--color-card)] p-1 brightness-[1.06] contrast-[1.04] mix-blend-multiply cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p onClick={() => onOpenPage(pairProduct, pairColor)} className="text-[13px] font-semibold truncate cursor-pointer hover:underline">
                    {pairProduct.name}
                  </p>
                  <p className="text-[13px] text-[var(--color-muted)] mt-0.5">{fmt(pairProduct.price)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPairSize(s)}
                        className={`min-w-[32px] h-8 px-1.5 text-[12px] border ${
                          pairSize === s ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]' : 'border-black/20 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onAdd(pairProduct, pairColor, pairSize)}
                  className="min-h-[44px] px-4 bg-[var(--color-ink)] text-white text-[12px] font-semibold shrink-0 hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors"
                >
                  + {t.addBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Вам также понравится */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-black/10">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-6">{t.youMayLike}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8">
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

      {/* Sticky-бар при скролле */}
      {showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-black/15 px-4 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{product.name}</p>
              <p className="text-[13px] text-[var(--color-muted)]">{fmt(product.price)} {size ? `· ${size}` : ''}</p>
            </div>
            <button
              onClick={handlePrimaryCta}
              className="min-h-[44px] px-6 bg-[var(--color-ink)] text-white text-sm font-semibold shrink-0 hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors"
            >
              {size ? t.addToBag : t.chooseSize}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
