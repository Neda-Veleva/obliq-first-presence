import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SiteHeader } from './SiteHeader';
import { useLocale, type Locale } from '../i18n';

const copyByLocale: Record<
  Locale,
  {
    hero: {
      eyebrow: string;
      title: string;
      body: string;
      primary: string;
      secondary: string;
      note: string;
    };
    pause: string;
    composition: {
      line: string;
      body: string;
      details: string[];
    };
    approach: {
      eyebrow: string;
      title: string;
      layers: { title: string; body: string }[];
    };
    atmosphere: {
      title: string;
      captions: string[];
    };
    trust: {
      eyebrow: string;
      title: string;
      quote: string;
      fragments: string[];
    };
    cta: {
      title: string;
      body: string;
      primary: string;
    };
  }
> = {
  bg: {
    hero: {
      eyebrow: 'Homepage concept 02',
      title: 'Editorial Presence',
      body: 'Кожа, светлина и тишина, режисирани като wellness кампания. OBLIQ като усещане, не като стандартна клиника.',
      primary: 'Заяви консултация',
      secondary: 'Подходът на OBLIQ',
      note: 'skin in soft daylight',
    },
    pause: 'Beauty that feels like balance.',
    composition: {
      line: 'Естествена кожа. Тих контур. Светлина, която остава.',
      body: 'Визуален свят от близост, въздух и мека прецизност. По-малко обяснения, повече усещане.',
      details: ['soft focus', 'natural skin', 'quiet precision'],
    },
    approach: {
      eyebrow: 'The OBLIQ approach',
      title: 'Не променяме лицето. Подреждаме светлината, баланса и усещането в кожата.',
      layers: [
        {
          title: 'Skin first',
          body: 'Планът започва с качеството на кожата и завършва с резултат, който изглежда естествено.',
        },
        {
          title: 'Measured care',
          body: 'Всяка намеса е малка, прецизна и съобразена с лицето, не с тенденция.',
        },
        {
          title: 'Long view',
          body: 'Грижата е мислена като състояние във времето, а не като кратък визуален ефект.',
        },
      ],
    },
    atmosphere: {
      title: 'Пространство, което говори тихо.',
      captions: ['мека дневна светлина', 'спокойни материали', 'лично присъствие'],
    },
    trust: {
      eyebrow: 'Trust, reimagined',
      title: 'Доверието не трябва да звучи силно.',
      quote: '“Изглеждам по-свежа, но никой не може да каже защо.”',
      fragments: ['без натиск', 'много фино', 'естествен резултат', 'спокойна консултация'],
    },
    cta: {
      title: 'Your skin, in its best light.',
      body: 'Спокойна среща, прецизен план и грижа, която остава близо до естественото.',
      primary: 'Запази консултация',
    },
  },
  en: {
    hero: {
      eyebrow: 'Homepage concept 02',
      title: 'Editorial Presence',
      body: 'Skin, light and stillness directed like a wellness campaign. OBLIQ as a feeling, not a standard clinic.',
      primary: 'Request a consultation',
      secondary: 'The OBLIQ approach',
      note: 'skin in soft daylight',
    },
    pause: 'Beauty that feels like balance.',
    composition: {
      line: 'Natural skin. Quiet contour. Light that stays.',
      body: 'A visual world of closeness, air and soft precision. Less explanation, more feeling.',
      details: ['soft focus', 'natural skin', 'quiet precision'],
    },
    approach: {
      eyebrow: 'The OBLIQ approach',
      title: 'We do not change the face. We refine light, balance and comfort in the skin.',
      layers: [
        {
          title: 'Skin first',
          body: 'Every plan starts with skin quality and ends with a result that looks effortless.',
        },
        {
          title: 'Measured care',
          body: 'Each intervention is small, precise and shaped around the face rather than a trend.',
        },
        {
          title: 'Long view',
          body: 'Care is designed as a lasting state, not a brief visual effect.',
        },
      ],
    },
    atmosphere: {
      title: 'A space that speaks quietly.',
      captions: ['soft daylight', 'calm materials', 'personal presence'],
    },
    trust: {
      eyebrow: 'Trust, reimagined',
      title: 'Trust does not need to sound loud.',
      quote: '“I look fresher, but no one can say why.”',
      fragments: ['no pressure', 'very subtle', 'natural result', 'calm consultation'],
    },
    cta: {
      title: 'Your skin, in its best light.',
      body: 'A calm meeting, a precise plan and care that stays close to natural.',
      primary: 'Book a consultation',
    },
  },
  ru: {
    hero: {
      eyebrow: 'Homepage concept 02',
      title: 'Editorial Presence',
      body: 'Кожа, свет и тишина, выстроенные как wellness кампания. OBLIQ как ощущение, а не стандартная клиника.',
      primary: 'Запросить консультацию',
      secondary: 'Подход OBLIQ',
      note: 'skin in soft daylight',
    },
    pause: 'Beauty that feels like balance.',
    composition: {
      line: 'Естественная кожа. Тихий контур. Свет, который остается.',
      body: 'Визуальный мир близости, воздуха и мягкой точности. Меньше объяснений, больше ощущения.',
      details: ['soft focus', 'natural skin', 'quiet precision'],
    },
    approach: {
      eyebrow: 'The OBLIQ approach',
      title: 'Мы не меняем лицо. Мы уточняем свет, баланс и комфорт в коже.',
      layers: [
        {
          title: 'Skin first',
          body: 'Каждый план начинается с качества кожи и завершается результатом, который выглядит естественно.',
        },
        {
          title: 'Measured care',
          body: 'Каждое вмешательство маленькое, точное и создано вокруг лица, а не тренда.',
        },
        {
          title: 'Long view',
          body: 'Уход задуман как устойчивое состояние, а не короткий визуальный эффект.',
        },
      ],
    },
    atmosphere: {
      title: 'Пространство, которое говорит тихо.',
      captions: ['мягкий дневной свет', 'спокойные материалы', 'личное присутствие'],
    },
    trust: {
      eyebrow: 'Trust, reimagined',
      title: 'Доверию не нужно звучать громко.',
      quote: '“Я выгляжу свежее, но никто не может сказать почему.”',
      fragments: ['без давления', 'очень деликатно', 'естественный результат', 'спокойная консультация'],
    },
    cta: {
      title: 'Your skin, in its best light.',
      body: 'Спокойная встреча, точный план и уход, который остается близким к естественному.',
      primary: 'Записаться на консультацию',
    },
  },
};

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, margin: '-90px' },
};

