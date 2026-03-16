import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  ChevronRight,
  Clock3,
  Gavel,
  Handshake,
  Home,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ScrollText,
  ShieldCheck,
  Users,
} from 'lucide-react';
import logoPanel from './assets/am-law-logo-panel.svg';
import logoMark from './assets/am-law-mark.svg';
import founderPortrait from './assets/aslamazishvili-portrait.svg';

type NavItem = {
  label: string;
  href: string;
};

type PracticeArea = {
  title: string;
  description: string;
  icon: typeof Scale;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'ჩვენ შესახებ', href: '#about' },
  { label: 'პრაქტიკა', href: '#services' },
  { label: 'მმართველი პარტნიორი', href: '#founder' },
  { label: 'პროცესი', href: '#process' },
  { label: 'კონტაქტი', href: '#contact' },
];

const PRACTICE_AREAS: PracticeArea[] = [
  {
    title: 'სამოქალაქო დავები',
    description: 'სახელშეკრულებო, ქონებრივი და პირადი უფლებების დაცვა მკაფიო სტრატეგიითა და პროცესუალური სიზუსტით.',
    icon: Scale,
  },
  {
    title: 'სისხლის სამართალი',
    description: 'დაცვა გამოძიებიდან სასამართლომდე, რთულ და სენსიტიურ საქმეებზე პასუხისმგებლიანი წარმომადგენლობით.',
    icon: ShieldCheck,
  },
  {
    title: 'ადმინისტრაციული სამართალი',
    description: 'სახელმწიფო ორგანოებთან ურთიერთობა, საჩივრები, სანქციები და ადმინისტრაციული დავების სრული თანხმლება.',
    icon: Landmark,
  },
  {
    title: 'ბიზნეს სამართალი',
    description: 'კომპანიების რეგისტრაცია, შიდა დოკუმენტები, რისკების პრევენცია და ყოველდღიური იურიდიული მხარდაჭერა.',
    icon: Briefcase,
  },
  {
    title: 'ოჯახისა და მემკვიდრეობის საქმეები',
    description: 'განქორწინება, ალიმენტი, მეურვეობა, ქონების გაყოფა და მემკვიდრეობითი სამართლებრივი გადაწყვეტილებები.',
    icon: Users,
  },
  {
    title: 'უძრავი ქონება',
    description: 'საკუთრების უფლება, რეგისტრაცია, ტრანზაქციები და ქონებასთან დაკავშირებული დავების მართვა.',
    icon: Home,
  },
];

const DIFFERENTIATORS = [
  {
    title: 'სტრატეგიული ხედვა',
    description: 'ყოველი საქმე ფასდება როგორც სამართლებრივი, ისე რეპუტაციული და პრაქტიკული შედეგების კუთხით.',
    icon: ScrollText,
  },
  {
    title: 'კონფიდენციალურობა',
    description: 'კლიენტის ინფორმაცია მუშავდება მაქსიმალური სიფრთხილითა და მკაცრი პროფესიული ეთიკით.',
    icon: BadgeCheck,
  },
  {
    title: 'სწრაფი რეაგირება',
    description: 'მნიშვნელოვან ეტაპებზე იღებთ დროულ უკუკავშირს, მკაფიო გეგმას და მოქმედების შემდეგ ნაბიჯს.',
    icon: Clock3,
  },
];

const PROCESS_STEPS = [
  {
    index: '01',
    title: 'საწყისი შეფასება',
    description: 'ვიკვლევთ ფაქტებს, დოკუმენტაციასა და რისკებს, რათა სწორად განვსაზღვროთ საქმის რეალური კონტური.',
  },
  {
    index: '02',
    title: 'სამართლებრივი სტრატეგია',
    description: 'ვადგენთ ზუსტ პოზიციას, მტკიცებულებების გეგმას და მოქმედების ეტაპობრივ რუკას.',
  },
  {
    index: '03',
    title: 'წარმომადგენლობა და შედეგი',
    description: 'საქმე მყარი კომუნიკაციით და თანმიმდევრული დაცვით მიჰყავთ მოლაპარაკებიდან სასამართლომდე.',
  },
];

