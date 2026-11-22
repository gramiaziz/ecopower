import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/SEO';
import { ReferencesCarousel } from '../components/ReferencesCarousel';
import { SavingsCalculator } from '../components/SavingsCalculator';
import {
  Droplets,
  Flame,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  ShoppingBag,
  Wrench,
  Zap,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Textes de la page d'accueil : français et darija tunisienne
const TXT = {
  fr: {
    cur: 'DT',
    heroBadge: 'Leader en Tunisie • Normes ISO & ACS Certifiées',
    heroTitle: ['Réduisez votre facture ', 'SONEDE & STEG', ' jusqu’à ', '60%'],
    heroText: 'La solution hydro-économe certifiée Delrin/Hostaform qui régule la pression en Tunisie. Même confort de jet, deux fois moins d’eau et de gaz consommés. Livré chez vous en 24h avec certificat de garantie 3 ans.',
    ctaOrder: 'Commander un Pack Éco',
    ctaSimulate: 'Simuler mes économies',
    fromPrice: 'À partir de',
    heroChips: ['Installation en 2 min, sans outils', 'Paiement à la livraison', 'Livraison 24-48h', 'Satisfait ou remboursé 14 jours'],
    journeyBadge: 'Étape par étape',
    journeyTitle: 'Équipez votre logement à votre rythme',
    journeyText: 'Commencez par un pack, puis complétez quand vous voulez. Chaque produit se visse à la main en moins de 2 minutes, sans outils.',
    journeySteps: [
      {
        tag: 'Point de départ',
        title: 'Commencez par le Pack de Base',
        desc: 'Un économiseur 5 L/min pour la cuisine et un régulateur de douche, avec le sac débit-mètre offert.',
        cta: 'Commander le pack',
        stats: [['Jusqu’à 60%', 'Économie d’eau'], ['+25%', 'Économie gaz STEG']],
      },
      {
        title: 'Complétez point par point',
        desc: 'Ajoutez un économiseur à l’unité pour chaque autre robinet : lavabo de la salle de bain, deuxième douche, etc.',
        cta: 'Voir les régulateurs à l’unité',
        stats: [['Jusqu’à 60%', 'Économie d’eau'], ['+25%', 'Économie gaz STEG']],
      },
      {
        title: 'Terminez par les toilettes',
        desc: 'L’Eco-Sac WC 3L, imputrescible et garanti à vie, se suspend dans le réservoir.',
        cta: 'Voir l’Eco-Sac WC',
        stats: [['3 L', 'économisés par chasse']],
      },
    ],
    journeyAll: 'Vous préférez tout équiper d’un coup ?',
    journeyAllCta: 'Voir les packs Appartement et Villa',
 journeyWcNote: 'Gagnez 3 L à chaque fois que vous tirez la chasse',
 journeyTap: 'Robinet',
    journeyShower: 'Douche & Flexible',
    
    trustWater: "Économie d'eau",
    trustGas: 'Économie gaz STEG',
    trustYears: '3 Ans',
    trustWarranty: 'Garantie & Certificat',
    cardOffer: 'Offre Spéciale -15%',
    cardOfferPct: (pct) => `Offre Spéciale -${pct}%`,
    cardKicker: 'Solution N°1 en Tunisie',
    cardTitle: 'Pack Appartement Éco 4L',
    cardSub: '2 Mousseurs Robinets + 1 Régulateur Douche + 1 Eco-Sac WC 3L',
    ttc: 'TTC',
    giftMeter: 'Sac Débitmètre Offert',
    addToCart: (price) => `Ajouter au Panier (${price} DT)`,
    cardFooter: 'Paiement à la livraison • Satisfait ou remboursé 14 jours',
    clipBadge: 'Installation Rapide Sans Outils',
    clipTitle: 'Où installer les économiseurs dans votre logement ?',
    clipText: "Chaque point d'eau de votre maison peut être équipé en moins de 2 minutes pour stopper le gaspillage mécanique SONEDE.",
    flowLabel: 'Débit :',
    step: 'Étape',
    waterSaving: 'Économie Eau',
    gasSaving: 'Économie Gaz',
    clipZones: [
      { zone: 'Évier Cuisine', flow: '4 ou 5 L/min', desc: 'Bague Inox + Cartouche Delrin anticalcaire.' },
      { zone: 'Lavabo Salle de Bain', flow: '4 ou 5 L/min', desc: 'Jet doux aéré, supprime les éclaboussures.' },
      { zone: 'Douche & Flexible', flow: '5 ou 7 L/min', desc: 'Régulateur Inox placé sous le flexible de douche.' },
      { zone: 'Toilettes & WC', flow: '3 Litres / chasse', desc: 'Eco-Sac 3L imputrescible suspendu dans le réservoir.' },
    ],
    gasNA: 'N/A',
    packsKicker: 'Les Meilleures Ventes',
    packsTitle: 'Choisissez votre Pack Éco-Énergie',
    seeShop: 'Voir toute la boutique au détail',
    homeBadge: 'Recommandé',
    packs: {
      'pack-appartement-4l': {
        name: 'Pack Appartement 4L',
        badge: 'Plus Populaire',
        desc: 'Idéal Appartement F2 / F3 : 2 Mousseurs 4L/min + 1 Régulateur Douche + 1 Eco-Sac WC 3L + 1 Sac Débit-mètre Gratuit',
        features: ['Jusqu’à 60% d’économie d’eau', '+25% d’économie sur gaz STEG', 'Garantie 3 ans & Eco-Sac à vie', 'Sac Débit-mètre offert'],
      },
      'pack-maison-4l': {
        name: 'Pack Maison / Villa 4L',
        badge: 'Grand Logement',
        desc: 'Équipement complet Villa : 4 Mousseurs 4L/min + 2 Régulateurs Douche/Toilette + 2 Eco-Sacs WC 3L + Débit-mètre',
        features: ['Idéal pour 4 à 8 personnes', 'Double salle de bain', 'Économie annuelle > 280 DT', 'Installation en 2 minutes'],
      },
    },
    faqBadge: 'Foire Aux Questions',
    faqTitle: "Tout ce qu'il faut savoir sur l'hydro-économie",
    faqs: [
      {
        q: "Pourquoi la pression SONEDE fait-elle exploser la facture en Tunisie ?",
        a: "Contrairement à l'Europe où la pression est standardisée à 3 bars (12L/min au robinet), la pression SONEDE en Tunisie n'est pas régulée et varie selon les quartiers. Pour plus de 80% des foyers, cela crée un débit excessif atteignant 20 à 24 litres/minute ! Vous consommez et payez le double sans vous en rendre compte."
      },
      {
        q: "Est-ce qu'on perd du confort ou de la pression sous la douche ?",
        a: "Absolument pas ! Nos dispositifs hydro-économes intègrent un système d'aération breveté sous marque HOSTAFORM / DELRIN. L'eau est mélangée à de l'air sous pression, offrant un jet ferme, généreux et massant, tout en consommant 60% d'eau en moins."
      },
      {
        q: "Quel est l'impact direct sur la facture de gaz STEG ?",
        a: "Toute l'eau chaude utilisée sous la douche ou au robinet doit être chauffée par votre chaudière ou chauffe-eau à gaz STEG. En divisant par deux le volume d'eau chaude consommée, vous réduisez automatiquement de 25% à 40% la consommation de gaz nécessaire pour la chauffer !"
      },
      {
        q: "L'installation nécessite-t-elle un plombier ou des outils ?",
        a: "Non, aucun outil ni compétences en plomberie ne sont nécessaires. L'installation se fait en moins de 2 minutes en dévissant l'ancien embout à la main et en vissant le régulateur EcoPower."
      },
      {
        q: "Comment fonctionne la garantie et le paiement ?",
        a: "Tous nos dispositifs bénéficient d'une garantie constructeur de 3 ans (et garantie à vie pour l'Eco-Sac WC). Nous livrons partout en Tunisie sous 24-48h avec paiement en espèces à la livraison (Cash on Delivery). Vous disposez de 14 jours « Satisfait ou Remboursé »."
      }
    ],
    finalBadge: 'Livraison 24-48h Partout en Tunisie',
    finalTitle: 'Passez à l’Hydro-Économie Dès Aujourd’hui',
    finalText: "Rejoignez plus de 2 000 foyers et 100 établissements équipés. Vos factures SONEDE et STEG diminuent dès le premier jour d'installation.",
    finalOrder: 'Commander Mon Pack en Ligne',
    finalPro: 'Espace Professionnel & Devis',
    finalTrust: ['✅ Garantie 3 ans', '✅ Satisfait ou Remboursé 14 jours', '✅ Paiement à la livraison'],
  },
  ar: {
    cur: 'د.ت',
    heroBadge: 'الأول في تونس • مطابق لمعايير ISO و ACS',
    heroTitle: ['نقّص في فاتورة ', 'الصوناد والستاغ', ' حتى لـ ', '60%'],
    heroText: 'الحل اللي يوفّر الماء، مصنوع من Delrin/Hostaform ومعتمد، ويظبط ضغط الماء في تونس. نفس الراحة متاع الماء، وتستهلك نص الماء ونص الغاز. يوصلك لدارك في 24 ساعة مع شهادة ضمان 3 سنين.',
    ctaOrder: 'اطلب باك إيكو',
    ctaSimulate: 'احسب قدّاش باش توفّر',
    
    fromPrice: 'ابتداء من',
    heroChips: ['تركيب في دقيقتين بلا عدّة', 'الخلاص عند الاستلام', 'توصيل في 24-48 ساعة', 'راضي ولا نرجعولك فلوسك في 14 يوم'],

     journeyBadge: 'خطوة بخطوة',
    journeyTitle: 'جهّز دارك على راحتك',
    journeyText: 'ابدا بباك، وكمّل كي تحب. كل منتوج يتسكّر بيدك في أقل من دقيقتين، بلا عدّة.',
    journeySteps: [
      {
        tag: 'نقطة البداية',
        title: 'ابدا بالباك الأساسي (Pack de Base)',
        desc: 'موفّر 5 لتر في الدقيقة للكوجينة + منظّم للدوش، مع كيس قياس تدفّق المياه مجانًا.',
        cta: 'اطلب الباك',
        stats: [['حتى 60%', 'توفير في الماء'], ['+25%', 'توفير في غاز الستاغ']],
      },
      {
        title: 'كمّل نقطة بنقطة',
        desc: 'زيد موفّر بالوحدة لكل روبيني آخر: لافابو بيت البانو، دوش ثاني...',
        cta: 'شوف الموفّرات بالوحدة',
        stats: [['حتى 60%', 'توفير في الماء'], ['+25%', 'توفير في غاز الستاغ']],
      },
      {
        title: 'ختمها بالتواليت',
        desc: 'إيكو-ساك 3L ما يتحلّش ومضمون مدى الحياة، يتعلّق في الشاسة.',
        cta: 'شوف الإيكو-ساك',
        stats: [['3 لتر', 'توفير في كل سيفون']],
      },
    ],
    journeyAll: 'تحب تجهّز دارك كاملة مرة وحدة؟',
    journeyAllCta: 'شوف باكات الشقة والفيلا',
    journeyWcNote: 'تربح 3 لتر في كل مرة تسحب الساش',
  journeyTap: 'روبيني',
    journeyShower: ' دوش & Flexible',
    trustWater: 'توفير في الماء',
    trustGas: 'توفير في غاز الستاغ',
    trustYears: '3 سنين',
    trustWarranty: 'ضمان وشهادة',
    cardOffer: 'عرض خاص -15%',
    cardOfferPct: (pct) => `عرض خاص -${pct}%`,
    cardKicker: 'الحل رقم 1 في تونس',
    cardTitle: 'باك الشقة إيكو 4L',
    cardSub: '2 مخفّضات للروبيني + 1 منظّم للدوش + 1 إيكو-ساك للتواليت 3L',
    ttc: ' شامل الأداءات (TTC).',
    giftMeter: 'كيس قياس تدفّق المياه مجانًا',
    addToCart: (price) => `زيد للسلة (${price} د.ت)`,
    cardFooter: 'الخلاص عند الاستلام • راضي ولا نرجعولك فلوسك في 14 يوم',
    clipBadge: 'تركيب سريع بلا عدّة',
    clipTitle: 'وين تركّب الموفّرات في دارك؟',
    clipText: 'كل نقطة ماء في دارك تنجم تجهّزها في أقل من دقيقتين، باش توقف التبذير اللي يعملو ضغط الصوناد.',
    flowLabel: 'التدفّق:',
    step: 'المرحلة',
    waterSaving: 'توفير الماء',
    gasSaving: 'توفير الغاز',
    clipZones: [
      { zone: 'لافابو الكوجينة', flow: '4 ولا 5 L/min', desc: 'حلقة إينوكس + خرطوشة Delrin ضد الكلس.' },
      { zone: 'لافابو بيت البانو', flow: '4 L/min', desc: 'ماء ناعم فيه هواء، وما يطرطشش.' },
      { zone: 'الدوش والفليكسيبل', flow: '5 ولا 7 L/min', desc: 'منظّم إينوكس يتحط تحت فليكسيبل الدوش.' },
      { zone: 'التواليت', flow: '3 لتر في كل سيفون', desc: 'إيكو-ساك 3L ما يتحلّش، يتعلّق في الشاسة.' },
    ],
    gasNA: '—',
    packsKicker: 'الأكثر مبيعًا',
    packsTitle: 'اختار الباك متاعك',
    seeShop: 'شوف المتجر الكل',
    homeBadge: 'ننصحوك بيه',
    packs: {
      'pack-appartement-4l': {
        name: 'باك الشقة 4L',
        badge: 'الأكثر طلبًا',
        desc: 'مثالي للشقة S+1 / S+2 : 2 مخفّضات 4L/min + 1 منظّم للدوش + 1 إيكو-ساك 3L + كيس قيس التدفّق بلاش',
        features: ['توفير حتى 60% في الماء', 'توفير +25% في غاز الستاغ', 'ضمان 3 سنين والإيكو-ساك مضمون مدى الحياة', 'كيس قياس تدفّق المياه مجانًا'],
      },
      'pack-maison-4l': {
        name: 'باك الدار / الفيلا 4L',
        badge: 'دار كبيرة',
        desc: 'تجهيز كامل للفيلا : 4 مخفّضات 4L/min + 2 منظّمات للدوش والتواليت + 2 إيكو-ساك 3L + كيس قيس التدفّق',
        features: ['مثالي من 4 لـ 8 أشخاص', 'زوز بيوت بانو', 'توفير في العام أكثر من 280 د.ت', 'يتركّب في دقيقتين'],
      },
    },
    faqBadge: 'أسئلة متكرّرة',
    faqTitle: 'كل شي لازمك تعرفو على توفير الماء',
    faqs: [
      {
        q: 'علاش ضغط الصوناد يطيّر الفاتورة في تونس؟',
        a: 'في أوروبا الضغط مظبوط على 3 بار (12 لتر في الدقيقة في الروبيني). أما في تونس، ضغط الصوناد موش مظبوط ويتبدّل من حومة لحومة. في أكثر من 80% من الديار، هذا يعطي صبيب زايد يوصل لـ 20 ولا 24 لتر في الدقيقة! تستهلك وتخلّص الضعف وإنت ما تعرفش.'
      },
      {
        q: 'نخسرو الراحة ولا الضغط تحت الدوش؟',
        a: 'لا أبدًا! الموفّرات متاعنا فيها نظام تهوئة مسجّل تحت ماركة HOSTAFORM / DELRIN. الماء يتخلط بالهواء تحت الضغط، ويعطيك جت قوي وواسع ومريّح، وتستهلك 60% ماء أقل.'
      },
      {
        q: 'شنوّة التأثير على فاتورة غاز الستاغ؟',
        a: 'الماء السخون الكل اللي تستعملو في الدوش ولا في الروبيني لازمو يتسخّن بالشوديار ولا بالشوفو متاع الغاز. كي تقسم الماء السخون على زوز، تنقّص أوتوماتيكيًا من 25% لـ 40% من الغاز اللي يلزم باش يسخّنو!'
      },
      {
        q: 'التركيب يلزمو بلومبي ولا عدّة؟',
        a: 'لا، ما يلزمك حتى عدّة ولا خبرة في البلومبري. التركيب ياخو أقل من دقيقتين: تفكّ الراس القديم بيدك وتسكّر في بلاصتو المنظّم متاع EcoPower.'
      },
      {
        q: 'كيفاش يخدم الضمان والخلاص؟',
        a: 'الأجهزة متاعنا الكل عندها ضمان 3 سنين (والإيكو-ساك متاع التواليت مضمون مدى الحياة). نوصلو لكامل تونس في 24 لـ 48 ساعة، والخلاص كاش عند الاستلام. وعندك 14 يوم «راضي ولا نرجعولك فلوسك».'
      }
    ],
    finalBadge: 'توصيل في 24-48 ساعة لكامل تونس',
    finalTitle: 'ابدا وفّر في الماء من اليوم',
    finalText: 'التحق بأكثر من 2000 دار و100 مؤسسة مجهّزة. فواتير الصوناد والستاغ تنقص من أول نهار تركّب فيه.',
    finalOrder: 'اطلب الباك متاعي أونلاين',
    finalPro: 'فضاء المحترفين والديفي',
    finalTrust: ['✅ ضمان 3 سنين', '✅ راضي ولا نرجعولك فلوسك في 14 يوم', '✅ الخلاص عند الاستلام'],
  },
};

export const HomePage = ({ setCurrentTab }) => {
    const { addToCart, language, setIsCartOpen } = useCart();
  const [openFaq, setOpenFaq] = useState(null);
  const t = TXT[language] || TXT.fr;

  // Produits cochés « Afficher sur la page d'accueil » dans l'admin.
  // La liste ci-dessous ne sert qu'en attendant la réponse du serveur.
  const [featuredPacks, setFeaturedPacks] = useState(() => [
    {
      id: 'pack-appartement-4l',
      name: 'Pack Appartement 4L',
      price: 78.0,
      oldPrice: 99.0,
      image: '/products/pack_appartement_4l.webp',
    },
    {
      id: 'pack-maison-4l',
      name: 'Pack Maison / Villa 4L',
      price: 129.0,
      oldPrice: 159.0,
      image: '/products/pack_maison_4l.webp',
    }
  ]);

  // Cartes en haut à droite : les produits cochés « Produit vedette » dans l'admin (2 maximum).
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((list) => {
        if (!Array.isArray(list)) return;
        setFeaturedPacks(list.filter((p) => p.showOnHome));
        setHeroes(list.filter((p) => p.isHero).slice(0, 2));
      })
      .catch(() => {});
  }, []);

  // Données d'une carte vedette : textes rédigés pour le Pack Appartement 4L, sinon ceux de la fiche produit.
  const buildHeroCard = (hero) => (hero && hero.id !== 'pack-appartement-4l'
    ? {
        id: hero.id,
        name: hero.name,
        title: (language === 'ar' && hero.nameAr) || hero.name,
        sub: hero.description || '',
        image: hero.image,
        isPack: hero.category === 'packs',
        price: hero.price,
        oldPrice: hero.oldPrice,
        offer: hero.oldPrice > hero.price ? t.cardOfferPct(Math.round((1 - hero.price / hero.oldPrice) * 100)) : null,
      }
    : {
        id: 'pack-appartement-4l',
        name: hero?.name || 'Pack Appartement 4 Litres',
        title: t.cardTitle,
        sub: t.cardSub,
        image: hero?.image || '/products/pack_appartement_4l.webp',
        isPack: true,
        price: hero?.price ?? 78.0,
        oldPrice: hero ? hero.oldPrice : 99.0,
        offer: !hero || hero.oldPrice > hero.price
          ? t.cardOfferPct(Math.round((1 - (hero?.price ?? 78) / (hero?.oldPrice ?? 99)) * 100))
          : null,
      });

  // Aucun produit vedette coché : on garde la carte du Pack Appartement par défaut.
  const heroCards = (heroes.length ? heroes : [null]).map(buildHeroCard);
  const twoHeroes = heroCards.length > 1;

    const fromPrice = Math.min(...heroCards.map((c) => c.price));
