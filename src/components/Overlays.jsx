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
              className="absolute inset-0 w-full h-full object-contain p-3 mix-blend-multiply"
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
            <p><span className="micro text-[9px] text-black/45 mr-2">{t.compLabel}:</span>{SPECS.composition[lang]}</p>
            <p><span className="micro text-[9px] text-black/45 mr-2">{t.fabLabel}:</span>{SPECS.fabric[lang]}</p>
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
            {size ? 'Добавить в корзину' : 'Выберите размер'}
          </button>
        </div>
      )}
    </Panel>
  )
}

export function SizeModal({ open, onClose, product, onAdd }) {
  const [h, setH] = useState('')
  const [w, setW] = useState('')
  const [pid, setPid] = useState(PRODUCTS[0].id)
  const valid = h >= 140 && h <= 220 && w >= 35 && w <= 180
  const rec = valid ? recommendSize(+h, +w) : null
  const target = product || PRODUCTS.find((x) => x.id === +pid)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white w-full max-w-md p-6">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl">×</button>
        <h3 className="micro mb-1">Умный подбор размера</h3>
        <p className="text-xs text-black/60 mb-5">Введите рост и вес — мы учтём фирменную свободную посадку Tumaru.</p>
        <div className="grid grid-cols-2 gap-3">
          {[['Рост, см', h, setH], ['Вес, кг', w, setW]].map(([l, v, set]) => (
            <label key={l} className="block micro text-[9px]">{l}
              <input type="number" value={v} onChange={(e) => set(e.target.value)} className="mt-1 w-full border border-black/20 h-11 px-3 text-sm normal-case tracking-normal outline-none focus:border-ink" />
            </label>
          ))}
        </div>
        {!product && (
          <select value={pid} onChange={(e) => setPid(e.target.value)} className="mt-3 w-full border border-black/20 h-11 px-3 text-xs">
            {PRODUCTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        )}
        <div className="mt-5 min-h-[72px] bg-card flex items-center justify-center text-center px-4 text-sm">
          {rec ? <span>Рекомендуем <b className="text-xl border-b-2 border-tur">{rec}</b> для фирменной свободной посадки Tumaru</span>
            : <span className="text-black/40 text-xs">Рост 140–220 см, вес 35–180 кг</span>}
        </div>
        <button disabled={!rec} onClick={() => { onAdd(target, rec); onClose() }} className="w-full mt-4 h-12 bg-ink text-white micro disabled:opacity-30">
          Добавить {rec || ''} в корзину
        </button>
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