const contactItems = [
  { label: 'ტელეფონი', value: '595 24 49 94', href: 'tel:595244994', icon: Phone },
  { label: 'ელ-ფოსტა', value: 'info@amlaw.ge', href: 'mailto:info@amlaw.ge', icon: Mail },
  { label: 'მისამართი', value: 'თბილისი, საქართველო', href: '#contact', icon: MapPin },
];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, ease: 'easeOut' as const },
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto mt-4 w-[min(1120px,calc(100%-1.5rem))] rounded-full border transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'border-brand-gold/20 bg-brand-navy/88 shadow-[0_20px_60px_rgba(4,12,26,0.35)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoMark}
              alt="AM Law Office mark"
              className="h-11 w-11 rounded-xl border border-brand-gold/20 bg-brand-navy/70 p-2"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">AM Law Office</p>
              <p className="text-xs tracking-[0.18em] text-brand-mist/72">ასლამაზიშვილი • მეზურნიშვილი</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="primary-button">
              კონსულტაცია
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-navy/70 text-brand-ivory lg:hidden"
            aria-label={isMenuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <ChevronRight className="h-5 w-5 rotate-45" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-brand-gold/10 lg:hidden"
            >
              <div className="flex flex-col gap-3 px-4 py-5 sm:px-6">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-brand-gold/10 bg-white/5 px-4 py-3 text-sm font-medium text-brand-ivory transition hover:border-brand-gold/30 hover:bg-white/8"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a href="#contact" className="primary-button justify-center" onClick={() => setIsMenuOpen(false)}>
                  დაგვიკავშირდით
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32">
      <div className="hero-glow absolute inset-0" />
      <div className="shell relative z-10 grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:pb-28 lg:pt-20">
        <motion.div {...fadeUp}>
          <span className="eyebrow">Lex Loquitur Pro Nobis</span>
          <h1 className="section-heading max-w-3xl text-brand-ivory">
            სამართლებრივი დაცვა,
            <span className="block text-brand-gold">რომელსაც აქვს წონა, ტონი და შედეგი.</span>
          </h1>
          <p className="section-copy">
            ასლამაზიშვილი მეზურნიშვილის საადვოკატო ოფისი კლიენტს სთავაზობს მკაფიო სტრატეგიას, ზუსტ კომუნიკაციას
            და პრემიუმ ხარისხის წარმომადგენლობას როგორც კერძო, ისე ბიზნესსაქმეებზე.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="primary-button">
              დაჯავშნე კონსულტაცია
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:595244994" className="secondary-button">
              <Phone className="h-4 w-4" />
              595 24 49 94
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              'კონფიდენციალურობა და ეთიკა',
              'სასამართლო და წინასასამართლო სტრატეგია',
              'კლიენტზე მორგებული კომუნიკაცია',
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.6rem] border border-brand-gold/10 bg-white/5 px-5 py-4 text-sm leading-7 text-brand-mist/84 shadow-[0_20px_45px_rgba(4,12,26,0.16)]"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-brand-gold/18 blur-3xl" />
          <div className="absolute -bottom-2 right-0 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-brand-gold/16 bg-brand-card/90 p-4 shadow-[0_30px_70px_rgba(4,12,26,0.35)] backdrop-blur">
            <div className="rounded-[1.7rem] border border-brand-gold/14 bg-brand-navy/80 p-4">
              <img
                src={logoPanel}
                alt="Aslamazishvili Mezurnishvili Law Office"
                className="w-full rounded-[1.35rem] border border-brand-gold/10"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-brand-gold/14 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">ოფისის ფილოსოფია</p>
                <p className="mt-3 text-lg font-semibold leading-8 text-brand-ivory">
                  პროფესიონალიზმი, სიმშვიდე და მკაფიო სამართლებრივი პოზიცია.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-brand-gold/14 bg-brand-gold/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">სწრაფი წვდომა</p>
                <div className="mt-3 space-y-3 text-sm text-brand-mist/88">
                  {['ტელეფონი', 'ელ-ფოსტა', 'პირადი კონსულტაცია'].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b border-brand-gold/12 pb-3 last:border-b-0 last:pb-0">
                      <span>{item}</span>
                      <ChevronRight className="h-4 w-4 text-brand-gold" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-ivory py-24 text-brand-navy md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
      <div className="shell grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <motion.div {...fadeUp}>
          <span className="eyebrow text-brand-gold-deep">ჩვენ შესახებ</span>
          <h2 className="section-heading max-w-2xl text-brand-navy">
            თანამედროვე ქართული საადვოკატო ოფისი, რომელიც საუბრობს მკაფიო შედეგებით.
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
          className="grid gap-5 md:grid-cols-2"
        >
          <div className="light-panel">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-gold-deep">ხედვა</p>
            <p className="mt-4 text-base leading-8 text-brand-navy/78">
              ოფისი აერთიანებს სამართლებრივ სიზუსტეს, საქმიანი კომუნიკაციის კულტურას და ძლიერ წარმოდგენას
              სასამართლოსა თუ მოლაპარაკების მაგიდასთან.
            </p>
          </div>
          <div className="light-panel">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-gold-deep">მიდგომა</p>
            <p className="mt-4 text-base leading-8 text-brand-navy/78">
              თითოეულ კლიენტთან ვმუშაობთ პერსონალურად, ვხსნით რისკებს გასაგებ ენაზე და ვაშენებთ საქმეს ეტაპობრივად.
            </p>
          </div>
          <div className="light-panel md:col-span-2">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-gold-deep">ოფისის პრინციპი</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-navy/80">
              „Lex Loquitur Pro Nobis“ ნიშნავს მეტს, ვიდრე ლათინურ ფრაზას. ეს არის დაპირება, რომ კლიენტის საქმეს
              მივუდგებით წონიანად, მშვიდად და იმ შედეგზე ორიენტირებული მეთოდით, რომელსაც რეალური მნიშვნელობა აქვს.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-28">
      <div className="shell">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="eyebrow">პრაქტიკის მიმართულებები</span>
          <h2 className="section-heading text-brand-ivory">სრულფასოვანი იურიდიული მხარდაჭერა კერძო და ბიზნესკლიენტებისთვის.</h2>
          <p className="section-copy">
            თითოეული მიმართულება დამუშავებულია ერთიანი ბრენდული სტანდარტით: მკაფიო სამართლებრივი ანალიზი, მოქმედების
            გეგმა და თანმიმდევრული წარმომადგენლობა.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PRACTICE_AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ y: -8 }}
                className="service-card"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/18 bg-brand-gold/10 text-brand-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold leading-snug text-brand-ivory">{area.title}</h3>
                <p className="mt-4 text-base leading-8 text-brand-mist/78">{area.description}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
                  დეტალურად
                  <ChevronRight className="h-4 w-4" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden bg-brand-ivory py-24 text-brand-navy md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <motion.div {...fadeUp} className="order-2 lg:order-1">
          <span className="eyebrow text-brand-gold-deep">მმართველი პარტნიორი</span>
          <h2 className="section-heading text-brand-navy">გიორგი ასლამაზიშვილი</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-navy/78">
            ოფისის სამართლებრივი ხელწერა აშენებულია ძლიერი წარმომადგენლობის, საჯარო პასუხისმგებლობისა და საქმის
            შინაარსობრივ სიღრმეზე. მმართველი პარტნიორის ბლოკი ხაზს უსვამს ოფიციალურ, მშვიდ და ავტორიტეტულ ტონს.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              'სასამართლო წარმომადგენლობა',
              'სტრატეგიული საქმის მართვა',
              'საჯარო სამართლებრივი შეფასება',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-brand-gold/14 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(8,22,47,0.08)]">
                <p className="text-sm font-medium leading-7 text-brand-navy/82">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-brand-gold/14 bg-brand-navy px-6 py-6 text-brand-ivory shadow-[0_24px_50px_rgba(8,22,47,0.18)]">
            <div className="flex items-start gap-4">
              <Handshake className="mt-1 h-5 w-5 shrink-0 text-brand-gold" />
              <p className="text-base leading-8 text-brand-mist/88">
                ბრენდული ტონი განახლებულია ლოგოს ფერებში: ღრმა მუქი ლურჯი, თბილი ოქროსფერი და კრემისფერი აქცენტები,
                რათა გვერდი ვიზუალურად ზუსტად ასახავდეს ოფისის იდენტობას.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="order-1 lg:order-2"
        >
          <div className="portrait-frame">
            <img src={founderPortrait} alt="გიორგი ასლამაზიშვილი" className="w-full rounded-[1.8rem]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-24 md:py-28">
      <div className="shell">
        <motion.div {...fadeUp} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">როგორ ვმუშაობთ</span>
            <h2 className="section-heading text-brand-ivory">საქმის მართვა გამჭვირვალე პროცესით და მკაფიო კომუნიკაციით.</h2>
          </div>
          <a href="#contact" className="secondary-button w-fit">
            შეხვედრის დაგეგმვა
          </a>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[1.9rem] border border-brand-gold/14 bg-white/6 p-7 shadow-[0_22px_45px_rgba(4,12,26,0.18)] backdrop-blur"
            >
              <p className="text-sm font-semibold tracking-[0.32em] text-brand-gold">{step.index}</p>
              <h3 className="mt-6 text-2xl font-semibold text-brand-ivory">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-brand-mist/78">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
                className="rounded-[1.8rem] border border-brand-gold/14 bg-brand-card/85 p-7"
              >
                <Icon className="h-6 w-6 text-brand-gold" />
                <h3 className="mt-6 text-xl font-semibold text-brand-ivory">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-brand-mist/78">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-brand-ivory py-24 text-brand-navy md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <span className="eyebrow text-brand-gold-deep">კონტაქტი</span>
          <h2 className="section-heading text-brand-navy">დაგვიკავშირდით და ერთად შევაფასოთ შემდეგი სწორი ნაბიჯი.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-brand-navy/76">
            პირველივე კონტაქტიდან იღებთ საქმეზე ორიენტირებულ პასუხს, დაგეგმილ კომუნიკაციას და პროფესიულ ტონს,
            რომელიც თავიდანვე ქმნის ნდობას.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="rounded-[2rem] border border-brand-gold/14 bg-white p-6 shadow-[0_24px_50px_rgba(8,22,47,0.12)] sm:p-8"
        >
          <div className="grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between rounded-[1.5rem] border border-brand-gold/12 bg-brand-ivory/60 px-5 py-5 transition hover:border-brand-gold/40 hover:bg-brand-ivory"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-brand-gold-deep">{item.label}</p>
                      <p className="mt-1 text-lg font-medium text-brand-navy">{item.value}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-brand-gold transition group-hover:translate-x-1" />
                </a>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-brand-navy px-6 py-6 text-brand-ivory">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">AM Law Office</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-brand-mist/84">
              საჭიროების შემთხვევაში ბლოკში მარტივად შეიძლება დაემატოს ზუსტი მისამართი, სამუშაო საათები და სოციალური
              ბმულები იმავე ვიზუალური ხაზის შენარჩუნებით.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-gold/10 py-10">
      <div className="shell flex flex-col gap-6 text-sm text-brand-mist/72 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={logoMark} alt="AM mark" className="h-10 w-10 rounded-xl border border-brand-gold/20 bg-brand-navy/70 p-2" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">Aslamazishvili Mezurnishvili</p>
            <p className="text-xs tracking-[0.18em] text-brand-mist/70">Law Office</p>
          </div>
        </div>
        <p>© {new Date().getFullYear()} AM Law Office. ყველა უფლება დაცულია.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Founder />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
