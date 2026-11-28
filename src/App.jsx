import { useEffect, useState } from 'react'
import { AnnouncementBar, Header } from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import SplitBanner from './components/SplitBanner'
import { GuaranteesStrip, ReviewsSection, ShippingAndFaq } from './components/TrustSections'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import CatalogPage from './components/CatalogPage'
import CheckoutPage from './components/CheckoutPage'
import { ProductDrawer, SizeModal, CartDrawer } from './components/Overlays'
import { PRODUCTS } from './data'

export default function App() {
  const [lang, setLang] = useState('RU')
  const [sel, setSel] = useState(null)
  const [view, setView] = useState('home') // 'home' | 'catalog' | 'product' | 'checkout'
  const [catalogSavedOnly, setCatalogSavedOnly] = useState(false)
  const [page, setPage] = useState(null)
  const [size, setSize] = useState(null)
  const [recommendedSize, setRecommendedSize] = useState(null)
  const [sizeModal, setSizeModal] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [items, setItems] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [delivery, setDelivery] = useState('yandex')

  useEffect(() => {
    const syncHash = () => {
      const h = window.location.hash
      const m = h.match(/^#product\/(\d+)/)
      if (m) {
        const found = PRODUCTS.find((x) => x.id === +m[1])
        if (found) {
          setPage({ p: found, color: found.defaultColor || found.colors[0] })
          setView('product')
          return
        }
      }
      if (h === '#shop-all') {
        setPage(null)
        setView('catalog')
        return
      }
      if (h === '#checkout') {
        setPage(null)
        setView('checkout')
        return
      }
      setPage(null)
      setView('home')
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const openProductPage = (p, color) => {
    setSel(null)
    setSize(null)
    setPage({ p, color: color || p.defaultColor || p.colors[0] })
    setView('product')
    window.history.pushState(null, '', `#product/${p.id}`)
  }

  const openCatalog = (savedOnly = false) => {
    setSel(null)
    setPage(null)
    setCatalogSavedOnly(savedOnly)
    setView('catalog')
    window.history.pushState(null, '', '#shop-all')
  }

  const openCheckout = () => {
    setCartOpen(false)
    setSel(null)
    setView('checkout')
    window.history.pushState(null, '', '#checkout')
  }

  const goHome = () => {
    setPage(null)
    setCatalogSavedOnly(false)
    setView('home')
    if (window.location.hash) {
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

  const addSilent = (p, color, sz) => {
    const key = `${p.id}-${color}-${sz}`
    setItems((prev) => prev.find((i) => i.key === key)
      ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      : [...prev, { key, p, color, size: sz, qty: 1 }])
  }

  const setQty = (key, q) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: q } : i)).filter((i) => i.qty > 0))
  const toggleSave = (id) => setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const count = items.reduce((s, i) => s + i.qty, 0)

  const activeTarget = page?.p || sel?.p

  if (view === 'checkout') {
    return (
      <CheckoutPage
        items={items}
        lang={lang}
        delivery={delivery}
        setDelivery={setDelivery}
        onAddQuick={addSilent}
        onBack={goHome}
        onClearCart={() => setItems([])}
      />
    )
  }

  return (
    <>
      <AnnouncementBar lang={lang} />
      <Header
        lang={lang}
        setLang={setLang}
        count={count}
        wishCount={savedIds.length}
        openCart={() => setCartOpen(true)}
        openSize={() => setSizeModal(true)}
        forceSolid={view !== 'home'}
        goHome={goHome}
        openCatalog={() => openCatalog(false)}
        openSavedCatalog={() => openCatalog(true)}
      />

      {view === 'product' && page ? (
        <main>
          <ProductPage
            product={page.p}
            color={page.color}
            setColor={(c) => setPage({ ...page, color: c })}
            size={size}
            setSize={setSize}
            recommendedSize={recommendedSize}
            lang={lang}
            onBack={() => openCatalog(false)}
            onAdd={add}
            openSize={() => setSizeModal(true)}
            onOpenPage={openProductPage}
            onQuickAdd={(p, color) => { setSel({ p, color }); setSize(null) }}
            savedIds={savedIds}
            onToggleSave={toggleSave}
          />
        </main>
      ) : view === 'catalog' ? (
        <main>
          <CatalogPage
            lang={lang}
            onBack={goHome}
            onOpenPage={openProductPage}
            onQuickAdd={(p, color) => { setSel({ p, color }); setSize(null) }}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            initialSavedOnly={catalogSavedOnly}
          />
        </main>
      ) : (
        <main>
          <Hero lang={lang} openSize={() => setSizeModal(true)} openCatalog={() => openCatalog(false)} />
          <GuaranteesStrip lang={lang} />
          <ProductGrid
            lang={lang}
            onOpenPage={openProductPage}
            onQuickAdd={(p, color) => { setSel({ p, color }); setSize(null) }}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            openCatalog={() => openCatalog(false)}
          />
          <SplitBanner openCatalog={() => openCatalog(false)} openSize={() => setSizeModal(true)} />
          <ReviewsSection lang={lang} />
          <ShippingAndFaq lang={lang} />
        </main>
      )}

      <Footer lang={lang} openSize={() => setSizeModal(true)} openCatalog={() => openCatalog(false)} />

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
        lang={lang}
        onClose={() => setSizeModal(false)}
        product={activeTarget}
        onSelectOnly={activeTarget ? (rec) => { setSize(rec); setRecommendedSize(rec) } : null}
        onAdd={(p, rec) => { setRecommendedSize(rec); add(p, (page?.color || sel?.color || p.defaultColor || p.colors[0]), rec) }}
      />

      <CartDrawer
        open={cartOpen}
        lang={lang}
        onClose={() => setCartOpen(false)}
        items={items}
        setQty={setQty}
        delivery={delivery}
        onAddQuick={addSilent}
        onCheckout={openCheckout}
        onOpenCatalog={() => openCatalog(false)}
      />
    </>
  )
}
