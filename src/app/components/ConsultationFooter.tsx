import { motion } from 'motion/react';
import { Facebook, Instagram } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BrandLogo } from './BrandLogo';

const menuLinks = [
  { href: '#top', label: 'Начало' },
  { href: '#philosophy', label: 'За нас' },
  { href: '#treatments', label: 'Процедури' },
  { href: '#results', label: 'Отзиви' },
  { href: '#results', label: 'Преди и след' },
  { href: '/contact', label: 'Контакти' },
  { href: '#top', label: 'Блог' },
  { href: '#top', label: 'Преса' },
] as const;

const procedureLinks = [
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
] as const;

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
                Клиника
              </p>
              <p className="max-w-xs text-[0.9375rem] leading-relaxed text-white/65">
                Прецизна естетика. Тиха увереност. Резултати, които изглеждат естествено — и остават
                такива.
              </p>
            </div>

            <nav aria-label="Основно меню" className="space-y-4">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                Меню
              </p>
              <ul className="space-y-2.5">
                {menuLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a
                      href={link.href}
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
                Процедури
              </p>
              <ul className="columns-1 gap-x-8 gap-y-2 sm:columns-2 lg:columns-1 xl:columns-1">
                {procedureLinks.map((label) => (
                  <li key={label} className="break-inside-avoid pb-2">
                    <a
                      href="#treatments"
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
                Контакт
              </p>
              <address className="not-italic text-[0.9375rem] leading-relaxed text-white/75">
                бул. „Витоша“ 48
                <br />
                1000 София, България
              </address>
              <p className="text-[0.9375rem] text-white/80">
                <a href="tel:+359888000000" className="transition-colors hover:text-white">
                  +359 888 000 000
                </a>
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-white/45">
                Социални мрежи
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
                © {new Date().getFullYear()} Obliq. Всички права запазени.
              </p>
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[0.7rem] text-white/55 sm:justify-end">
                <a href="#" className="transition-colors hover:text-white/90">
                  Политика за поверителност
                </a>
                <span className="text-white/35" aria-hidden>
                  |
                </span>
                <a href="#" className="transition-colors hover:text-white/90">
                  Дисклеймър и общи условия
                </a>
                <span className="text-white/35" aria-hidden>
                  |
                </span>
                <a href="#" className="transition-colors hover:text-white/90">
                  Бисквитки
                </a>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-[0.65rem] leading-relaxed text-white/35 sm:text-right sm:ml-auto">
              Медицински услуги се предоставят след индивидуална оценка.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
