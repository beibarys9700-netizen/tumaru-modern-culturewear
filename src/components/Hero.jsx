import { T } from '../data'

export default function Hero({ lang, openSize, openCatalog }) {
  const t = T[lang]
  return (
    <section className="relative w-full h-[86vh] min-h-[540px] max-h-[860px] overflow-hidden bg-gradient-to-b from-[#CACBCE] via-[#D6D7D9] to-[#AAACB0]">
      <img
        src="/images/hero-banner.jpg"
        alt="Tumaru Autumn '26 / Winter '27"
        className="w-full h-full object-contain object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
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
