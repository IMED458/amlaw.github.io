import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ExternalLink,
  Facebook,
  FileText,
  Gavel,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  Shield,
  X,
} from 'lucide-react';

const LAW_LOGO_SRC = './law.png';
const THEMIS_STATUE_TRANSPARENT = './themis-transparent.png';
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
};

const NAV_ITEMS = [
  { label: 'მთავარი', href: '#home' },
  { label: 'ჩვენ შესახებ', href: '#about' },
  { label: 'სერვისები', href: '#services' },
  { label: 'ბლოგი', href: '#blog' },
  { label: 'გუნდი', href: '#team' },
  { label: 'კონტაქტი', href: '#contact' },
];

type ServiceItem = {
  title: string;
  desc: string;
  details: string;
  icon: React.ReactNode;
};

type BlogArticle = {
  tag: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  details: string[];
  externalUrl: string;
  externalLabel: string;
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
  fallback?: string;
  bio: string;
  email?: string;
  facebookUrl?: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: 'სამოქალაქო სამართალი',
    desc: 'სახელშეკრულებო, სანივთო და საოჯახო დავების კომპლექსური მართვა.',
    details:
      'წარმოვადგენთ კლიენტებს მოლაპარაკების, მედიაციისა და სასამართლო წარმოების ყველა ეტაპზე. ყურადღება გამახვილებულია რისკის შემცირებასა და შედეგზე ორიენტირებულ სტრატეგიაზე.',
    icon: <Briefcase className="h-6 w-6 md:h-8 md:w-8" />,
  },
  {
    title: 'ბიზნეს სამართალი',
    desc: 'კორპორაციული სტრუქტურირება, M&A და ბიზნესის სრული სამართლებრივი მხარდაჭერა.',
    details:
      'ვქმნით იურიდიულ ჩარჩოს, რომელიც იცავს კომპანიის ყოველდღიურ ოპერაციებს, ინვესტორებთან ურთიერთობასა და გრძელვადიან ზრდას.',
    icon: <Scale className="h-6 w-6 md:h-8 md:w-8" />,
  },
  {
    title: 'ადმინისტრაციული',
    desc: 'სახელმწიფო ორგანოებთან დავები, ლიცენზიები, ნებართვები და წარმოება.',
    details:
      'ვახდენთ ადმინისტრაციული აქტების შეფასებას, საჩივრების მომზადებას და სასამართლო წესით ინტერესების სრულ დაცვას.',
    icon: <Shield className="h-6 w-6 md:h-8 md:w-8" />,
  },
  {
    title: 'სისხლის სამართალი',
    desc: 'თეთრსაყელოიანი დანაშაულები და მაღალი პროფილის სისხლისსამართლებრივი დაცვა.',
    details:
      'ვმუშაობთ სენსიტიურ საქმეებზე განსაკუთრებული კონფიდენციალურობით, მტკიცებულებების სტრატეგიული ანალიზითა და აქტიური დაცვით.',
    icon: <Gavel className="h-6 w-6 md:h-8 md:w-8" />,
  },
  {
    title: 'ინტელექტუალური საკუთრება',
    desc: 'საავტორო უფლებების, სასაქონლო ნიშნებისა და პატენტების რეგისტრაცია/დაცვა.',
    details:
      'ვიცავთ ბრენდს, კონტენტს და ტექნოლოგიურ აქტივებს როგორც რეგისტრაციის, ისე დავის მართვის ეტაპებზე.',
    icon: <FileText className="h-6 w-6 md:h-8 md:w-8" />,
  },
  {
    title: 'უძრავი ქონება და სივრცის დაგეგმარება',
    desc: 'უძრავი ქონების პროექტების განვითარება და ინვესტიციების დაცვა.',
    details:
      'ვაკონტროლებთ პროექტის სამართლებრივ სისუფთავეს, ნებართვებს, ხელშეკრულებებსა და საინვესტიციო სტრუქტურებს.',
    icon: <Globe className="h-6 w-6 md:h-8 md:w-8" />,
  },
];

