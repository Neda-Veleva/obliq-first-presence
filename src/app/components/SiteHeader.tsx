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

type PageLink = {
  href: string;
  label: string;
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

const featuredPagesByLocale: Record<Locale, PageLink[]> = {
  bg: [
    { href: '/', label: 'Начало' },
    { href: '/homepage-v2', label: 'Начало V2' },
    { href: '/homepage-editorial', label: 'Редакционно присъствие' },
    { href: '/the-obliq-approach', label: 'Подходът на OBLIQ' },
    { href: '/conditions', label: 'Състояния' },
    { href: '/procedures', label: 'терапии' },
    { href: '/journal', label: 'Журнал' },
    { href: '/contact', label: 'Контакт' },
    { href: '/contact-v2', label: 'Контакт V2' },
  ],
  en: [
    { href: '/', label: 'Home' },
    { href: '/homepage-v2', label: 'Home V2' },
    { href: '/homepage-editorial', label: 'Editorial Presence' },
    { href: '/the-obliq-approach', label: 'The OBLIQ approach' },
    { href: '/conditions', label: 'Conditions' },
    { href: '/procedures', label: 'Procedures' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
    { href: '/contact-v2', label: 'Contact V2' },
  ],
  ru: [
    { href: '/', label: 'Главная' },
    { href: '/homepage-v2', label: 'Главная V2' },
    { href: '/homepage-editorial', label: 'Editorial Presence' },
    { href: '/the-obliq-approach', label: 'Подход OBLIQ' },
    { href: '/conditions', label: 'Состояния' },
    { href: '/procedures', label: 'Процедуры' },
    { href: '/journal', label: 'Журнал' },
    { href: '/contact', label: 'Контакт' },
    { href: '/contact-v2', label: 'Контакт V2' },
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
    pagesEyebrow: string;
    languageNavLabel: string;
  }
> = {
  bg: {
    openMenu: 'Отвори меню',
    closeMenu: 'Затвори меню',
    dialogLabel: 'Навигация и терапии',
    categoryNavLabel: 'Категории меню',
    categoryEyebrow: 'Терапии и фокус',
    pagesEyebrow: 'Страници',
    languageNavLabel: 'Избор на език',
  },
  en: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    dialogLabel: 'Navigation and therapies',
    categoryNavLabel: 'Menu categories',
    categoryEyebrow: 'Therapies and focus',
    pagesEyebrow: 'Pages',
    languageNavLabel: 'Language selection',
  },
  ru: {
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    dialogLabel: 'Навигация и терапии',
    categoryNavLabel: 'Категории меню',
    categoryEyebrow: 'Терапии и фокус',
    pagesEyebrow: 'Страницы',
    languageNavLabel: 'Выбор языка',
  },
};

const SCROLL_DELTA = 4;
const TOP_THRESHOLD = 64;
const COMPACT_TEXT_THRESHOLD = 28;

export function SiteHeader({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { locale, localizeHref, switchLocaleHref } = useLocale();
  const copy = headerCopy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaId, setActiveMegaId] = useState(megaCategoriesByLocale[locale][0].id);
  const [barHidden, setBarHidden] = useState(false);
  const [compactText, setCompactText] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(96);
  const headerRef = useRef<HTMLElement | null>(null);
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
  const featuredPages = featuredPagesByLocale[locale].map((page) => ({
    ...page,
    href: resolveHref(page.href),
  }));

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setCompactText(y > COMPACT_TEXT_THRESHOLD);
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
    setCompactText(window.scrollY > COMPACT_TEXT_THRESHOLD);
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

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const updateHeaderHeight = () => {
      setHeaderHeight(node.getBoundingClientRect().height);
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(node);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const activeMega = megaCategories.find((c) => c.id === activeMegaId) ?? megaCategories[0];
  const showBar = !barHidden || menuOpen;
  const logoHref = resolveHref('#top');
  const isLight = tone === 'light';
  const headerControlShellClassName = isLight
    ? 'border border-[#635C54]/10 bg-[#F2EEEC]/72 shadow-[0_18px_40px_-28px_rgba(56,50,44,0.18)] backdrop-blur-md'
    : 'border border-[#F2EEEC]/14 bg-[#F2EEEC]/8 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-md';
  const headerCtaClassName =
    'inline-flex items-center justify-center rounded-full px-4 py-3 text-[0.72rem] uppercase leading-none tracking-[0.22em] transition-[transform,background-color,color,border-color,box-shadow] duration-300 min-[400px]:px-6 min-[400px]:py-4 min-[400px]:text-[0.78rem]';

  return (
    <>
      <header
        ref={headerRef}
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
            'relative overflow-hidden backdrop-blur-[12px] backdrop-saturate-150 transition-[background-color,backdrop-filter,color] duration-500 ease-out',
            isLight ? 'text-[#38322C]' : 'text-[#F2EEEC]',
          )}
          style={{
            backgroundColor: isLight ? 'rgba(244, 240, 236, 0.78)' : 'rgba(56, 50, 44, 0.24)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background: isLight
                ? 'linear-gradient(to bottom, rgba(242, 238, 236, 0.72) 0%, rgba(242, 238, 236, 0.32) 44%, rgba(242, 238, 236, 0) 100%)'
                : 'linear-gradient(to bottom, rgba(56, 50, 44, 0.55) 0%, rgba(56, 50, 44, 0.18) 44%, rgba(56, 50, 44, 0) 100%)',
            }}
          />

          <div className="relative mx-auto grid min-h-[6.5rem] w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 py-4 sm:min-h-[7rem] sm:px-6 sm:py-5 md:px-8 lg:min-h-[7.4rem] lg:px-12">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className={cn(
                  'flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-[1rem] outline-none transition-colors focus-visible:ring-2 sm:h-14 sm:w-14',
                  isLight
                    ? 'text-[#38322C] hover:bg-[#38322C]/6 focus-visible:ring-[#635C54]/20'
                    : 'text-[#F2EEEC] hover:bg-[#F2EEEC]/8 focus-visible:ring-[#F2EEEC]/40',
                )}
                aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
                aria-expanded={menuOpen}
              >
                <span className="relative block h-4 w-6">
                  <span
                    className="absolute left-0 top-0 block h-0.5 w-6 bg-current transition-transform duration-300 ease-out"
                    style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}
                  />
                  <span
                    className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'
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
              className="pointer-events-auto flex items-center justify-center px-2"
            >
              <span className="flex flex-col items-center justify-center">
                <span
                  className="w-full text-left text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-[#F2EEEC]/78 sm:text-[11px] lg:text-[12px]"
                  style={{
                    color: isLight ? 'rgba(99, 92, 84, 0.82)' : undefined,
                    textShadow: isLight ? 'none' : '0 2px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  AESTHETIC DERMATOLOGY
                </span>

                <span
                  className={cn(
                    'relative z-10 my-1.5 flex items-center justify-center origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    compactText ? 'scale-[0.94] sm:scale-[0.92] lg:scale-[0.86]' : 'scale-100',
                  )}
                >
                  <BrandLogo
                    alt="Obliq"
                    inverted={!isLight}
                    className="w-[9.75rem] drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)] sm:w-[11.5rem] lg:w-[23rem]"
                  />
                </span>

                <span
                  className="w-full text-right text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-[#F2EEEC]/78 sm:text-[11px] lg:text-[12px]"
                  style={{
                    color: isLight ? 'rgba(99, 92, 84, 0.82)' : undefined,
                    textShadow: isLight ? 'none' : '0 2px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  BY DR. MIHAYLOV
                </span>
              </span>
            </a>

            <div className="flex items-center justify-end gap-2">
              <nav
                aria-label={copy.languageNavLabel}
                className={cn(
                  headerControlShellClassName,
                  'hidden items-center rounded-full p-1.5 text-[0.68rem] font-medium uppercase leading-none tracking-[0.22em] min-[360px]:flex',
                  isLight ? 'text-[#635C54]/82' : 'text-[#F2EEEC]/72',
                )}
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
                        headerCtaClassName,
                        'min-[400px]:px-3.5 min-[400px]:py-3',
                        active
                          ? 'bg-[#F2EEEC] text-[#38322C] shadow-[0_12px_24px_-18px_rgba(242,238,236,0.72)]'
                          : isLight
                            ? 'text-[#635C54]/76 hover:bg-[#38322C]/5 hover:text-[#38322C]'
                            : 'text-[#F2EEEC]/74 hover:bg-[#F2EEEC]/10 hover:text-[#F2EEEC]',
                      )}
                    >
                      {localeLabels[targetLocale]}
                    </a>
                  );
                })}
              </nav>

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
              className="absolute inset-0 bg-[#38322C]/40 backdrop-blur-[2px]"
              aria-label={copy.closeMenu}
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 overflow-hidden bg-[#D8CDC0] shadow-[0_-8px_40px_rgba(56,50,44,0.2)]"
              style={{ top: headerHeight }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full min-h-0 flex-col lg:grid lg:grid-cols-12">
                <nav
                  aria-label={copy.categoryNavLabel}
                  className="flex flex-shrink-0 flex-row gap-1.5 overflow-x-auto border-b border-[#635C54]/10 px-4 py-3 lg:col-span-3 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-[#635C54]/10 lg:px-6 lg:py-9"
                >
                  <p className="mb-0 hidden min-w-0 text-[0.625rem] font-medium uppercase tracking-[0.32em] text-[#635C54]/90 lg:mb-6 lg:block">
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
                          'flex min-w-[max-content] items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[0.8125rem] font-medium text-[#38322C] transition-[background-color,color] lg:w-full lg:rounded-lg lg:px-3 lg:py-2.5 lg:text-[0.9375rem]',
                          active
                            ? 'bg-[#F2EEEC]/45 text-[#38322C] shadow-sm lg:bg-[#F2EEEC]/54'
                            : 'bg-transparent text-[#38322C]/84 hover:bg-[#F2EEEC]/24',
                        )}
                      >
                        <span className="lg:hidden">{cat.labelShort}</span>
                        <span className="hidden lg:inline">{cat.label}</span>
                        {active ? (
                          <ChevronRight
                            className="hidden h-4 w-4 shrink-0 text-[#635C54]/80 lg:block"
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
                      className="text-balance text-[#38322C]"
                      style={{
                        fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontSize: 'clamp(1.65rem, 3.2vw, 2.35rem)',
                        fontWeight: 400,
                        lineHeight: 1.15,
                      }}
                    >
                      {activeMega.label}
                    </h2>
                    <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[#635C54]/88">
                      {activeMega.description}
                    </p>
                    <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                      {activeMega.links.map((link) => (
                        <li key={`${link.href}-${link.label}`}>
                          <a
                            href={link.href}
                            onClick={closeMenu}
                            className="group flex items-start gap-2 text-[0.9rem] leading-snug text-[#38322C]/95 transition-colors hover:text-[#38322C]"
                          >
                            <span className="mt-1.5 h-px w-4 shrink-0 bg-[#635C54]/40 transition-[width,background-color] group-hover:w-5 group-hover:bg-[#38322C]/60" />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 border-t border-[#635C54]/12 pt-5">
                      <p className="text-[0.625rem] font-medium uppercase tracking-[0.32em] text-[#635C54]/90">
                        {copy.pagesEyebrow}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {featuredPages.map((page) => (
                          <a
                            key={`${page.href}-${page.label}`}
                            href={page.href}
                            onClick={closeMenu}
                            className="inline-flex items-center border border-[#635C54]/14 bg-[#F2EEEC]/36 px-3 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-[#38322C] transition-colors hover:bg-[#F2EEEC]/72"
                          >
                            {page.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative hidden min-h-0 lg:col-span-4 lg:block">
                  <div className="absolute inset-0 p-5 pl-0 lg:p-6 lg:pl-0">
                    <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl rounded-tr-3xl bg-[#635C54]/10 shadow-inner">
                      <ImageWithFallback
                        src={activeMega.image}
                        alt={activeMega.imageAlt}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#38322C]/25 via-transparent to-[#F2EEEC]/10"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>

                <div className="relative h-44 w-full shrink-0 px-5 pb-5 pt-2 lg:hidden">
                  <div className="relative h-full overflow-hidden rounded-xl bg-[#635C54]/10">
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
