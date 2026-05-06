import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';
import { BrandLogo } from './BrandLogo';

type MegaCategory = {
  id: string;
  label: string;
  labelShort: string;
  description: string;
  image: string;
  imageAlt: string;
  links: { href: string; label: string }[];
};

const baseMegaCategories: MegaCategory[] = [
  {
    id: 'sculpt',
    label: 'Скулптура и контур на лицето',
    labelShort: 'Контур',
    description:
      'Фино изграждане на пропорции и естествена дефиниция — без хирургия, с контролирана намеса.',
    image: '/facial-focus-face.jpg',
    imageAlt: 'Детайл от зоната на лицето и шията',
    links: [
      { href: '#facial-focus', label: 'Интерактивен фокус върху лицето' },
      { href: '#treatments', label: 'Инжекционни и обемни решения' },
      { href: '#treatments', label: 'Прецизни корекции на мимиката' },
      { href: '#top', label: 'Начало' },
    ],
  },
  {
    id: 'skin',
    label: 'Подмладяване на кожата и лазер',
    labelShort: 'Кожа',
    description:
      'Текстура, сияние и равен тон чрез съвременни протоколи за обновяване на кожата.',
    image: '/hero-exosome-treatment.png',
    imageAlt: 'Клинична естетична грижа за кожата',
    links: [
      { href: '#treatments', label: 'Протоколи за подмладяване' },
      { href: '#treatments', label: 'Лазерни и енергийни терапии' },
      { href: '#results', label: 'Резултати и доверие' },
    ],
  },
  {
    id: 'clinic',
    label: 'Философия и екип',
    labelShort: 'Клиника',
    description:
      'Кой сме ние, как работим и защо прецизността и спокойствието са в основата на всеки план.',
    image: '/doctor-portrait.png',
    imageAlt: 'Екип на клиниката',
    links: [
      { href: '#philosophy', label: 'Философия' },
      { href: '#founder', label: 'Лекар основател' },
      { href: '#results', label: 'Отзиви и преди / след' },
      { href: '#philosophy', label: 'За подхода ни' },
    ],
  },
  {
    id: 'booking',
    label: 'Час и контакт',
    labelShort: 'Час',
    description:
      'Запазете консултация — отговор до един работен ден, без ангажимент и с ясни следващи стъпки.',
    image: '/precision-art-hero.png',
    imageAlt: 'Obliq — прецизна естетика',
    links: [
      { href: '/#contact', label: 'Форма за консултация' },
      { href: '/contact', label: 'Адрес и телефон' },
      { href: '#top', label: 'Към началото' },
    ],
  },
];

const SCROLL_DELTA = 4;
const TOP_THRESHOLD = 64;
/** Под този скрол се счита, че си „върху“ хирото — без фон на лентата */
const PAGE_TOP_PX = 24;

