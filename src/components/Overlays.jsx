import { useEffect, useState } from 'react'
import { COLORS, SIZES, DELIVERY, SPECS, fmt, recommendSize, PRODUCTS, WA_PHONE, T } from '../data'

export function Panel({ open, onClose, side = 'right', title, children }) {
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 bottom-0 ${side}-0 z-[70] w-full max-w-[460px] bg-white flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-14 px-5 border-b border-black/10">
          <h3 className="micro">{title}</h3>
          <button onClick={onClose} className="text-xl leading-none" aria-label="Закрыть">×</button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  )
}

const Badge = ({ children }) => <div className="border border-black/15 px-3 py-2.5 micro text-[10px]">{children}</div>

export function ProductDrawer({ sel, lang, onClose, setColor, onAdd, openSize, size, setSize }) {
  const p = sel?.p
  const [imgIdx, setImgIdx] = useState(0)
  const imgs = p ? (p.images[sel.color] || p.images[p.colors[0]]) : []
  const t = T[lang]

  useEffect(() => { setImgIdx(0) }, [p?.id, sel?.color])

  return (
    <Panel open={!!sel} onClose={onClose} title={p?.name || 'Товар'}>
      {p && (
        <div className="p-5">
          <div className="relative aspect-[4/5] bg-card overflow-hidden">
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
                  className={`w-14 aspect-[4/5] bg-card shrink-0 border ${imgIdx === i ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-contain p-1 mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-4 text-sm font-medium">
            <div>
              <h4>{p.name}</h4>
              <p className="text-xs text-black/50 mt-0.5">{p.subtitle[lang]}</p>
            </div>
            <span>{fmt(p.price)}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {p.colors.map((c) => (
              <button key={c} onClick={() => setColor(c)} aria-label={COLORS[c].label[lang]}
                className={`w-4 h-4 rounded-full border border-black/20 ring-1 ring-offset-2 ${sel.color === c ? 'ring-tur' : 'ring-transparent'}`}
                style={{ background: COLORS[c].hex }} />
            ))}
            <span className="micro text-[9px] text-black/50 ml-1">{t.colorLabel}: {COLORS[sel.color].label[lang]}</span>
          </div>

          <div className="mt-4 border-t border-black/10 pt-3 space-y-1 text-xs text-black/75">
            <p><span className="micro text-[9px] text-black/45 mr-2">{t.compLabel}:</span>{p.isDenim ? SPECS.denimComposition[lang] : SPECS.composition[lang]}</p>
            <p><span className="micro text-[9px] text-black/45 mr-2">{t.fabLabel}:</span>{p.isDenim ? SPECS.denimFabric[lang] : SPECS.fabric[lang]}</p>
          </div>

          <div className="flex justify-between mt-5 mb-2 micro">
            <span>Размер</span>
            <button onClick={openSize} className="underline underline-offset-4">{t.size}</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`h-11 border text-xs font-medium ${size === s ? 'bg-ink text-white border-ink' : 'border-black/20 hover:border-ink'}`}>{s}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <Badge><span className="text-tur">●</span> Kaspi RED / Рассрочка</Badge>
            <Badge><span className="text-tur">●</span> Доставка по всему миру</Badge>
          </div>
          <button disabled={!size} onClick={onAdd}
            className="w-full mt-6 h-12 bg-ink text-white micro disabled:opacity-30">
            {size ? t.addToBag : t.chooseSize}
          </button>
        </div>
      )}
    </Panel>
  )
}

export function SizeModal({ open, onClose, product, onAdd, onSelectOnly }) {
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState('men')
  const [h, setH] = useState(175)
  const [w, setW] = useState(72)
  const [chest, setChest] = useState('avg')
  const [stomach, setStomach] = useState('avg')
  const [hips, setHips] = useState('avg')
  const [fit, setFit] = useState('as_cut')
  const [pid, setPid] = useState(PRODUCTS[0].id)

  useEffect(() => {
    if (open) setStep(1)
    if (product) setPid(product.id)
  }, [open, product])

  if (!open) return null

  const target = product || PRODUCTS.find((x) => x.id === +pid)
  const thumb = target.images[target.defaultColor || target.colors[0]][0]
  const rec = recommendSize(h, w, { gender, chest, stomach, hips, fit })

  const ShapeRow = ({ label, val, setVal }) => (
    <div>
      <p className="text-xs font-semibold mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {[['narrow', 'Узкие'], ['avg', 'Средние'], ['fuller', 'Широкие']].map(([k, txt]) => (
          <button
            key={k}
            onClick={() => setVal(k)}
            className={`h-11 border text-xs transition ${val === k ? 'border-2 border-ink bg-card font-semibold' : 'border-black/15 hover:border-black/40'}`}
          >
            {txt}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative bg-white w-full max-w-[440px] max-h-[92vh] flex flex-col overflow-hidden border border-black/10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-13 py-3.5 border-b border-black/10">
          <span className="micro tracking-[0.18em]">SIZE ADVISOR</span>
          <button onClick={onClose} className="text-xl leading-none" aria-label="Закрыть">×</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {/* Карточка выбранного товара */}
          <div className="flex items-center gap-3 bg-[#F6F5F2] p-2.5 mb-4">
            <img src={thumb} alt={target.name} className="w-11 h-11 object-contain bg-white mix-blend-multiply p-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              {!product ? (
                <select value={pid} onChange={(e) => setPid(e.target.value)} className="w-full bg-transparent text-xs font-semibold outline-none">
                  {PRODUCTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                </select>
              ) : (
                <p className="text-xs font-semibold truncate">{target.name}</p>
              )}
              <p className="text-xs text-black/60">{fmt(target.price)}</p>
            </div>
          </div>

          {/* 3-step progress bar */}
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-0.5 ${step >= i ? 'bg-ink' : 'bg-black/15'}`} />
            ))}
          </div>
          <p className="text-[11px] text-black/55 mb-4">
            {step <= 3 ? `Шаг ${step} из 3 · ${step === 1 ? 'Параметры' : step === 2 ? 'Телосложение' : 'Посадка'}` : 'Ваша рекомендация'}
          </p>

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Подберём ваш идеальный размер</h3>
                <p className="text-xs text-black/60 mt-1">Укажите пол, рост и вес — это займёт 10 секунд.</p>
              </div>
              <div className="grid grid-cols-2 border border-black/15">
                {[['women', 'WOMENSWEAR'], ['men', 'MENSWEAR']].map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setGender(k)}
                    className={`h-11 micro text-[10px] ${gender === k ? 'bg-ink text-white' : 'bg-white text-black/70'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="micro text-[10px] text-black/55">РОСТ</span>
                  <span className="text-2xl font-bold">{h} <span className="text-xs font-normal text-black/60">см</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setH((v) => Math.max(145, v - 1))} className="w-8 h-8 border border-black/20 rounded-full flex items-center justify-center">−</button>
                  <input type="range" min={145} max={210} value={h} onChange={(e) => setH(+e.target.value)} className="flex-1 accent-black" />
                  <button onClick={() => setH((v) => Math.min(210, v + 1))} className="w-8 h-8 border border-black/20 rounded-full flex items-center justify-center">+</button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="micro text-[10px] text-black/55">ВЕС</span>
                  <span className="text-2xl font-bold">{w} <span className="text-xs font-normal text-black/60">кг</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setW((v) => Math.max(40, v - 1))} className="w-8 h-8 border border-black/20 rounded-full flex items-center justify-center">−</button>
                  <input type="range" min={40} max={150} value={w} onChange={(e) => setW(+e.target.value)} className="flex-1 accent-black" />
                  <button onClick={() => setW((v) => Math.min(150, v + 1))} className="w-8 h-8 border border-black/20 rounded-full flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Ваше телосложение</h3>
                <p className="text-xs text-black/60 mt-1">По сравнению с людьми вашего роста и веса.</p>
              </div>
              <ShapeRow label="Грудь / Плечи" val={chest} setVal={setChest} />
              <ShapeRow label="Талия / Живот" val={stomach} setVal={setStomach} />
              <ShapeRow label="Бёдра" val={hips} setVal={setHips} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Как вы любите посадку?</h3>
                <p className="text-xs text-black/60 mt-1">Учтём фирменный крой Tumaru.</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[['close', 'Плотнее'], ['as_cut', 'По крою'], ['relaxed', 'Свободнее']].map(([k, txt]) => (
                  <button
                    key={k}
                    onClick={() => setFit(k)}
                    className={`h-12 border text-xs transition ${fit === k ? 'border-2 border-ink bg-card font-semibold' : 'border-black/15 hover:border-black/40'}`}
                  >
                    {txt}
                  </button>
                ))}
              </div>
              <p className="text-xs text-black/55">
                {fit === 'as_cut' && 'Оригинальная свободная посадка, заложенная в лекалах Tumaru.'}
                {fit === 'close' && 'Более собранный силуэт ближе к телу.'}
                {fit === 'relaxed' && 'Максимальный оверсайз-эффект.'}
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-2 space-y-5">
              <h3 className="text-xl font-bold tracking-tight">Ваш размер</h3>
              <div className="w-32 h-32 mx-auto rounded-full border-[6px] border-tur flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold leading-none">{rec}</span>
                <span className="text-[11px] text-black/60 mt-1">Best fit</span>
              </div>
              <div className="bg-[#F6F5F2] p-3.5 text-xs text-black/80 text-left">
                Размер <b>{rec}</b> оптимально сядет при росте {h} см и весе {w} кг с учётом фирменной посадки Tumaru.
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="p-5 pt-3 border-t border-black/10 space-y-2">
          {step < 3 && (
            <button onClick={() => setStep((s) => s + 1)} className="w-full h-12 bg-ink text-white micro">
              Продолжить →
            </button>
          )}
          {step === 3 && (
            <button onClick={() => setStep(4)} className="w-full h-12 bg-ink text-white micro">
              Показать мой размер
            </button>
          )}
          {step === 4 && (
            <>
              <button
                onClick={() => { onAdd(target, rec); onClose() }}
                className="w-full h-12 bg-ink text-white micro hover:bg-tur hover:text-ink transition-colors"
              >
                Добавить размер {rec} в корзину
              </button>
              <div className="flex justify-center gap-6 pt-1">
                {onSelectOnly && (
                  <button onClick={() => { onSelectOnly(rec); onClose() }} className="micro text-[10px] underline underline-offset-4">
                    Выбрать {rec} на странице
                  </button>
                )}
                <button onClick={() => setStep(1)} className="micro text-[10px] text-black/60 hover:text-ink">
                  Изменить параметры
                </button>
              </div>
            </>
          )}
          {step > 1 && step < 4 && (
            <button onClick={() => setStep((s) => s - 1)} className="w-full h-11 border border-black/20 micro text-[10px]">
              Назад
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function CartDrawer({ open, lang, onClose, items, setQty, delivery, setDelivery }) {
  const sub = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  const d = DELIVERY.find((x) => x.id === delivery)
  const total = sub + (items.length ? d.price : 0)
  const order = () => {
    const lines = items.map((i, n) => `${n + 1}. ${i.p.name} — ${COLORS[i.color].label[lang]}, ${i.size} × ${i.qty} = ${fmt(i.p.price * i.qty)}`)
    const text = ['Здравствуйте! Хочу оформить заказ TUMARU:', '', ...lines, '', `Доставка: ${d.label[lang]} (${fmt(d.price)})`, `Итого: ${fmt(total)}`].join('\n')
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`, '_blank')
  }
  return (
    <Panel open={open} onClose={onClose} title={`Корзина (${items.reduce((s, i) => s + i.qty, 0)})`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 p-5 space-y-4">
          {!items.length && <p className="micro text-black/40 pt-10 text-center">Корзина пуста</p>}
          {items.map((i) => {
            const thumb = i.p.images[i.color]?.[0] || i.p.images[i.p.colors[0]][0]
            return (
              <div key={i.key} className="flex gap-3">
                <div className="w-20 aspect-[4/5] bg-card relative shrink-0">
                  <img src={thumb} alt={i.p.name} className="absolute inset-0 w-full h-full object-contain p-1.5 mix-blend-multiply" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-medium">{i.p.name}</p>
                  <p className="text-black/60 mt-1">{COLORS[i.color].label[lang]} · {i.size}</p>
                  <div className="flex items-center gap-3 mt-3 border border-black/15 w-fit">
                    <button className="w-7 h-7" onClick={() => setQty(i.key, i.qty - 1)}>−</button>
                    <span>{i.qty}</span>
                    <button className="w-7 h-7" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                  </div>
                </div>
                <span className="text-xs font-medium whitespace-nowrap">{fmt(i.p.price * i.qty)}</span>
              </div>
            )
          })}
        </div>
        {!!items.length && (
          <div className="border-t border-black/10 p-5 space-y-4 sticky bottom-0 bg-white">
            <div>
              <p className="micro mb-2">Способ доставки</p>
              {DELIVERY.map((x) => (
                <label key={x.id} className={`flex items-center justify-between text-xs border px-3 py-2.5 mb-1.5 cursor-pointer ${delivery === x.id ? 'border-ink' : 'border-black/15'}`}>
                  <span className="flex items-center gap-2">
                    <input type="radio" className="accent-black" checked={delivery === x.id} onChange={() => setDelivery(x.id)} />{x.label[lang]}
                  </span>
                  <span>{fmt(x.price)}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-sm font-semibold"><span>Итого</span><span>{fmt(total)}</span></div>
            <button onClick={order} className="w-full h-12 bg-ink text-white micro hover:bg-tur hover:text-ink transition-colors">Оформить заказ в WhatsApp</button>
          </div>
        )}
      </div>
    </Panel>
  )
}
