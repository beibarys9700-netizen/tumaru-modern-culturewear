import { useEffect, useState } from 'react'
import { COLORS, DELIVERY, PRODUCTS, WA_PHONE, fmt } from '../data'

export default function CheckoutPage({
  items,
  lang,
  delivery,
  setDelivery,
  onAddQuick,
  onBack,
  onClearCart,
}) {
  const [contact, setContact] = useState('')
  const [country, setCountry] = useState('Казахстан')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('Алматы')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('+7 ')
  const [payment, setPayment] = useState('kaspi_red')
  const [promo, setPromo] = useState('')
  const [discountPct, setDiscountPct] = useState(0)
  const [promoMsg, setPromoMsg] = useState('')
  const [orderedId, setOrderedId] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const sub = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  const discount = Math.round((sub * discountPct) / 100)
  const d = DELIVERY.find((x) => x.id === delivery)
  const shipFee = items.length ? (sub >= 50000 && delivery !== 'world' ? 0 : d.price) : 0
  const total = sub - discount + shipFee

  const applyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === 'TUMARU10') {
      setDiscountPct(10)
      setPromoMsg('Промокод TUMARU10 применён (−10%)')
    } else {
      setDiscountPct(0)
      setPromoMsg('Попробуйте промокод TUMARU10')
    }
  }

  const submitOrder = (e) => {
    e.preventDefault()
    const orderNum = `TMR-${Math.floor(10000 + Math.random() * 90000)}`
    const payLabel = {
      kaspi_red: 'Kaspi RED (0-0-12)',
      kaspi_qr: 'Kaspi QR / Перевод',
      card: 'Банковская карта (Visa / MC)',
      wa: 'Согласовать с менеджером в WhatsApp',
    }[payment]

    const lines = items.map(
      (i, n) => `${n + 1}. ${i.p.name} — ${COLORS[i.color].label[lang]}, ${i.size} × ${i.qty} = ${fmt(i.p.price * i.qty)}`
    )
    const msg = [
      `Новый заказ TUMARU #${orderNum}`,
      '',
      ...lines,
      '',
      `Имя: ${firstName} ${lastName}`.trim(),
      `Телефон: ${phone}`,
      contact ? `Email: ${contact}` : '',
      `Адрес: ${country}, ${city}, ${address}`,
      `Доставка: ${d.label[lang]} (${shipFee === 0 ? 'Бесплатно' : fmt(shipFee)})`,
      `Оплата: ${payLabel}`,
      discount > 0 ? `Скидка (${discountPct}%): -${fmt(discount)}` : '',
      `Итого к оплате: ${fmt(total)}`,
    ]
      .filter(Boolean)
      .join('\n')

    setOrderedId(orderNum)
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const completeOrderItems = PRODUCTS.filter((p) => !items.some((i) => i.p.id === p.id)).slice(0, 2)

  if (orderedId) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md border border-black/15 p-8">
          <span className="w-3 h-3 rounded-full bg-tur inline-block mb-4" />
          <h1 className="text-2xl font-bold tracking-tight mb-2">Заказ #{orderedId} сформирован</h1>
          <p className="text-xs text-black/65 leading-relaxed mb-6">
            Мы открыли WhatsApp с деталями вашего заказа. Менеджер TUMARU в Алматы свяжется с вами в течение нескольких минут и отправит счёт Kaspi.
          </p>
          <button
            onClick={() => { onClearCart(); onBack() }}
            className="w-full h-12 bg-ink text-white micro"
          >
            Вернуться в магазин
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Минималистичная шапка Checkout (как на 3-м скриншоте Represent) */}
      <header className="border-b border-black/10 h-16 px-4 md:px-10 flex items-center justify-between max-w-[1200px] mx-auto">
        <button onClick={onBack} className="micro text-[10px] text-black/65 hover:text-ink">← Назад</button>
        <span className="text-2xl font-extrabold tracking-[-0.06em]">TUMARU</span>
        <span className="micro text-[10px] text-black/55">CHECKOUT</span>
      </header>

      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Левая колонка — Форма контакта, доставки и оплаты */}
        <form onSubmit={submitOrder} className="lg:col-span-7 p-5 md:p-10 lg:border-r border-black/10 space-y-7">
          {/* Express checkout */}
          <div>
            <p className="text-[11px] text-center text-black/55 mb-3">Быстрая оплата</p>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => setPayment('kaspi_qr')} className="h-11 bg-[#F14635] text-white text-xs font-semibold">Kaspi Pay</button>
              <button type="button" onClick={() => setPayment('kaspi_red')} className="h-11 bg-[#111111] text-white text-xs font-semibold">Kaspi RED 0-0-12</button>
              <button type="button" onClick={() => setPayment('wa')} className="h-11 bg-[#25D366] text-white text-xs font-semibold">WhatsApp</button>
            </div>
            <div className="flex items-center gap-3 my-4 text-[10px] text-black/40 uppercase">
              <div className="h-px bg-black/10 flex-1" />OR<div className="h-px bg-black/10 flex-1" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-base font-bold mb-2.5">Контакты</h2>
            <input
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email (для чека и трек-номера)"
              className="w-full h-11 border border-black/20 px-3 text-xs outline-none focus:border-ink"
            />
          </div>

          {/* Delivery */}
          <div className="space-y-3">
            <h2 className="text-base font-bold">Доставка</h2>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-11 border border-black/20 px-3 text-xs bg-white outline-none">
              <option>Казахстан</option>
              <option>Россия</option>
              <option>Кыргызстан / Узбекистан</option>
              <option>Другая страна (Worldwide)</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Имя" className="h-11 border border-black/20 px-3 text-xs outline-none focus:border-ink" />
              <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Фамилия" className="h-11 border border-black/20 px-3 text-xs outline-none focus:border-ink" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" className="h-11 border border-black/20 px-3 text-xs outline-none focus:border-ink" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон (+7...)" className="h-11 border border-black/20 px-3 text-xs outline-none focus:border-ink" />
            </div>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Улица, дом, квартира / Пункт выдачи" className="w-full h-11 border border-black/20 px-3 text-xs outline-none focus:border-ink" />
          </div>

          {/* Shipping Method */}
          <div className="space-y-2">
            <h2 className="text-base font-bold">Способ доставки</h2>
            {DELIVERY.map((x) => {
              const price = sub >= 50000 && x.id !== 'world' ? 0 : x.price
              return (
                <label
                  key={x.id}
                  className={`flex items-center justify-between border px-3.5 py-3 text-xs cursor-pointer ${
                    delivery === x.id ? 'border-ink bg-[#F8F8F8]' : 'border-black/15'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <input type="radio" className="accent-black" checked={delivery === x.id} onChange={() => setDelivery(x.id)} />
                    {x.label[lang]}
                  </span>
                  <span className="font-semibold">{price === 0 ? 'Бесплатно' : fmt(price)}</span>
                </label>
              )
            })}
          </div>

          {/* Payment */}
          <div className="space-y-2">
            <h2 className="text-base font-bold">Оплата</h2>
            {[
              ['kaspi_red', 'Kaspi RED / Рассрочка 0-0-12'],
              ['kaspi_qr', 'Kaspi QR / Перевод по номеру'],
              ['card', 'Банковская карта (Visa / Mastercard / Apple Pay)'],
              ['wa', 'Оформить и согласовать в WhatsApp'],
            ].map(([id, label]) => (
              <label
                key={id}
                className={`flex items-center gap-2.5 border px-3.5 py-3 text-xs cursor-pointer ${
                  payment === id ? 'border-ink bg-[#F8F8F8]' : 'border-black/15'
                }`}
              >
                <input type="radio" className="accent-black" checked={payment === id} onChange={() => setPayment(id)} />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="w-full h-13 py-4 bg-ink text-white micro hover:bg-tur hover:text-ink transition-colors">
            Оформить и оплатить — {fmt(total)}
          </button>
        </form>

        {/* Правая колонка — Сводка заказа (как на 3-м скриншоте Represent) */}
        <aside className="lg:col-span-5 bg-[#FAFAFA] p-5 md:p-10 space-y-6">
          <div className="space-y-4">
            {items.map((i) => {
              const thumb = i.p.images[i.color]?.[0] || i.p.images[i.p.colors[0]][0]
              return (
                <div key={i.key} className="flex items-center gap-3.5">
                  <div className="relative w-16 aspect-[4/5] bg-[#F4F4F4] border border-black/10 shrink-0">
                    <img src={thumb} alt={i.p.name} className="w-full h-full object-contain p-1 brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink text-white text-[10px] flex items-center justify-center">
                      {i.qty}
                    </span>
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-semibold">{i.p.name}</p>
                    <p className="text-black/55 mt-0.5">{i.size} / {COLORS[i.color].label[lang]}</p>
                  </div>
                  <span className="text-xs font-medium">{fmt(i.p.price * i.qty)}</span>
                </div>
              )
            })}
          </div>

          {/* Промокод */}
          <form onSubmit={applyPromo} className="flex gap-2 pt-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Промокод (например TUMARU10)"
              className="flex-1 h-10 bg-white border border-black/20 px-3 text-xs outline-none focus:border-ink"
            />
            <button type="submit" className="px-4 h-10 bg-black/10 hover:bg-ink hover:text-white micro text-[10px] transition">
              Применить
            </button>
          </form>
          {promoMsg && <p className="text-[11px] text-black/65 -mt-3">{promoMsg}</p>}

          {/* Итог */}
          <div className="border-t border-black/10 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-black/70"><span>Подытог</span><span>{fmt(sub)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-[#198754]"><span>Скидка ({discountPct}%)</span><span>−{fmt(discount)}</span></div>
            )}
            <div className="flex justify-between text-black/70"><span>Доставка</span><span>{shipFee === 0 ? 'Бесплатно' : fmt(shipFee)}</span></div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-black/10">
              <span>Total (KZT)</span><span>{fmt(total)}</span>
            </div>
          </div>

          {/* Complete your order */}
          {completeOrderItems.length > 0 && (
            <div className="border-t border-black/10 pt-5">
              <p className="text-xs font-semibold mb-3">Дополнить заказ</p>
              <div className="space-y-2.5">
                {completeOrderItems.map((cp) => {
                  const cc = cp.defaultColor || cp.colors[0]
                  return (
                    <div key={cp.id} className="flex items-center gap-3 bg-white border border-black/10 p-2.5">
                      <img src={cp.images[cc][0]} alt={cp.name} className="w-11 h-14 object-contain bg-[#F4F4F4] brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{cp.name}</p>
                        <p className="text-xs text-black/60">{fmt(cp.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddQuick(cp, cc, 'L')}
                        className="px-3 py-1.5 bg-ink text-white micro text-[9px] hover:bg-tur hover:text-ink transition"
                      >
                        Add
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
