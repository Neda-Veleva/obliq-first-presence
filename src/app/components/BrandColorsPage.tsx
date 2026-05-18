import { motion } from 'motion/react';
import { ConsultationFooter } from './ConsultationFooter';
import { SiteHeader } from './SiteHeader';
import { SectionHeading } from './PremiumPagePrimitives';
import { useLocale, type Locale } from '../i18n';

type ColorSample = {
  hex: string;
  variable: string;
  name: string;
  label: string;
  accent: string;
};

type GradientSample = {
  gradient: string;
  variable: string;
  name: string;
  label: string;
  accent: string;
};

const primaryColors: ColorSample[] = [
  { hex: '#D8CDC0', variable: '--obliq-warm-beige', name: 'Warm Beige', label: 'Primary', accent: '#D8CDC0' },
  { hex: '#F2EEEC', variable: '--obliq-soft-ivory', name: 'Soft Ivory', label: 'Primary', accent: '#BAB0A8' },
  { hex: '#635C54', variable: '--obliq-warm-gray', name: 'Warm Gray', label: 'Primary', accent: '#977460' },
  { hex: '#38322C', variable: '--obliq-deep-espresso', name: 'Deep Espresso', label: 'Primary', accent: '#635C54' },
];

const secondaryColors: ColorSample[] = [
  { hex: '#BAB0A8', variable: '--obliq-taupe-mist', name: 'Taupe Mist', label: 'Secondary', accent: '#D8CDC0' },
  { hex: '#977460', variable: '--obliq-soft-copper', name: 'Soft Copper', label: 'Secondary', accent: '#876856' },
  { hex: '#876856', variable: '--obliq-muted-brown', name: 'Muted Brown', label: 'Secondary', accent: '#977460' },
  { hex: '#8C8E77', variable: '--obliq-sage-stone', name: 'Sage Stone', label: 'Accent', accent: '#BAB0A8' },
  { hex: '#ACB2CA', variable: '--obliq-blue-gray', name: 'Blue Gray', label: 'Accent', accent: '#D8CDC0' },
];

const gradientSamples: GradientSample[] = [
  {
    gradient: 'linear-gradient(180deg, #BAB0A8 0%, #F2EEEC 100%)',
    variable: '--obliq-gradient-mist',
    name: 'Taupe Mist to Soft Ivory',
    label: 'Gradient',
    accent: '#BAB0A8',
  },
  {
    gradient: 'linear-gradient(180deg, #977460 0%, #8C8E77 100%)',
    variable: '--obliq-gradient-copper-sage',
    name: 'Soft Copper to Sage Stone',
    label: 'Gradient',
    accent: '#977460',
  },
  {
    gradient: 'linear-gradient(180deg, #BAB0A8 0%, #ACB2CA 100%)',
    variable: '--obliq-gradient-stone-cloud',
    name: 'Taupe Mist to Blue Gray',
    label: 'Gradient',
    accent: '#BAB0A8',
  },
  {
    gradient: 'linear-gradient(180deg, #876856 0%, #BAB0A8 100%)',
    variable: '--obliq-gradient-muted-taupe',
    name: 'Muted Brown to Taupe Mist',
    label: 'Gradient',
    accent: '#876856',
  },
  {
    gradient: 'linear-gradient(90deg, #D8CDC0 0%, #F2EEEC 100%)',
    variable: '--obliq-gradient-beige-light',
    name: 'Warm Beige to Soft Ivory',
    label: 'Gradient',
    accent: '#D8CDC0',
  },
  {
    gradient: 'linear-gradient(180deg, #635C54 0%, #D8CDC0 100%)',
    variable: '--obliq-gradient-warm-depth',
    name: 'Warm Gray to Warm Beige',
    label: 'Gradient',
    accent: '#635C54',
  },
  {
    gradient: 'linear-gradient(90deg, #8C8E77 0%, #F2EEEC 100%)',
    variable: '--obliq-gradient-sage-light',
    name: 'Sage Stone to Soft Ivory',
    label: 'Gradient',
    accent: '#8C8E77',
  },
  {
    gradient: 'linear-gradient(180deg, #ACB2CA 0%, #F2EEEC 100%)',
    variable: '--obliq-gradient-blue-air',
    name: 'Blue Gray to Soft Ivory',
    label: 'Gradient',
    accent: '#ACB2CA',
  },
  {
    gradient: 'linear-gradient(90deg, #38322C 0%, #BAB0A8 100%)',
    variable: '--obliq-gradient-espresso-mist',
    name: 'Deep Espresso to Taupe Mist',
    label: 'Gradient',
    accent: '#635C54',
  },
  {
    gradient: 'linear-gradient(180deg, #977460 0%, #D8CDC0 100%)',
    variable: '--obliq-gradient-copper-beige',
    name: 'Soft Copper to Warm Beige',
    label: 'Gradient',
    accent: '#977460',
  },
  {
    gradient: 'linear-gradient(90deg, #BAB0A8 0%, #8C8E77 100%)',
    variable: '--obliq-gradient-stone-balance',
    name: 'Taupe Mist to Sage Stone',
    label: 'Gradient',
    accent: '#8C8E77',
  },
  {
    gradient: 'linear-gradient(180deg, #F2EEEC 0%, #D8CDC0 48%, #BAB0A8 100%)',
    variable: '--obliq-gradient-editorial-soft',
    name: 'Soft Ivory to Taupe Mist',
    label: 'Gradient',
    accent: '#D8CDC0',
  },
];

