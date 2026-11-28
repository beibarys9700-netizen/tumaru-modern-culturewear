import { useEffect, useState } from 'react'
import { BRAND } from '../brand.config'
import { COLORS, PRODUCTS, SIZES, T, fmt } from '../data'

export default function CheckoutPage({
  items,
  lang,
  delivery,
  setDelivery,
  onAddQuick,
  onBack,
  onClearCart,
}) {
  const [phone, setPhone] = useState('+7 ')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('Казахстан')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('Алматы')
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('kaspi_qr')
  const [showPromo, setShowPromo] = useState(false)
  const [promo, setPromo] = useState('')
  const [discountPct, setDiscountPct] = useState(0)
  const [promoMsg, setPromoMsg] = useState('')
  const [upsellSizes, setUpsellSizes] = useState({})
  const [orderedId, setOrderedId] = useState(null)

  const t = T[lang]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Баг 4: При стране Казахстан скрываем международную доставку и переключаем на домашнюю
  const isDomestic = country === 'Казахстан'
  const availableDelivery = BRAND.delivery.filter((x) => (isDomestic ? !x.internationalOnly : !x.domesticOnly))

  useEffect(() => {
    if (!availableDelivery.some((x) => x.id === delivery)) {
      setDelivery(availableDelivery[0].id)
    }
  }, [country])

  const sub = items.reduce((s, i) => s + i.p.price * i.qty, 0)
  const discount = Math.round((sub * discountPct) / 100)
  const activeDelivery = availableDelivery.find((x) => x.id === delivery) || availableDelivery[0]
  const shipFee = items.length ? (sub >= BRAND.freeShippingThreshold && isDomestic ? 0 : activeDelivery.price) : 0
  const total = sub - discount + shipFee
  const leftForFree = Math.max(0, BRAND.freeShippingThreshold - sub)

  const L = {
    RU: {
      back: 'Назад',
      title: 'Оформление заказа',
      express: 'Быстрое оформление в 1 клик',
      orSep: 'или заполните форму доставки',
      contactTitle: 'Контакты',
      phonePlaceholder: 'Телефон / WhatsApp (+7...)',
      emailPlaceholder: 'Email (необязательно, для чека)',
      deliveryTitle: 'Адрес доставки',
      firstName: 'Имя',
      lastName: 'Фамилия',
      city: 'Город',
      address: 'Улица, дом, квартира',
      shipMethodTitle: 'Способ доставки',
      payTitle: 'Другие способы оплаты',
      havePromo: 'У меня есть промокод',
      promoPlaceholder: 'Промокод (например TUMARU10)',
      applyBtn: 'Применить',
      discountLabel: 'Скидка',
      completeOrder: 'Дополнить заказ',
      addForFreePrefix: 'Добавьте ещё на',
      addForFreeSuffix: '— доставка по РК бесплатно',
      paySubmit: 'Подтвердить заказ',
      successTitle: 'Заказ сформирован',
      successDesc: 'Мы открыли WhatsApp с готовым заказом. Менеджер TUMARU свяжется с вами в течение пары минут.',
      backToStore: 'Вернуться в магазин',
    },
    KZ: {
      back: 'Артқа',
      title: 'Тапсырысты рәсімдеу',
      express: '1 батырмамен жылдам төлеу',
      orSep: 'немесе жеткізу мекенжайын толтырыңыз',
      contactTitle: 'Байланыс',
      phonePlaceholder: 'Телефон / WhatsApp (+7...)',
      emailPlaceholder: 'Email (міндетті емес)',
      deliveryTitle: 'Жеткізу мекенжайы',
      firstName: 'Аты',
      lastName: 'Тегі',
      city: 'Қала',
      address: 'Көше, үй, пәтер',
      shipMethodTitle: 'Жеткізу тәсілі',
      payTitle: 'Басқа төлем тәсілдері',
      havePromo: 'Менде промокод бар',
      promoPlaceholder: 'Промокод (мысалы TUMARU10)',
      applyBtn: 'Қолдану',
      discountLabel: 'Жеңілдік',
      completeOrder: 'Тапсырысты толықтыру',
      addForFreePrefix: 'Тағы',
      addForFreeSuffix: 'қосыңыз — ҚР бойынша жеткізу тегін',
      paySubmit: 'Тапсырысты растау',
      successTitle: 'Тапсырыс қабылданды',
      successDesc: 'WhatsApp ашылды. TUMARU менеджері бірнеше минут ішінде хабарласады.',
      backToStore: 'Дүкенге оралу',
    },
    EN: {
      back: 'Back',
      title: 'Checkout',
      express: 'Express 1-Click Checkout',
      orSep: 'or enter delivery details below',
      contactTitle: 'Contact',
      phonePlaceholder: 'Phone / WhatsApp (+7...)',
      emailPlaceholder: 'Email (optional, for tracking)',
      deliveryTitle: 'Shipping Address',
      firstName: 'First name',
      lastName: 'Last name',
      city: 'City',
      address: 'Street, building, apartment',
      shipMethodTitle: 'Shipping Method',
      payTitle: 'Other Payment Methods',
      havePromo: 'I have a promo code',
      promoPlaceholder: 'Promo code (try TUMARU10)',
      applyBtn: 'Apply',
      discountLabel: 'Discount',
      completeOrder: 'Complete Your Order',
      addForFreePrefix: 'Add',
      addForFreeSuffix: 'more for free Kazakhstan shipping',
      paySubmit: 'Place Order',
      successTitle: 'Order Confirmed',
      successDesc: 'WhatsApp opened with your order summary. Our Almaty manager will reply within a few minutes.',
      backToStore: 'Back to store',
    },
  }[lang]

  const applyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === 'TUMARU10') {
      setDiscountPct(10)
      setPromoMsg('TUMARU10 (−10%) ✓')
    } else {
      setDiscountPct(0)
      setPromoMsg('TUMARU10')
    }
  }

  const sendOrder = (methodOverride) => {
    const chosenPay = methodOverride || payment
    const orderNum = `TMR-${Math.floor(10000 + Math.random() * 90000)}`
    const payLabel = {
      kaspi_red: 'Kaspi RED (0-0-12)',
      kaspi_pay: 'Kaspi Pay',
      kaspi_qr: 'Kaspi QR',
      card: 'Visa / Mastercard / Apple Pay',
      cod: 'При получении (Алматы)',
      wa: 'WhatsApp',
    }[chosenPay] || chosenPay

    const lines = items.map(
      (i, n) => `${n + 1}. ${i.p.name} — ${COLORS[i.color].label[lang]}, ${i.size} × ${i.qty} = ${fmt(i.p.price * i.qty)}`
    )
    const msg = [
      `Заказ TUMARU #${orderNum}`,
      '',
      ...lines,
      '',
      `Телефон: ${phone}`,
      `${firstName} ${lastName}`.trim() ? `Имя: ${firstName} ${lastName}`.trim() : '',
      email ? `Email: ${email}` : '',
      `Адрес: ${country}, ${city}, ${address}`.trim(),
      `Доставка: ${activeDelivery.label[lang]} (${shipFee === 0 ? t.freeLabel : fmt(shipFee)})`,
      `Оплата: ${payLabel}`,
      discount > 0 ? `Скидка (${discountPct}%): -${fmt(discount)}` : '',
      `Итого: ${fmt(total)}`,
    ]
      .filter(Boolean)
      .join('\n')

    setOrderedId(orderNum)
    window.open(`https://wa.me/${BRAND.whatsappPhone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const submitForm = (e) => {
    e.preventDefault()
    sendOrder()
  }

  const completeOrderItems = PRODUCTS.filter((p) => !items.some((i) => i.p.id === p.id)).slice(0, 2)

  if (orderedId) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md border border-black/15 p-8">
          <span className="w-3 h-3 rounded-full bg-[var(--color-accent)] inline-block mb-4" />
          <h1 className="font-display text-2xl font-bold tracking-tight mb-2">{L.successTitle} #{orderedId}</h1>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">{L.successDesc}</p>
          <button
            onClick={() => { onClearCart(); onBack() }}
            className="w-full h-12 bg-[var(--color-ink)] text-white text-sm font-semibold"
          >
            {L.backToStore}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="min-h-[44px] flex items-center text-[13px] font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]">
            ← {L.back}
          </button>
          <span className="font-display text-2xl font-extrabold tracking-[-0.04em]">{BRAND.name}</span>
          <span className="text-[13px] font-medium text-[var(--color-muted)]">{L.title}</span>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        <form onSubmit={submitForm} className="lg:col-span-7 p-4 md:p-8 lg:border-r border-black/10 space-y-6">
          {/* Экспресс-оплата (без дублирования в списке ниже) */}
          <div>
            <p className="text-[13px] text-center text-[var(--color-muted)] mb-3">{L.express}</p>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => sendOrder('kaspi_pay')} className="h-12 bg-[#F14635] text-white text-[13px] font-semibold">Kaspi Pay</button>
              <button type="button" onClick={() => sendOrder('kaspi_red')} className="h-12 bg-[#111111] text-white text-[13px] font-semibold">Kaspi RED</button>
              <button type="button" onClick={() => sendOrder('wa')} className="h-12 bg-[#1E9E52] text-white text-[13px] font-semibold">WhatsApp</button>
            </div>
            <div className="flex items-center gap-3 my-4 text-[12px] text-[var(--color-muted)]">
              <div className="h-px bg-black/10 flex-1" />{L.orSep}<div className="h-px bg-black/10 flex-1" />
            </div>
          </div>

          {/* Контакты: телефон первым и обязательным, email вторым и необязательным */}
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold">{L.contactTitle}</h2>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={L.phonePlaceholder}
              className="w-full h-12 border border-black/20 px-3.5 text-sm outline-none focus:border-[var(--color-ink)]"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={L.emailPlaceholder}
              className="w-full h-12 border border-black/20 px-3.5 text-sm outline-none focus:border-[var(--color-ink)]"
            />
          </div>

          {/* Адрес доставки */}
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold">{L.deliveryTitle}</h2>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-12 border border-black/20 px-3.5 text-sm bg-white outline-none">
              <option value="Казахстан">Казахстан</option>
              <option value="Россия">Россия</option>
              <option value="Кыргызстан / Узбекистан">Кыргызстан / Узбекистан</option>
              <option value="Другая страна">Другая страна (Worldwide)</option>
            </select>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={L.firstName} className="h-12 border border-black/20 px-3.5 text-sm outline-none focus:border-[var(--color-ink)]" />
              <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={L.lastName} className="h-12 border border-black/20 px-3.5 text-sm outline-none focus:border-[var(--color-ink)]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder={L.city} className="h-12 border border-black/20 px-3.5 text-sm outline-none focus:border-[var(--color-ink)]" />
              <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={L.address} className="h-12 border border-black/20 px-3.5 text-sm outline-none focus:border-[var(--color-ink)]" />
            </div>
          </div>

          {/* Способ доставки со сроком под каждым вариантом */}
          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold">{L.shipMethodTitle}</h2>
            {availableDelivery.map((x) => {
              const price = sub >= BRAND.freeShippingThreshold && isDomestic ? 0 : x.price
              return (
                <label
                  key={x.id}
                  className={`flex items-start justify-between border px-4 py-3.5 text-sm cursor-pointer ${
                    delivery === x.id ? 'border-[var(--color-ink)] bg-[#F8F8F8]' : 'border-black/15'
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <input type="radio" className="accent-black mt-1" checked={delivery === x.id} onChange={() => setDelivery(x.id)} />
                    <span>
                      <span className="block font-medium">{x.label[lang]}</span>
                      <span className="block text-[13px] text-[var(--color-muted)] mt-0.5">{x.eta[lang]}</span>
                    </span>
                  </span>
                  <span className="font-semibold shrink-0">{price === 0 ? t.freeLabel : fmt(price)}</span>
                </label>
              )
            })}
          </div>

          {/* Другие способы оплаты (без дублирования экспресс-кнопок сверху) */}
          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold">{L.payTitle}</h2>
            {BRAND.paymentMethods.map((pm) => (
              <label
                key={pm.id}
                className={`flex items-center gap-3 border px-4 py-3.5 text-sm cursor-pointer ${
                  payment === pm.id ? 'border-[var(--color-ink)] bg-[#F8F8F8]' : 'border-black/15'
                }`}
              >
                <input type="radio" className="accent-black" checked={payment === pm.id} onChange={() => setPayment(pm.id)} />
                <span>{pm.label[lang]}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="w-full h-13 py-4 bg-[var(--color-ink)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition-colors">
            {L.paySubmit} — {fmt(total)}
          </button>
        </form>

        {/* Правая колонка */}
        <aside className="lg:col-span-5 bg-[#FAFAFA] p-4 md:p-8 space-y-6">
          <div className="space-y-4">
            {items.map((i) => {
              const thumb = i.p.images[i.color]?.[0] || i.p.images[i.p.colors[0]][0]
              return (
                <div key={i.key} className="flex items-center gap-3.5">
                  <div className="relative w-16 aspect-[4/5] bg-[var(--color-card)] border border-black/10 shrink-0">
                    <img src={thumb} alt={i.p.name} className="w-full h-full object-contain p-1 brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-ink)] text-white text-[11px] flex items-center justify-center">
                      {i.qty}
                    </span>
                  </div>
                  <div className="flex-1 text-[13px]">
                    <p className="font-semibold">{i.p.name}</p>
                    <p className="text-[var(--color-muted)] mt-0.5">{i.size} · {COLORS[i.color].label[lang]}</p>
                  </div>
                  <span className="text-[13px] font-semibold">{fmt(i.p.price * i.qty)}</span>
                </div>
              )
            })}
          </div>

          {/* Промокод скрыт за ссылкой "У меня есть промокод" */}
          <div>
            {!showPromo ? (
              <button
                type="button"
                onClick={() => setShowPromo(true)}
                className="text-[13px] font-medium underline underline-offset-4 hover:opacity-70"
              >
                {L.havePromo}
              </button>
            ) : (
              <form onSubmit={applyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder={L.promoPlaceholder}
                    className="flex-1 h-11 bg-white border border-black/20 px-3 text-sm outline-none focus:border-[var(--color-ink)]"
                  />
                  <button type="submit" className="px-4 h-11 bg-[var(--color-ink)] text-white text-[13px] font-semibold">
                    {L.applyBtn}
                  </button>
                </div>
                {promoMsg && <p className="text-[13px] text-[var(--color-accent-dark)] font-medium">{promoMsg}</p>}
              </form>
            )}
          </div>

          <div className="border-t border-black/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--color-muted)]"><span>{t.itemsSubtotal}</span><span>{fmt(sub)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-[var(--color-accent-dark)]"><span>{L.discountLabel} ({discountPct}%)</span><span>−{fmt(discount)}</span></div>
            )}
            <div className="flex justify-between text-[var(--color-muted)]"><span>{t.deliveryLabel}</span><span>{shipFee === 0 ? t.freeLabel : fmt(shipFee)}</span></div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-black/10">
              <span>{t.totalLabel}</span><span>{fmt(total)}</span>
            </div>
          </div>

          {/* Upsell на чекауте с подсказкой порога бесплатной доставки и выбором размера */}
          {completeOrderItems.length > 0 && (
            <div className="border-t border-black/10 pt-5">
              <p className="text-sm font-semibold">{L.completeOrder}</p>
              {isDomestic && leftForFree > 0 && (
                <p className="text-[13px] text-[var(--color-accent-dark)] font-medium mt-1">
                  {L.addForFreePrefix} {fmt(leftForFree)} {L.addForFreeSuffix}
                </p>
              )}
              <div className="space-y-2.5 mt-3">
                {completeOrderItems.map((cp) => {
                  const cc = cp.defaultColor || cp.colors[0]
                  const pickedSz = upsellSizes[cp.id] || ''
                  return (
                    <div key={cp.id} className="flex items-center gap-3 bg-white border border-black/10 p-2.5">
                      <img src={cp.images[cc][0]} alt={cp.name} className="w-12 h-14 object-contain bg-[var(--color-card)] brightness-[1.06] contrast-[1.04] mix-blend-multiply" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold truncate">{cp.name}</p>
                        <p className="text-[13px] text-[var(--color-muted)]">{fmt(cp.price)}</p>
                      </div>
                      <select
                        value={pickedSz}
                        onChange={(e) => setUpsellSizes((prev) => ({ ...prev, [cp.id]: e.target.value }))}
                        className="h-9 px-2 border border-black/20 text-[12px] bg-white outline-none"
                      >
                        <option value="">{t.pickSizeShort}</option>
                        {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        type="button"
                        disabled={!pickedSz}
                        onClick={() => onAddQuick(cp, cc, pickedSz)}
                        className="h-9 px-3 bg-[var(--color-ink)] text-white text-[12px] font-semibold disabled:opacity-30 hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] transition"
                      >
                        {t.addBtn}
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
