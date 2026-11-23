import { useState } from 'react'
import { AnnouncementBar, Header } from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import SplitBanner from './components/SplitBanner'
import Footer from './components/Footer'
import { ProductDrawer, SizeModal, CartDrawer } from './components/Overlays'

export default function App() {
  const [lang, setLang] = useState('RU')
  const [sel, setSel] = useState(null) // {p, color}
  const [size, setSize] = useState(null)
  const [sizeModal, setSizeModal] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [items, setItems] = useState([])
  const [delivery, setDelivery] = useState('yandex')

  const add = (p, color, sz) => {
    const key = `${p.id}-${color}-${sz}`
    setItems((prev) => prev.find((i) => i.key === key)
      ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      : [...prev, { key, p, color, size: sz, qty: 1 }])
    setSel(null); setSize(null); setCartOpen(true)
  }
  const setQty = (key, q) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: q } : i)).filter((i) => i.qty > 0))
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <AnnouncementBar />
      <Header lang={lang} setLang={setLang} count={count} openCart={() => setCartOpen(true)} openSize={() => setSizeModal(true)} />
      <main>
        <Hero lang={lang} />
        <ProductGrid lang={lang} onOpen={(p, color) => { setSel({ p, color }); setSize(null) }} />
        <SplitBanner />
      </main>
      <Footer />
      <ProductDrawer sel={sel} lang={lang} size={size} setSize={setSize} onClose={() => setSel(null)}
        setColor={(color) => setSel({ ...sel, color })}
        onAdd={() => add(sel.p, sel.color, size)} openSize={() => setSizeModal(true)} />
      <SizeModal open={sizeModal} onClose={() => setSizeModal(false)} product={sel?.p}
        onAdd={(p, rec) => (sel ? setSize(rec) : add(p, p.defaultColor || p.colors[0], rec))} />
      <CartDrawer open={cartOpen} lang={lang} onClose={() => setCartOpen(false)} items={items} setQty={setQty} delivery={delivery} setDelivery={setDelivery} />
    </>
  )
}
