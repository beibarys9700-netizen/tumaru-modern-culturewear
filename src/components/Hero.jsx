import { T } from '../data'

export default function Hero({ lang, openSize, openCatalog }) {
  const t = T[lang]
  return (
    <section className="relative w-full h-[calc(100vh-32px)] min-h-[580px] overflow-hidden bg-[#D0D1D3]">
      <img
        src="/images/hero-banner.jpg"
        alt="Tumaru Autumn '26 / Winter '27"
        className="w-full h-full object-cover object-[center_18%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55 pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/90 mb-1.5">New Collection</p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
          Tumaru Autumn ’26 / Winter ’27
        </h1>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            onClick={openCatalog}
            className="bg-black/40 backdrop-blur-sm border border-white/25 text-white px-7 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition"
          >
            {t.view}
          </button>
          <button
            onClick={openSize}
            className="bg-black/40 backdrop-blur-sm border border-white/25 text-white px-7 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition"
          >
            {t.findSize}
          </button>
        </div>
      </div>
    </section>
  )
}