const copyByLocale: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    primaryTitle: string;
    primaryBody: string;
    secondaryTitle: string;
    secondaryBody: string;
    gradientTitle: string;
    gradientBody: string;
  }
> = {
  bg: {
    eyebrow: 'OBLIQ. Color System',
    title: 'Brand Colors',
    intro:
      'Официалната цветова система на OBLIQ. е изградена около спокойна топлина, клинична чистота и мека редакционна елегантност.',
    primaryTitle: 'Primary palette',
    primaryBody:
      'Основните тонове дефинират идентичността на марката: светлина, баланс и дълбочина без визуален шум.',
    secondaryTitle: 'Secondary tones',
    secondaryBody:
      'Поддържащите нюанси внасят мек контраст и материалност, подходящи за editorial композиции и premium UI детайли.',
    gradientTitle: 'Gradient system',
    gradientBody:
      'Градиентите са създадени за деликатни преходи, атмосфера и луксозно усещане, без тежест и без агресивна декоративност.',
  },
  en: {
    eyebrow: 'OBLIQ. Color System',
    title: 'Brand Colors',
    intro:
      'The official color system is built around calm warmth, clinical clarity and a soft editorial elegance — reflecting the character of OBLIQ.',
    primaryTitle: 'Primary palette',
    primaryBody:
      'The core tones define the brand identity through light, balance and depth without visual noise.',
    secondaryTitle: 'Secondary tones',
    secondaryBody:
      'Supporting shades add quiet contrast and materiality suited to editorial compositions and premium UI details.',
    gradientTitle: 'Gradient system',
    gradientBody:
      'The gradients are designed for delicate transitions, atmosphere and a luxurious feel without visual heaviness.',
  },
  ru: {
    eyebrow: 'OBLIQ. Color System',
    title: 'Brand Colors',
    intro:
      'Официальная цветовая система OBLIQ. построена вокруг спокойного тепла, клинической чистоты и мягкой редакционной элегантности.',
    primaryTitle: 'Primary palette',
    primaryBody:
      'Основные тона формируют идентичность бренда через свет, баланс и глубину без визуального шума.',
    secondaryTitle: 'Secondary tones',
    secondaryBody:
      'Поддерживающие оттенки добавляют мягкий контраст и материальность для editorial-композиций и premium UI-деталей.',
    gradientTitle: 'Gradient system',
    gradientBody:
      'Градиенты созданы для деликатных переходов, атмосферы и ощущения роскоши без тяжести и лишней декоративности.',
  },
};

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function AmbientBackground() {
  return (
    <>
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-24 h-[22rem] w-[22rem] rounded-full bg-[#D8CDC0]/32 blur-3xl" />
        <div className="absolute right-[-8%] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-[#ACB2CA]/18 blur-3xl" />
        <div className="absolute left-[24%] top-[62rem] h-[20rem] w-[32rem] rounded-full bg-[#BAB0A8]/20 blur-3xl" />
        <div className="absolute bottom-40 right-[12%] h-[20rem] w-[26rem] rounded-full bg-[#8C8E77]/14 blur-3xl" />
      </div>
      <GrainOverlay />
    </>
  );
}

function ColorEllipse({
  sample,
  index,
}: {
  sample: ColorSample;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...revealTransition, delay: index * 0.08 }}
      className="flex flex-col items-start"
    >
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, -0.6, 0.6, 0] }}
        transition={{ duration: 7 + (index % 3), repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="relative h-[140px] w-full max-w-[240px] overflow-hidden rounded-[9999px] shadow-[0_28px_60px_-34px_rgba(86,72,60,0.32)] sm:h-[150px] sm:max-w-[252px]"
        style={{ backgroundColor: sample.hex }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        />
        <div
          className="absolute -right-8 top-5 h-20 w-28 rounded-full blur-2xl"
          style={{ backgroundColor: `${sample.accent}55` }}
        />
      </motion.div>

      <div className="mt-6 space-y-2">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#876856]">{sample.label}</p>
        <h3 className="text-[1.18rem] font-normal tracking-[-0.03em] text-[#38322C]">{sample.name}</h3>
        <p className="text-[0.82rem] uppercase tracking-[0.2em] text-[#635C54]">{sample.hex}</p>
        <p className="text-[0.86rem] text-[#635C54]/88">{sample.variable}</p>
      </div>
    </motion.article>
  );
}

function GradientEllipse({
  sample,
  index,
}: {
  sample: GradientSample;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...revealTransition, delay: index * 0.07 }}
      className="flex flex-col items-start"
    >
      <motion.div
        animate={{ y: [0, -7, 0], x: [0, 2, 0] }}
        transition={{ duration: 8 + (index % 4), repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="relative h-[140px] w-full max-w-[240px] overflow-hidden rounded-[9999px] shadow-[0_32px_68px_-38px_rgba(86,72,60,0.34)] sm:h-[150px] sm:max-w-[252px]"
        style={{ backgroundImage: sample.gradient }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.03)_100%)]" />
        <div
          className="absolute bottom-4 left-8 h-16 w-24 rounded-full blur-2xl"
          style={{ backgroundColor: `${sample.accent}4d` }}
        />
      </motion.div>

      <div className="mt-6 space-y-2">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#876856]">{sample.label}</p>
        <h3 className="text-[1.18rem] font-normal tracking-[-0.03em] text-[#38322C]">{sample.name}</h3>
        <p className="max-w-[17rem] text-[0.82rem] leading-relaxed text-[#635C54]">{sample.gradient}</p>
        <p className="text-[0.86rem] text-[#635C54]/88">{sample.variable}</p>
      </div>
    </motion.article>
  );
}

