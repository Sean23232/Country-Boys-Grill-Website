/* ============================================================
   COUNTRY BOYS GRILL — EDITABLE SITE CONTENT
   ------------------------------------------------------------
   Everything the client may want to change lives in THIS file:
   contact info, socials, hours, the full menu, reviews, gallery.
   Search for "PLACEHOLDER" for every item that needs sign-off.
   ============================================================ */

export const SITE = {
  name: 'Country Boys Grill',
  tagline: 'Good Food. Real Flavor. Southern Roots.',
  taglineAlt: 'Come Hungry... Leave Happy!',
  strap: 'Southern Style BBQ, Chicken, Ribs & Soul Food',
  established: '2021',
  address: '2900 Holloway Street, Durham, NC',
  addressShort: '2900 Holloway St, Durham',
  phoneDisplay: '919-243-5138',
  phoneHref: 'tel:+19192435138',
  // PLACEHOLDER email — confirm the real address with the client.
  email: 'hello@countryboysgrill.com',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=2900+Holloway+Street,+Durham,+NC',
  mapsEmbed: 'https://www.google.com/maps?q=2900+Holloway+Street,+Durham,+NC&output=embed',
  // PLACEHOLDER socials — swap in the client’s real handles.
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com', icon: 'facebook' as const },
    { label: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' as const },
    { label: 'TikTok', href: 'https://www.tiktok.com', icon: 'tiktok' as const },
  ],
  credit: 'Website design by Web Designs Lab',
};

/* ---------- NAV ---------- */
export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- HOURS (PLACEHOLDER — confirm with client) ----------
   open/close are 24h "HH:MM". Array order is Monday → Sunday. */