const BLOG_ARTICLES: BlogArticle[] = [
  {
    tag: 'სტატია',
    title: 'ახალი საკანონმდებლო ცვლილებების გავლენა ბიზნეს სექტორზე',
    date: '12 მარტი, 2026',
    image: 'https://images.unsplash.com/photo-1505664177941-c66c68c8114b?auto=format&fit=crop&q=80&w=1200',
    excerpt:
      'ვაზუსტებთ, როგორ ცვლის ახალი საკანონმდებლო ჩარჩო კომპანიების შიდა პოლიტიკას, კონტრაქტებსა და რისკების მართვას.',
    details: [
      'ბოლო საკანონმდებლო ცვლილებები განსაკუთრებით აისახება ხელშეკრულებების სტრუქტურასა და კომპანიის შიდა კომპლაიენსის სტანდარტებზე.',
      'ბიზნესისთვის მნიშვნელოვანია არა მხოლოდ ახალი რეგულაციების ცოდნა, არამედ მათი დროული ინტეგრირება ყოველდღიურ ოპერაციებში, რათა შემცირდეს ფინანსური და რეპუტაციული რისკი.',
      'AM Law Office ამ პროცესში მუშაობს როგორც შეფასების, ისე პრაქტიკული დანერგვის ნაწილზე: კონტრაქტების რევიზია, პროცედურების გამართვა და დავების პრევენცია.',
    ],
    externalUrl: 'https://matsne.gov.ge/',
    externalLabel: 'საკანონმდებლო წყაროზე გადასვლა',
  },
  {
    tag: 'ვიდეო',
    title: 'გიორგი ასლამაზიშვილის კომენტარი რეზონანსულ საქმეზე',
    date: '08 მარტი, 2026',
    image: 'https://images.unsplash.com/photo-1605664041952-4a2855d9363b?auto=format&fit=crop&q=80&w=1200',
    excerpt:
      'საჯარო კომენტარში განხილულია საქმის სამართლებრივი ჩარჩო, დაცვის ტაქტიკა და პრაქტიკული გავლენა ფართო საზოგადოებაზე.',
    details: [
      'ვიდეო კომენტარში ყურადღება გამახვილებულია საქმის სამართლებრივ საფუძვლებზე და იმ სტრატეგიულ ნაბიჯებზე, რომლებიც მნიშვნელოვანია საზოგადოებრივი ინტერესის მქონე დავებში.',
      'ასეთი კომუნიკაცია განსაკუთრებით მნიშვნელოვანია მაშინ, როდესაც საჭიროა სამართლებრივი სიზუსტის შენარჩუნება საჯარო სივრცეშიც.',
      'მასალაში ცხადად ჩანს, თუ როგორ ერთიანდება პროფესიული ანალიზი, პრაქტიკული გამოცდილება და კლიენტის ინტერესების დაცვა.',
    ],
    externalUrl: 'https://www.facebook.com/',
    externalLabel: 'Facebook ვიდეოზე გადასვლა',
  },
  {
    tag: 'სტატია',
    title: 'კონტრაქტების მართვის სამი შეცდომა, რომელიც კომპანიებს ყველაზე ძვირი უჯდებათ',
    date: '03 მარტი, 2026',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    excerpt:
      'შევაგროვეთ ის პრაქტიკული შეცდომები, რომლებიც ყველაზე ხშირად იწვევს დავას, ვალდებულებების დარღვევას და ზარალს.',
    details: [
      'ერთ-ერთი ყველაზე გავრცელებული პრობლემა არის ბუნდოვანი ვალდებულებები და პასუხისმგებლობის მექანიზმების არარსებობა.',
      'მეორე რისკია კონტრაქტის შაბლონების ბრმად გამოყენება რეალური ბიზნეს პროცესების მიხედვით მორგების გარეშე.',
      'მესამე და კრიტიკული საკითხია დავის გადაწყვეტის მექანიზმის დაუზუსტებლობა, რაც პროცესს აძვირებს და ართულებს.',
    ],
    externalUrl: 'https://www.facebook.com/',
    externalLabel: 'დამატებით პოსტზე გადასვლა',
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'გიორგი ასლამაზიშვილი',
    role: 'მმართველი პარტნიორი',
    image: './aslamazishvili.png',
    fallback: './giorgi-aslamazishvili.jpg',
    bio: 'სამართლის ექსპერტი, საჯარო სამართლებრივი ანალიტიკოსი და სასამართლო სტრატეგიის პრაქტიკოსი.',
    email: 'info@amlaw.ge',
    facebookUrl: SOCIAL_LINKS.facebook,
  },
  {
    name: 'მეზურნიშვილი',
    role: 'პარტნიორი',
    image: 'https://picsum.photos/seed/lawyer-mezurnishvili/600/800',
    bio: 'სამოქალაქო და ბიზნეს სამართლის სპეციალისტი, რომელიც ყურადღებას ამახვილებს შედეგზე და რისკის მართვაზე.',
    email: 'info@amlaw.ge',
    facebookUrl: SOCIAL_LINKS.facebook,
  },
  {
    name: 'თამარ ბერიძე',
    role: 'უფროსი იურისტი',
    image: 'https://picsum.photos/seed/lawyer-tamar/600/800',
    bio: 'ადმინისტრაციული დავების ექსპერტი, რომელიც კლიენტს სრულ პროცესში უჭერს მხარს.',
    email: 'info@amlaw.ge',
    facebookUrl: SOCIAL_LINKS.facebook,
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-700 ${
        isScrolled ? 'border-b border-brand-dark/5 py-4 glass' : 'bg-transparent py-5 md:py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="group flex items-center gap-3 sm:gap-4">
          <img
            src={LAW_LOGO_SRC}
            alt="AM Law"
            className="h-11 w-11 rounded-2xl object-cover shadow-lg transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12"
          />
          <div className="flex min-w-0 flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-brand-dark sm:text-xl">
              AM LAW OFFICE
            </span>
            <span className="text-[7px] font-bold uppercase tracking-[0.34em] text-brand-gold sm:text-[8px]">
              ასლამაზიშვილი • მეზურნიშვილი
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-dark/70 transition-colors hover:text-brand-gold xl:text-xs"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-brand-dark px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-xl shadow-brand-dark/10 transition-all duration-500 hover:bg-brand-gold"
          >
            კონსულტაცია
          </a>
        </div>

        <button
          type="button"
          className="rounded-full p-3 text-brand-dark glass lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute left-0 top-full mt-2 w-full border-t border-brand-dark/5 p-5 shadow-2xl md:hidden glass"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 font-serif text-lg text-brand-dark transition-colors hover:bg-brand-dark/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 rounded-2xl bg-brand-dark px-4 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-white"
              >
                კონსულტაცია
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroAndAboutScrollScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.34], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.34], ['0vh', '-8vh']);

  const aboutOpacity = useTransform(smoothProgress, [0.34, 0.56], [0, 1]);
  const aboutY = useTransform(smoothProgress, [0.34, 0.56], ['10vh', '0vh']);

  const orbTopY = useTransform(smoothProgress, [0, 1], [0, 240]);
  const orbBottomY = useTransform(smoothProgress, [0, 1], [0, -180]);
  const statueScaleDesktop = useTransform(smoothProgress, [0, 0.6], [1.02, 0.92]);
  const statueYDesktop = useTransform(smoothProgress, [0, 0.6], ['-2vh', '2vh']);
  const statueScaleMobile = useTransform(smoothProgress, [0, 0.6], [0.96, 0.88]);
  const statueYMobile = useTransform(smoothProgress, [0, 0.6], ['12vh', '6vh']);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div id="home" ref={containerRef} className="relative h-[250vh] overflow-x-clip bg-brand-pearl">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ y: orbTopY }}
            className="absolute left-[4%] top-[8%] z-0 h-[28rem] w-[28rem] rounded-full bg-brand-gold/10 blur-[130px] md:h-[36rem] md:w-[36rem]"
          />
          <motion.div
            style={{ y: orbBottomY }}
            className="absolute bottom-[-12%] right-[-10%] z-0 h-[24rem] w-[24rem] rounded-full bg-brand-accent/40 blur-[120px] md:h-[32rem] md:w-[32rem]"
          />
        </div>

        <motion.div className="absolute inset-0 z-30" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="mx-auto grid h-screen w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-20 sm:px-6 md:pt-24 lg:grid-cols-2 lg:gap-20 lg:pt-28">
            <div className="pointer-events-auto z-20 max-w-[52rem] pt-8 lg:pt-0">
              <div className="mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-brand-gold/25 bg-white/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.34em] text-brand-gold shadow-[0_12px_30px_rgba(195,163,112,0.08)] backdrop-blur-sm sm:px-6 sm:py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                <span className="truncate">LEX LOQUITUR PRO NOBIS</span>
              </div>

              <div className="max-w-[15ch]">
                <h1 className="font-serif text-[clamp(3.3rem,11vw,8.2rem)] font-bold leading-[0.92] tracking-[-0.05em] text-brand-gold">
                  კანონი ჩვენი
                </h1>
                <p className="font-serif text-[clamp(3.1rem,10.4vw,7.5rem)] italic leading-[0.9] tracking-[-0.05em] text-brand-dark">
                  სახელით
                </p>
                <p className="font-serif text-[clamp(3.2rem,10.8vw,7.9rem)] font-bold leading-[0.92] tracking-[-0.05em] text-brand-gold">
                  ლაპარაკობს
                </p>
              </div>

              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-brand-dark/55 sm:text-xl md:mt-10">
                პროფესიონალური სამართლებრივი წარმომადგენლობა, რომელიც ეფუძნება სტრატეგიულ ხედვასა
                და უშეღავათო სიზუსტეს.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-12">
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-4 rounded-full bg-brand-dark px-8 py-5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_24px_60px_rgba(15,23,42,0.15)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-gold sm:w-auto sm:px-10"
                >
                  კონსულტაცია
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+995595244994"
                  className="inline-flex w-full items-center justify-center rounded-full border border-brand-dark/10 bg-white/60 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-dark shadow-[0_16px_36px_rgba(15,23,42,0.05)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-gold hover:text-brand-gold sm:w-auto sm:px-10"
                >
                  დაგვიკავშირდით
                </a>
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </motion.div>

        <motion.div
          id="about"
          className="absolute inset-0 z-20 pointer-events-auto"
          style={{ y: aboutY, opacity: aboutOpacity }}
        >
          <div className="mx-auto grid h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-20 sm:px-6 md:pt-24 lg:grid-cols-2 lg:gap-24 lg:pt-28">
            <div className="relative z-30 w-full pt-8 lg:pt-0">
              <div className="mb-6 flex items-center gap-4 lg:mb-8">
                <div className="h-px w-12 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                  ჩვენ შესახებ
                </span>
              </div>
              <h2 className="text-4xl font-bold leading-[1.02] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
                თანამედროვე ხედვა <br />
                <span className="font-normal italic text-brand-gold">სამართლებრივ</span> დაცვაში
              </h2>
              <p className="mb-6 mt-6 border-l-2 border-brand-gold pl-5 text-lg font-light leading-relaxed text-brand-dark/70 sm:text-xl lg:mb-8 lg:mt-8 lg:pl-6 lg:text-2xl">
                AM Law Office არის პრემიუმ კლასის საადვოკატო ოფისი, რომელიც აერთიანებს აკადემიურ
                სიღრმესა და პრაქტიკულ სისხარტეს.
              </p>
              <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-brand-dark/55 lg:mb-12 lg:text-lg">
                ჩვენი გუნდი სპეციალიზებულია რთული სამართლებრივი კვანძების გახსნაში. სტრატეგია
                ეფუძნება კანონის უზენაესობასა და კლიენტის ინტერესების უპირობო დაცვას.
              </p>

              <div className="flex gap-8 border-t border-brand-dark/10 pt-6 lg:gap-10 lg:pt-10">
                <div>
                  <p className="font-serif text-3xl font-bold tracking-tighter text-brand-dark lg:text-4xl">
                    100<span className="text-brand-gold">%</span>
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-dark/40 lg:text-[10px]">
                    ლოიალურობა
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold tracking-tighter text-brand-dark lg:text-4xl">
                    24<span className="text-brand-gold">/</span>7
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-dark/40 lg:text-[10px]">
                    კომუნიკაცია
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden aspect-[4/5] w-full items-end overflow-hidden rounded-[3rem] border border-white/60 bg-white/45 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-xl md:flex">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-surface to-transparent opacity-90" />
              <div className="relative z-10 p-10 opacity-75">
                <p className="mb-3 font-serif text-xl italic text-brand-dark lg:text-2xl">
                  "სამართლის უმაღლესი სტანდარტი თითოეულ დეტალში"
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                  ასლამაზიშვილი • მეზურნიშვილი
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-0 z-40">
          <div className="mx-auto grid h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-20 sm:px-6 md:pt-24 lg:grid-cols-2 lg:gap-24 lg:pt-28">
            <div className="hidden lg:block" />
            <motion.div
              className="flex w-full justify-center lg:justify-end"
              style={{
                scale: isMobile ? statueScaleMobile : statueScaleDesktop,
                y: isMobile ? statueYMobile : statueYDesktop,
              }}
            >
              <img
                src={THEMIS_STATUE_TRANSPARENT}
                alt="Themis Statue"
                className="w-[92%] max-w-[26rem] object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.18)] contrast-125 saturate-110 sm:w-[84%] sm:max-w-[30rem] lg:w-[105%] lg:max-w-[44rem]"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-8 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-10 sm:right-8 lg:bottom-12 lg:right-16">
          <motion.span
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[8px] font-bold uppercase tracking-[0.45em] text-brand-dark/35"
          >
            Scroll
          </motion.span>
          <div className="relative h-14 w-px overflow-hidden rounded-full bg-brand-dark/10 lg:h-16">
            <motion.div
              animate={{ y: ['-100%', '130%'] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-gold via-brand-gold/70 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TrustBar = () => {
  const items = [
    'ნებისმიერი სირთულის საქმეები',
    'პროფესიონალური წარმომადგენლობა',
    'სტრატეგიული დაცვა',
    'საჯარო სამართლებრივი შეფასებები',
    'პრემიუმ კლასის მომსახურება',
    'შეუვალი კონფიდენციალურობა',
  ];

  return (
    <div className="overflow-hidden border-y border-brand-gold bg-brand-dark py-10">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={`${item}-${index}`} className="mx-12 flex items-center gap-12 md:mx-16 md:gap-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/55 md:text-xs">
              {item}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!selectedService) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedService]);

  return (
    <section id="services" className="relative bg-brand-pearl py-28 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-18 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                პრაქტიკის სფეროები
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-[1.03] tracking-tight text-brand-dark sm:text-5xl md:text-7xl">
              სამართლებრივი <br />
              <span className="font-normal italic text-brand-gold">ექსპერტიზა</span>
            </h2>
          </div>
          <p className="max-w-md text-lg font-light leading-relaxed text-brand-dark/55 md:pb-4 md:text-xl">
            სიღრმისეული ცოდნა და სტრატეგიული გადაწყვეტილებები, რომელიც რთულ სამართლებრივ საკითხებს
            შედეგიან პროცესად აქცევს.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <button
              key={service.title}
              type="button"
              onClick={() => setSelectedService(service)}
              className="group relative overflow-hidden rounded-[2rem] border border-brand-dark/5 bg-white p-8 text-left shadow-xl shadow-brand-dark/[0.02] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-gold/10 md:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-gold/5 blur-2xl transition-all duration-700 group-hover:bg-brand-gold/20" />
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl border border-brand-dark/5 bg-brand-pearl text-brand-gold shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 md:mb-10 md:h-20 md:w-20">
                {service.icon}
              </div>
              <h3 className="mb-4 text-2xl font-bold text-brand-dark md:text-3xl">{service.title}</h3>
              <p className="mb-8 text-base font-light leading-relaxed text-brand-dark/60 md:mb-10 md:text-lg">
                {service.desc}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/45 transition-colors group-hover:text-brand-gold md:text-xs">
                ვრცლად <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-dark/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_35px_120px_rgba(0,0,0,0.16)] sm:p-10"
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/10 text-brand-dark/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                aria-label="დახურვა"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-pearl text-brand-gold">
                {selectedService.icon}
              </div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
                პრაქტიკის სფერო
              </p>
              <h3 className="mb-4 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">
                {selectedService.title}
              </h3>
              <p className="mb-6 text-lg font-light leading-relaxed text-brand-dark/65">
                {selectedService.desc}
              </p>
              <p className="text-base font-light leading-relaxed text-brand-dark/60 sm:text-lg">
                {selectedService.details}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-dark px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-brand-gold"
                >
                  კონსულტაცია
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center rounded-full border border-brand-dark/10 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-dark transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  დახურვა
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    if (!selectedArticle) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedArticle]);

  const otherArticles = BLOG_ARTICLES.filter((article) => article.title !== selectedArticle?.title);

  return (
    <section id="blog" className="relative z-20 bg-white py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-18 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                ბლოგი და სიახლეები
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
              <span className="text-brand-gold">სამართლებრივი</span>
              <br />
              <span className="font-normal italic text-brand-dark">ბლოგი</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedArticle(BLOG_ARTICLES[0])}
            className="group inline-flex items-center gap-4 self-start border-b border-brand-dark/10 pb-2 pr-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-dark transition-colors hover:text-brand-gold md:self-auto"
          >
            ყველა სტატია
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-dark/10 transition-all duration-500 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-white">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          {BLOG_ARTICLES.map((article, index) => (
            <motion.button
              key={article.title}
              type="button"
              onClick={() => setSelectedArticle(article)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group text-left ${index === 2 ? 'md:col-span-2 md:max-w-[calc(50%-1.5rem)]' : ''}`}
            >
              <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-brand-dark/5 bg-brand-pearl shadow-2xl shadow-brand-dark/5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-brand-dark/10 to-transparent opacity-55 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute left-5 top-5 rounded-full bg-white/92 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-dark shadow-lg">
                  {article.tag}
                </div>
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/16 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-500 group-hover:bg-brand-dark/75">
                  ვრცლად
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                  {article.date}
                </span>
              </div>
              <h3 className="mb-4 text-3xl font-bold leading-[1.18] text-brand-dark transition-colors group-hover:text-brand-gold md:text-4xl">
                {article.title}
              </h3>
              <p className="text-lg font-light leading-relaxed text-brand-dark/60 md:text-xl">
                {article.excerpt}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white shadow-[0_40px_140px_rgba(0,0,0,0.2)]"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-brand-dark/70 text-white transition-colors hover:bg-brand-gold"
                aria-label="დახურვა"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="relative min-h-[18rem] lg:min-h-full">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mb-4 inline-flex rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-dark">
                      {selectedArticle.tag}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
                      {selectedArticle.date}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <h3 className="mb-5 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">
                    {selectedArticle.title}
                  </h3>
                  <p className="mb-6 text-lg font-light leading-relaxed text-brand-dark/65">
                    {selectedArticle.excerpt}
                  </p>

                  <div className="space-y-4 text-base font-light leading-relaxed text-brand-dark/60 sm:text-lg">
                    {selectedArticle.details.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={selectedArticle.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-dark px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-brand-gold"
                    >
                      {selectedArticle.externalLabel}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(null)}
                      className="inline-flex items-center justify-center rounded-full border border-brand-dark/10 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-dark transition-colors hover:border-brand-gold hover:text-brand-gold"
                    >
                      დახურვა
                    </button>
                  </div>

                  <div className="mt-10 border-t border-brand-dark/10 pt-8">
                    <div className="mb-5 flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-brand-gold" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-gold">
                        სხვა სტატიები
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {otherArticles.map((article) => (
                        <button
                          key={article.title}
                          type="button"
                          onClick={() => setSelectedArticle(article)}
                          className="rounded-2xl border border-brand-dark/8 px-4 py-4 text-left transition-all duration-300 hover:border-brand-gold hover:bg-brand-pearl"
                        >
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                            {article.tag} • {article.date}
                          </p>
                          <p className="text-base font-semibold leading-snug text-brand-dark">
                            {article.title}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Team = () => {
  return (
    <section id="team" className="relative z-30 rounded-t-[4rem] bg-brand-surface py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-brand-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
            ჩვენი გუნდი
          </span>
        </div>
        <h2 className="mb-18 text-center text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl md:mb-24 md:text-7xl">
          პროფესიონალთა <span className="font-normal italic text-brand-gold">გაერთიანება</span>
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group"
            >
              <div className="relative mb-6 aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-[2.5rem] border border-brand-dark/5 bg-white shadow-xl">
                <img
                  src={member.image}
                  onError={(event) => {
                    if (member.fallback) {
                      event.currentTarget.src = member.fallback;
                    }
                  }}
                  alt={member.name}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent p-8 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div>
                    <p className="mb-5 text-sm font-light leading-relaxed">{member.bio}</p>
                    <div className="flex gap-4">
                      <a
                        href={member.email ? `mailto:${member.email}` : 'mailto:info@amlaw.ge'}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-brand-gold"
                        aria-label={`${member.name} email`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href={member.facebookUrl ?? SOCIAL_LINKS.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-brand-gold"
                        aria-label={`${member.name} facebook`}
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 text-center text-2xl font-bold text-brand-dark md:text-3xl">{member.name}</h3>
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const subject = encodeURIComponent('კონსულტაციის მოთხოვნა');
    const body = encodeURIComponent(
      [
        `სახელი: ${name || '-'}`,
        `ტელეფონი: ${phone || '-'}`,
        `ელ-ფოსტა: ${email || '-'}`,
        '',
        'შეტყობინება:',
        message || '-',
      ].join('\n'),
    );

    window.location.href = `mailto:info@amlaw.ge?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t-8 border-brand-gold bg-brand-dark py-24 text-white md:py-40"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[50vw] w-[50vw] rounded-full bg-brand-gold/10 blur-[150px]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:gap-20">
        <div className="w-full pt-4 lg:w-[0.95fr]">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
              კონტაქტი
            </span>
          </div>
          <h2 className="max-w-[12ch] text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
            დაგვიკავშირდით <br />
            <span className="font-normal italic text-brand-gold">კონსულტაციისთვის</span>
          </h2>

          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:gap-10">
            <a href="tel:+995595244994" className="group flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-brand-dark md:h-16 md:w-16">
                <Phone className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  დაგვირეკეთ
                </p>
                <p className="font-serif text-2xl font-bold text-white transition-colors group-hover:text-brand-gold md:text-3xl">
                  595 24 49 94
                </p>
              </div>
            </a>

            <a href="mailto:info@amlaw.ge" className="group flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-brand-dark md:h-16 md:w-16">
                <Mail className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  მოგვწერეთ
                </p>
                <p className="break-words font-serif text-2xl font-bold text-white transition-colors group-hover:text-brand-gold md:text-3xl">
                  info@amlaw.ge
                </p>
              </div>
            </a>

            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 text-brand-gold md:h-16 md:w-16">
                <MapPin className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  მისამართი
                </p>
                <p className="font-serif text-2xl font-bold text-white md:text-3xl">
                  თბილისი, საქართველო
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 w-full rounded-[2rem] border border-white/10 p-7 shadow-[0_40px_100px_rgba(0,0,0,0.5)] glass-dark md:p-12 lg:mt-0 lg:w-[1.05fr]">
          <form className="flex flex-col gap-8 md:gap-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <label className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  თქვენი სახელი
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="შეიყვანეთ სახელი"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-xl font-light text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-gold md:text-2xl"
                />
              </div>
              <div>
                <label className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  საკონტაქტო ნომერი
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="შეიყვანეთ ნომერი"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-xl font-light text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-gold md:text-2xl"
                />
              </div>
            </div>

            <div>
              <label className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                ელ-ფოსტა
              </label>
              <input
                name="email"
                type="email"
                placeholder="შეიყვანეთ ელ-ფოსტა"
                className="w-full border-b border-white/20 bg-transparent py-3 text-xl font-light text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-gold md:text-2xl"
              />
            </div>

            <div>
              <label className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                შეტყობინება
              </label>
              <textarea
                name="message"
                placeholder="დაწერეთ..."
                rows={4}
                className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-xl font-light text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-gold md:text-2xl"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-brand-gold py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark shadow-xl shadow-brand-gold/20 transition-all duration-500 hover:scale-[1.01] hover:bg-white active:scale-[0.99]"
            >
              შეტყობინების გაგზავნა
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-white/5 bg-black pb-12 pt-16 text-white md:pb-16 md:pt-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-4">
            <img src={LAW_LOGO_SRC} alt="AM Law" className="h-12 w-12 rounded-2xl object-cover shadow-lg" />
            <div>
              <span className="block font-serif text-2xl font-bold tracking-tight text-white">
                AM LAW OFFICE
              </span>
              <span className="block text-[8px] font-bold uppercase tracking-[0.34em] text-brand-gold">
                ასლამაზიშვილი • მეზურნიშვილი
              </span>
            </div>
          </div>
          <p className="max-w-lg text-base font-light leading-relaxed text-white/45 md:text-lg">
            ასლამაზიშვილი მეზურნიშვილის საადვოკატო ოფისი. პროფესიონალური სამართლებრივი
            წარმომადგენლობა საქართველოში.
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-brand-gold transition-all duration-500 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-dark"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-brand-gold transition-all duration-500 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-dark"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="my-12 h-px w-full bg-white/10" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)]">
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">ოფისი</p>
          <p className="text-sm font-light leading-relaxed text-white/55 md:text-base">
            სამართლებრივი სტრატეგია, სასამართლო წარმომადგენლობა და კლიენტზე მორგებული პრემიუმ
            მომსახურება.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">ნავიგაცია</p>
          <div className="grid grid-cols-2 gap-y-3 text-sm text-white/60">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">კონტაქტი</p>
          <div className="space-y-3 text-sm text-white/60">
            <a href="tel:+995595244994" className="flex items-center gap-3 transition-colors hover:text-white">
              <Phone className="h-4 w-4 text-brand-gold" />
              595 24 49 94
            </a>
            <a href="mailto:info@amlaw.ge" className="flex items-center gap-3 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-brand-gold" />
              info@amlaw.ge
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-brand-gold" />
              თბილისი, საქართველო
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 md:flex-row md:items-center md:justify-between">
        <p>© 2026 AM LAW OFFICE. ყველა უფლება დაცულია.</p>
        <div className="flex gap-8">
          <a href="#contact" className="transition-colors hover:text-white">
            კონფიდენციალურობა
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            წესები და პირობები
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-brand-pearl selection:bg-brand-gold selection:text-white">
      <Navbar />
      <main>
        <HeroAndAboutScrollScene />
        <TrustBar />
        <Services />
        <Blog />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
