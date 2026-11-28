import { useState } from 'react'
import { BRAND } from '../brand.config'

export function GuaranteesStrip({ lang }) {
  const items = BRAND.guarantees[lang]
  return (
    <section className="border-b border-black/10 bg-[var(--color-card)]/60">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((g) => (
          <div key={g.title} className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold">{g.title}</h3>
              <p className="text-[13px] text-[var(--color-muted)] mt-1 leading-relaxed">{g.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ReviewsSection({ lang }) {
  const title = { RU: 'Отзывы покупателей', KZ: 'Сатып алушылар пікірлері', EN: 'Verified Customer Reviews' }[lang]
  const sub = { RU: 'Реальные заказы из Алматы, Астаны и Шымкента', KZ: 'Алматы, Астана және Шымкент қалаларынан нақты пікірлер', EN: 'Real orders across Kazakhstan' }[lang]

  return (
    <section id="reviews" className="max-w-[1440px] mx-auto px-4 md:px-6 py-14 border-t border-black/10">
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-[var(--color-muted)] mt-1">{sub}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BRAND.reviews.map((r) => (
          <article key={r.id} className="bg-[var(--color-card)] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={r.photo} alt={r.item} className="w-12 h-14 object-cover bg-white shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{r.name} · {r.city[lang]}</p>
                  <p className="text-[12px] text-[var(--color-muted)] truncate">{r.size}</p>
                  <div className="text-[13px] text-[var(--color-ink)] mt-0.5">{'★'.repeat(r.rating)}</div>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--color-ink)]/85">«{r.text[lang]}»</p>
            </div>
            <p className="text-[12px] font-medium text-[var(--color-muted)] mt-4 pt-3 border-t border-black/10 truncate">{r.item}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ShippingAndFaq({ lang }) {
  const [openIdx, setOpenIdx] = useState(0)
  const shipTitle = { RU: 'Доставка, оплата и возврат', KZ: 'Жеткізу, төлем және қайтару', EN: 'Shipping, Payment & Returns' }[lang]
  const faqTitle = { RU: 'Частые вопросы', KZ: 'Жиі қойылатын сұрақтар', EN: 'Frequently Asked Questions' }[lang]

  return (
    <section id="shipping-faq" className="max-w-[1440px] mx-auto px-4 md:px-6 py-14 border-t border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Условия доставки */}
      <div className="lg:col-span-5 space-y-4">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-4">{shipTitle}</h2>
        {BRAND.shippingInfo[lang].map((s) => (
          <div key={s.title} className="border border-black/10 p-4 bg-white">
            <h3 className="text-sm font-semibold">{s.title}</h3>
            <p className="text-[13px] text-[var(--color-muted)] mt-1 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 5 вопросов FAQ */}
      <div className="lg:col-span-7">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-4">{faqTitle}</h2>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {BRAND.faq[lang].map((item, idx) => (
            <div key={item.q}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full min-h-[52px] py-3.5 flex items-center justify-between gap-4 text-left text-sm font-semibold hover:opacity-75"
              >
                <span>{item.q}</span>
                <span className="text-lg shrink-0">{openIdx === idx ? '−' : '+'}</span>
              </button>
              {openIdx === idx && (
                <p className="pb-4 text-[13px] leading-relaxed text-[var(--color-muted)]">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

