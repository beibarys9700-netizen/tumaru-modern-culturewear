const Block = ({ id, title, sub, img, a, b, hrefB }) => (
  <div id={id} className="relative h-[70vh] min-h-[420px] overflow-hidden text-white bg-[#141414]">
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
    <div className="absolute inset-0 bg-black/45" />
    <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
      <p className="micro mb-2 text-white/80">{sub}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em]">{title}</h2>
      <div className="mt-6 flex gap-3">
        <a href="#shop" className="glass-btn">{a}</a>
        <a href={hrefB || '#shop'} target={hrefB ? '_blank' : undefined} rel={hrefB ? 'noreferrer' : undefined} className="glass-btn">{b}</a>
      </div>
    </div>
  </div>
)

export default function SplitBanner() {
  return (
    <section id="drop" className="grid md:grid-cols-2">
      <Block
        title="Modern Culturewear"
        sub="320 GSM Heavyweight Knit · Almaty"
        img="/products/hoodie1/02-oversized.jpg"
        a="TUMARU HOME"
        b="SHOP DROP 003"
      />
      <Block
        id="community"
        title="Tumaru Community"
        sub="For every move"
        img="/products/hoodie2/05-detail.jpg"
        a="SHOP COLLECTION"
        b="INSTAGRAM"
        hrefB="https://www.instagram.com/thetumaru/"
      />
    </section>
  )
}
