export const COLORS = {
  burgundy: {
    hex: '#541B25',
    label: { RU: 'Бордовый', KZ: 'Қою қызыл', EN: 'Burgundy' },
  },
  black: {
    hex: '#141414',
    label: { RU: 'Чёрный', KZ: 'Қара', EN: 'Black' },
  },
  washed_black: {
    hex: '#2C2C2E',
    label: { RU: 'Выстиранный чёрный', KZ: 'Шайылған қара', EN: 'Washed Black' },
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

const JEANS_WASHED_IMAGES = [
  '/products/jeans/07-ghost.jpg',
  '/products/jeans/01-front.jpg',
  '/products/jeans/02-back.jpg',
  '/products/jeans/03-angled.jpg',
  '/products/jeans/04-fabric.jpg',
  '/products/jeans/05-detail.jpg',
  '/products/jeans/06-ribbing.jpg',
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
  denimComposition: {
    RU: '100% плотный хлопок (Denim)',
    KZ: '100% тығыз мақта (Denim)',
    EN: '100% Heavyweight Cotton Denim',
  },
  denimFabric: {
    RU: 'Премиальный деним 14 oz',
    KZ: 'Премиум деним 14 oz',
    EN: '14 oz Vintage Wash Denim',
  },
  fit: {
    RU: 'Фирменный свободный крой Tumaru (Relaxed / Boxy)',
    KZ: 'Tumaru еркін пішімі (Relaxed / Boxy)',
    EN: 'Signature Tumaru relaxed boxy fit',
  },
}

export const PRODUCTS = [
  {
    id: 1,
    category: 'hoodies',
    name: 'TUMARU ZIP HOODIE',
    subtitle: { RU: 'Зип-худи', KZ: 'Зип-худи', EN: 'Heavyweight Zip Hoodie' },
    description: {
      RU: 'Плотное зип-худи из премиального футера 320 г/м² с фирменной вышивкой на груди и этническим орнаментом на капюшоне.',
      KZ: 'Кеудесінде фирмалық кестесі және капюшонында ұлттық ою-өрнегі бар 320 г/м² тығыз трикотаж зип-худи.',
      EN: 'Heavyweight 320 GSM zip hoodie featuring signature chest embroidery and traditional geometric hood trim.',
    },
    price: 29900,
    colors: ['burgundy', 'black'],
    defaultColor: 'burgundy',
    relatedIds: [2, 5, 3, 4],
    pairId: 2,
    images: {
      burgundy: HOODIE_BURGUNDY_IMAGES,
      black: HOODIE_BLACK_IMAGES,
    },
  },
  {
    id: 2,
    category: 'pants',
    name: 'TUMARU PANTS',
    subtitle: { RU: 'Брюки прямого кроя', KZ: 'Брюки', EN: 'Wide Sweatpants' },
    description: {
      RU: 'Широкие брюки прямого кроя из плотного трикотажа 320 г/м² с этнической отделкой заднего кармана.',
      KZ: 'Артқы қалтасында этникалық өрнегі бар 320 г/м² тығыз трикотаждан тігілген кең шалбар.',
      EN: 'Relaxed wide-leg sweatpants crafted from 320 GSM heavyweight knit with woven ethnic back-pocket detail.',
    },
    price: 24900,
    colors: ['burgundy'],
    defaultColor: 'burgundy',
    relatedIds: [1, 5, 3, 4],
    pairId: 1,
    images: {
      burgundy: PANTS_BURGUNDY_IMAGES,
    },
  },
  {
    id: 3,
    category: 'hoodies',
    name: 'TUMARU ZIP HOODIE — ONYX',
    subtitle: { RU: 'Зип-худи (Чёрный)', KZ: 'Зип-худи (Қара)', EN: 'Zip Hoodie (Black)' },
    description: {
      RU: 'Глубокий чёрный оттенок Onyx с бирюзовым орнаментом капюшона. Плотность 320 г/м², двойная металлическая молния.',
      KZ: 'Капюшонында көгілдір ою-өрнегі бар терең қара Onyx зип-худи. Тығыздығы 320 г/м².',
      EN: 'Deep Onyx black zip hoodie accented with turquoise geometric hood trim. 320 GSM heavyweight cotton blend.',
    },
    price: 29900,
    colors: ['black', 'burgundy'],
    defaultColor: 'black',
    relatedIds: [5, 2, 1, 4],
    pairId: 5,
    images: {
      black: HOODIE_BLACK_IMAGES,
      burgundy: HOODIE_BURGUNDY_IMAGES,
    },
  },
  {
    id: 5,
    category: 'denim',
    isDenim: true,
    name: 'TUMARU BAGGY DENIM',
    subtitle: { RU: 'Широкие джинсы', KZ: 'Кең джинсы', EN: 'Baggy Washed Denim' },
    description: {
      RU: 'Широкие джинсы свободного кроя из плотного винтажного денима Washed Black с фирменной вышивкой Tumaru у кармана.',
      KZ: 'Қалтасының жанында Tumaru кестесі бар тығыз Washed Black денимінен тігілген кең джинсы.',
      EN: 'Relaxed baggy-fit jeans in vintage Washed Black 14 oz denim with signature Tumaru pocket embroidery.',
    },
    price: 32900,
    colors: ['washed_black'],
    defaultColor: 'washed_black',
    relatedIds: [3, 1, 2, 4],
    pairId: 3,
    images: {
      washed_black: JEANS_WASHED_IMAGES,
    },
  },
  {
    id: 4,
    category: 'sets',
    name: 'TUMARU FULL SET',
    subtitle: { RU: 'Полный костюм (Худи + Брюки)', KZ: 'Толық жиынтық (Худи + Брюки)', EN: 'Full Tracksuit Set (Hoodie + Pants)' },
    description: {
      RU: 'Готовый образ из коллекции Autumn ’26 / Winter ’27: зип-худи и брюки в едином цвете Burgundy из плотного трикотажа 320 г/м².',
      KZ: 'Autumn ’26 / Winter ’27 топтамасының дайын жиынтығы: қою қызыл түсті зип-худи мен шалбар, 320 г/м².',
      EN: 'Complete Autumn ’26 / Winter ’27 uniform pairing our 320 GSM Zip Hoodie and Wide Sweatpants in Burgundy.',
    },
    price: 54800,
    isSet: true,
    colors: ['burgundy'],
    defaultColor: 'burgundy',
    relatedIds: [1, 2, 5, 3],
    pairId: 5,
    images: {
      burgundy: [
        '/products/hoodie1/08-layout.jpg',
        '/products/pants/01-front.jpg',
        '/products/hoodie1/07-ghost.jpg',
        '/products/pants/07-ghost.jpg',
        '/products/hoodie1/02-oversized.jpg',
        '/products/pants/04-fabric.jpg',
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

export function recommendSize(height, weight, opts = {}) {
  const { gender = 'men', chest = 'avg', stomach = 'avg', hips = 'avg', fit = 'as_cut' } = opts
  let score = weight + (height - 170) * 0.48
  if (gender === 'women') score -= 4
  if (chest === 'fuller') score += 3.5
  if (chest === 'narrow') score -= 2.5
  if (stomach === 'fuller') score += 3
  if (stomach === 'narrow') score -= 1.5
  if (hips === 'fuller') score += 2.5
  if (fit === 'close') score -= 5
  if (fit === 'relaxed') score += 6
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
    findSize: 'ПОДОБРАТЬ РАЗМЕР',
    look: 'LOOKBOOK',
    avail: 'AVAILABLE NOW',
    all: 'СМОТРЕТЬ ВСЕ В НАЛИЧИИ',
    inStock: 'В НАЛИЧИИ',
    compLabel: 'Состав',
    fabLabel: 'Ткань',
    fitLabel: 'Посадка',
    colorLabel: 'Цвет',
    backToShop: 'Назад в каталог',
    backToHome: 'На главную',
    completeLook: 'ДОКУПИТЬ ВМЕСТЕ',
    youMayLike: 'ВАМ ТАКЖЕ ПОНРАВИТСЯ',
    addToBag: 'Добавить в корзину',
    chooseSize: 'Выберите размер',
    allInStockTitle: 'ВСЕ В НАЛИЧИИ — AUTUMN ’26 / WINTER ’27',
    allInStockDesc: 'Полная коллекция TUMARU Modern Culturewear, доступная к немедленной отправке из Алматы.',
  },
  KZ: {
    shop: 'SHOP',
    drop: 'DROP 003',
    community: 'COMMUNITY',
    size: 'ӨЛШЕМДІ ТАҢДАУ',
    view: 'ДРОПТЫ КӨРУ',
    findSize: 'ӨЛШЕМДІ ТАҢДАУ',
    look: 'LOOKBOOK',
    avail: 'ҚОЛДА БАР',
    all: 'БАРЛЫҒЫН КӨРУ',
    inStock: 'ҚОЛДА БАР',
    compLabel: 'Құрамы',
    fabLabel: 'Матасы',
    fitLabel: 'Пішімі',
    colorLabel: 'Түсі',
    backToShop: 'Каталогқа оралу',
    backToHome: 'Басты бетке',
    completeLook: 'БІРГЕ АЛУ',
    youMayLike: 'СІЗГЕ ҰНАУЫ МҮМКІН',
    addToBag: 'Себетке қосу',
    chooseSize: 'Өлшемді таңдаңыз',
    allInStockTitle: 'ҚОЛДА БАРЛЫҒЫ — AUTUMN ’26 / WINTER ’27',
    allInStockDesc: 'Алматыдан жедел жөнелтуге дайын TUMARU Modern Culturewear топтамасы.',
  },
  EN: {
    shop: 'SHOP',
    drop: 'DROP 003',
    community: 'COMMUNITY',
    size: 'SIZE FINDER',
    view: 'SHOP THE DROP',
    findSize: 'FIND YOUR SIZE',
    look: 'LOOKBOOK',
    avail: 'AVAILABLE NOW',
    all: 'SHOP ALL IN STOCK',
    inStock: 'IN STOCK',
    compLabel: 'Composition',
    fabLabel: 'Fabric',
    fitLabel: 'Fit',
    colorLabel: 'Color',
    backToShop: 'Back to shop',
    backToHome: 'Back to home',
    completeLook: 'COMPLETE THE LOOK',
    youMayLike: 'YOU MAY ALSO LIKE',
    addToBag: 'Add to Bag',
    chooseSize: 'Select a Size',
    allInStockTitle: 'AVAILABLE NOW — AUTUMN ’26 / WINTER ’27',
    allInStockDesc: 'Full TUMARU Modern Culturewear collection ready for immediate dispatch from Almaty.',
  },
}
