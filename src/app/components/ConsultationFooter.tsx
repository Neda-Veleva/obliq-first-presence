import { motion } from 'motion/react';
import { Facebook, Instagram } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BrandLogo } from './BrandLogo';
import { useLocale, type Locale } from '../i18n';

const footerCopy: Record<
  Locale,
  {
    clinicLabel: string;
    clinicText: string;
    menuLabel: string;
    proceduresLabel: string;
    contactLabel: string;
    socialLabel: string;
    address: string;
    rights: string;
    privacy: string;
    terms: string;
    cookies: string;
    medicalNote: string;
    menuLinks: { href: string; label: string }[];
    procedureLinks: string[];
  }
> = {
  bg: {
    clinicLabel: 'Клиника',
    clinicText:
      'Прецизна естетика. Тиха увереност. Резултати, които изглеждат естествено — и остават такива.',
    menuLabel: 'Меню',
    proceduresLabel: 'Процедури',
    contactLabel: 'Контакт',
    socialLabel: 'Социални мрежи',
    address: 'бул. „Витоша“ 48\n1000 София, България',
    rights: 'Всички права запазени.',
    privacy: 'Политика за поверителност',
    terms: 'Дисклеймър и общи условия',
    cookies: 'Бисквитки',
    medicalNote: 'Медицински услуги се предоставят след индивидуална оценка.',
    menuLinks: [
      { href: '/#top', label: 'Начало' },
      { href: '/the-obliq-approach', label: 'Подходът на OBLIQ' },
      { href: '/procedures', label: 'Процедури' },
      { href: '/conditions', label: 'Състояния' },
      { href: '/#results', label: 'Отзиви' },
      { href: '/journal', label: 'Журнал' },
      { href: '/contact', label: 'Контакти' },
    ],
    procedureLinks: [
      'Консултация и персонален план',
      'Ботокс и ботулинов токсин',
      'Хиалуронови филъри',
      'Мезотерапия на лице и тяло',
      'Биоревитализация и PRP',
      'Лазерно подмладяване (фракционен лазер)',
      'RF стягане и контур',
      'Химични пилинги',
      'Микронидлинг и дермапен',
      'Нишков лифт (PDO конци)',
      'Лазерна епилация',
      'Терапии за коса и скалп',
    ],
  },
  en: {
    clinicLabel: 'Clinic',
    clinicText:
      'Precise aesthetics. Quiet confidence. Results that look natural and stay that way.',
    menuLabel: 'Menu',
    proceduresLabel: 'Procedures',
    contactLabel: 'Contact',
    socialLabel: 'Social',
    address: '48 Vitosha Blvd\n1000 Sofia, Bulgaria',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
    terms: 'Disclaimer and terms',
    cookies: 'Cookies',
    medicalNote: 'Medical services are provided after an individual assessment.',
    menuLinks: [
      { href: '/#top', label: 'Home' },
      { href: '/the-obliq-approach', label: 'The OBLIQ approach' },
      { href: '/procedures', label: 'Procedures' },
      { href: '/conditions', label: 'Conditions' },
      { href: '/#results', label: 'Reviews' },
      { href: '/journal', label: 'Journal' },
      { href: '/contact', label: 'Contact' },
    ],
    procedureLinks: [
      'Consultation and personal plan',
      'Botox and botulinum toxin',
      'Hyaluronic fillers',
      'Face and body mesotherapy',
      'Biorevitalization and PRP',
      'Laser rejuvenation',
      'RF tightening and contour',
      'Chemical peels',
      'Microneedling and dermapen',
      'Thread lift',
      'Laser hair removal',
      'Hair and scalp therapies',
    ],
  },
  ru: {
    clinicLabel: 'Клиника',
    clinicText:
      'Точная эстетика. Спокойная уверенность. Результаты, которые выглядят естественно и остаются такими.',
    menuLabel: 'Меню',
    proceduresLabel: 'Процедуры',
    contactLabel: 'Контакт',
    socialLabel: 'Социальные сети',
    address: 'бул. Витоша 48\n1000 София, Болгария',
    rights: 'Все права защищены.',
    privacy: 'Политика конфиденциальности',
    terms: 'Дисклеймер и условия',
    cookies: 'Cookies',
    medicalNote: 'Медицинские услуги предоставляются после индивидуальной оценки.',
    menuLinks: [
      { href: '/#top', label: 'Главная' },
      { href: '/the-obliq-approach', label: 'Подход OBLIQ' },
      { href: '/procedures', label: 'Процедуры' },
      { href: '/conditions', label: 'Состояния' },
      { href: '/#results', label: 'Отзывы' },
      { href: '/journal', label: 'Журнал' },
      { href: '/contact', label: 'Контакты' },
    ],
    procedureLinks: [
      'Консультация и персональный план',
      'Ботокс и ботулинический токсин',
      'Гиалуроновые филлеры',
      'Мезотерапия лица и тела',
      'Биоревитализация и PRP',
      'Лазерное омоложение',
      'RF-лифтинг и контур',
      'Химические пилинги',
      'Микронидлинг и дермапен',
      'Нитевой лифтинг',
      'Лазерная эпиляция',
      'Терапии для волос и кожи головы',
    ],
  },
};

