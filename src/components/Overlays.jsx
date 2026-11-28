import { useEffect, useState } from 'react'
import { BRAND } from '../brand.config'
import { COLORS, SIZES, SPECS, fmt, recommendSize, PRODUCTS, T } from '../data'

export function Panel({ open, onClose, side = 'right', title, children }) {
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-[60] bg-black/45 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 bottom-0 ${side}-0 z-[70] w-full md:max-w-[460px] bg-white flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-14 px-5 border-b border-black/10">
          <h3 className="text-[13px] font-semibold tracking-wide uppercase">{title}</h3>
          <button onClick={onClose} className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-2xl leading-none" aria-label="Close">×</button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  )
}

export function ProductDrawer({ sel, lang, onClose, setColor, onAdd, openSize, size, setSize }) {
  const p = sel?.p
  const [imgIdx, setImgIdx] = useState(0)
  const imgs = p ? (p.images[sel.color] || p.images[p.colors[0]]) : []
  const t = T[lang]

  useEffect(() => { setImgIdx(0) }, [p?.id, sel?.color])

  return (
    <Panel open={!!sel} onClose={onClose} title={p?.name || ''}>
      {p && (
        <div className="p-5">
          <div className="relative aspect-[4/5] bg-[var(--color-card)] overflow-hidden">
            <img
              src={imgs[imgIdx] || imgs[0]}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-contain p-3 brightness-[1.06] contrast-[1.04] mix-blend-multiply"
            />
          </div>
          {imgs.length > 1 && (
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
              {imgs.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`w-14 aspect-[4/5] bg-[var(--color-card)] shrink-0 border ${imgIdx === i ? 'border-[var(--color-ink)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-contain p-1 brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-4 text-sm font-semibold">
            <div>
              <h4>{p.name}</h4>
              <p className="text-[13px] font-normal text-[var(--color-muted)] mt-0.5">{p.subtitle[lang]}</p>
            </div>
            <span>{fmt(p.price)}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {p.colors.map((c) => (
              <button key={c} onClick={() => setColor(c)} aria-label={COLORS[c].label[lang]}
                className={`w-5 h-5 rounded-full border border-black/20 ring-1 ring-offset-2 ${sel.color === c ? 'ring-[var(--color-ink)]' : 'ring-transparent'}`}
                style={{ background: COLORS[c].hex }} />
            ))}
            <span className="text-[13px] text-[var(--color-muted)] ml-1">{t.colorLabel}: {COLORS[sel.color].label[lang]}</span>
          </div>

          <div className="mt-4 border-t border-black/10 pt-3 space-y-1 text-[13px] text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)] mr-2">{t.compLabel}:</span>{p.isDenim ? SPECS.denimComposition[lang] : SPECS.composition[lang]}</p>
            <p><span className="font-semibold text-[var(--color-ink)] mr-2">{t.fabLabel}:</span>{p.isDenim ? SPECS.denimFabric[lang] : SPECS.fabric[lang]}</p>
          </div>

          <div className="flex justify-between items-center mt-5 mb-2 text-[13px]">
            <span className="font-semibold">{t.sizeLabel}</span>
            <button onClick={openSize} className="underline underline-offset-4">{t.size}</button>
          </div>
          <div className={`grid ${(p.sizes || SIZES).length > 4 ? 'grid-cols-3' : 'grid-cols-4'} gap-2`}>
            {(p.sizes || SIZES).map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`h-11 border text-xs font-semibold ${size === s ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]' : 'border-black/20 hover:border-[var(--color-ink)]'}`}>{s}</button>
            ))}
          </div>

          <button disabled={!size} onClick={onAdd}
            className="w-full mt-6 h-12 bg-[var(--color-ink)] text-white text-sm font-semibold disabled:opacity-35 hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors">
            {size ? t.addToBag : t.chooseSize}
          </button>
        </div>
      )}
    </Panel>
  )
}