// Produit de départ : le moins cher des produits vedettes (le Pack de Base)
  const starter = heroCards.reduce((min, c) => (c.price < min.price ? c : min), heroCards[0]);

  // Une entrée par étape : image(s) et action du bouton
  const journeyMeta = [
    {
      images: [{ src: starter.image }],
      onClick: () => {
        addToCart({ id: starter.id, name: starter.name, price: starter.price, image: starter.image });
        setIsCartOpen(true);
      },
    },
         {
      images: [
        { src: '/products/cartouche_hydro_verte_paire.jpg', caption: `${t.journeyTap} 4 L/min`, pos: '50% 44%' },
        { src: '/products/cartouche_hydro_verte.jpg', caption: `${t.journeyTap} 5 L/min`, pos: '50% 62%' },
        { src: '/products/bague_mousseur_grille_bleue.jpg', caption: `${t.journeyShower} 5 L/min`, pos: '50% 72%' },
        { src: '/products/bague_mousseur_complet.jpg', caption: `${t.journeyShower} 7 L/min`, pos: '50% 94%' },
      ],
      onClick: () => setCurrentTab('shop'),
    },
    {
      images: [{ src: '/products/ecosac_wc_3l.jpg', caption: t.journeyWcNote }],
      onClick: () => setCurrentTab('shop'),
    },
  ];
