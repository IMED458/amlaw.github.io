import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Scale, 
  Gavel, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Award,
  BookOpen,
  GraduationCap,
  Facebook,
  Shield,
  FileText,
  Globe,
  Instagram
} from 'lucide-react';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

interface BlogArticle {
  tag: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  details: string[];
  externalUrl: string;
  externalLabel: string;
}

// --- Constants ---
const LAW_LOGO_SRC = './law.png';

const NAV_ITEMS: NavItem[] = [
  { label: 'მთავარი', href: '#home' },
  { label: 'ჩვენ შესახებ', href: '#about' },
  { label: 'სერვისები', href: '#services' },
  { label: 'ბლოგი', href: '#blog' },
  { label: 'გუნდი', href: '#team' },
  { label: 'კარიერა', href: '#careers' },
  { label: 'კონტაქტი', href: '#contact' },
];

const BLOG_ARTICLES: BlogArticle[] = [
  {
    tag: "ბლოგი",
    title: "ახალი საკანონმდებლო ცვლილებების გავლენა ბიზნეს სექტორზე",
    date: "12 მარტი, 2026",
    image: "https://picsum.photos/seed/legal-blog/800/600",
    excerpt: "ვაზუსტებთ როგორ ცვლის ახალი საკანონმდებლო ჩარჩო კომპანიების შიდა პოლიტიკას, კონტრაქტებსა და რისკების მართვას.",
    details: [
      "სტატია მიმოიხილავს იმ რეგულაციებს, რომლებიც ყველაზე მეტად ეხება მომსახურების ხელშეკრულებებს, შიდა კომპლაიანსსა და მესამე პირებთან პასუხისმგებლობის განაწილებას.",
      "განსაკუთრებული ყურადღება ეთმობა იმას, თუ რა უნდა შეცვალოს კომპანიამ დოკუმენტბრუნვაში, როგორ უნდა გადაამოწმოს მოქმედი კონტრაქტები და რა რისკები შეიძლება გაჩნდეს ძველი ფორმულირებების დატოვების შემთხვევაში.",
      "ჩვენი რეკომენდაციაა, ცვლილებების ძალაში შესვლამდე გადაიხედოს შიდა წესდებები, მომსახურების პირობები და მონაცემთა დამუშავების პროცედურები, რათა ბიზნესი შეხვდეს ახალ რეალობას სამართლებრივად გამართულ მდგომარეობაში."
    ],
    externalUrl: "https://www.facebook.com/",
    externalLabel: "გახსენით ბმული"
  },
  {
    tag: "სიახლე",
    title: "გიორგი ასლამაზიშვილის კომენტარი რეზონანსულ საქმეზე",
    date: "08 მარტი, 2026",
    image: "https://picsum.photos/seed/media-legal/800/600",
    excerpt: "საჯარო კომენტარში განხილულია საქმის სამართლებრივი ჩარჩო, დაცვის ტაქტიკა და პრაქტიკული გავლენა ფართო საზოგადოებაზე.",
    details: [
      "მასალაში ხაზი ესმება იმას, რომ მედიის ინტერესის მქონე საქმეებში სამართლებრივი სტრატეგია ვერ შემოიფარგლება მხოლოდ სასამართლო დარბაზით და აუცილებელია კომუნიკაციის სწორი მართვაც.",
      "სრული ვერსია აერთიანებს პოზიციას მტკიცებულებათა სტანდარტზე, პროცესუალურ გარანტიებზე და იმაზე, რატომ არის გადამწყვეტი საქმის ადრეული ეტაპიდან სწორი დაცვის ხაზი.",
      "ბმულზე გადასვლისას შეგიძლიათ ნახოთ სრული ვიდეო ან პოსტი იმ პლატფორმაზე, სადაც მასალა გამოქვეყნდა."
    ],
    externalUrl: "https://www.facebook.com/",
    externalLabel: "გახსენით ვიდეო / პოსტი"
  }
];

