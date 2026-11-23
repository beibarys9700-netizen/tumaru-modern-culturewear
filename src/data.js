export const COLORS = {
  burgundy: {
    hex: '#541B25',
    label: { RU: 'Бордовый', KZ: 'Қою қызыл', EN: 'Burgundy' },
  },
  black: {
    hex: '#141414',
    label: { RU: 'Чёрный', KZ: 'Қара', EN: 'Black' },
  },
}

export const SIZES = ['S', 'M', 'L', 'XL']

const HOODIE_BURGUNDY_IMAGES = [
  '/products/hoodie1/07-ghost.jpg',
  '/products/hoodie1/08-layout.jpg',
  '/products/hoodie1/06-zip-2.jpg',
  '/products/hoodie1/05-zip-1.jpg',
  '/products/hoodie1/01-flat-lay.jpg',
  '/products/hoodie1/02-oversized.jpg',
  '/products/hoodie1/03-branding.jpg',
  '/products/hoodie1/04-fabric.jpg',
]

const HOODIE_BLACK_IMAGES = [
  '/products/hoodie2/07-ghost.jpg',
  '/products/hoodie2/01-front.jpg',
  '/products/hoodie2/02-back.jpg',
  '/products/hoodie2/03-angled.jpg',
  '/products/hoodie2/06-ribbing.jpg',
  '/products/hoodie2/04-fabric.jpg',
  '/products/hoodie2/05-detail.jpg',
]

const PANTS_BURGUNDY_IMAGES = [
  '/products/pants/01-front.jpg',
  '/products/pants/07-ghost.jpg',
  '/products/pants/02-back.jpg',
  '/products/pants/03-angled.jpg',
  '/products/pants/04-fabric.jpg',
  '/products/pants/05-detail.jpg',
  '/products/pants/06-ribbing.jpg',
]

export const SPECS = {
  composition: {
    RU: '95% хлопок • 5% полиэстер',
    KZ: '95% мақта • 5% полиэстер',
    EN: '95% Cotton • 5% Polyester',
  },
  fabric: {
    RU: 'Плотный трикотаж 320 г/м²',
    KZ: '320 г/м² тығыз трикотаж',
    EN: 'Heavyweight knit, 320 GSM',
  },
}

export const PRODUCTS = [
  {
    id: 1,
    name: 'TUMARU ZIP HOODIE',
    subtitle: { RU: 'Зип-худи', KZ: 'Зип-худи', EN: 'Heavyweight Zip Hoodie' },
    price: 29900,
    colors: ['burgundy', 'black'],
    defaultColor: 'burgundy',
    images: {
      burgundy: HOODIE_BURGUNDY_IMAGES,
      black: HOODIE_BLACK_IMAGES,
    },
  },
  {
    id: 2,
    name: 'TUMARU PANTS',
    subtitle: { RU: 'Брюки прямого кроя', KZ: 'Брюки', EN: 'Wide Sweatpants' },
    price: 24900,
    colors: ['burgundy'],
    defaultColor: 'burgundy',
    images: {
      burgundy: PANTS_BURGUNDY_IMAGES,
    },
  },
  {
    id: 3,
    name: 'TUMARU ZIP HOODIE — ONYX',
    subtitle: { RU: 'Зип-худи (Чёрный)', KZ: 'Зип-худи (Қара)', EN: 'Zip Hoodie (Black)' },
    price: 29900,
    colors: ['black', 'burgundy'],
    defaultColor: 'black',
    images: {
      black: HOODIE_BLACK_IMAGES,
      burgundy: HOODIE_BURGUNDY_IMAGES,
    },
  },
  {
    id: 4,
    name: 'TUMARU FULL SET',
    subtitle: { RU: 'Худи + Брюки', KZ: 'Худи + Брюки', EN: 'Hoodie + Pants Set' },
    price: 54800,
    colors: ['burgundy'],
    defaultColor: 'burgundy',
    images: {
      burgundy: [
        '/products/hoodie1/07-ghost.jpg',
        '/products/pants/01-front.jpg',
        '/products/hoodie1/02-oversized.jpg',
        '/products/pants/07-ghost.jpg',
      ],
    },
  },
]

export const DELIVERY = [
  { id: 'yandex', label: { RU: 'Яндекс Курьер (Алматы)', KZ: 'Яндекс Курьер (Алматы)', EN: 'Yandex Courier (Almaty)' }, price: 1500 },
  { id: 'kazpost', label: { RU: 'Казпочта (РК)', KZ: 'Қазпошта (ҚР)', EN: 'Kazpost (KZ)' }, price: 2000 },
  { id: 'world', label: { RU: 'Международная доставка', KZ: 'Халықаралық жеткізу', EN: 'Worldwide Shipping' }, price: 12000 },
]

export const fmt = (n) => n.toLocaleString('ru-RU').replace(/\u00a0/g, ' ') + ' ₸'

export function recommendSize(height, weight) {
  const score = weight + (height - 170) * 0.5
  if (score < 62) return 'S'
  if (score < 76) return 'M'
  if (score < 92) return 'L'
  return 'XL'
}

export const WA_PHONE = '77713630033'

export const T = {
  RU: {
    shop: 'SHOP',
    drop: 'DROP 003',
    community: 'COMMUNITY',
    size: 'ПОДБОР РАЗМЕРА',
    view: 'СМОТРЕТЬ ДРОП',
    look: 'LOOKBOOK',
    avail: 'AVAILABLE NOW',
    all: 'СМОТРЕТЬ ВСЕ В НАЛИЧИИ',
    inStock: 'В НАЛИЧИИ',
    compLabel: 'Состав',
    fabLabel: 'Ткань',
    colorLabel: 'Цвет',
  },
  KZ: {
    shop: 'SHOP',
    drop: 'DROP 003',
    community: 'COMMUNITY',
    size: 'ӨЛШЕМДІ ТАҢДАУ',
    view: 'ДРОПТЫ КӨРУ',
    look: 'LOOKBOOK',
    avail: 'ҚОЛДА БАР',
    all: 'БАРЛЫҒЫН КӨРУ',
    inStock: 'ҚОЛДА БАР',
    compLabel: 'Құрамы',
    fabLabel: 'Матасы',
    colorLabel: 'Түсі',
  },
  EN: {
    shop: 'SHOP',
    drop: 'DROP 003',
    community: 'COMMUNITY',
    size: 'SIZE FINDER',
    view: 'SHOP THE DROP',
    look: 'LOOKBOOK',
    avail: 'AVAILABLE NOW',
    all: 'SHOP ALL IN STOCK',
    inStock: 'IN STOCK',
    compLabel: 'Composition',
    fabLabel: 'Fabric',
    colorLabel: 'Color',
  },
}