function LocalLink({
  href,
  children,
  variant = 'dark',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'ghost';
}) {
  const { localizeHref } = useLocale();

  const className =
    variant === 'ghost'
      ? 'inline-flex items-center justify-center rounded-full border border-[#F2EEEC]/22 bg-[#F2EEEC]/8 px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#F2EEEC] backdrop-blur-xl transition duration-500 hover:bg-[#F2EEEC]/14'
      : variant === 'light'
        ? 'inline-flex items-center justify-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#38322C] shadow-[0_24px_50px_-30px_rgba(56,50,44,0.55)] transition duration-500 hover:-translate-y-0.5'
        : 'inline-flex items-center justify-center gap-2 rounded-full bg-[#38322C] px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#F2EEEC] shadow-[0_24px_50px_-30px_rgba(56,50,44,0.42)] transition duration-500 hover:-translate-y-0.5';

  return (
    <a href={localizeHref(href)} className={className}>
      {children}
      {variant === 'ghost' ? null : <ArrowRight className="h-4 w-4" strokeWidth={1.45} />}
    </a>
  );
}

function OrganicShape({ className }: { className: string }) {
  return <div aria-hidden className={`pointer-events-none absolute ${className}`} />;
}

function HeroSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].hero;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -42]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden bg-[#38322C] text-[#F2EEEC]">
      <motion.video
        style={{ y: mediaY, scale: 1.08 }}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-[112%] w-full object-cover object-[40%_center] opacity-80"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.8)_0%,rgba(56,50,44,0.36)_42%,rgba(56,50,44,0.14)_100%),linear-gradient(180deg,rgba(56,50,44,0.18)_0%,rgba(56,50,44,0.08)_50%,rgba(56,50,44,0.72)_100%)]" />
      <OrganicShape className="right-[8%] top-[18%] h-48 w-72 rounded-[55%_45%_48%_52%/42%_58%_44%_56%] bg-[linear-gradient(135deg,rgba(216,205,192,0.36),rgba(172,178,202,0.12))] blur-2xl" />
      <OrganicShape className="bottom-[9%] left-[48%] h-36 w-60 rounded-[48%_52%_64%_36%/54%_38%_62%_46%] bg-[linear-gradient(135deg,rgba(151,116,96,0.28),rgba(242,238,236,0.18))] blur-xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] px-5 pb-14 pt-32 sm:px-8 lg:px-12">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-auto grid w-full gap-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(16rem,0.34fr)] lg:items-end"
        >
          <div className="max-w-[46rem] pb-[8vh] lg:ml-[5vw]">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#D8CDC0]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-7 max-w-[42rem] text-6xl font-normal leading-[0.94] text-[#F2EEEC] sm:text-8xl lg:text-9xl">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-[29rem] text-[1rem] leading-relaxed text-[#F2EEEC]/78 sm:text-[1.08rem]">
              {copy.body}
            </p>
          </div>

          <div className="mb-[12vh] flex flex-col items-start gap-8 lg:items-end">
            <p className="max-w-[13rem] text-left text-[0.72rem] uppercase leading-relaxed tracking-[0.28em] text-[#D8CDC0]/88 lg:text-right">
              {copy.note}
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <LocalLink href="/#contact" variant="light">
                {copy.primary}
              </LocalLink>
              <LocalLink href="/the-obliq-approach" variant="ghost">
                {copy.secondary}
              </LocalLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PauseSection() {
  const { locale } = useLocale();

  return (
    <section className="relative flex min-h-[82vh] items-center overflow-hidden bg-[#F2EEEC] px-5 py-24 text-[#38322C] sm:px-8 lg:px-12">
      <OrganicShape className="left-[12%] top-[18%] h-40 w-72 rounded-[52%_48%_44%_56%/58%_42%_52%_48%] bg-[linear-gradient(135deg,rgba(216,205,192,0.72),rgba(242,238,236,0.08))] blur-xl" />
      <motion.p
        {...reveal}
        className="relative mx-auto max-w-[74rem] text-6xl font-normal leading-[0.98] sm:text-8xl lg:text-[8.5rem]"
      >
        {copyByLocale[locale].pause}
      </motion.p>
    </section>
  );
}

function EditorialCompositionSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].composition;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] px-5 py-20 text-[#38322C] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="relative mx-auto min-h-[54rem] max-w-[1400px]">
        <OrganicShape className="left-[42%] top-[16%] h-52 w-80 rounded-[58%_42%_62%_38%/46%_58%_42%_54%] bg-[linear-gradient(135deg,rgba(186,176,168,0.7),rgba(172,178,202,0.18))] blur-lg" />
        <OrganicShape className="bottom-[18%] right-[9%] h-48 w-48 rounded-[42%_58%_46%_54%/50%_42%_58%_50%] bg-[radial-gradient(circle_at_35%_35%,rgba(242,238,236,0.9),rgba(151,116,96,0.24))] blur-sm" />

        <motion.div {...reveal} className="absolute left-0 top-0 h-[37rem] w-[68%] overflow-hidden rounded-[3.25rem] shadow-[0_44px_100px_-64px_rgba(56,50,44,0.5)] sm:w-[55%]">
          <ImageWithFallback
            src="/doctor-portrait-1.png"
            alt="OBLIQ editorial portrait"
            className="h-full w-full object-cover object-[50%_28%]"
          />
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="absolute right-0 top-[9rem] h-[18rem] w-[44%] overflow-hidden rounded-[2.4rem] shadow-[0_34px_74px_-52px_rgba(56,50,44,0.42)] sm:right-[8%] sm:w-[28%]"
        >
          <ImageWithFallback
            src="/section-2-clinical-closeup.png"
            alt="Close-up skin texture"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.16 }}
          className="absolute bottom-[4rem] left-[16%] h-[17rem] w-[45%] overflow-hidden rounded-[2.6rem] shadow-[0_34px_86px_-56px_rgba(56,50,44,0.38)] sm:w-[27%]"
        >
          <ImageWithFallback
            src="/hero-exosome-treatment.png"
            alt="Soft treatment detail"
            className="h-full w-full object-cover object-[46%_center]"
          />
        </motion.div>

        <motion.div
          {...reveal}
          className="absolute bottom-0 right-0 max-w-[31rem] bg-[#F2EEEC]/58 pb-2 pl-4 pt-4 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-0"
        >
          <h2 className="text-4xl font-normal leading-tight text-[#38322C] sm:text-6xl">
            {copy.line}
          </h2>
          <p className="mt-7 max-w-[25rem] text-[1.02rem] leading-relaxed text-[#635C54]">
            {copy.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {copy.details.map((detail) => (
              <span key={detail} className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">
                {detail}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].approach;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#D8CDC0_0%,#F2EEEC_48%,#BAB0A8_100%)] px-5 py-24 text-[#38322C] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="absolute inset-0 opacity-35">
        <ImageWithFallback
          src="/facial-focus-face.jpg"
          alt=""
          className="h-full w-full object-cover object-[50%_35%] mix-blend-soft-light"
        />
      </div>
      <div className="absolute inset-0 bg-[#F2EEEC]/64" />
      <div className="relative mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div {...reveal} className="lg:sticky lg:top-32">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#876856]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-8 max-w-[43rem] text-5xl font-normal leading-[1.02] text-[#38322C] sm:text-7xl">
            {copy.title}
          </h2>
        </motion.div>

        <div className="space-y-16 pt-4 lg:pt-28">
          {copy.layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.08 }}
              className="grid gap-6 border-t border-[#635C54]/18 pt-8 sm:grid-cols-[8rem_1fr]"
            >
              <span className="text-[0.72rem] uppercase tracking-[0.28em] text-[#977460]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-2xl font-normal text-[#38322C] sm:text-3xl">{layer.title}</h3>
                <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-[#635C54]">
                  {layer.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AtmosphereSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].atmosphere;

  return (
    <section className="relative overflow-hidden bg-[#38322C] py-24 text-[#F2EEEC] sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.h2 {...reveal} className="max-w-[48rem] text-5xl font-normal leading-[1] sm:text-7xl">
          {copy.title}
        </motion.h2>
      </div>

      <div className="mt-20 flex gap-5 overflow-x-auto px-5 pb-8 sm:px-8 lg:px-12">
        {[
          ['/clinic-space/reception.jpg', 'Reception interior'],
          ['/clinic-space/consultation-wide.jpg', 'Consultation space'],
          ['/clinic-space/treatment-room-forma.jpg', 'Treatment room'],
          ['/clinic-space/consultation-detail.jpg', 'Consultation detail'],
        ].map(([src, alt], index) => (
          <motion.figure
            key={src}
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.08 }}
            className={`relative flex-none overflow-hidden rounded-[2.5rem] ${index % 2 === 0 ? 'mt-0 h-[34rem] w-[76vw] sm:w-[38rem]' : 'mt-20 h-[28rem] w-[72vw] sm:w-[32rem]'}`}
          >
            <ImageWithFallback src={src} alt={alt} className="h-full w-full object-cover" />
            <figcaption className="absolute bottom-6 left-6 text-[0.7rem] uppercase tracking-[0.28em] text-[#F2EEEC]/78">
              {copy.captions[index % copy.captions.length]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].trust;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] px-5 py-28 text-[#38322C] sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <OrganicShape className="right-[7%] top-[16%] h-56 w-80 rounded-[60%_40%_52%_48%/50%_44%_56%_50%] bg-[linear-gradient(135deg,rgba(172,178,202,0.22),rgba(216,205,192,0.62))] blur-xl" />
      <div className="relative mx-auto min-h-[38rem] max-w-[1180px]">
        <motion.p {...reveal} className="text-[0.68rem] uppercase tracking-[0.32em] text-[#876856]">
          {copy.eyebrow}
        </motion.p>
        <motion.h2 {...reveal} className="mt-8 max-w-[38rem] text-5xl font-normal leading-[1.02] sm:text-7xl">
          {copy.title}
        </motion.h2>
        <motion.blockquote
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          className="ml-auto mt-24 max-w-[44rem] text-4xl font-normal leading-tight text-[#635C54] sm:text-6xl"
        >
          {copy.quote}
        </motion.blockquote>
        {copy.fragments.map((fragment, index) => (
          <motion.p
            key={fragment}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.12 + index * 0.05 }}
            className={`absolute hidden text-[0.86rem] uppercase tracking-[0.24em] text-[#977460] sm:block ${
              index === 0
                ? 'left-[4%] bottom-[18%]'
                : index === 1
                  ? 'right-[8%] top-[28%]'
                  : index === 2
                    ? 'left-[36%] bottom-[4%]'
                    : 'right-[0%] bottom-[22%]'
            }`}
          >
            {fragment}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].cta;

  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-[#38322C] px-5 py-28 text-[#F2EEEC] sm:px-8 lg:px-12">
      <ImageWithFallback
        src="/precision-art-hero-2.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-52"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.86)_0%,rgba(56,50,44,0.52)_54%,rgba(56,50,44,0.28)_100%),linear-gradient(180deg,rgba(56,50,44,0.2)_0%,rgba(56,50,44,0.72)_100%)]" />
      <OrganicShape className="bottom-[16%] right-[18%] h-52 w-80 rounded-[48%_52%_44%_56%/54%_42%_58%_46%] bg-[linear-gradient(135deg,rgba(216,205,192,0.2),rgba(151,116,96,0.2))] blur-xl" />

      <motion.div {...reveal} className="relative mx-auto flex min-h-[62vh] max-w-[1320px] flex-col justify-end">
        <h2 className="max-w-[58rem] text-6xl font-normal leading-[0.96] sm:text-8xl lg:text-9xl">
          {copy.title}
        </h2>
        <div className="mt-10 flex max-w-[46rem] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[27rem] text-[1.06rem] leading-relaxed text-[#F2EEEC]/78">
            {copy.body}
          </p>
          <LocalLink href="/#contact" variant="light">
            {copy.primary}
          </LocalLink>
        </div>
      </motion.div>
    </section>
  );
}

export function HomePageConcept02() {
  return (
    <div className="bg-[#F2EEEC] font-['Matt']">
      <SiteHeader />
      <HeroSection />
      <PauseSection />
      <EditorialCompositionSection />
      <ApproachSection />
      <AtmosphereSection />
      <TrustSection />
      <FinalCtaSection />
      <ConsultationFooter />
    </div>
  );
}
