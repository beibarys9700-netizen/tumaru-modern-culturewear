import { T } from '../data'

export default function Hero({ lang }) {
  const t = T[lang]
  return (
    <section className="relative h-[88vh] min-h-[560px] overflow-hidden bg-[#ECEBE8]">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center pt-16 pb-16 px-4 gap-2">
        <img
          src="/products/hoodie2/07-ghost.jpg"
          alt="Tumaru Zip Hoodie Black Front"
          className="hidden md:block h-[66vh] w-auto object-contain mix-blend-multiply opacity-90"
        />
        <img
          src="/products/hoodie1/07-ghost.jpg"
          alt="Tumaru Zip Hoodie Burgundy Front"
          className="h-[68vh] md:h-[74vh] w-auto object-contain mix-blend-multiply"
        />
        <img
          src="/products/pants/01-front.jpg"
          alt="Tumaru Pants Burgundy Front"
          className="hidden md:block h-[66vh] w-auto object-contain mix-blend-multiply opacity-90"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white px-4">
        <p className="micro mb-3">Жаңа топтама · Almaty</p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase leading-[0.9] tracking-[-0.05em]">
          AUTUMN ’26 <span className="font-light">/</span> WINTER ’27
        </h1>
        <p className="mt-4 text-sm md:text-base tracking-wide">Sapa, shape, serenity — Modern Culturewear</p>
        <div className="mt-7 flex gap-3">
          <a href="#shop" className="glass-btn">{t.view}</a>
          <a href="#community" className="glass-btn">{t.look}</a>
        </div>
      </div>
    </section>
  )
}
