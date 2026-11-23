import { useState } from 'react'

const Col = ({ title, items }) => (
  <div>
    <h4 className="micro mb-4">{title}</h4>
    <ul className="space-y-2 text-[12px] text-black/70">
      {items.map((i) => <li key={i.t}><a href={i.h || '#'} target={i.h ? '_blank' : undefined} rel="noreferrer" className="hover:text-ink">{i.t}</a></li>)}
    </ul>
  </div>
)

export default function Footer() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  return (
    <footer className="border-t border-black/10 px-4 md:px-6 pt-12 pb-6 mt-0">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-1">
          <h4 className="micro mb-4">Закрытые дропы</h4>
          <p className="text-[12px] text-black/70 mb-4">Получайте доступ к дропам раньше всех.</p>
          {ok ? <p className="micro text-ink">✓ Вы в списке</p> : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setOk(true) }} className="flex border-b border-ink">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="EMAIL" className="flex-1 bg-transparent py-2 text-[11px] tracking-widest outline-none" />
              <button className="micro">→</button>
            </form>
          )}
        </div>
        <Col title="Сервис" items={[{ t: 'Подбор размера' }, { t: 'Оплата Kaspi / Kaspi RED' }, { t: 'Доставка Казпочта / Яндекс / Worldwide' }]} />
        <Col title="О бренде" items={[{ t: 'Tumaru Modern Culturewear' }, { t: 'Sapa, shape, serenity' }, { t: 'Lookbook' }]} />
        <Col title="Соцсети" items={[
          { t: 'Instagram', h: 'https://www.instagram.com/thetumaru/' },
          { t: 'Threads', h: 'https://www.threads.net/@thetumaru' },
          { t: 'WhatsApp', h: 'https://wa.me/77713630033' },
        ]} />
        <div>
          <h4 className="micro mb-4">Локация</h4>
          <p className="text-[12px] text-black/70">Almaty, KZ (KZT ₸)</p>
        </div>
      </div>
      <p className="micro text-[9px] text-black/50 mt-14">© TUMARU Modern Culturewear. Almaty. For every move.</p>
    </footer>
  )
}