const PRACTICE_AREAS = [
  {
    title: 'სამოქალაქო სამართალი',
    description: 'დავების გადაწყვეტა, სახელშეკრულებო ურთიერთობები და კერძო ინტერესების დაცვა.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: 'სისხლის სამართალი',
    description: 'კვალიფიციური დაცვა სისხლისსამართლებრივი დევნის ნებისმიერ ეტაპზე.',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: 'ადმინისტრაციული სამართალი',
    description: 'ურთიერთობა სახელმწიფო ორგანოებთან და ადმინისტრაციული დავების წარმოება.',
    icon: <Gavel className="w-6 h-6" />,
  },
  {
    title: 'ბიზნეს და კორპორაციული',
    description: 'ბიზნესის სამართლებრივი მხარდაჭერა, რეგისტრაცია და კორპორაციული მართვა.',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: 'საოჯახო და მემკვიდრეობითი',
    description: 'განქორწინება, ქონების გაყოფა, ალიმენტი და სამკვიდრო საკითხები.',
    icon: <Scale className="w-6 h-6" />,
  },
  {
    title: 'უძრავი ქონება',
    description: 'საკუთრების უფლებასთან დაკავშირებული დავები და ტრანზაქციების თანხლება.',
    icon: <MapPin className="w-6 h-6" />,
  },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-3 sm:py-4 bg-white/90 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.03)]' : 'py-4 sm:py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <img
            src={LAW_LOGO_SRC}
            alt="AM Law Office Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl object-cover shadow-[0_12px_30px_rgba(10,10,10,0.08)] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-bold tracking-tighter text-brand-dark group-hover:text-brand-gold transition-colors duration-500">AM LAW OFFICE</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold hidden sm:block opacity-80">ასლამაზიშვილი • მეზურნიშვილი</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="text-[11px] uppercase tracking-widest font-bold text-brand-dark/60 hover:text-brand-gold transition-all duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-brand-dark text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-brand-gold transition-all duration-500 shadow-lg shadow-brand-dark/10"
          >
            კონსულტაცია
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[80px] bg-white/95 backdrop-blur-3xl z-40"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a 
                  key={item.label} 
                  href={item.href} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-serif font-bold text-brand-dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mt-4 px-12 py-4 bg-brand-gold text-white rounded-full font-bold uppercase tracking-widest text-xs"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                დაგვიკავშირდით
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-28 sm:pt-24">
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[10%] right-[10%] h-60 w-60 rounded-full bg-brand-gold/5 blur-[100px] sm:h-[30rem] sm:w-[30rem]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-gold/20 bg-white/50 px-4 py-2 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold backdrop-blur-sm sm:mb-8 sm:gap-3 sm:px-5 sm:text-[10px] sm:tracking-[0.4em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              Lex Loquitur Pro Nobis
            </motion.div>

            <h1 className="mb-6 max-w-[12ch] text-[clamp(2.9rem,14vw,5.4rem)] font-serif font-bold leading-[1.02] text-brand-gold tracking-tighter sm:mb-8 sm:text-6xl sm:leading-[1.08] md:text-7xl lg:text-8xl lg:leading-[1.1]">
              კანონი ჩვენი <br />
              <span className="text-brand-dark italic font-normal">სახელით</span> <br />
              ლაპარაკობს
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mb-10 max-w-xl text-base leading-relaxed text-brand-dark/60 font-light sm:mb-12 sm:text-lg md:text-xl"
            >
              პროფესიონალური სამართლებრივი წარმომადგენლობა, რომელიც ეფუძნება სტრატეგიულ ხედვასა და უშეღავათო სიზუსტეს.
            </motion.p>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-4 rounded-full bg-brand-dark px-8 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-brand-dark/10 transition-all hover:bg-brand-gold sm:w-auto sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.2em]"
              >
                კონსულტაცია
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="tel:595244994"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full justify-center rounded-full border border-brand-dark/10 bg-white/50 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm transition-all hover:bg-brand-dark/5 sm:w-auto sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.2em]"
              >
                დაგვიკავშირდით
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] group">
              <img 
                src="https://picsum.photos/seed/law-hero/1200/1500" 
                alt="AM Law Office" 
                className="h-full w-full object-cover grayscale-0 transition-all duration-1000 scale-105 md:grayscale md:group-hover:grayscale-0 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-gold/5 mix-blend-multiply opacity-40 group-hover:opacity-0 transition-opacity duration-1000" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-brand-gold/10 max-w-[180px]"
            >
              <div className="w-10 h-10 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-5 h-5 text-brand-gold" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark leading-tight">
                უმაღლესი ხარისხის <br /> დაცვა
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-brand-dark/30 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold via-brand-gold/20 to-transparent" />
      </motion.div>
    </section>
  );
};