export function SizeModal({ open, lang, onClose, product, onAdd, onSelectOnly }) {
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState('men')
  const [h, setH] = useState(175)
  const [w, setW] = useState(72)
  const [chest, setChest] = useState('avg')
  const [stomach, setStomach] = useState('avg')
  const [hips, setHips] = useState('avg')
  const [fit, setFit] = useState('as_cut')
  const [pid, setPid] = useState(PRODUCTS[0].id)
  const t = T[lang]

  useEffect(() => {
    if (open) setStep(1)
    if (product) setPid(product.id)
  }, [open, product])

  if (!open) return null

  const target = product || PRODUCTS.find((x) => x.id === +pid)
  const thumb = target.images[target.defaultColor || target.colors[0]][0]
  const rec = recommendSize(h, w, { gender, chest, stomach, hips, fit })

  const stepLabel = step <= 3
    ? `${t.stepWord} ${step} ${t.ofWord} 3`
    : t.bestFit

  const ShapeRow = ({ label, val, setVal }) => (
    <div>
      <p className="text-[13px] font-semibold mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {[['narrow', t.narrow], ['avg', t.avg], ['fuller', t.fuller]].map(([k, txt]) => (
          <button
            key={k}
            onClick={() => setVal(k)}
            className={`h-11 border text-[13px] transition ${val === k ? 'border-2 border-[var(--color-ink)] bg-[var(--color-card)] font-semibold' : 'border-black/15 hover:border-black/40'}`}
          >
            {txt}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center md:p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative bg-white w-full h-full md:h-auto md:max-w-[440px] md:max-h-[92vh] flex flex-col overflow-hidden md:border border-black/10">
        <div className="flex items-center justify-between px-5 h-14 border-b border-black/10">
          <span className="text-[13px] font-semibold uppercase tracking-wide">{t.sizeAdvisorTitle}</span>
          <button onClick={onClose} className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-2xl leading-none" aria-label={t.close}>×</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          <div className="flex items-center gap-3 bg-[#F6F5F2] p-2.5 mb-4">
            <img src={thumb} alt={target.name} className="w-11 h-11 object-contain bg-white brightness-[1.06] contrast-[1.04] mix-blend-multiply p-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              {!product ? (
                <select value={pid} onChange={(e) => setPid(e.target.value)} className="w-full bg-transparent text-[13px] font-semibold outline-none">
                  {PRODUCTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                </select>
              ) : (
                <p className="text-[13px] font-semibold truncate">{target.name}</p>
              )}
              <p className="text-[13px] text-[var(--color-muted)]">{fmt(target.price)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-0.5 ${step >= i ? 'bg-[var(--color-ink)]' : 'bg-black/15'}`} />
            ))}
          </div>
          <p className="text-[13px] text-[var(--color-muted)] mb-4">{stepLabel}</p>

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 border border-black/15">
                {[['women', t.womenLabel], ['men', t.menLabel]].map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setGender(k)}
                    className={`h-11 text-[13px] font-semibold ${gender === k ? 'bg-[var(--color-ink)] text-white' : 'bg-white text-[var(--color-muted)]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px] text-[var(--color-muted)]">{t.heightLabel}</span>
                  <span className="text-2xl font-bold">{h} <span className="text-sm font-normal text-[var(--color-muted)]">{t.cmUnit}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setH((v) => Math.max(145, v - 1))} className="w-11 h-11 border border-black/20 rounded-full flex items-center justify-center text-lg">−</button>
                  <input type="range" min={145} max={210} value={h} onChange={(e) => setH(+e.target.value)} className="flex-1 accent-black" />
                  <button onClick={() => setH((v) => Math.min(210, v + 1))} className="w-11 h-11 border border-black/20 rounded-full flex items-center justify-center text-lg">+</button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px] text-[var(--color-muted)]">{t.weightLabel}</span>
                  <span className="text-2xl font-bold">{w} <span className="text-sm font-normal text-[var(--color-muted)]">{t.kgUnit}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setW((v) => Math.max(40, v - 1))} className="w-11 h-11 border border-black/20 rounded-full flex items-center justify-center text-lg">−</button>
                  <input type="range" min={40} max={150} value={w} onChange={(e) => setW(+e.target.value)} className="flex-1 accent-black" />
                  <button onClick={() => setW((v) => Math.min(150, v + 1))} className="w-11 h-11 border border-black/20 rounded-full flex items-center justify-center text-lg">+</button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold">{t.shapeTitle}</h3>
                <p className="text-[13px] text-[var(--color-muted)] mt-1">{t.shapeDesc}</p>
              </div>
              <ShapeRow label={t.chestLabel} val={chest} setVal={setChest} />
              <ShapeRow label={t.stomachLabel} val={stomach} setVal={setStomach} />
              <ShapeRow label={t.hipsLabel} val={hips} setVal={setHips} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">{t.fitQuestion}</h3>
              <div className="grid grid-cols-3 gap-2">
                {[['close', t.fitClose], ['as_cut', t.fitAsCut], ['relaxed', t.fitRelaxed]].map(([k, txt]) => (
                  <button
                    key={k}
                    onClick={() => setFit(k)}
                    className={`h-12 border text-[13px] transition ${fit === k ? 'border-2 border-[var(--color-ink)] bg-[var(--color-card)] font-semibold' : 'border-black/15 hover:border-black/40'}`}
                  >
                    {txt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-32 h-32 mx-auto rounded-full border-[6px] border-[var(--color-accent)] flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold leading-none">{rec}</span>
                <span className="text-[13px] text-[var(--color-muted)] mt-1">{t.bestFit}</span>
              </div>
              <p className="text-sm text-[var(--color-ink)] bg-[#F6F5F2] p-4">
                <b>{rec}</b> — {h} {t.cmUnit} / {w} {t.kgUnit}
              </p>
            </div>
          )}
        </div>

        <div className="p-5 pt-3 border-t border-black/10 space-y-2">
          {step < 3 && (
            <button onClick={() => setStep((s) => s + 1)} className="w-full h-12 bg-[var(--color-ink)] text-white text-sm font-semibold">
              {t.continueBtn} →
            </button>
          )}
          {step === 3 && (
            <button onClick={() => setStep(4)} className="w-full h-12 bg-[var(--color-ink)] text-white text-sm font-semibold">
              {t.showSizeBtn}
            </button>
          )}
          {step === 4 && (
            <>
              <button
                onClick={() => { onAdd(target, rec); onClose() }}
                className="w-full h-12 bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors"
              >
                {t.addSizePrefix} {rec} {t.toBagSuffix}
              </button>
              <div className="flex justify-center gap-6 pt-1">
                {onSelectOnly && (
                  <button onClick={() => { onSelectOnly(rec); onClose() }} className="min-h-[36px] text-[13px] underline underline-offset-4">
                    {t.selectOnPage} ({rec})
                  </button>
                )}
                <button onClick={() => setStep(1)} className="min-h-[36px] text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                  {t.editParams}
                </button>
              </div>
            </>
          )}
          {step > 1 && step < 4 && (
            <button onClick={() => setStep((s) => s - 1)} className="w-full h-11 border border-black/20 text-[13px] font-medium">
              {t.backBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function CartDrawer({ open, lang, onClose, items, setQty, delivery, onAddQuick, onCheckout, onOpenCatalog }) {
  const [upsellSizes, setUpsellSizes] = useState({})
  const t = T[lang]
  const sub = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  const FREE_SHIP = BRAND.freeShippingThreshold
  const leftForFree = Math.max(0, FREE_SHIP - sub)
  const pct = Math.min(100, Math.round((sub / FREE_SHIP) * 100))

  const d = BRAND.delivery.find((x) => x.id === delivery) || BRAND.delivery[0]
  const shipFee = items.length ? (sub >= FREE_SHIP && delivery !== 'world' ? 0 : d.price) : 0
  const total = sub + shipFee

  const suggestions = PRODUCTS.filter((p) => !items.some((i) => i.p.id === p.id)).slice(0, 3)

  return (
    <Panel open={open} onClose={onClose} title={`${t.yourBag} (${items.reduce((s, i) => s + i.qty, 0)})`}>
      <div className="flex flex-col h-full">
        {/* Прогресс бесплатной доставки */}
        <div className="px-5 pt-3 pb-3 border-b border-black/10">
          <div className="h-1.5 bg-black/10 w-full mb-2.5 overflow-hidden">
            <div className="h-full bg-[var(--color-accent-dark)] transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[13px]">
            {leftForFree > 0 ? (
              <>{t.freeShipLeft} <b>{fmt(leftForFree)}</b></>
            ) : (
              <b>{t.freeShipDone} ✓</b>
            )}
          </p>
        </div>

        {/* SVG-иконка склада вместо текстового эмодзи флага "kz" */}
        <div className="px-5 py-2.5 border-b border-black/10 flex items-center gap-2 text-[13px] text-[var(--color-muted)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0">
            <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z" />
            <circle cx="12" cy="11" r="2" />
          </svg>
          <span>{t.shipFrom}</span>
        </div>

        <div className="flex-1 p-5 space-y-5">
          {/* Пустая корзина: убран блок "С этим покупают", добавлена кнопка "Перейти в каталог" */}
          {!items.length ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-sm text-[var(--color-muted)]">{t.emptyCart}</p>
              <button
                onClick={() => { onClose(); onOpenCatalog() }}
                className="h-12 px-7 bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors"
              >
                {t.goToCatalog}
              </button>
            </div>
          ) : (
            <>
              {items.map((i) => {
                const thumb = i.p.images[i.color]?.[0] || i.p.images[i.p.colors[0]][0]
                return (
                  <div key={i.key} className="flex gap-3.5">
                    <div className="w-20 aspect-[4/5] bg-[var(--color-card)] relative shrink-0">
                      <img src={thumb} alt={i.p.name} className="absolute inset-0 w-full h-full object-contain p-1.5 brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                    </div>
                    <div className="flex-1 text-[13px]">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold">{i.p.name}</p>
                        <button onClick={() => setQty(i.key, 0)} className="min-w-[32px] min-h-[32px] -mt-1 -mr-1 text-[var(--color-muted)] hover:text-[var(--color-ink)] text-lg leading-none">×</button>
                      </div>
                      <p className="mt-0.5 font-medium">{fmt(i.p.price)} <span className="text-[var(--color-muted)] ml-1">· {i.size} · {COLORS[i.color].label[lang]}</span></p>
                      <div className="flex items-center gap-3 mt-3 border border-black/15 w-fit">
                        <button className="w-9 h-9 text-base" onClick={() => setQty(i.key, i.qty - 1)}>−</button>
                        <span className="font-medium">{i.qty}</span>
                        <button className="w-9 h-9 text-base" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Upsell с обязательным выбором размера перед добавлением */}
              {suggestions.length > 0 && (
                <div className="pt-4 border-t border-black/10">
                  <p className="text-[13px] font-semibold mb-3">{t.alsoBought}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {suggestions.map((sp) => {
                      const sc = sp.defaultColor || sp.colors[0]
                      const pickedSz = upsellSizes[sp.id] || ''
                      return (
                        <div key={sp.id} className="bg-[var(--color-card)] p-2 flex flex-col">
                          <img src={sp.images[sc][0]} alt={sp.name} className="w-full aspect-[4/5] object-contain brightness-[1.06] contrast-[1.04] mix-blend-multiply mb-1.5" />
                          <p className="text-[12px] font-semibold truncate">{sp.name}</p>
                          <p className="text-[12px] text-[var(--color-muted)] mb-1.5">{fmt(sp.price)}</p>
                          <select
                            value={pickedSz}
                            onChange={(e) => setUpsellSizes((prev) => ({ ...prev, [sp.id]: e.target.value }))}
                            className="w-full h-8 px-1.5 mb-1.5 bg-white border border-black/15 text-[12px] outline-none"
                          >
                            <option value="">{t.pickSizeShort}</option>
                            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button
                            disabled={!pickedSz}
                            onClick={() => onAddQuick(sp, sc, pickedSz)}
                            className="mt-auto w-full h-9 bg-[var(--color-ink)] text-white text-[12px] font-semibold disabled:opacity-30 hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition"
                          >
                            {t.addBtn}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!!items.length && (
          <div className="border-t border-black/10 p-5 space-y-3 sticky bottom-0 bg-white">
            <div className="bg-[#F8F8F8] p-3 space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[var(--color-muted)]"><span>{t.itemsSubtotal}</span><span>{fmt(sub)}</span></div>
              <div className="flex justify-between text-[var(--color-muted)]">
                <span>{t.deliveryLabel}</span>
                <span>{shipFee === 0 ? t.freeLabel : fmt(shipFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1 border-t border-black/10">
                <span>{t.totalLabel}</span><span>{fmt(total)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full h-12 bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors"
            >
              {t.checkoutBtn} →
            </button>
          </div>
        )}
      </div>
    </Panel>
  )
}
