import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/SEO';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Eye,
  X,
  Truck,
  Banknote,
  ShieldCheck,
  Flame,
  Check,
  Plus,
} from 'lucide-react';

// Textes de la boutique : français et darija tunisienne
const TXT = {
  fr: {
    cur: 'DT',
    seoTitle: 'Boutique hydro-économes pour réduire sa facture SONEDE | EcoPower',
    seoDesc: 'Pommes de douche, éco-robinets et packs hydro-économes pour réduire votre facture SONEDE. Livraison 24-48h partout en Tunisie, paiement à la livraison.',
    heroTitle: 'Jusqu’à -60% sur votre facture d’eau',
    meterLabel: 'Votre facture d’eau',
    trust: [
      { icon: 'truck', label: 'Livré en 24-48h' },
      { icon: 'cash', label: 'Payez à la livraison' },
      { icon: 'shield', label: '14 jours remboursé' },
    ],
    searchPh: 'Rechercher un produit, un pack...',
    found: (n) => `${n} ${n > 1 ? 'articles' : 'article'}`,
    noResults: 'Aucun article ne correspond à votre recherche.',
    reset: 'Réinitialiser les filtres',
    topOffer: 'Offre du moment',
    packBadge: 'Pack Éco',
    lowStock: (n) => `Plus que ${n} en stock`,
    off: (p) => `-${p}%`,
    warranty: 'Garantie',
    inStock: 'En stock',
    onOrder: 'Sur commande',
    add: 'Ajouter',
    added: 'Ajouté',
    order: (p) => `Commander · ${p} DT`,
    deliveryNote: 'Livraison 8 DT · Paiement à la livraison',
    modalTitle: 'Fiche produit',
    zoom: 'Agrandir',
    debit: 'Débit',
    featuresTitle: 'Points forts :',
    clickClose: 'Touchez pour fermer',
    defaultWarranty: '3 Ans',
    viewCart: 'Voir le panier',
    cartItems: (n) => `${n} ${n > 1 ? 'articles' : 'article'}`,
    categories: {
      all: 'Tous',
      packs: '🎁 Packs',
      robinets: '🚰 Robinets',
      douches: '🚿 Douches',
      wc: '🚽 WC',
      accessoires: '🔧 Bagues & Joints',
      energie: '💡 LED',
    },
    categoryNames: {
      packs: 'Pack complet',
      robinets: 'Robinet',
      douches: 'Douche',
      wc: 'WC',
      accessoires: 'Accessoire',
      energie: 'Énergie',
    },
  },
  ar: {
    cur: 'د.ت',
    seoTitle: 'متجر موفّرات الماء باش تنقّص فاتورة الصوناد | إيكوباور',
    seoDesc: 'موفّرات للدوش والروبيني وباكات كاملة باش تنقّص فاتورة الصوناد. توصيل في 24-48 ساعة لكامل تونس والخلاص عند الاستلام.',
    heroTitle: 'نقّص حتى 60% من فاتورة الماء',
    meterLabel: 'فاتورة الماء متاعك',
    trust: [
      { icon: 'truck', label: 'توصيل 24-48 ساعة' },
      { icon: 'cash', label: 'الخلاص عند الاستلام' },
      { icon: 'shield', label: 'استرجاع 14 يوم' },
    ],
    searchPh: 'قلّب على منتوج، باك...',
    found: (n) => `${n} منتوج`,
    noResults: 'ما لقينا حتى منتوج يوافق بحثك.',
    reset: 'رجّع الفلاتر',
    topOffer: 'عرض اليوم',
    packBadge: 'باك إيكو',
    lowStock: (n) => `بقاو كان ${n}`,
    off: (p) => `-${p}%`,
    warranty: 'ضمان',
    inStock: 'متوفّر',
    onOrder: 'على الطلب',
    add: 'زيد',
    added: 'تزاد',
    order: (p) => `اطلب · ${p} د.ت`,
    deliveryNote: 'التوصيل 8 د.ت · الخلاص عند الاستلام',
    modalTitle: 'فيشة المنتوج',
    zoom: 'كبّر',
    debit: 'التدفّق',
    featuresTitle: 'المميزات :',
    clickClose: 'اضغط باش تسكّر',
    defaultWarranty: '3 سنين',
    viewCart: 'شوف السلة',
    cartItems: (n) => `${n} منتوج`,
    categories: {
      all: 'الكل',
      packs: '🎁 الباكات',
      robinets: '🚰 الروبيني',
      douches: '🚿 الدوش',
      wc: '🚽 التواليت',
      accessoires: '🔧 حلقات وجوانات',
      energie: '💡 LED',
    },
    categoryNames: {
      packs: 'باك كامل',
      robinets: 'روبيني',
      douches: 'دوش',
      wc: 'تواليت',
      accessoires: 'اكسسوار',
      energie: 'طاقة',
    },
  },
};