function ColorSection({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative py-18 sm:py-24 lg:py-30">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} className="max-w-[30rem]" />
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:gap-x-12 xl:gap-y-18">{children}</div>
      </div>
    </section>
  );
}

export function BrandColorsPage() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale];

  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main className="relative overflow-hidden bg-[#F2EEEC]">
        <AmbientBackground />

        <section className="relative">
          <div className="mx-auto max-w-6xl px-5 pb-8 pt-36 sm:px-8 sm:pt-40 lg:px-10 lg:pt-44">
            <motion.div
              initial={{ opacity: 0, y: 32, filter: 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={revealTransition}
              className="max-w-[44rem]"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[#876856]">{copy.eyebrow}</p>
              <h1 className="type-h1 mt-6 text-[#38322C]">
                {copy.title}
              </h1>
              <p className="type-body mt-7 max-w-[34rem] text-[#635C54]">
                {copy.intro}
              </p>
            </motion.div>
          </div>
        </section>

        <div className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32">
          <ColorSection eyebrow="Palette 01" title={copy.primaryTitle} body={copy.primaryBody}>
            {primaryColors.map((sample, index) => (
              <ColorEllipse key={sample.variable} sample={sample} index={index} />
            ))}
          </ColorSection>

          <ColorSection eyebrow="Palette 02" title={copy.secondaryTitle} body={copy.secondaryBody}>
            {secondaryColors.map((sample, index) => (
              <ColorEllipse key={sample.variable} sample={sample} index={index} />
            ))}
          </ColorSection>

          <ColorSection eyebrow="Atmosphere" title={copy.gradientTitle} body={copy.gradientBody}>
            {gradientSamples.map((sample, index) => (
              <GradientEllipse key={sample.variable} sample={sample} index={index} />
            ))}
          </ColorSection>
        </div>
      </main>

      <ConsultationFooter />
    </div>
  );
}