const renderHeroCard = (heroCard) => (
  <div
    key={heroCard.id}
    className="relative w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col"
  >
    {heroCard.offer && (
      <div className="absolute top-4 end-4 bg-energy-500 text-white text-xs font-black uppercase px-3 py-1.5 rounded-full shadow-xs">
        {heroCard.offer}
      </div>
    )}

    {/* En-tête : texte à gauche, logo "14 jours satisfait ou remboursé" à droite */}
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-2 pe-20 sm:pe-0">
          {t.cardKicker}
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          {heroCard.title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
          {heroCard.sub}
        </p>
      </div>

      <img
        src="/garantie-14-jours.webp"
        alt="Garantie satisfait ou remboursé 14 jours"
        width="112"
        height="106"
        className="w-20 sm:w-28 h-auto shrink-0 mt-7 drop-shadow-sm"
      />
    </div>

    <div className="my-6 p-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
      <img
        src={heroCard.image}
        alt={heroCard.title}
        className="w-full h-80 sm:h-[28rem] object-contain drop-shadow-md hover:scale-[1.03] transition-transform"
      />
    </div>

    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 mt-auto">
      <div>
        {heroCard.oldPrice > heroCard.price && (
          <span className="text-sm text-slate-400 line-through me-2">
            {heroCard.oldPrice.toFixed(3)} {t.cur}
          </span>
        )}
        <span className="text-4xl font-black text-brand-900 whitespace-nowrap">
          {heroCard.price.toFixed(3)} {t.cur}
        </span>
        <span className="text-sm text-slate-500 ms-1">{t.ttc}</span>
      </div>
      {heroCard.isPack && (
        <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md">
          {t.giftMeter}
        </span>
      )}
    </div>

    <button
      onClick={() =>
        addToCart({
          id: heroCard.id,
          name: heroCard.name,
          price: heroCard.price,
          image: heroCard.image,
        })
      }
      className="w-full bg-brand-700 hover:bg-brand-800 text-white font-black py-4 px-4 text-base rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-700/20 transition-all hover:scale-[1.02]"
    >
      <ShoppingBag className="w-5 h-5" />
      <span>{t.addToCart(heroCard.price.toFixed(3))}</span>
    </button>

    <p className="text-center text-xs text-slate-600 mt-4 flex items-center justify-center gap-1.5">
      <CheckCircle2 className="w-4 h-4 text-blue-600" />
      {t.cardFooter}
    </p>
  </div>
);


  // Clip diagram zones (from Pascal's email RETOUCHES CLIP)
  const clipZones = [
    {
    waterSaved: '+60%',
    gasSaved: '+25%',
    imgs: [
      { src: '/products/cartouche_hydro_verte_paire.jpg', flow: '4 L/min' },
      { src: '/products/cartouche_hydro_verte.jpg', flow: '5 L/min' },
    ],
  },
  {
    waterSaved: '+60%',
    gasSaved: '+25%',
    imgs: [
      { src: '/products/cartouche_hydro_verte_paire.jpg', flow: '4 L/min' },
      { src: '/products/cartouche_hydro_verte.jpg', flow: '5 L/min' }
      
    ],
  },
    {
    waterSaved: '+60%',
    gasSaved: '+25%',
    imgs: [
       {src: '/products/bague_mousseur_grille_bleue.jpg', flow: '5 L/min' },
      { src: '/products/bague_mousseur_complet.jpg', flow: '7 L/min' },
      
    ],
  },
    { waterSaved: '-30%', gasSaved: null, img: '/products/ecosac_wc_3l.jpg' },
  ].map((z, idx) => ({ ...z, ...t.clipZones[idx], gasSaved: z.gasSaved ?? t.gasNA }));

  return (
    <div className="space-y-16 sm:space-y-24">
    <SEO
  title={language === 'ar'
    ? 'إيكوباور تونس | موفّرات الماء والطاقة'
    : "EcoPower Tunisie | Dispositifs hydro-économes et économie d'eau"}
  description={language === 'ar'
    ? 'نقّص في فاتورة الصوناد والستاغ مع موفّرات الماء. توصيل لكامل تونس والخلاص عند الاستلام.'
    : "Réduisez vos factures d'eau SONEDE et de gaz avec les dispositifs hydro-économes EcoPower. Packs particuliers et pros, livraison partout en Tunisie."}
  path="/"
/>


      {/* 1. HERO SECTION */}
  <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-skywater-700 text-white pt-10 pb-28 sm:pt-16 sm:pb-36">

        {/* Décor : halos lumineux et gouttes qui flottent (purement décoratif) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -start-24 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute top-1/3 -end-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />
          <Droplets className="float-slow absolute top-16 start-[8%] w-10 h-10 text-sky-300/40" />
          <Droplets className="float-slower absolute top-40 end-[10%] w-14 h-14 text-sky-200/30" />
          <Droplets className="float-slow absolute bottom-40 start-[14%] w-8 h-8 text-sky-200/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

          {/* Texte */}
          <div className="order-1 max-w-3xl mx-auto space-y-6 text-center">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sky-100 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] font-serif text-white">
              {t.heroTitle[0]}
              <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">{t.heroTitle[1]}</span>
              {t.heroTitle[2]}
              <span className="inline-block bg-orange-500 text-white px-3 rounded-xl -rotate-2 shadow-lg shadow-orange-900/30">{t.heroTitle[3]}</span>
            </h1>

            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed max-w-2xl mx-auto">
              {t.heroText}
            </p>

            {/* Pastille de prix */}
            <div className="inline-flex items-baseline gap-2 bg-white text-brand-900 rounded-2xl px-5 py-2 shadow-lg">
              <span className="text-xs font-bold text-slate-500">{t.fromPrice}</span>
              <span className="text-3xl font-black" dir="ltr">{fromPrice.toFixed(3)}</span>
              <span className="text-sm font-bold">{t.cur}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setCurrentTab('shop')}
                className="cta-glow w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-500 text-white font-extrabold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-orange-900/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t.ctaOrder}</span>
              </button>

              <button
                onClick={() => setCurrentTab('calculator')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 font-bold px-7 py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-all"
              >
                <span>{t.ctaSimulate}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* Garanties rapides */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-sky-100">
              {t.heroChips.map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  {chip}
                </span>
              ))}
            </div>

            {/* Chiffres clés */}
            <div className="pt-5 grid grid-cols-3 gap-2 border-t border-white/15 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">+60%</div>
                <div className="text-[11px] sm:text-xs text-sky-200 font-semibold">{t.trustWater}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300">+25%</div>
                <div className="text-[11px] sm:text-xs text-sky-200 font-semibold">{t.trustGas}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-300">{t.trustYears}</div>
                <div className="text-[11px] sm:text-xs text-sky-200 font-semibold">{t.trustWarranty}</div>
              </div>
            </div>

          </div>

          {/* Cartes vedettes (inchangées) */}
          <div className="order-2">
            <div
              className={
                twoHeroes
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'
                  : 'max-w-xl mx-auto'
              }
            >
              {heroCards.map((heroCard) => renderHeroCard(heroCard))}
            </div>
          </div>

        </div>

        {/* Vague de transition vers le reste de la page (même couleur que le fond du site) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-12 sm:h-20 text-slate-50"
          fill="currentColor"
        >
          <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,70 1440,20 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* 2. SCHÉMA CLIP & ZONES D'INSTALLATION (Demandé par Pascal Fabre) */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skywater-100 text-skywater-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4 text-skywater-600" />
            <span>{t.journeyBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            {t.journeyTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t.journeyText}
          </p>
        </div>

        <div className="relative">
          {/* Ligne pointillée qui relie les étapes (grand écran) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-5 inset-x-[17%] border-t-2 border-dashed border-brand-300"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {t.journeySteps.map((step, idx) => {
              const meta = journeyMeta[idx];
              const first = idx === 0;
              return (
                <div
                  key={idx}
                  className={`relative mt-5 bg-white rounded-3xl p-6 pt-10 border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col ${
                    first ? 'border-orange-400 ring-2 ring-orange-200' : 'border-slate-200/80'
                  }`}
                >
                  {/* Numéro de l'étape */}
                  <div className="absolute -top-5 start-6 z-10 w-10 h-10 rounded-full bg-brand-700 text-white font-black flex items-center justify-center ring-4 ring-slate-50">
                    {idx + 1}
                  </div>

                  {first && (
                    <span className="absolute -top-3 end-5 bg-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow">
                      {step.tag}
                    </span>
                  )}

                  {/* Images */}
{/* Zone image : même hauteur sur les 3 cartes pour tout aligner */}
<div className="h-72 sm:h-80 bg-slate-50 rounded-2xl border border-slate-100 p-3 overflow-hidden">
  {meta.images.length > 2 ? (
    /* Carte 2 : grille 2x2 qui remplit exactement la zone */
    <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
      {meta.images.map((img) => (
        <div key={img.src} className="flex flex-col min-h-0">
          <div className="flex-1 min-h-0 overflow-hidden rounded-xl bg-white border border-slate-200">
            <img
              src={img.src}
              alt={`${step.title} - ${img.caption}`}
              loading="lazy"
              className="w-full h-full object-cover scale-125"
              style={{ objectPosition: img.pos, filter: 'brightness(1.1) contrast(1.05)' }}
            />
          </div>
          <span className="mt-1.5 text-[11px] font-bold text-slate-700 text-center leading-tight">
            {img.caption}
          </span>
        </div>
      ))}
    </div>
  ) : (
    /* Cartes 1 et 3 : une grande image centrée, légende dessous */
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <img
        src={meta.images[0].src}
        alt={meta.images[0].caption ? `${step.title} - ${meta.images[0].caption}` : step.title}
        loading="lazy"
        className="flex-1 min-h-0 w-full object-contain rounded-xl"
      />
      {meta.images[0].caption && (
        <span className="text-sm font-bold text-slate-700 text-center leading-snug">
          {meta.images[0].caption}
        </span>
      )}
    </div>
  )}
</div>

                 <h3 className="mt-5 text-xl font-extrabold text-slate-900 font-serif">{step.title}</h3>
<p className="text-sm text-slate-600 leading-relaxed mt-2 min-h-[4.5rem]">{step.desc}</p>

                  {first && (
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-500">{t.fromPrice}</span>
                      <span className="text-2xl font-black text-brand-900" dir="ltr">{starter.price.toFixed(3)}</span>
                      <span className="text-sm font-bold text-slate-600">{t.cur}</span>
                    </div>
                  )}

                  {/* Économies */}
                  <div className={`mt-auto pt-5 grid gap-2 text-center text-xs ${step.stats.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {step.stats.map(([value, label], sIdx) => (
                      <div
                        key={label}
                        className={`${sIdx === 0 ? 'bg-skywater-50 text-skywater-800' : 'bg-amber-50 text-amber-900'} p-2 rounded-xl`}
                      >
                        <div className="font-black text-sm">{value}</div>
                        <div className="text-[10px] font-semibold text-slate-500">{label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={meta.onClick}
                    className={`mt-4 w-full font-extrabold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all ${
                      first
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-500 text-white shadow-md shadow-orange-500/25 hover:scale-[1.02]'
                        : 'border-2 border-brand-200 text-brand-700 hover:bg-brand-50'
                    }`}
                  >
                    {first && <ShoppingBag className="w-4 h-4" />}
                    <span>{step.cta}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alternative : tout équiper d'un coup */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <span className="text-sm font-semibold text-slate-700">{t.journeyAll}</span>
          <button
            onClick={() => setCurrentTab('particuliers')}
            className="text-sm font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 group"
          >
            <span>{t.journeyAllCta}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 3. SIMULATEUR D'ÉCONOMIES INTERACTIF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator onSelectPack={(packId) => {
          if (packId === 'pack-appartement-4l') {
            addToCart({
              id: 'pack-appartement-4l',
              name: 'Pack Appartement 4 Litres',
              price: 78.0,
              image: '/products/pack_appartement_4l.webp'
            });
          } else {
            addToCart({
              id: 'pack-maison-4l',
              name: 'Pack Maison / Villa 4 Litres',
              price: 129.0,
              image: '/products/pack_maison_4l.webp'
            });
          }
        }} />
      </section>

      {/* 4. PACKS VEDETTES DU SITE (choisis dans l'admin) */}
      {featuredPacks.length > 0 && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
              {t.packsKicker}
            </div>
            <h2 className="text-3xl font-black text-slate-900 font-serif">
              {t.packsTitle}
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('shop')}
            className="text-xs font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 group"
          >
            <span>{t.seeShop}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPacks.map((pack) => {
            const tp = t.packs[pack.id] || {
              name: (language === 'ar' && pack.nameAr) || pack.name,
              badge: t.homeBadge,
              desc: pack.description || '',
              features: (pack.features || []).slice(0, 4),
            };
            return (
            <div
              key={pack.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold rounded-full">
                    {tp.badge}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-xs font-black text-slate-800" dir="ltr">4.9 / 5</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
                  <div className="sm:col-span-5 h-44 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                    <img
                      src={pack.image}
                      alt={tp.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="sm:col-span-7">
                    <h3 className="text-xl font-black text-slate-900 font-serif">{tp.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tp.desc}</p>
                    <div className="mt-3">
                      {pack.oldPrice ? (
                        <span className="text-xs text-slate-400 line-through me-2">{pack.oldPrice.toFixed(3)} {t.cur}</span>
                      ) : null}
                      <span className="text-2xl font-black text-brand-800">{pack.price.toFixed(3)} {t.cur}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-700">
                  {tp.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addToCart({
                  id: pack.id,
                  name: pack.name,
                  price: pack.price,
                  image: pack.image
                })}
                className="w-full bg-gradient-to-r from-energy-500 to-energy-600 hover:from-energy-600 hover:to-energy-500 text-white font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-energy-500/25 transition-all hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart(pack.price.toFixed(3))}</span>
              </button>
            </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 5. CARROUSEL DES RÉFÉRENCES (Hotels, Cliniques, etc.) */}
      <ReferencesCarousel />

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-brand-600" />
            <span>{t.faqBadge}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
            {t.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {t.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-start p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-brand-700 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-skywater-700 text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-bold uppercase tracking-wider border border-white/20">
              {t.finalBadge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
              {t.finalTitle}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base">
              {t.finalText}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentTab('shop')}
                className="w-full sm:w-auto bg-gradient-to-r from-energy-500 to-energy-600 hover:from-energy-600 hover:to-energy-500 text-white font-extrabold px-8 py-4 rounded-2xl text-base shadow-xl transition-all hover:scale-105"
              >
                {t.finalOrder}
              </button>
              <button
                onClick={() => setCurrentTab('professionnels')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-7 py-4 rounded-2xl text-base transition"
              >
                {t.finalPro}
              </button>
            </div>
            <div className="pt-4 text-xs text-slate-300 flex flex-wrap items-center justify-center gap-3">
              <span>{t.finalTrust[0]}</span>
              <span>•</span>
              <span>{t.finalTrust[1]}</span>
              <span>•</span>
              <span>{t.finalTrust[2]}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
