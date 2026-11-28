import { BRAND } from '../brand.config'

const Block = ({ id, title, sub, img, a, b, onClickA, hrefB, onClickB }) => (
  <div id={id} className="relative h-[70vh] min-h-[440px] overflow-hidden text-white bg-[#141414]">
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
    <div className="absolute inset-0 bg-black/45" />
    <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
      <p className="text-xs uppercase tracking-[0.2em] mb-2 text-white/80">{sub}</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.03em]">{title}</h2>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onClickA}
          className="min-h-[44px] bg-black/40 backdrop-blur-sm border border-white/25 text-white px-7 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition"
        >
          {a}
        </button>
        {hrefB ? (
          <a
            href={hrefB}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] flex items-center bg-black/40 backdrop-blur-sm border border-white/25 text-white px-7 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition"
          >
            {b}
          </a>
        ) : (
          <button
            onClick={onClickB}
            className="min-h-[44px] bg-black/40 backdrop-blur-sm border border-white/25 text-white px-7 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition"
          >
            {b}
          </button>
        )}
      </div>
    </div>
  </div>
)

export default function SplitBanner({ openCatalog, openSize }) {
  return (
    <section id="drop" className="grid md:grid-cols-2">
      <Block
        title="Modern Essentials"
        sub="320 GSM Heavyweight Knit"
        img="/products/hoodie1/02-oversized.jpg"
        a={BRAND.name}
        b="Смотреть коллекцию"
        onClickA={openCatalog}
        onClickB={openCatalog}
      />
      <Block
        id="community"
        title="Community & Lookbook"
        sub="Streetwear & Footwear"
        img="/products/hoodie2/05-detail.jpg"
        a="Подобрать размер"
        b="Instagram"
        onClickA={openSize}
        hrefB={BRAND.social.instagram}
      />
    </section>
  )
}