const TrustBar = () => {
  const items = [
    "ნებისმიერი სირთულის საქმეები",
    "პროფესიონალური წარმომადგენლობა",
    "სტრატეგიული დაცვა",
    "საჯარო სამართლებრივი შეფასებები",
    "კლიენტზე მორგებული მიდგომა"
  ];

  return (
    <div className="py-12 border-y border-brand-dark/5 bg-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-12 mx-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-dark/30">{item}</span>
            <div className="w-2 h-2 rounded-full bg-brand-gold/30" />
          </div>
        ))}
      </div>
    </div>
  );
};

const LegalInsightsTicker = () => {
  const insights = [
    "ახალი რეგულაციები ბიზნეს სამართალში • 2026",
    "უძრავი ქონების რეგისტრაციის წესების ცვლილება",
    "საგადასახადო კანონმდებლობის განახლება",
    "შრომითი დავების პრაქტიკის ანალიზი"
  ];

  return (
    <div className="bg-brand-dark py-4 overflow-hidden border-b border-white/5">
      <div className="flex whitespace-nowrap animate-marquee-slow">
        {[...insights, ...insights, ...insights].map((insight, i) => (
          <div key={i} className="flex items-center gap-10 mx-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold/60">{insight}</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold text-[10px] tracking-[0.4em] uppercase">ჩვენ შესახებ</span>
            </div>
            
            <h2 className="mb-10 text-4xl font-serif font-bold leading-[1.08] text-brand-gold tracking-tighter sm:mb-12 sm:text-5xl md:text-7xl md:leading-[1.1]">
              თანამედროვე ხედვა <br /> 
              <span className="text-brand-dark italic font-normal">სამართლებრივ</span> დაცვაზე
            </h2>
            
            <div className="space-y-6 text-base leading-relaxed text-brand-dark/60 font-light sm:space-y-8 sm:text-xl">
              <p>
                AM Law Office არის პრემიუმ კლასის საადვოკატო ოფისი, რომელიც აერთიანებს აკადემიურ სიღრმესა და პრაქტიკულ სისხარტეს.
              </p>
              <p>
                ჩვენი გუნდი სპეციალიზებულია რთული სამართლებრივი კვანძების გახსნაში, სადაც სტანდარტული მიდგომები არასაკმარისია. ჩვენი სტრატეგია ეფუძნება კანონის უზენაესობასა და კლიენტის ინტერესების უპირობო დაცვას.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-12">
              <div className="group">
                <span className="text-4xl font-serif font-bold text-brand-gold transition-colors duration-500 group-hover:text-brand-dark sm:text-5xl">100%</span>
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-dark/30 mt-4">ლოიალურობა</p>
              </div>
              <div className="group">
                <span className="text-4xl font-serif font-bold text-brand-gold transition-colors duration-500 group-hover:text-brand-dark sm:text-5xl">24/7</span>
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-dark/30 mt-4">კომუნიკაცია</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] relative group">
              <img 
                src="https://picsum.photos/seed/law-office-premium/1200/1500" 
                alt="Law Office" 
                className="h-full w-full object-cover grayscale-0 transition-all duration-1000 scale-110 md:grayscale md:group-hover:grayscale-0 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-all duration-1000" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-4 -bottom-6 h-fit rounded-[2rem] border border-white/50 bg-white/80 p-6 shadow-2xl backdrop-blur-xl md:-bottom-12 md:-left-12 md:right-auto md:inset-x-auto md:w-80 md:p-8"
            >
              <Award className="w-12 h-12 mb-6 text-brand-gold" />
              <p className="font-serif text-2xl font-bold leading-tight text-brand-dark">ელიტარული <br /> წარმომადგენლობა</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "სამოქალაქო სამართალი",
      desc: "სახელშეკრულებო, სანივთო და საოჯახო დავების კომპლექსური მართვა.",
      icon: <Briefcase className="w-8 h-8" />
    },
    {
      title: "ბიზნეს სამართალი",
      desc: "კორპორატიული სტრუქტურირება, M&A და ბიზნესის სამართლებრივი მხარდაჭერა.",
      icon: <Scale className="w-8 h-8" />
    },
    {
      title: "ადმინისტრაციული სამართალი",
      desc: "სახელმწიფო ორგანოებთან დავები და ადმინისტრაციული წარმოება.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: "სისხლის სამართალი",
      desc: "თეთრსაყელოიანი დანაშაულები და მაღალი პროფილის სისხლისსამართლებრივი დაცვა.",
      icon: <Gavel className="w-8 h-8" />
    },
    {
      title: "ინტელექტუალური საკუთრება",
      desc: "საავტორო უფლებების, სასაქონლო ნიშნებისა და პატენტების დაცვა.",
      icon: <FileText className="w-8 h-8" />
    },
    {
      title: "საერთაშორისო არბიტრაჟი",
      desc: "წარმომადგენლობა საერთაშორისო საარბიტრაჟო ინსტიტუტებში.",
      icon: <Globe className="w-8 h-8" />
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-brand-dark py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold text-[10px] tracking-[0.4em] uppercase">პრაქტიკის სფეროები</span>
            </div>
            <h2 className="text-4xl font-serif font-bold leading-tight tracking-tighter text-brand-gold sm:text-5xl md:text-7xl">
              სამართლებრივი <br /> <span className="text-white italic font-normal">ექსპერტიზა</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-lg font-light leading-relaxed">
            ჩვენ ვთავაზობთ კლიენტებს სიღრმისეულ ცოდნასა და სტრატეგიულ გადაწყვეტილებებს სამართლის ყველა საკვანძო მიმართულებით.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-pointer overflow-hidden bg-brand-dark p-8 transition-all duration-700 hover:bg-brand-gold sm:p-12"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <span className="text-6xl font-serif font-bold text-white sm:text-8xl">0{index + 1}</span>
              </div>
              
              <div className="relative z-10">
                <div className="text-brand-gold group-hover:text-white transition-colors duration-500 mb-10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-white/50 group-hover:text-white/90 leading-relaxed font-light transition-colors duration-500">
                  {service.desc}
                </p>
                
                <div className="mt-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">დეტალურად</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    if (!selectedArticle) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedArticle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  return (
    <section id="blog" className="overflow-hidden bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold text-[10px] tracking-[0.4em] uppercase">ბლოგი და სიახლეები</span>
            </div>
            <h2 className="text-4xl font-serif font-bold leading-tight tracking-tighter text-brand-gold sm:text-5xl md:text-7xl">
              სამართლებრივი <br /> <span className="text-brand-dark italic font-normal">ბლოგი</span>
            </h2>
          </div>
          <button type="button" className="group flex items-center gap-6" onClick={() => setSelectedArticle(BLOG_ARTICLES[0])}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark">ყველა სტატია</span>
            <div className="w-14 h-14 rounded-full border border-brand-dark/10 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all duration-500">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          {BLOG_ARTICLES.map((article, index) => (
            <motion.button
              key={index}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group flex h-full w-full flex-col cursor-pointer text-left"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative mb-10 aspect-[16/10] w-full overflow-hidden rounded-[2rem]">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-dark shadow-xl">
                    {article.tag}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent p-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md">
                      ვრცლად
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4">
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">{article.date}</p>
                <h3 className="text-2xl font-serif font-bold leading-snug text-brand-dark transition-colors duration-500 group-hover:text-brand-gold sm:text-3xl">
                  {article.title}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-brand-dark/55 sm:text-lg">{article.excerpt}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/55 px-4 py-8 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2.5rem] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:p-8"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="sticky top-0 ml-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-dark/10 bg-white text-brand-dark transition hover:bg-brand-dark hover:text-white"
                  aria-label="დახურვა"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mt-2 overflow-hidden rounded-[2rem]">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-brand-gold/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                    {selectedArticle.tag}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-dark/35">
                    {selectedArticle.date}
                  </span>
                </div>

                <h3 className="mt-6 text-4xl md:text-5xl font-serif font-bold leading-tight text-brand-dark">
                  {selectedArticle.title}
                </h3>
                <p className="mt-6 text-xl font-light leading-relaxed text-brand-dark/65">
                  {selectedArticle.excerpt}
                </p>

                <div className="mt-8 space-y-6 text-lg leading-relaxed text-brand-dark/72">
                  {selectedArticle.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-3 text-brand-dark/50">
                    <BookOpen className="w-5 h-5 text-brand-gold" />
                    სრული მასალის სანახავად გამოიყენეთ ბმული
                  </div>
                  <a
                    href={selectedArticle.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-dark px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-brand-gold"
                  >
                    {selectedArticle.externalLabel}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Impact = () => {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-40">
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="inline-block p-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-12">
            <Gavel className="w-12 h-12 text-brand-gold" />
          </div>
          
          <h2 className="mb-10 text-4xl font-serif font-bold leading-[1.08] tracking-tighter text-brand-gold sm:mb-12 sm:text-5xl md:text-7xl md:leading-[1.1]">
            ჩვენ ვიცავთ <span className="text-white italic font-normal">სამართლიანობას</span> <br /> ყველაზე რთულ მომენტებში
          </h2>
          
          <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-white/50 font-light md:text-2xl">
            AM Law Office დგას კლიენტების გვერდით იქ, სადაც სხვები უკან იხევენ. ჩვენი პასუხისმგებლობაა რთული და სენსიტიური საქმეების პროფესიონალური მართვა.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            <p className="text-[11px] uppercase tracking-[0.6em] font-bold text-brand-gold/80">
              Lex Loquitur Pro Nobis
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    { 
      name: 'გიორგი ასლამაზიშვილი', 
      role: 'მმართველი პარტნიორი', 
      image: './aslamazishvili.png',
      fallbackImage: './giorgi-aslamazishvili.jpg',
      bio: "სამართლის ექსპერტი, საჯარო სამართლებრივი ანალიტიკოსი."
    },
    { 
      name: 'მეზურნიშვილი', 
      role: 'პარტნიორი', 
      image: 'https://picsum.photos/seed/lawyer-mezurnishvili/600/800',
      bio: "სამოქალაქო და ბიზნეს სამართლის სპეციალისტი."
    },
    { 
      name: 'თამარ ბერიძე', 
      role: 'უფროსი იურისტი', 
      image: 'https://picsum.photos/seed/lawyer-tamar/600/800',
      bio: "ადმინისტრაციული დავების ექსპერტი."
    },
  ];

  return (
    <section id="team" className="bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold text-[10px] tracking-[0.4em] uppercase">ჩვენი გუნდი</span>
            </div>
            <h2 className="text-4xl font-serif font-bold leading-tight tracking-tighter text-brand-dark sm:text-5xl md:text-7xl">
              პროფესიონალთა <br /> <span className="text-brand-gold italic font-normal">გაერთიანება</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-10 relative shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="h-full w-full object-cover grayscale-0 transition-all duration-1000 group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
                  onError={(event) => {
                    if (member.fallbackImage) {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = member.fallbackImage;
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                  <p className="text-white/80 text-sm font-light leading-relaxed mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {member.bio}
                  </p>
                  <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-brand-gold transition-colors">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-brand-gold transition-colors">
                      <Facebook className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <h3 className="text-3xl font-serif font-bold text-brand-dark mb-2">{member.name}</h3>
                <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Careers = () => {
  return (
    <section id="careers" className="bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 rounded-[2rem] border border-brand-dark/5 bg-brand-pearl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.05)] sm:rounded-[3rem] sm:p-12 md:gap-20 md:p-24 lg:flex-row">
          <div className="lg:w-1/2">
            <div className="w-20 h-20 bg-brand-gold rounded-3xl flex items-center justify-center mb-12 shadow-[0_20px_40px_rgba(197,160,89,0.3)]">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-8 text-4xl font-serif font-bold leading-[1.08] tracking-tighter text-brand-gold sm:text-5xl md:mb-10 md:text-6xl md:leading-[1.1]">
              შემოუერთდით <br /> <span className="text-brand-dark italic font-normal">გუნდს</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed text-brand-dark/60 font-light sm:mb-12 sm:text-xl">
              ჩვენ მუდმივად ვეძებთ ნიჭიერ იურისტებსა და სტაჟიორებს, რომლებსაც სურთ პროფესიული განვითარება ელიტარულ გარემოში.
            </p>
            <a href="mailto:info@amlaw.ge?subject=CV%20Submission" className="group inline-flex w-full items-center justify-center gap-6 rounded-full bg-brand-dark px-8 py-4 font-bold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-brand-gold sm:w-auto sm:px-10 sm:py-5 sm:tracking-widest">
              გამოგვიგზავნე CV
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden rotate-3 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/law-career/800/800" 
                alt="Careers" 
                className="h-full w-full object-cover grayscale-0 transition-all duration-1000 md:grayscale md:hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute right-4 top-4 hidden h-32 w-32 -rotate-12 items-center justify-center rounded-full border border-white/20 bg-brand-gold/10 p-6 text-center backdrop-blur-xl sm:flex md:-top-10 md:-right-10 md:h-48 md:w-48">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">სტაჟირების <br /> პროგრამა</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] items-start gap-16 2xl:gap-24">
          <div className="min-w-0 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-brand-gold" />
              <span className="text-brand-gold font-bold text-[10px] tracking-[0.4em] uppercase">კონტაქტი</span>
            </div>
            <h2 className="mb-10 max-w-[11ch] text-4xl font-serif font-bold leading-tight tracking-tighter text-brand-dark sm:mb-12 sm:text-5xl md:text-6xl xl:text-7xl">
              დაგვიკავშირდით <br /> <span className="text-brand-gold italic font-normal">კონსულტაციისთვის</span>
            </h2>
            
            <div className="mt-12 space-y-10 sm:mt-20 sm:space-y-12">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-brand-pearl flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 mb-2">ტელეფონი</p>
                  <p className="text-2xl font-serif font-bold text-brand-dark">595 24 49 94</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-brand-pearl flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 mb-2">ელ-ფოსტა</p>
                  <p className="text-2xl font-serif font-bold text-brand-dark">info@amlaw.ge</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-brand-pearl flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 mb-2">მისამართი</p>
                  <p className="text-2xl font-serif font-bold text-brand-dark">თბილისი, საქართველო</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass relative z-10 min-w-0 rounded-[2rem] border border-white/50 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.05)] sm:p-12 md:rounded-[3rem] md:p-16 2xl:ml-auto"
          >
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 ml-2">სახელი</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-dark/10 py-4 focus:border-brand-gold outline-none transition-colors font-light text-lg" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 ml-2">ტელეფონი</label>
                  <input type="tel" className="w-full bg-transparent border-b border-brand-dark/10 py-4 focus:border-brand-gold outline-none transition-colors font-light text-lg" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 ml-2">ელ-ფოსტა</label>
                <input type="email" className="w-full bg-transparent border-b border-brand-dark/10 py-4 focus:border-brand-gold outline-none transition-colors font-light text-lg" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 ml-2">შეტყობინება</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-brand-dark/10 py-4 focus:border-brand-gold outline-none transition-colors font-light text-lg resize-none" />
              </div>
              <button className="w-full py-6 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-brand-gold transition-all duration-500 shadow-xl shadow-brand-dark/10">
                გაგზავნა
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark pt-24 pb-12 text-white md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 grid grid-cols-1 gap-12 md:mb-32 md:grid-cols-4 md:gap-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <img
                src={LAW_LOGO_SRC}
                alt="AM Law Office Logo"
                className="h-14 w-14 rounded-2xl object-cover shadow-[0_18px_40px_rgba(197,160,89,0.18)]"
              />
              <div>
                <span className="block text-2xl font-serif font-bold tracking-tighter">AM LAW OFFICE</span>
                <span className="mt-1 block text-[9px] uppercase tracking-[0.3em] text-brand-gold/80">ასლამაზიშვილი • მეზურნიშვილი</span>
              </div>
            </div>
            <p className="text-white/40 max-w-md text-lg font-light leading-relaxed mb-10">
              ასლამაზიშვილი მეზურნიშვილის საადვოკატო ოფისი. <br />
              პროფესიონალური სამართლებრივი წარმომადგენლობა საქართველოში.
            </p>
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-10">ნავიგაცია</h5>
            <ul className="space-y-6">
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-3 group">
                    <div className="w-1 h-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-10">კონტაქტი</h5>
            <ul className="space-y-6 text-sm text-white/60">
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-brand-gold" />
                595 24 49 94
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-brand-gold" />
                info@amlaw.ge
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-brand-gold" />
                თბილისი, საქართველო
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
          <p>© 2026 AM LAW OFFICE. ყველა უფლება დაცულია.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">კონფიდენციალურობა</a>
            <a href="#" className="hover:text-white transition-colors">წესები და პირობები</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
export default function App() {
  return (
    <div className="font-sans selection:bg-brand-gold selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <LegalInsightsTicker />
        <TrustBar />
        <About />
        <Services />
        <Blog />
        <Impact />
        <Team />
        <Careers />
        <Contact />
      </main>
      <Footer />
      
      {/* Global Marquee Animation Style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 80s linear infinite;
        }
      `}</style>
    </div>
  );
}
