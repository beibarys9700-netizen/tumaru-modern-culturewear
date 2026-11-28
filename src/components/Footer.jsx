import { useState } from 'react'
import { BRAND } from '../brand.config'
import { T } from '../data'

export default function Footer({ lang, openSize, openCatalog }) {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  const t = T[lang]

  const svcTitle = { RU: 'Сервис', KZ: 'Сервис', EN: 'Client Service' }[lang]
  const brandTitle = { RU: 'О бренде', KZ: 'Бренд туралы', EN: 'Brand' }[lang]
  const socialTitle = { RU: 'Соцсети', KZ: 'Әлеуметтік желілер', EN: 'Social' }[lang]
  const locTitle = { RU: 'Локация', KZ: 'Мекенжай', EN: 'Location' }[lang]

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[13px] font-semibold mb-3">{BRAND.footer.newsletterTitle[lang]}</h4>
            <p className="text-[13px] text-[var(--color-muted)] mb-4 leading-relaxed">{BRAND.footer.newsletterDesc[lang]}</p>
            {ok ? (
              <p className="text-[13px] font-semibold text-[var(--color-accent-dark)]">{BRAND.footer.subscribed[lang]}</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setOk(true) }} className="flex border-b border-[var(--color-ink)]">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Email"
                  className="flex-1 bg-transparent py-2.5 text-[13px] outline-none"
                />
                <button className="px-2 text-sm font-semibold">→</button>
              </form>
            )}
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-3">{svcTitle}</h4>
            <ul className="space-y-2.5 text-[13px] text-[var(--color-muted)]">
              <li><button onClick={openSize} className="hover:text-[var(--color-ink)]">{t.size}</button></li>
              <li><a href="#shipping-faq" className="hover:text-[var(--color-ink)]">Kaspi RED 0-0-12 / Kaspi QR</a></li>
              <li><a href="#shipping-faq" className="hover:text-[var(--color-ink)]">Яндекс / Казпочта / DHL</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-3">{brandTitle}</h4>
            <ul className="space-y-2.5 text-[13px] text-[var(--color-muted)]">
              <li><button onClick={openCatalog} className="hover:text-[var(--color-ink)]">{BRAND.tagline[lang]}</button></li>
              <li><a href="#reviews" className="hover:text-[var(--color-ink)]">{t.reviewsNav}</a></li>
              <li><a href="#shipping-faq" className="hover:text-[var(--color-ink)]">{t.shippingNav}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-3">{socialTitle}</h4>
            <ul className="space-y-2.5 text-[13px] text-[var(--color-muted)]">
              <li><a href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)]">Instagram</a></li>
              <li><a href={BRAND.social.threads} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)]">Threads</a></li>
              <li><a href={BRAND.social.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)]">WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-3">{locTitle}</h4>
            <p className="text-[13px] text-[var(--color-muted)]">{BRAND.city[lang]}</p>
            <p className="text-[13px] text-[var(--color-muted)] mt-1">KZT ({BRAND.currency})</p>
          </div>
        </div>

        <p className="text-[13px] text-[var(--color-muted)] mt-12 pt-6 border-t border-black/10">
          © {new Date().getFullYear()} {BRAND.name} · {BRAND.tagline[lang]}
        </p>
      </div>
    </footer>
  )
}