const CATEGORY_IDS = ['all', 'packs', 'robinets', 'douches', 'wc', 'accessoires', 'energie'];
const TRUST_ICONS = { truck: Truck, cash: Banknote, shield: ShieldCheck };

// Si le header du site est "sticky", mettez sa hauteur ici (ex: 'top-16') pour que les filtres se collent juste dessous.
const FILTER_STICKY_TOP = 'top-0';

const discountPct = (p) =>
  p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

// Animations du bandeau (CSS pur, désactivées si l'utilisateur a demandé moins de mouvement)
const HERO_CSS = `
@keyframes eco-rise { 0% { transform: translateY(0) scale(.6); opacity: 0; } 15% { opacity: .55; } 100% { transform: translateY(-150px) scale(1.1); opacity: 0; } }
@keyframes eco-wave { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes eco-pop { 0% { transform: translateY(10px) scale(.9); opacity: 0; } 100% { transform: none; opacity: 1; } }
@keyframes eco-shine { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(120%); } }
.eco-bubble { position: absolute; bottom: -10px; border-radius: 9999px; background: rgba(186,230,253,.35); border: 1px solid rgba(255,255,255,.35); animation: eco-rise 6s ease-in infinite; pointer-events: none; }
.eco-wave { animation: eco-wave 7s linear infinite; }
.eco-pop { animation: eco-pop .5s cubic-bezier(.2,.9,.3,1.2) both; }
.eco-shine::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%); animation: eco-shine 3.5s ease-in-out infinite; pointer-events: none; }
@media (prefers-reduced-motion: reduce) { .eco-bubble, .eco-wave, .eco-pop, .eco-shine::after { animation: none !important; } .eco-pop { opacity: 1; } }
`;

const BUBBLES = [
  { left: '8%', size: 10, delay: '0s', dur: '6s' },
  { left: '22%', size: 16, delay: '1.8s', dur: '7s' },
  { left: '41%', size: 8, delay: '3.2s', dur: '5.5s' },
  { left: '63%', size: 14, delay: '0.9s', dur: '6.5s' },
  { left: '78%', size: 9, delay: '2.6s', dur: '5s' },
  { left: '92%', size: 12, delay: '4s', dur: '7.5s' },
];

// Compteur + barre qui se vide : la facture baisse sous les yeux du visiteur.
// Composant isolé pour que seule cette zone se redessine pendant l'animation.
const SavingsMeter = ({ label, target = 60 }) => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setPct(target); return undefined; }

    const RUN = 1800, HOLD = 2800, BACK = 1200;
    let raf;
    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      const e = (now - start) % (RUN + HOLD + BACK);
      let p;
      if (e < RUN) p = 1 - Math.pow(1 - e / RUN, 3);
      else if (e < RUN + HOLD) p = 1;
      else {
        // retour en douceur (ease-in-out) au lieu d'un retour brusque
        const b = (e - RUN - HOLD) / BACK;
        p = 1 - (b < 0.5 ? 2 * b * b : 1 - Math.pow(-2 * b + 2, 2) / 2);
      }
      setPct(target * p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div role="img" aria-label={`${label} -${target}%`}>
      <div className="text-xs font-semibold text-sky-100/90 mb-1.5">{label}</div>
      <div className="flex items-center gap-3">
        <div className="eco-shine relative flex-1 min-w-0 h-3.5 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-300 to-white will-change-[width]"
            style={{ width: `${100 - pct}%` }}
          />
        </div>
        <div
          className="shrink-0 w-[5rem] text-3xl font-black leading-none text-end font-sans"
          style={{ fontVariantNumeric: 'tabular-nums', fontFeatureSettings: '"tnum"' }}
          dir="ltr"
        >
          -{Math.round(pct)}%
        </div>
      </div>
    </div>
  );
};