const obliqTitleVariants = {
  hidden: {
    opacity: 0,
    y: 52,
    scale: 0.97,
    filter: 'blur(16px)',
    transition: { duration: 0.72, ease: [0.42, 0, 0.58, 1] as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

export function ConsultationFooter() {
  const { locale, localizeHref } = useLocale();
  const copy = footerCopy[locale];

  return (
    <section className="relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0">
        <ImageWithFallback
          src="/precision-art-hero.png"
          alt=""
          className="h-full min-h-[520px] w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/[0.58] to-black/[0.82]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden />
      </div>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-20">
          <motion.div
            variants={obliqTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35, margin: '0px 0px -12% 0px' }}
            className="mb-10 flex justify-center sm:mb-12 lg:mb-14"
          >
            <BrandLogo
              alt="Obliq"
              inverted
              className="w-full max-w-[20rem] opacity-80 sm:max-w-[31rem] lg:max-w-[46rem]"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-10">
            <div className="space-y-4 sm:col-span-2 xl:col-span-1">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                {copy.clinicLabel}
              </p>
              <p className="max-w-xs text-[0.9375rem] leading-relaxed text-white/65">
                {copy.clinicText}
              </p>
            </div>

            <nav aria-label="Основно меню" className="space-y-4">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                {copy.menuLabel}
              </p>
              <ul className="space-y-2.5">
                {copy.menuLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a
                      href={localizeHref(link.href)}
                      className="text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Процедури" className="space-y-4 sm:col-span-2 lg:col-span-1 xl:col-span-1">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                {copy.proceduresLabel}
              </p>
              <ul className="columns-1 gap-x-8 gap-y-2 sm:columns-2 lg:columns-1 xl:columns-1">
                {copy.procedureLinks.map((label) => (
                  <li key={label} className="break-inside-avoid pb-2">
                    <a
                      href={localizeHref('/procedures')}
                      className="text-[0.875rem] leading-snug text-white/70 transition-colors hover:text-white/95"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-4">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                {copy.contactLabel}
              </p>
              <address className="not-italic text-[0.9375rem] leading-relaxed text-white/75">
                {copy.address.split('\n').map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>
              <p className="text-[0.9375rem] text-white/80">
                <a href="tel:+359888000000" className="transition-colors hover:text-white">
                  +359 888 000 000
                </a>
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                {copy.socialLabel}
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-[color,background-color,border-color] hover:border-white/40 hover:bg-white/10 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-[color,background-color,border-color] hover:border-white/40 hover:bg-white/10 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 md:px-12 lg:px-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <p className="text-[0.7rem] leading-relaxed text-white/50 sm:max-w-[min(100%,24rem)]">
                © {new Date().getFullYear()} Obliq. {copy.rights}
              </p>
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[0.7rem] text-white/55 sm:justify-end">
                <a href="#" className="transition-colors hover:text-white/90">
                  {copy.privacy}
                </a>
                <span className="text-white/35" aria-hidden>
                  |
                </span>
                <a href="#" className="transition-colors hover:text-white/90">
                  {copy.terms}
                </a>
                <span className="text-white/35" aria-hidden>
                  |
                </span>
                <a href="#" className="transition-colors hover:text-white/90">
                  {copy.cookies}
                </a>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-[0.65rem] leading-relaxed text-white/35 sm:text-right sm:ml-auto">
              {copy.medicalNote}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
