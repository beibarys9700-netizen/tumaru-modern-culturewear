// Векторные силуэты-заглушки. Замените на фото товаров (<img>) в ProductCard / Hero.
const shade = (hex) => (hex === '#EDEDED' ? '#BDBDBD' : 'rgba(255,255,255,.12)')

export default function Garment({ type, color = '#111111', className = '' }) {
  const line = shade(color)
  const common = { fill: color, stroke: line, strokeWidth: 1.5, strokeLinejoin: 'round' }
  return (
    <svg viewBox="0 0 200 250" className={className} aria-hidden>
      {type === 'hoodie' && (
        <g {...common}>
          <path d="M70 30 Q100 12 130 30 L170 48 L190 150 L162 156 L154 100 L152 228 L48 228 L46 100 L38 156 L10 150 L30 48 Z" />
          <path d="M72 32 Q100 70 128 32" fill="none" />
          <path d="M100 62 V120 M84 150 H116 V190 H84 Z" fill="none" />
        </g>
      )}
      {type === 'jacket' && (
        <g {...common}>
          <path d="M72 24 L100 38 L128 24 L172 44 L192 170 L164 176 L156 104 L154 226 L46 226 L44 104 L36 176 L8 170 L28 44 Z" />
          <path d="M100 38 V226 M60 150 H88 M112 150 H140" fill="none" />
        </g>
      )}
      {type === 'tee' && (
        <g {...common}>
          <path d="M72 28 Q100 48 128 28 L180 52 L192 100 L160 108 L156 218 L44 218 L40 108 L8 100 L20 52 Z" />
        </g>
      )}
      {type === 'pants' && (
        <g {...common}>
          <path d="M56 14 H144 L156 236 H108 L100 90 L92 236 H44 Z" />
          <path d="M56 34 H144 M100 34 V90" fill="none" />
        </g>
      )}
    </svg>
  )
}

