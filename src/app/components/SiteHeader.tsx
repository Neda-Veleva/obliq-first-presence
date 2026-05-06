import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';
import { BrandLogo } from './BrandLogo';
import { localeLabels, localeNames, locales, useLocale, type Locale } from '../i18n';

type MegaCategory = {
  id: string;
  label: string;
  labelShort: string;
  description: string;
  image: string;
  imageAlt: string;
  links: { href: string; label: string }[];
};

const megaCategoriesByLocale: Record<Locale, MegaCategory[]> = {
  bg: [
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
        { href: '/conditions', label: 'Кожни състояния и фокус' },
        { href: '/procedures', label: 'Лазерни и енергийни терапии' },
        { href: '/journal', label: 'Журнал и насоки' },
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
        { href: '/the-obliq-approach', label: 'Подходът на OBLIQ' },
        { href: '#founder', label: 'Лекар основател' },
        { href: '#results', label: 'Отзиви и преди / след' },
        { href: '/journal', label: 'Журнал' },
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
  ],
  en: [
    {
      id: 'sculpt',
      label: 'Facial sculpting and contour',
      labelShort: 'Contour',
      description:
        'Subtle proportion and natural definition without surgery, guided by controlled intervention.',
      image: '/facial-focus-face.jpg',
      imageAlt: 'Detail of the face and neck area',
      links: [
        { href: '#facial-focus', label: 'Interactive facial focus' },
        { href: '#treatments', label: 'Injectable and volumizing solutions' },
        { href: '#treatments', label: 'Precise mimic correction' },
        { href: '#top', label: 'Home' },
      ],
    },
    {
      id: 'skin',
      label: 'Skin rejuvenation and laser',
      labelShort: 'Skin',
      description:
        'Texture, glow and even tone through contemporary protocols for skin renewal.',
      image: '/hero-exosome-treatment.png',
      imageAlt: 'Clinical aesthetic skin care',
      links: [
        { href: '/conditions', label: 'Skin conditions and focus' },
        { href: '/procedures', label: 'Laser and energy therapies' },
        { href: '/journal', label: 'Journal and guidance' },
      ],
    },
    {
      id: 'clinic',
      label: 'Philosophy and team',
      labelShort: 'Clinic',
      description:
        'Who we are, how we work and why precision and calm shape every plan.',
      image: '/doctor-portrait.png',
      imageAlt: 'Clinic team',
      links: [
        { href: '/the-obliq-approach', label: 'The OBLIQ approach' },
        { href: '#founder', label: 'Founder doctor' },
        { href: '#results', label: 'Reviews and before / after' },
        { href: '/journal', label: 'Journal' },
      ],
    },
    {
      id: 'booking',
      label: 'Booking and contact',
      labelShort: 'Book',
      description:
        'Book a consultation with a reply within one business day, clear next steps and no pressure.',
      image: '/precision-art-hero.png',
      imageAlt: 'Obliq — precise aesthetics',
      links: [
        { href: '/#contact', label: 'Consultation form' },
        { href: '/contact', label: 'Address and phone' },
        { href: '#top', label: 'Back to top' },
      ],
    },
  ],
  ru: [
    {
      id: 'sculpt',
      label: 'Скульптура и контур лица',
      labelShort: 'Контур',
      description:
        'Тонкое выстраивание пропорций и естественной выразительности без хирургии.',
      image: '/facial-focus-face.jpg',
      imageAlt: 'Деталь зоны лица и шеи',
      links: [
        { href: '#facial-focus', label: 'Интерактивный фокус на лице' },
        { href: '#treatments', label: 'Инъекционные и объемные решения' },
        { href: '#treatments', label: 'Точная коррекция мимики' },
        { href: '#top', label: 'Главная' },
      ],
    },
    {
      id: 'skin',
      label: 'Омоложение кожи и лазер',
      labelShort: 'Кожа',
      description:
        'Текстура, сияние и ровный тон через современные протоколы обновления кожи.',
      image: '/hero-exosome-treatment.png',
      imageAlt: 'Клинический эстетический уход за кожей',
      links: [
        { href: '/conditions', label: 'Состояния кожи и фокус' },
        { href: '/procedures', label: 'Лазерные и энергетические терапии' },
        { href: '/journal', label: 'Журнал и рекомендации' },
      ],
    },
    {
      id: 'clinic',
      label: 'Философия и команда',
      labelShort: 'Клиника',
      description:
        'Кто мы, как работаем и почему точность и спокойствие лежат в основе каждого плана.',
      image: '/doctor-portrait.png',
      imageAlt: 'Команда клиники',
      links: [
        { href: '/the-obliq-approach', label: 'Подход OBLIQ' },
        { href: '#founder', label: 'Врач-основатель' },
        { href: '#results', label: 'Отзывы и до / после' },
        { href: '/journal', label: 'Журнал' },
      ],
    },
    {
      id: 'booking',
      label: 'Запись и контакт',
      labelShort: 'Запись',
      description:
        'Запишитесь на консультацию: ответ в течение одного рабочего дня и понятные следующие шаги.',
      image: '/precision-art-hero.png',
      imageAlt: 'Obliq — точная эстетика',
      links: [
        { href: '/#contact', label: 'Форма консультации' },
        { href: '/contact', label: 'Адрес и телефон' },
        { href: '#top', label: 'Наверх' },
      ],
    },
  ],
};