export const ShopPage = () => {
  const { addToCart, language, setIsCartOpen, cart } = useCart();
  const t = TXT[language] || TXT.fr;
  const isAr = language === 'ar';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const searchRef = useRef(null);
  const addedTimer = useRef(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        // Ordre d'affichage défini par l'admin
        setProducts([...data].sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999)));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isImageZoomed) setIsImageZoomed(false);
        else setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isImageZoomed]);

  // Bloque le scroll de la page derrière la fiche produit (important sur téléphone)
  useEffect(() => {
    if (!activeModalProduct) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [activeModalProduct]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Nettoie le minuteur du bouton "Ajouté" au démontage
  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const buzz = () => { try { navigator.vibrate?.(15); } catch (e) { /* ignore */ } };

  // Ajout rapide : on reste sur la liste, le bouton confirme et la barre du bas se met à jour.
  const quickAdd = (product) => {
    addToCart(product);
    buzz();
    setAddedId(product.id);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAddedId((id) => (id === product.id ? null : id)), 1400);
  };

  // Commander : ajoute puis ouvre le panier directement.
  const orderNow = (product) => {
    addToCart(product);
    buzz();
    setIsCartOpen(true);
  };

  // Champs traduits : nameAr / descriptionAr / featuresAr si présents dans l'admin, sinon le français.
  const pName = (p) => (isAr && p.nameAr) || p.name;
  const pDesc = (p) => (isAr && p.descriptionAr) || p.description || '';
  const pFeatures = (p) => (isAr && Array.isArray(p.featuresAr) && p.featuresAr.length ? p.featuresAr : p.features);
  const catLabel = (id) => t.categoryNames[id] || id;

  const q = searchQuery.toLowerCase();
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.descriptionAr && p.descriptionAr.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // "Offre du moment" : produit marqué bestSeller dans l'admin, sinon le premier pack
  const featured =
    products.find((p) => p.bestSeller) || products.find((p) => p.category === 'packs') || null;
  const showFeatured = !!featured && selectedCategory === 'all' && !q;
  const listProducts = showFeatured ? filteredProducts.filter((p) => p.id !== featured.id) : filteredProducts;

  // Résumé du panier pour la barre du bas (lecture défensive selon la forme du contexte)
  const cartLines = Array.isArray(cart) ? cart : [];
  const lineQty = (i) => Number(i.quantity ?? i.qty ?? 1) || 1;
  const linePrice = (i) => Number(i.price ?? i.product?.price ?? i.unitPrice ?? 0) || 0;
  const cartCount = cartLines.reduce((s, i) => s + lineQty(i), 0);
  const cartTotal = cartLines.reduce((s, i) => s + linePrice(i) * lineQty(i), 0);

  const renderCard = (product) => {
    const pct = discountPct(product);
    const lowStock = product.stock > 0 && product.stock <= 5;
    const justAdded = addedId === product.id;
    // Les images des packs contiennent déjà le badge "14 jours" : on ne le double pas.
    const showGuarantee = product.category !== 'packs';

    return (
      <article
        key={product.id}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs flex sm:flex-col overflow-hidden sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image : un tap ouvre la fiche */}
        <button
          type="button"
          onClick={() => setActiveModalProduct(product)}
          aria-label={pName(product)}
          className="relative shrink-0 w-36 sm:w-full self-stretch sm:h-52 bg-slate-50 p-2 sm:p-4 flex items-center justify-center"
        >
          {pct > 0 && (
            <span className="absolute top-1.5 start-1.5 z-10 bg-red-600 text-white text-[11px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
              {t.off(pct)}
            </span>
          )}

          {/* Badge Satisfait ou Remboursé : en bas, petit, il ne cache pas le produit */}
          {showGuarantee && (
            <img
              src="/garantie-14-jours.webp"
              alt={t.trust[2].label}
              className="absolute bottom-1 end-1 w-10 sm:w-16 h-auto object-contain z-10 drop-shadow-sm pointer-events-none"
              loading="lazy"
              decoding="async"
            />
          )}

          <img
            src={product.image}
            alt={pName(product)}
            className="max-h-36 sm:max-h-44 w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </button>

        <div className="flex-1 min-w-0 p-3 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-600 font-semibold">
            <span className="truncate">{catLabel(product.category)}</span>
            {product.debit && (
              <span className="text-brand-700 font-bold bg-brand-50 px-1.5 py-0.5 rounded-md shrink-0" dir="ltr">
                {product.debit}
              </span>
            )}
          </div>

          <h3 className="mt-1 font-extrabold text-[15px] sm:text-base text-slate-900 line-clamp-2 leading-snug">
            {pName(product)}
          </h3>

          <p className="hidden sm:block text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {pDesc(product)}
          </p>

          {lowStock ? (
            <p className="text-xs font-bold text-red-600 mt-1">{t.lowStock(product.stock)}</p>
          ) : (
            <p className={`text-xs font-semibold mt-1 ${product.stock > 0 ? 'text-blue-700' : 'text-amber-700'}`}>
              {product.stock > 0 ? t.inStock : t.onOrder}
            </p>
          )}

          {/* Prix puis bouton, empilés : le prix ne se casse plus sur plusieurs lignes */}
          <div className="mt-auto pt-2 flex flex-col gap-2">
            <div className="flex items-baseline flex-wrap gap-x-2">
              <div className="text-xl font-black text-brand-900 leading-none whitespace-nowrap">
                <span dir="ltr">{product.price.toFixed(3)}</span>{' '}
                <span className="text-xs font-bold text-slate-500">{t.cur}</span>
              </div>
              {product.oldPrice && (
                <div className="text-xs text-slate-400 line-through whitespace-nowrap" dir="ltr">
                  {product.oldPrice.toFixed(3)}
                </div>
              )}
            </div>

            <button
              onClick={() => quickAdd(product)}
              className={`h-10 sm:h-11 w-full rounded-xl text-sm font-extrabold flex items-center justify-center gap-1.5 text-white shadow-md transition active:scale-95 ${
                justAdded ? 'bg-emerald-600' : 'bg-gradient-to-r from-energy-500 to-energy-600'
              }`}
            >
              {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{justAdded ? t.added : t.add}</span>
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="pt-3 sm:pt-8 pb-32 sm:pb-10 space-y-4 sm:space-y-8 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <SEO title={t.seoTitle} description={t.seoDesc} path="/shop" />

      {/* Bandeau animé : la facture baisse, l'eau coule, les garanties apparaissent une à une */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-skywater-700 text-white rounded-2xl sm:rounded-3xl px-4 pt-4 pb-9 sm:p-8 sm:pb-12 shadow-lg">
        <style>{HERO_CSS}</style>

        {/* Bulles qui montent + vague en bas */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" dir="ltr">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="eco-bubble"
              style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay, animationDuration: b.dur }}
            />
          ))}
          {/* left-0 (physique) + dir="ltr" : la vague défile pareil en français et en arabe */}
          <svg
            viewBox="0 0 2400 40"
            preserveAspectRatio="none"
            dir="ltr"
            className="eco-wave absolute bottom-0 left-0 h-6 w-[200%] text-sky-300/25"
            fill="currentColor"
          >
            <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 T1500 20 T1800 20 T2100 20 T2400 20 V40 H0Z" />
          </svg>
        </div>

        <div className="relative z-10 space-y-3">
          <h1 className="text-xl sm:text-4xl font-black font-serif leading-tight">{t.heroTitle}</h1>

          <SavingsMeter label={t.meterLabel} target={60} />

          <ul className="grid grid-cols-3 gap-2 pt-1">
            {t.trust.map((item, i) => {
              const Icon = TRUST_ICONS[item.icon];
              return (
                <li
                  key={item.icon}
                  className="eco-pop flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-white/10 border border-white/15 rounded-xl px-1.5 py-2 text-center text-xs font-bold leading-tight"
                  style={{ animationDelay: `${0.25 + i * 0.15}s` }}
                >
                  <Icon className="w-5 h-5 text-sky-300 shrink-0" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Filtres collés en haut : catégories à un doigt, recherche repliée pour gagner de la place */}
      <div
        className={`sticky ${FILTER_STICKY_TOP} z-30 -mx-3 sm:mx-0 px-3 sm:px-5 py-2.5 bg-white/95 backdrop-blur border-b sm:border border-slate-200 sm:rounded-2xl`}
      >
        {searchOpen && (
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPh}
              className="w-full h-11 ps-10 pe-4 rounded-xl border border-slate-200 text-base focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (searchOpen) setSearchQuery('');
              setSearchOpen((v) => !v);
            }}
            aria-label={t.searchPh}
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition ${
              searchOpen ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
            {CATEGORY_IDS.map((id) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`h-10 px-4 rounded-full text-sm font-bold whitespace-nowrap transition ${
                  selectedCategory === id
                    ? 'bg-brand-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 active:bg-slate-200'
                }`}
              >
                {t.categories[id]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 sm:space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex sm:flex-col animate-pulse">
              <div className="w-36 sm:w-full h-44 sm:h-52 bg-slate-100 shrink-0" />
              <div className="flex-1 p-3 space-y-2">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-4/5" />
                <div className="h-6 bg-slate-100 rounded w-1/2 mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <p className="text-slate-600 font-bold">{t.noResults}</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 h-11 px-5 bg-brand-700 text-white rounded-xl text-sm font-bold"
          >
            {t.reset}
          </button>
        </div>
      ) : (
        <>
          {/* Offre du moment : une grande carte, le produit à pousser aux visiteurs des pubs */}
          {showFeatured && (
            <article className="bg-white rounded-3xl border-2 border-energy-500 shadow-lg overflow-hidden sm:flex">
              <button
                type="button"
                onClick={() => setActiveModalProduct(featured)}
                aria-label={pName(featured)}
                className="relative block w-full sm:w-1/2 bg-slate-50 p-4"
              >
                <span className="absolute top-3 start-3 z-10 bg-energy-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  {t.topOffer}
                </span>
                {discountPct(featured) > 0 && (
                  <span className="absolute top-3 end-3 z-10 bg-red-600 text-white text-sm font-black px-2.5 py-1 rounded-full shadow-sm">
                    {t.off(discountPct(featured))}
                  </span>
                )}
                <img
                  src={featured.image}
                  alt={pName(featured)}
                  className="w-full max-h-56 sm:max-h-72 object-contain mx-auto"
                  decoding="async"
                />
              </button>

              <div className="p-4 sm:p-6 sm:w-1/2 flex flex-col justify-center gap-2">
                <h2 className="font-extrabold text-lg text-slate-900 leading-snug">{pName(featured)}</h2>
                <p className="text-sm text-slate-600 line-clamp-2">{pDesc(featured)}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-brand-900">
                    <span dir="ltr">{featured.price.toFixed(3)}</span>{' '}
                    <span className="text-sm font-bold text-slate-500">{t.cur}</span>
                  </span>
                  {featured.oldPrice && (
                    <span className="text-sm text-slate-400 line-through" dir="ltr">
                      {featured.oldPrice.toFixed(3)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => orderNow(featured)}
                  className="mt-1 h-14 w-full rounded-2xl bg-gradient-to-r from-energy-500 to-energy-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-energy-500/30 active:scale-95 transition"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t.order(featured.price.toFixed(3))}
                </button>
                <p className="text-xs font-semibold text-slate-600 text-center">{t.deliveryNote}</p>
              </div>
            </article>
          )}

          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {listProducts.map(renderCard)}
          </div>
        </>
      )}

      {/* Barre du bas : le panier est toujours à portée de pouce */}
      {cartCount > 0 && !activeModalProduct && (
        <div className="fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto w-full h-14 bg-brand-800 text-white rounded-2xl px-4 flex items-center justify-between shadow-xl active:scale-[0.98] transition"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShoppingBag className="w-5 h-5" />
              {t.cartItems(cartCount)}
              {cartTotal > 0 && (
                <span className="font-black" dir="ltr">· {cartTotal.toFixed(3)} {t.cur}</span>
              )}
            </span>
            <span className="bg-energy-500 px-3 py-1.5 rounded-lg text-sm font-extrabold">{t.viewCart}</span>
          </button>
        </div>
      )}

      {/* Fiche produit : feuille qui monte du bas sur téléphone */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 flex items-end sm:items-center justify-center sm:p-4"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 pt-2 pb-1 flex flex-col items-center sm:hidden">
              <span className="w-10 h-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="px-4 py-2 sm:py-4 sm:border-b border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-sm font-bold text-brand-700">{t.modalTitle}</span>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="w-10 h-10 flex items-center justify-center text-slate-500 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 sm:px-8 pb-4 space-y-4 overflow-y-auto flex-1">
              <div
                className="relative w-full bg-slate-50 rounded-2xl p-3 flex items-center justify-center cursor-zoom-in"
                onClick={() => setIsImageZoomed(true)}
              >
                <img
                  src={activeModalProduct.image}
                  alt={pName(activeModalProduct)}
                  className="max-h-[260px] sm:max-h-[360px] w-full object-contain"
                />
                <span className="absolute bottom-2 end-2 bg-white/95 text-brand-800 text-xs font-bold px-2.5 py-1.5 rounded-lg shadow flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {t.zoom}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{pName(activeModalProduct)}</h3>
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-2xl font-black text-brand-800">
                    <span dir="ltr">{activeModalProduct.price.toFixed(3)}</span> {t.cur}
                  </span>
                  {activeModalProduct.oldPrice && (
                    <span className="text-sm text-slate-400 line-through" dir="ltr">
                      {activeModalProduct.oldPrice.toFixed(3)}
                    </span>
                  )}
                  {discountPct(activeModalProduct) > 0 && (
                    <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-full">
                      {t.off(discountPct(activeModalProduct))}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-brand-50 text-brand-800 font-bold rounded-lg">
                    {t.warranty} : {activeModalProduct.warranty || t.defaultWarranty}
                  </span>
                  {activeModalProduct.debit && (
                    <span className="px-2.5 py-1 bg-skywater-50 text-skywater-800 font-bold rounded-lg">
                      {t.debit} : <span dir="ltr">{activeModalProduct.debit}</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{pDesc(activeModalProduct)}</p>
              </div>

              {pFeatures(activeModalProduct) && (
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <h4 className="text-sm font-bold text-slate-800">{t.featuresTitle}</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {pFeatures(activeModalProduct).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bouton toujours visible en bas, dans la zone du pouce */}
            <div className="shrink-0 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-slate-100 bg-white">
              <p className="text-xs font-semibold text-slate-600 text-center mb-2">{t.deliveryNote}</p>
              <button
                onClick={() => {
                  orderNow(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="w-full h-14 bg-gradient-to-r from-energy-500 to-energy-600 text-white font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-energy-500/25 active:scale-95 transition"
              >
                <ShoppingBag className="w-5 h-5" />
                {t.order(activeModalProduct.price.toFixed(3))}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image en plein écran */}
      {isImageZoomed && activeModalProduct && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-8 cursor-zoom-out"
          onClick={() => setIsImageZoomed(false)}
        >
          <button
            onClick={() => setIsImageZoomed(false)}
            className="absolute top-4 end-4 z-10 bg-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeModalProduct.image}
            alt={pName(activeModalProduct)}
            className="max-w-full max-h-full object-contain"
          />
          <span className="absolute bottom-5 text-white/80 text-sm">{t.clickClose}</span>
        </div>
      )}
    </div>
  );
};