export function SiteHeader() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHomePage = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaId, setActiveMegaId] = useState(baseMegaCategories[0].id);
  const [barHidden, setBarHidden] = useState(false);
  const [atPageTop, setAtPageTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const resolveHref = (href: string) => {
    if (href === '#top') {
      return isHomePage ? '#top' : '/#top';
    }

    if (href.startsWith('#')) {
      return isHomePage ? href : `/${href}`;
    }

    return href;
  };

  const megaCategories = baseMegaCategories.map((category) => ({
    ...category,
    links: category.links.map((link) => ({
      ...link,
      href: resolveHref(link.href),
    })),
  }));

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setAtPageTop(y < PAGE_TOP_PX);
        if (y < TOP_THRESHOLD) {
          setBarHidden(false);
        } else {
          const dy = y - lastScrollY.current;
          if (dy > SCROLL_DELTA) {
            setBarHidden(true);
          } else if (dy < -SCROLL_DELTA) {
            setBarHidden(false);
          }
        }
        lastScrollY.current = y;
        ticking.current = false;
      });
    };
    lastScrollY.current = window.scrollY;
    setAtPageTop(window.scrollY < PAGE_TOP_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const activeMega = megaCategories.find((c) => c.id === activeMegaId) ?? megaCategories[0];
  const showBar = !barHidden || menuOpen;
  const solidBar = !atPageTop;
  const logoHref = resolveHref('#top');
  const consultationHref = '/#contact';

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 will-change-[opacity]"
        style={{
          opacity: showBar ? 1 : 0,
          transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: showBar ? 'auto' : 'none',
        }}
        aria-hidden={!showBar}
      >
        <div
          className={cn(
            'text-white transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-out',
            solidBar
              ? 'border-b border-white/15 bg-black/45 shadow-[0_1px_0_0_rgba(242,238,236,0.08)_inset] backdrop-blur-2xl backdrop-saturate-150'
              : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none',
          )}
        >
          <div className="mx-auto grid min-h-20 w-full max-w-7xl grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] items-center gap-3 px-4 py-1 sm:min-h-24 sm:px-6 sm:py-0 md:px-8 lg:px-12">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label={menuOpen ? 'Затвори меню' : 'Отвори меню'}
                aria-expanded={menuOpen}
              >
                <span className="relative block h-4 w-6">
                  <span
                    className="absolute left-0 top-0 block h-0.5 w-6 bg-current transition-transform duration-300 ease-out"
                    style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}
                  />
                  <span
                    className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                      menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className="absolute left-0 top-3.5 block h-0.5 w-6 bg-current transition-transform duration-300 ease-out"
                    style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}
                  />
                </span>
              </button>
            </div>

            <a
              href={logoHref}
              onClick={closeMenu}
              className="flex items-center justify-center px-2"
            >
              <BrandLogo
                alt="Obliq"
                inverted
                className="w-[6.75rem] sm:w-[8.25rem] lg:w-[9rem]"
              />
            </a>

            <a
              href={consultationHref}
              onClick={closeMenu}
              className="justify-self-end rounded-none border border-white/30 bg-white px-3 py-2.5 text-center text-[11px] font-medium uppercase leading-none tracking-wider text-black transition-colors hover:bg-white/90 min-[400px]:px-5 min-[400px]:py-3 min-[400px]:text-sm"
            >
              <span className="hidden min-[400px]:inline">Запази консултация</span>
              <span className="min-[400px]:hidden">Консултация</span>
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45]"
            role="dialog"
            aria-modal="true"
            aria-label="Навигация и процедури"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              aria-label="Затвори меню"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-20 bottom-0 overflow-hidden rounded-t-[1.35rem] bg-[#c8c0b9] shadow-[0_-8px_40px_rgba(0,0,0,0.2)] sm:top-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full min-h-0 flex-col lg:grid lg:grid-cols-12">
                <nav
                  aria-label="Категории меню"
                  className="flex flex-shrink-0 flex-row gap-1.5 overflow-x-auto border-b border-stone-700/10 px-4 py-3 lg:col-span-3 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-stone-700/10 lg:px-6 lg:py-9"
                >
                  <p className="mb-0 hidden min-w-0 text-[0.625rem] font-medium uppercase tracking-[0.32em] text-stone-600/90 lg:mb-6 lg:block">
                    Процедури и фокус
                  </p>
                  {megaCategories.map((cat) => {
                    const active = cat.id === activeMegaId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveMegaId(cat.id)}
                        className={cn(
                          'flex min-w-[max-content] items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[0.8125rem] font-medium text-stone-800 transition-[background-color,color] lg:w-full lg:rounded-lg lg:px-3 lg:py-2.5 lg:text-[0.9375rem]',
                          active
                            ? 'bg-white/35 text-stone-900 shadow-sm lg:bg-white/40'
                            : 'bg-transparent text-stone-800/85 hover:bg-white/20',
                        )}
                      >
                        <span className="lg:hidden">{cat.labelShort}</span>
                        <span className="hidden lg:inline">{cat.label}</span>
                        {active ? (
                          <ChevronRight
                            className="hidden h-4 w-4 shrink-0 text-stone-700/80 lg:block"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </nav>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:col-span-5 lg:px-0">
                  <div className="flex flex-1 flex-col px-5 py-7 sm:px-8 sm:py-9 lg:max-w-xl lg:py-10">
                    <h2
                      className="text-balance text-stone-900"
                      style={{
                        fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontSize: 'clamp(1.65rem, 3.2vw, 2.35rem)',
                        fontWeight: 400,
                        lineHeight: 1.15,
                      }}
                    >
                      {activeMega.label}
                    </h2>
                    <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-stone-700/85">
                      {activeMega.description}
                    </p>
                    <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                      {activeMega.links.map((link) => (
                        <li key={`${link.href}-${link.label}`}>
                          <a
                            href={link.href}
                            onClick={closeMenu}
                            className="group flex items-start gap-2 text-[0.9rem] leading-snug text-stone-800/95 transition-colors hover:text-stone-950"
                          >
                            <span className="mt-1.5 h-px w-4 shrink-0 bg-stone-600/40 transition-[width,background-color] group-hover:w-5 group-hover:bg-stone-800/60" />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative hidden min-h-0 lg:col-span-4 lg:block">
                  <div className="absolute inset-0 p-5 pl-0 lg:p-6 lg:pl-0">
                    <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl rounded-tr-3xl bg-stone-600/10 shadow-inner">
                      <ImageWithFallback
                        src={activeMega.image}
                        alt={activeMega.imageAlt}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-stone-100/10"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>

                <div className="relative h-44 w-full shrink-0 px-5 pb-5 pt-2 lg:hidden">
                  <div className="relative h-full overflow-hidden rounded-xl bg-stone-600/10">
                    <ImageWithFallback
                      src={activeMega.image}
                      alt={activeMega.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