const headerCopy: Record<
  Locale,
  {
    openMenu: string;
    closeMenu: string;
    dialogLabel: string;
    categoryNavLabel: string;
    categoryEyebrow: string;
    consultationFull: string;
    consultationShort: string;
    languageNavLabel: string;
  }
> = {
  bg: {
    openMenu: 'Отвори меню',
    closeMenu: 'Затвори меню',
    dialogLabel: 'Навигация и процедури',
    categoryNavLabel: 'Категории меню',
    categoryEyebrow: 'Процедури и фокус',
    consultationFull: 'Запази консултация',
    consultationShort: 'Консултация',
    languageNavLabel: 'Избор на език',
  },
  en: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    dialogLabel: 'Navigation and procedures',
    categoryNavLabel: 'Menu categories',
    categoryEyebrow: 'Procedures and focus',
    consultationFull: 'Book consultation',
    consultationShort: 'Book',
    languageNavLabel: 'Language selection',
  },
  ru: {
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    dialogLabel: 'Навигация и процедуры',
    categoryNavLabel: 'Категории меню',
    categoryEyebrow: 'Процедуры и фокус',
    consultationFull: 'Записаться',
    consultationShort: 'Запись',
    languageNavLabel: 'Выбор языка',
  },
};

const SCROLL_DELTA = 4;
const TOP_THRESHOLD = 64;
/** Под този скрол се счита, че си „върху“ хирото — без фон на лентата */
const PAGE_TOP_PX = 24;

export function SiteHeader() {
  const { locale, localizeHref, switchLocaleHref } = useLocale();
  const copy = headerCopy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaId, setActiveMegaId] = useState(megaCategoriesByLocale[locale][0].id);
  const [barHidden, setBarHidden] = useState(false);
  const [atPageTop, setAtPageTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const resolveHref = (href: string) => {
    return localizeHref(href);
  };

  const megaCategories = megaCategoriesByLocale[locale].map((category) => ({
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
  const consultationHref = resolveHref('/#contact');

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
                aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
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

            <div className="flex items-center justify-end gap-2">
              <nav
                aria-label={copy.languageNavLabel}
                className="hidden items-center border border-white/24 text-[0.65rem] font-medium uppercase leading-none tracking-[0.14em] text-white/72 min-[360px]:flex"
              >
                {locales.map((targetLocale) => {
                  const active = targetLocale === locale;
                  return (
                    <a
                      key={targetLocale}
                      href={switchLocaleHref(targetLocale)}
                      aria-label={localeNames[targetLocale]}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'px-2.5 py-2 transition-colors',
                        active ? 'bg-white text-black' : 'hover:bg-white/12 hover:text-white',
                      )}
                    >
                      {localeLabels[targetLocale]}
                    </a>
                  );
                })}
              </nav>

              <a
                href={consultationHref}
                onClick={closeMenu}
                className="justify-self-end rounded-none border border-white/30 bg-white px-3 py-2.5 text-center text-[11px] font-medium uppercase leading-none tracking-wider text-black transition-colors hover:bg-white/90 min-[400px]:px-5 min-[400px]:py-3 min-[400px]:text-sm"
              >
                <span className="hidden min-[400px]:inline">{copy.consultationFull}</span>
                <span className="min-[400px]:hidden">{copy.consultationShort}</span>
              </a>
            </div>
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
            aria-label={copy.dialogLabel}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              aria-label={copy.closeMenu}
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
                  aria-label={copy.categoryNavLabel}
                  className="flex flex-shrink-0 flex-row gap-1.5 overflow-x-auto border-b border-stone-700/10 px-4 py-3 lg:col-span-3 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-stone-700/10 lg:px-6 lg:py-9"
                >
                  <p className="mb-0 hidden min-w-0 text-[0.625rem] font-medium uppercase tracking-[0.32em] text-stone-600/90 lg:mb-6 lg:block">
                    {copy.categoryEyebrow}
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
