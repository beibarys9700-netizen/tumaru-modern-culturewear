import { useEffect, useState } from 'react'
import { AnnouncementBar, Header } from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import SplitBanner from './components/SplitBanner'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import { ProductDrawer, SizeModal, CartDrawer } from './components/Overlays'
import { PRODUCTS } from './data'

export default function App() {
  const [lang, setLang] = useState('RU')
  const [sel, setSel] = useState(null) // quick-add drawer {p, color}
  const [page, setPage] = useState(null) // full product page {p, color}
  const [size, setSize] = useState(null)
  const [sizeModal, setSizeModal] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [items, setItems] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [delivery, setDelivery] = useState('yandex')

  useEffect(() => {
    const syncHash = () => {
      const m = window.location.hash.match(/^#product\/(\d+)/)
      if (m) {
        const found = PRODUCTS.find((x) => x.id === +m[1])
        if (found) setPage({ p: found, color: found.defaultColor || found.colors[0] })
      } else {
        setPage(null)
      }
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const openProductPage = (p, color) => {
    setSel(null)
    setSize(null)
    setPage({ p, color: color || p.defaultColor || p.colors[0] })
    window.history.pushState(null, '', `#product/${p.id}`)
  }

  const goHome = () => {
    setPage(null)
    if (window.location.hash.startsWith('#product/')) {
      window.history.pushState(null, '', '#')
    }
  }

  const add = (p, color, sz) => {
    const key = `${p.id}-${color}-${sz}`
    setItems((prev) => prev.find((i) => i.key === key)
      ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      : [...prev, { key, p, color, size: sz, qty: 1 }])
    setSel(null)
    setCartOpen(true)
  }

  const setQty = (key, q) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: q } : i)).filter((i) => i.qty > 0))
  const toggleSave = (id) => setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const count = items.reduce((s, i) => s + i.qty, 0)

  const activeTarget = page?.p || sel?.p

  return (
    <>
      <AnnouncementBar />
      <Header
        lang={lang}
        setLang={setLang}
        count={count}
        wishCount={savedIds.length}
        openCart={() => setCartOpen(true)}
        openSize={() => setSizeModal(true)}
        forceSolid={!!page}
        goHome={goHome}
      />

      {page ? (
        <main>
          <ProductPage
            product={page.p}
            color={page.color}
            setColor={(c) => setPage({ ...page, color: c })}
            size={size}
            setSize={setSize}
            lang={lang}
            onBack={goHome}
            onAdd={add}
            openSize={() => setSizeModal(true)}
            onOpenPage={openProductPage}
            onQuickAdd={(p, color) => { setSel({ p, color }); setSize(null) }}
            savedIds={savedIds}
            onToggleSave={toggleSave}
          />
        </main>
      ) : (
        <main>
          <Hero lang={lang} openSize={() => setSizeModal(true)} />
          <ProductGrid
            lang={lang}
            onOpenPage={openProductPage}
            onQuickAdd={(p, color) => { setSel({ p, color }); setSize(null) }}
            savedIds={savedIds}
            onToggleSave={toggleSave}
          />
          <SplitBanner />
        </main>
      )}

      <Footer />

      <ProductDrawer
        sel={sel}
        lang={lang}
        size={size}
        setSize={setSize}
        onClose={() => setSel(null)}
        setColor={(color) => setSel({ ...sel, color })}
        onAdd={() => add(sel.p, sel.color, size)}
        openSize={() => setSizeModal(true)}
      />

      <SizeModal
        open={sizeModal}
        onClose={() => setSizeModal(false)}
        product={activeTarget}
        onSelectOnly={activeTarget ? (rec) => setSize(rec) : null}
        onAdd={(p, rec) => add(p, (page?.color || sel?.color || p.defaultColor || p.colors[0]), rec)}
      />

      <CartDrawer
        open={cartOpen}
        lang={lang}
        onClose={() => setCartOpen(false)}
        items={items}
        setQty={setQty}
        delivery={delivery}
        setDelivery={setDelivery}
      />
    </>
  )
}