export const HOURS: { day: string; open: string; close: string }[] = [
  { day: 'Monday', open: '11:00', close: '21:00' },
  { day: 'Tuesday', open: '11:00', close: '21:00' },
  { day: 'Wednesday', open: '11:00', close: '21:00' },
  { day: 'Thursday', open: '11:00', close: '21:00' },
  { day: 'Friday', open: '11:00', close: '22:00' },
  { day: 'Saturday', open: '11:00', close: '22:00' },
  { day: 'Sunday', open: '12:00', close: '20:00' },
];

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const toLabel = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hr} ${suffix}` : `${hr}:${String(m).padStart(2, '0')} ${suffix}`;
};

/** Row of HOURS matching JS Date.getDay() (0 = Sunday). */
export const hourRowFor = (jsDay: number) => HOURS[(jsDay + 6) % 7];

/** Live open/closed status derived from HOURS above. */
export function getOpenStatus(now: Date = new Date()) {
  const today = hourRowFor(now.getDay());
  const todayMin = now.getHours() * 60 + now.getMinutes();
  if (todayMin >= toMin(today.open) && todayMin < toMin(today.close)) {
    return { open: true, label: `Open now · closes ${toLabel(today.close)}` };
  }
  if (todayMin < toMin(today.open)) {
    return { open: false, label: `Closed · opens ${toLabel(today.open)}` };
  }
  const tomorrow = hourRowFor((now.getDay() + 1) % 7);
  return { open: false, label: `Closed · opens ${tomorrow.day} ${toLabel(tomorrow.open)}` };
}

export const hoursLabel = (h: { open: string; close: string }) => `${toLabel(h.open)} – ${toLabel(h.close)}`;

/* ---------- MENU ----------
   NOTE: ALL PRICES BELOW ARE PLACEHOLDERS. Update them in this one
   array and every menu card on the site updates from it. */

export interface SizeOption {
  label: string;
  price: number;
}
export type CategoryId = 'bbq' | 'chicken' | 'seafood' | 'burgers' | 'sides' | 'drinks';
export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  category: CategoryId;
  image: string;
  alt: string;
  price?: number; // single-price items
  sizes?: SizeOption[]; // size/portion options
  tag?: string;
  featured?: boolean; // shows in “Local Farm-Raised Meats”
  countrySide?: boolean; // shows in “Country Sides”
}

/* Pexels photo id → sized CDN URL (placeholder photography; swap for client shots) */
const px = (id: number, w = 800, h = 600, ext = 'jpeg') =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMAGES = {
  hero: px(13203940, 1920, 1080),
  interior: px(30420679, 1200, 900),
};

export const MENU_ITEMS: MenuItem[] = [
  /* ——— BBQ & RIBS ——— */
  {
    id: 'ribs',
    name: 'Country Boys Ribs',
    desc: 'St. Louis spares smoked six hours over post oak, finished with our brick-red house sauce.',
    category: 'bbq',
    image: px(32538759),
    alt: 'Glazed barbecue ribs served with fresh salad and crispy fries',
    sizes: [
      { label: 'Half Rack', price: 24 },
      { label: 'Full Rack', price: 39 },
    ],
    tag: 'Best Seller',
    featured: true,
  },
  {
    id: 'brisket',
    name: 'Smoked Brisket (½ lb)',
    desc: 'Low and slow overnight, sliced to order. House sauce on the side, never forced on you.',
    category: 'bbq',
    image: px(9397270),
    alt: 'Sliced smoked brisket on a wooden cutting board',
    price: 18,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'pulled-pork',
    name: 'Pulled Pork (½ lb)',
    desc: 'Post-oak smoked shoulder, hand-pulled and tossed in a tangy Carolina glaze.',
    category: 'bbq',
    image: px(36850055),
    alt: 'Steaming pulled pork seasoned with spices on a rustic wooden board',
    price: 14,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'bbq-chicken',
    name: 'BBQ Chicken (½ bird)',
    desc: 'Brined, smoked low, then glazed honey-brick. The sweet spot of our menu.',
    category: 'bbq',
    image: px(9872916),
    alt: 'Golden brown smoked barbecue chicken pieces',
    price: 16,
  },

  /* ——— CHICKEN ——— */
  {
    id: 'fried-chicken',
    name: 'Crispy Fried Chicken (2 pc)',
    desc: 'Buttermilk-brined for a full day, fried to a shatter-crisp golden. Served with honey butter.',
    category: 'chicken',
    image: px(28638538, 800, 600, 'png'),
    alt: 'Crispy fried chicken with fries in a basket',
    price: 12,
  },
  {
    id: 'tenders',
    name: 'Fried Chicken Tenders (5)',
    desc: 'Tender and never dry — fried to order with hot honey and a side of your pick slaw.',
    category: 'chicken',
    image: px(14686443),
    alt: 'Crispy fried chicken tenders with fries and rolls on a rustic table',
    price: 11,
  },

  /* ——— SEAFOOD ——— */
  {
    id: 'tiger-shrimp',
    name: 'Tiger Shrimp (12 count)',
    desc: 'Peeled and deveined, fried until snappy, then tossed in garlic butter and scallion.',
    category: 'seafood',
    image: px(16845332),
    alt: 'Fried tiger shrimp garnished with olives on a dark plate',
    price: 17,
    tag: 'Best Seller',
    featured: true,
  },
  {
    id: 'flounder',
    name: 'Fried Flounder',
    desc: 'Hand-battered daily and fried golden. Served with lemon, tartar and a side of your choice.',
    category: 'seafood',
    image: px(20321627),
    alt: 'Crispy fried flounder fillet with fries and tartar sauce',
    price: 15,
    featured: true,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'seafood-basket',
    name: 'Fried Seafood Basket',
    desc: 'Flounder, tiger shrimp and hush puppies with tartar, remoulade and hot sauce. Feeds two — or one of you.',
    category: 'seafood',
    image: px(28449692),
    alt: 'Southern fried seafood platter with fish, shrimp, fries and dipping sauces',
    price: 22,
  },

  /* ——— BURGERS ——— */
  {
    id: 'hamburger',
    name: 'Farm-Raised Hamburger',
    desc: 'Local beef ground in-house daily. Pickles, onion and house sauce on a toasted brioche bun.',
    category: 'burgers',
    image: px(31119086),
    alt: 'Farm-raised cheeseburger with lettuce, onion and tomato',
    sizes: [
      { label: 'Single', price: 13 },
      { label: 'Double', price: 17 },
    ],
    tag: 'Farm-Raised',
    featured: true,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'stack-burger',
    name: 'Country Stack Burger',
    desc: 'Double beef, sharp cheddar, crispy bacon, pickles and house sauce. Fries on the side.',
    category: 'burgers',
    image: px(15010285),
    alt: 'Double gourmet burger with cheddar and bacon on a wooden board',
    price: 18,
  },

  /* ——— COUNTRY SIDES ——— */
  {
    id: 'fries',
    name: 'French Fries',
    desc: 'Skin-on and double-fried for that shatter. Seasoning shaker on the side.',
    category: 'sides',
    image: px(28992238),
    alt: 'Crispy golden french fries in a basket with ketchup',
    price: 4,
    countrySide: true,
  },
  {
    id: 'slaw',
    name: 'Cole Slaw',
    desc: 'Sweet, tangy and extra crunchy — made fresh every single morning.',
    category: 'sides',
    image: px(13422414),
    alt: 'Homemade creamy coleslaw in a rustic metal bowl',
    price: 4,
    countrySide: true,
  },
  {
    id: 'potato-salad',
    name: 'Potato Salad',
    desc: 'Creamy, garden-peppered, and the way Sunday supper is supposed to taste.',
    category: 'sides',
    image: px(30146054),
    alt: 'Creamy potato salad on a checkered picnic tablecloth',
    price: 4,
    countrySide: true,
  },
  {
    id: 'hush-puppies',
    name: 'Hush Puppies (6)',
    desc: 'Golden cornbread balls, fried to order. Warm, not hot — order extra.',
    category: 'sides',
    image: px(30648979, 800, 600, 'png'),
    alt: 'Golden crispy hush puppy fritters, close up',
    price: 5,
    countrySide: true,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'mac-cheese',
    name: 'Mac & Cheese',
    desc: 'Three-cheese baked mac under a golden crumb top. A little dangerous.',
    category: 'sides',
    image: px(25524076),
    alt: 'Baked macaroni and cheese topped with melted cheese and herbs',
    price: 5,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'collards',
    name: 'Collard Greens',
    desc: 'Slow-simmered with smoked meat and onion until tender and mellow.',
    category: 'sides',
    image: px(2095569),
    alt: 'Slow cooked collard greens, a Southern soul food staple',
    price: 6,
  },

  /* ——— DRINKS & DESSERTS ——— */
  {
    id: 'sweet-tea',
    name: 'Sweet Tea',
    desc: 'Steeped slow and sweetened with Southern brown sugar. Bottomless at the table.',
    category: 'drinks',
    image: px(32483872),
    alt: 'Pitcher and glasses of sweet iced tea on a wooden table',
    sizes: [
      { label: '16 oz', price: 3 },
      { label: 'Pitcher', price: 8 },
    ],
    tag: 'House Favorite',
  },
  {
    id: 'lemonade',
    name: 'Sweet Peach Lemonade',
    desc: 'Fresh-squeezed, cut with Georgia peaches and a whisper of honey.',
    category: 'drinks',
    image: px(8541309),
    alt: 'Iced peach lemonade in a clear glass with citrus slices',
    price: 4,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'banana-pudding',
    name: 'Banana Pudding',
    desc: 'Vanilla custard, Nilla wafers, a little cinnamon. Grandma-approved recipe.',
    category: 'drinks',
    image: px(13554342),
    alt: 'Creamy banana pudding parfait with wafer biscuits in a glass',
    price: 6,
  },
  {
    // SUGGESTED ADDITION — confirm before launch
    id: 'peach-cobbler',
    name: 'Peach Cobbler',
    desc: 'Stone fruit simmered into a golden crust, served warm with whipped cream.',
    category: 'drinks',
    image: px(34664649),
    alt: 'Peach cobbler with a golden crumble topping',
    price: 7,
  },
];

export const MENU_CATEGORIES: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'bbq', label: 'BBQ & Ribs' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sides', label: 'Country Sides' },
  { id: 'drinks', label: 'Drinks & Desserts' },
];

export const FEATURED_ITEMS = MENU_ITEMS.filter((m) => m.featured);
export const COUNTRY_SIDES = MENU_ITEMS.filter((m) => m.countrySide);
export const menuById = (id: string) => MENU_ITEMS.find((m) => m.id === id);

/* ---------- COUNTERS (About section — figures are placeholders) ---------- */
export const COUNTERS = [
  { value: 100, suffix: '%', label: 'Local & Farm-Raised Meats' },
  { value: 12, suffix: '', label: 'Local Farm & Vendor Partners' },
  { value: 50, suffix: 'k+', label: 'Plates Served Since 2021' },
];

/* ---------- REVIEWS (PLACEHOLDER testimonials — replace with real
   Google/Yelp reviews once the client shares them) ---------- */
export const REVIEWS = [
  {
    name: 'Dee M.',
    area: 'Dover–Oakwood',
    stars: 5,
    text: 'Best ribs on Holloway Street, hands down. The meat barely hangs on the bone, and the sweet tea is brewed the way it’s supposed to be. This is my Friday night now.',
  },
  {
    name: 'Marcus T.',
    area: 'Durham Central',
    stars: 5,
    text: 'Came in skeptical about a new BBQ joint. The farm-raised burger won me over — you can actually taste the difference local beef makes. Sauce is sweet, not syrupy. Rare.',
  },
  {
    name: 'Shanice W.',
    area: 'Chapel Hill',
    stars: 4,
    text: 'The tiger shrimp is dangerously good. It gets busy on weekends — get there early for a booth, or skip the line and use the pickup counter out front.',
  },
  {
    name: 'The Hendersons',
    area: 'Trinity',
    stars: 5,
    text: 'We ordered the fried seafood basket for my wife’s birthday. Nobody at the table stopped reaching for more hush puppies, and that tells you everything.',
  },
];

/* ---------- GALLERY (placeholder photography — swap for client shots) ---------- */
export const GALLERY = [
  { src: px(8250732, 1400, 1000), thumb: px(8250732, 800, 600), alt: 'Ribs sizzling on the grill at Country Boys Grill', caption: 'Ribs hitting the grate at noon' },
  { src: px(13203940, 1400, 1000), thumb: px(13203940, 800, 600), alt: 'Smoke rising over ribs on the smoker', caption: 'Low, slow, and smoky' },
  { src: px(9397270, 1400, 1000), thumb: px(9397270, 800, 600), alt: 'A country boy slicing smoked brisket on a board', caption: 'Brisket, sliced to order' },
  { src: px(30420679, 1400, 1000), thumb: px(30420679, 800, 600), alt: 'Warm candlelit dining room at Country Boys Grill', caption: 'The dining room, Friday night' },
  { src: px(16845332, 1400, 1000), thumb: px(16845332, 800, 600), alt: 'Plate of fried tiger shrimp', caption: 'Tiger shrimp, house style' },
  { src: px(28449692, 1400, 1000), thumb: px(28449692, 800, 600), alt: 'Fried seafood platter with dipping sauces', caption: 'The fried seafood basket' },
  { src: px(32538759, 1400, 1000), thumb: px(32538759, 800, 600), alt: 'Full rack of barbecue ribs with sides on a wooden table', caption: 'Full racks, family style' },
  { src: px(30146054, 1400, 1000), thumb: px(30146054, 800, 600), alt: 'Table spread of potato salad and barbecue', caption: 'Sunday supper spread' },
  { src: px(32483872, 1400, 1000), thumb: px(32483872, 800, 600), alt: 'Pitcher of sweet tea with glasses', caption: 'Sweet tea, always poured' },
];

export const CONTACT_SUBJECTS = ['General Inquiry', 'Catering', 'Feedback', 'Press', 'Something Else'];

/* Render "Half Rack $24 · Full Rack $39" for items with size options. */
export const sizeText = (item: { sizes?: SizeOption[] }) =>
  item.sizes?.map((s) => `${s.label} ${money(s.price)}`).join('  ·  ');

/* ---------- MONEY FORMAT ---------- */
export const money = (n: number) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);
