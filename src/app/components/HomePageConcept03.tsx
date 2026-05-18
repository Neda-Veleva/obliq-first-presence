import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SiteHeader } from './SiteHeader';
import { approachExperienceByLocale } from './ObliqApproachPage';
import { useLocale, type Locale } from '../i18n';

const copyByLocale: Record<
  Locale,
  {
    hero: { eyebrow: string; title: string; note: string; cta: string };
    transition: string;
    composition: {
      title: string;
      fragments: string[];
    };
    philosophy: {
      title: string;
      body: string;
      fragments: string[];
    };
    trust: {
      statements: string[];
      numbers: { value: string; label: string }[];
    };
    space: {
      title: string;
      captions: string[];
    };
    final: { title: string; body: string; cta: string };
  }
> = {
  bg: {
    hero: {
      eyebrow: 'Концепция начална страница 03',
      title: 'Красота, предефинирана тихо.',
      note: 'усъвършенствано естетично преживяване от бъдещето',
      cta: 'влез в преживяването',
    },
    transition: 'Прецизността среща емоцията.',
    composition: {
      title: 'Кожата като жива повърхност.',
      fragments: ['текстура', 'светлина', 'температура', 'тишина', 'дълбочина'],
    },
    philosophy: {
      title: 'Не корекция. Усъвършенстване.',
      body:
        'OBLIQ. мисли лицето като архитектура от светлина, кожа и присъствие. Намесата е тиха. Резултатът е усещане за подреденост, което не се обяснява.',
      fragments: ['по-малко шум', 'повече присъствие', 'човешка прецизност'],
    },
    trust: {
      statements: ['тиха увереност', 'естествени резултати', 'усещане за разбиране', 'без визуален шум'],
      numbers: [
        { value: '01', label: 'личен ритъм' },
        { value: '02', label: 'медицинска мярка' },
        { value: '03', label: 'естествен финал' },
      ],
    },
    space: {
      title: 'Светлина. Материя. Тишина.',
      captions: ['мек праг', 'осезаем покой', 'скулптурирано пространство', 'лична светлина'],
    },
    final: {
      title: 'Твоята кожа, без шум.',
      body: 'Една спокойна среща. Един прецизен план. Красота, която не търси внимание.',
      cta: 'заяви консултация',
    },
  },
  en: {
    hero: {
      eyebrow: 'Homepage concept 03',
      title: 'Beauty, redefined quietly.',
      note: 'advanced beauty experience from the future',
      cta: 'enter the experience',
    },
    transition: 'Precision meets emotion.',
    composition: {
      title: 'Skin as a living surface.',
      fragments: ['texture', 'light', 'temperature', 'silence', 'depth'],
    },
    philosophy: {
      title: 'Not correction. Refinement.',
      body:
        'OBLIQ. treats the face as an architecture of light, skin and presence. The intervention is quiet. The result is a sense of order that does not need to explain itself.',
      fragments: ['less noise', 'more presence', 'human precision'],
    },
    trust: {
      statements: ['quiet confidence', 'natural results', 'felt understood', 'no visual noise'],
      numbers: [
        { value: '01', label: 'personal rhythm' },
        { value: '02', label: 'medical measure' },
        { value: '03', label: 'natural finish' },
      ],
    },
    space: {
      title: 'Light. Material. Silence.',
      captions: ['soft threshold', 'tactile calm', 'sculpted room', 'private light'],
    },
    final: {
      title: 'Your skin, without noise.',
      body: 'One calm meeting. One precise plan. Beauty that does not ask for attention.',
      cta: 'request consultation',
    },
  },
  ru: {
    hero: {
      eyebrow: 'Homepage concept 03',
      title: 'Beauty, redefined quietly.',
      note: 'advanced beauty experience from the future',
      cta: 'войти в опыт',
    },
    transition: 'Precision meets emotion.',
    composition: {
      title: 'Skin as a living surface.',
      fragments: ['texture', 'light', 'temperature', 'silence', 'depth'],
    },
    philosophy: {
      title: 'Not correction. Refinement.',
      body:
        'OBLIQ. воспринимает лицо как архитектуру света, кожи и присутствия. Вмешательство остается тихим. Результат ощущается как порядок, которому не нужны объяснения.',
      fragments: ['less noise', 'more presence', 'human precision'],
    },
    trust: {
      statements: ['quiet confidence', 'natural results', 'felt understood', 'no visual noise'],
      numbers: [
        { value: '01', label: 'личный ритм' },
        { value: '02', label: 'медицинская мера' },
        { value: '03', label: 'естественный финал' },
      ],
    },
    space: {
      title: 'Light. Material. Silence.',
      captions: ['soft threshold', 'tactile calm', 'sculpted room', 'private light'],
    },
    final: {
      title: 'Your skin, without noise.',
      body: 'Одна спокойная встреча. Один точный план. Красота, которая не требует внимания.',
      cta: 'записаться на консультацию',
    },
  },
};

const reveal = {
  initial: { opacity: 0, y: 42, filter: 'blur(16px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, margin: '-110px' },
};

function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { localizeHref } = useLocale();

  return (
    <a
      href={localizeHref(href)}
      className="group inline-flex max-w-full items-center justify-center gap-3 border border-[#F2EEEC]/16 bg-[#F2EEEC]/5 px-4 py-3 text-center text-[0.62rem] uppercase tracking-[0.2em] text-[#F2EEEC]/76 backdrop-blur-2xl transition duration-700 hover:border-[#F2EEEC]/34 hover:bg-[#F2EEEC]/10 hover:text-[#F2EEEC] hover:shadow-[0_0_44px_rgba(242,238,236,0.14)] sm:px-5 sm:tracking-[0.32em]"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition duration-700 group-hover:translate-x-1" strokeWidth={1.35} />
    </a>
  );
}

function AmbientLayer({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const isDark = tone === 'dark';

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: ['-6%', '9%', '-6%'], y: ['2%', '-4%', '2%'], rotate: [0, 4, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute left-[-8%] top-[10%] h-[34rem] w-[42rem] rounded-[58%_42%_64%_36%/48%_58%_42%_52%] blur-3xl ${
          isDark ? 'bg-[#977460]/20' : 'bg-[#D8CDC0]/58'
        }`}
      />
      <motion.div
        animate={{ x: ['8%', '-4%', '8%'], y: ['-5%', '5%', '-5%'], rotate: [0, -5, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute right-[-11%] top-[20%] h-[38rem] w-[34rem] rounded-[44%_56%_48%_52%/56%_44%_52%_48%] blur-3xl ${
          isDark ? 'bg-[#ACB2CA]/15' : 'bg-[#ACB2CA]/24'
        }`}
      />
      <motion.div
        animate={{ y: ['8%', '-6%', '8%'], scale: [1, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute bottom-[-16%] left-[30%] h-[26rem] w-[46rem] rounded-[62%_38%_54%_46%/44%_62%_38%_56%] blur-3xl ${
          isDark ? 'bg-[#8C8E77]/13' : 'bg-[#BAB0A8]/42'
        }`}
      />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(90deg,rgba(242,238,236,0.16)_1px,transparent_1px),linear-gradient(180deg,rgba(242,238,236,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
    </div>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-soft-light"
      style={{
        backgroundImage:
          'linear-gradient(90deg,rgba(242,238,236,0.08) 1px,transparent 1px),linear-gradient(180deg,rgba(56,50,44,0.10) 1px,transparent 1px)',
        backgroundSize: '3px 5px',
      }}
    />
  );
}

function HeroSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].hero;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.75], [0.18, 0.72]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#38322C] text-[#F2EEEC]">
      <motion.video
        style={{ y: mediaY, scale: 1.1 }}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-[112%] w-full object-cover object-[50%_center] opacity-70 contrast-[0.92] saturate-[0.72]"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.92)_0%,rgba(56,50,44,0.26)_48%,rgba(56,50,44,0.78)_100%),linear-gradient(180deg,rgba(56,50,44,0.1)_0%,rgba(56,50,44,0.22)_48%,rgba(56,50,44,0.94)_100%)]" />
      <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-[#38322C]" />
      <AmbientLayer />
      <Grain />

      <motion.div
        animate={{ x: ['0%', '3%', '0%'], y: ['0%', '-4%', '0%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[7%] top-[14%] hidden h-[44vh] w-[22vw] min-w-[14rem] overflow-hidden rounded-[48%_52%_46%_54%/58%_40%_60%_42%] opacity-85 shadow-[0_50px_120px_-70px_rgba(0,0,0,0.8)] md:block"
      >
        <ImageWithFallback
          src="/doctor-portrait-test.png"
          alt=""
          className="h-full w-full object-cover object-[52%_18%] grayscale-[0.16] saturate-[0.76]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(242,238,236,0.05)_0%,rgba(56,50,44,0.42)_100%)]" />
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-[1680px] flex-col px-5 pb-14 pt-28 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="ml-auto hidden max-w-[18rem] text-right text-[0.62rem] uppercase leading-loose tracking-[0.36em] text-[#D8CDC0]/76 sm:block"
        >
          {copy.eyebrow}
        </motion.p>

        <motion.div style={{ y: titleY }} className="mt-auto pb-[10vh]">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[60rem] text-[clamp(3.35rem,9.5vw,10.8rem)] font-extralight leading-[0.84] tracking-[0.02em]"
          >
            {copy.title}
          </motion.h1>
          <div className="mt-12 flex flex-col gap-8 md:ml-[49vw] md:mt-0 md:max-w-[28rem]">
            <p className="max-w-[19rem] text-[0.66rem] uppercase leading-loose tracking-[0.2em] text-[#BAB0A8] sm:max-w-none sm:text-[0.72rem] sm:tracking-[0.32em]">
              {copy.note}
            </p>
            <GhostLink href="/#contact">{copy.cta}</GhostLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TransitionSection() {
  const { locale } = useLocale();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#F2EEEC] px-5 py-28 text-[#38322C] sm:px-8 lg:px-12">
      <AmbientLayer tone="light" />
      <Grain />
      <motion.p
        {...reveal}
        className="relative mx-auto max-w-[68rem] text-center text-[clamp(3.1rem,7.8vw,8.8rem)] font-extralight leading-[0.88] tracking-[0.01em] text-[#38322C]"
      >
        {copyByLocale[locale].transition}
      </motion.p>
      <motion.span
        animate={{ y: ['0%', '-16%', '0%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[16%] right-[12%] h-28 w-52 rounded-[54%_46%_62%_38%/44%_58%_42%_56%] border border-[#977460]/20 bg-[#F2EEEC]/16 backdrop-blur-2xl"
      />
    </section>
  );
}

function SkinCompositionSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].composition;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const driftA = useTransform(scrollYProgress, [0, 1], [-48, 72]);
  const driftB = useTransform(scrollYProgress, [0, 1], [70, -42]);

  const crops = [
    {
      src: '/facial-focus-face.jpg',
      className: 'left-[3%] top-[8%] h-[32rem] w-[38vw] min-w-[17rem]',
      object: 'object-[50%_26%]',
      y: driftA,
    },
    {
      src: '/section-2-clinical-closeup.png',
      className: 'right-[5%] top-[22%] h-[18rem] w-[28vw] min-w-[13rem]',
      object: 'object-center',
      y: driftB,
    },
    {
      src: '/hero-exosome-treatment.png',
      className: 'bottom-[8%] left-[24%] h-[21rem] w-[25vw] min-w-[14rem]',
      object: 'object-[48%_center]',
      y: driftB,
    },
  ];

  return (
    <section ref={ref} className="relative min-h-[104vh] overflow-hidden bg-[#38322C] px-5 py-24 text-[#F2EEEC] sm:px-8 lg:px-12">
      <AmbientLayer />
      <Grain />
      <div className="relative mx-auto min-h-[55rem] max-w-[1560px]">
        <motion.h2
          {...reveal}
          className="absolute left-[12%] top-[34%] z-20 max-w-[33rem] text-[clamp(2.8rem,6.4vw,7rem)] font-extralight leading-[0.88] tracking-[0.015em]"
        >
          {copy.title}
        </motion.h2>

        {crops.map((crop, index) => (
          <motion.figure
            key={crop.src}
            style={{ y: crop.y }}
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.1 }}
            className={`group absolute overflow-hidden rounded-[48%_52%_44%_56%/54%_38%_62%_46%] border border-[#F2EEEC]/10 bg-[#F2EEEC]/5 shadow-[0_60px_130px_-78px_rgba(0,0,0,0.9)] backdrop-blur-xl ${crop.className}`}
          >
            <ImageWithFallback
              src={crop.src}
              alt=""
              className={`h-full w-full object-cover opacity-86 saturate-[0.72] transition duration-[1600ms] group-hover:scale-110 group-hover:opacity-100 ${crop.object}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(242,238,236,0.02)_0%,rgba(56,50,44,0.42)_100%)] transition duration-[1600ms] group-hover:bg-[linear-gradient(180deg,rgba(242,238,236,0)_0%,rgba(56,50,44,0.2)_100%)]" />
          </motion.figure>
        ))}

        {copy.fragments.map((fragment, index) => (
          <motion.span
            key={fragment}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.22 + index * 0.05 }}
            className={`absolute z-30 text-[0.62rem] uppercase tracking-[0.34em] text-[#D8CDC0]/74 ${
              index === 0
                ? 'left-[62%] top-[12%]'
                : index === 1
                  ? 'left-[5%] bottom-[18%]'
                  : index === 2
                    ? 'right-[4%] bottom-[28%]'
                    : index === 3
                      ? 'left-[42%] top-[6%]'
                      : 'right-[31%] bottom-[7%]'
            }`}
          >
            {fragment}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function PhilosophySection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].philosophy;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#D8CDC0_0%,#F2EEEC_46%,#BAB0A8_100%)] px-5 py-28 text-[#38322C] sm:px-8 lg:px-12 lg:py-40">
      <AmbientLayer tone="light" />
      <Grain />
      <div className="relative mx-auto grid min-h-[42rem] max-w-[1450px] gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.h2
          {...reveal}
          className="max-w-[41rem] text-[clamp(3.05rem,7vw,7.8rem)] font-extralight leading-[0.88] tracking-[0.01em]"
        >
          {copy.title}
        </motion.h2>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="self-end lg:pb-16">
          <p className="max-w-[34rem] text-[1.18rem] leading-[1.8] text-[#635C54] sm:text-[1.32rem]">
            {copy.body}
          </p>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
            {copy.fragments.map((fragment) => (
              <span key={fragment} className="text-[0.68rem] uppercase tracking-[0.32em] text-[#876856]">
                {fragment}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TreatmentsSection() {
  const { locale } = useLocale();
  const copy = approachExperienceByLocale[locale];
  const articlesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: articlesRef,
    offset: ['start end', 'end start'],
  });

  // Raw scroll progress often stalls short of 1 before the user "feels" done —
  // keep the first ~78% 1:1 (responsive like before), then gently catch up.
  const lineProgress = useTransform(scrollYProgress, (x) => {
    const v = Math.min(1, Math.max(0, x));
    if (v <= 0.78) return v;
    return Math.min(1, 0.78 + (v - 0.78) * (0.22 / 0.14));
  });

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] py-24 text-[#38322C] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <motion.p {...reveal} className="text-[0.68rem] uppercase tracking-[0.34em] text-[#977460]">
          {copy.eyebrow}
        </motion.p>
        <motion.h2
          {...reveal}
          className="mt-7 max-w-[54rem] text-[clamp(1.65rem,3.6vw,4rem)] font-normal leading-[1.12] tracking-[0.01em]"
        >
          {copy.title}
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.06 }}
          className="mt-10 max-w-[42rem] text-[1.05rem] leading-relaxed text-[#635C54] sm:text-[1.12rem]"
        >
          {copy.body}
        </motion.p>
      </div>

      <div
        ref={articlesRef}
        className="relative mx-auto mt-20 max-w-[1560px] px-5 pb-12 sm:px-8 md:pb-16 lg:px-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-5 top-0 z-10 hidden w-3 sm:left-8 md:block lg:left-12"
        >
          <div className="relative h-full w-full">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#38322C]/16" />
            <motion.div
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 origin-top bg-[#977460] will-change-transform"
              style={{ scaleY: lineProgress }}
            />
          </div>
        </div>

        <div className="space-y-28 sm:mt-0 sm:space-y-36 md:pl-10 lg:pl-12">
        {copy.moments.map((moment, index) => {
          const align = index % 2 === 0 ? 'left' : 'right';
          return (
            <motion.article
              key={moment.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.08 }}
              className={`relative mx-auto min-h-[28rem] max-w-[1560px] px-5 sm:px-8 lg:px-12 ${
                align === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`relative mx-auto aspect-square w-[86%] max-w-[20.5rem] overflow-hidden rounded-full shadow-[0_58px_140px_-88px_rgba(56,50,44,0.78)] md:aspect-auto md:h-[32rem] md:max-w-none md:rounded-[50%] ${
                  align === 'right'
                    ? 'md:ml-auto md:w-[86%] lg:w-[58%]'
                    : 'md:mr-auto md:w-[88%] lg:w-[64%]'
                }`}
              >
                <ImageWithFallback
                  src={moment.image}
                  alt={moment.alt}
                  className="h-full w-full object-cover object-top opacity-90 saturate-[0.72]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,40,36,0.62)_0%,rgba(56,50,44,0.22)_48%,rgba(242,238,236,0.81)_100%)]" />
              </div>
              <div
                className={`relative z-10 -mt-14 max-w-[38rem] sm:-mt-[4.5rem] md:-mt-20 lg:-mt-24 ${
                  align === 'right' ? 'mr-auto lg:ml-[8%]' : 'ml-auto lg:mr-[8%]'
                }`}
              >
                <span className="text-[0.65rem] uppercase tracking-[0.34em] text-[#6E5342]">
                  {moment.eyebrow}
                </span>
                <h3 className="mt-5 text-[clamp(1.25rem,2.85vw,3.2rem)] font-normal leading-[1.15] tracking-[0.01em] text-[#38322C]">
                  {moment.title}
                </h3>
                <p className="mt-7 text-[1.05rem] leading-relaxed text-[#635C54]">{moment.body}</p>
              </div>
            </motion.article>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].trust;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#38322C] px-5 py-28 text-[#F2EEEC] sm:px-8 lg:px-12">
      <AmbientLayer />
      <Grain />
      <div className="relative mx-auto min-h-[34rem] max-w-[1360px]">
        {copy.statements.map((statement, index) => (
          <motion.p
            key={statement}
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.08 }}
            className={`absolute max-w-[30rem] text-[clamp(2.15rem,4.8vw,5.4rem)] font-extralight leading-[0.92] tracking-[0.01em] ${
              index === 0
                ? 'left-0 top-[6%] text-[#F2EEEC]'
                : index === 1
                  ? 'right-[2%] top-[28%] text-[#D8CDC0]'
                  : index === 2
                    ? 'left-[22%] bottom-[8%] text-[#BAB0A8]'
                    : 'right-[12%] bottom-[-4%] text-[#ACB2CA]/86'
            }`}
          >
            {statement}
          </motion.p>
        ))}
        <div className="absolute bottom-[8%] left-0 flex max-w-[46rem] flex-wrap gap-9">
          {copy.numbers.map((number) => (
            <motion.div key={number.value} {...reveal} className="min-w-[9rem] border-t border-[#F2EEEC]/14 pt-5">
              <p className="text-5xl font-extralight text-[#D8CDC0]">{number.value}</p>
              <p className="mt-4 text-[0.66rem] uppercase tracking-[0.3em] text-[#F2EEEC]/58">{number.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaceSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].space;
  const images = [
    '/clinic-space/reception.jpg',
    '/clinic-space/consultation-wide.jpg',
    '/clinic-space/treatment-room-forma.jpg',
    '/clinic-space/consultation-detail.jpg',
    '/clinic-space/treatment-room-front.jpg',
    '/clinic-space/treatment-room-device.jpg',
    '/clinic-space/treatment-room-desk.jpg',
    '/clinic-space/treatment-room-mirror.png',
    '/clinic-space/treatment-room-sink.png',
    '/clinic-space/clinic-lounge-view.jpg',
  ];
  const featuredImages = images.slice(0, 4);
  const additionalImages = images.slice(4);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F2EEEC_0%,#D8CDC0_100%)] px-5 py-28 text-[#38322C] sm:px-8 lg:px-12 lg:py-40">
      <Grain />
      <div className="relative mx-auto min-h-[62rem] max-w-[1520px]">
        <motion.h2
          {...reveal}
          className="absolute left-0 top-0 z-20 max-w-[42rem] text-[clamp(3.05rem,7vw,7.6rem)] font-extralight leading-[0.88] tracking-[0.01em]"
        >
          {copy.title}
        </motion.h2>

        {featuredImages.map((image, index) => (
          <motion.figure
            key={image}
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.08 }}
            className={`absolute overflow-hidden shadow-[0_48px_120px_-86px_rgba(56,50,44,0.72)] ${
              index === 0
                ? 'right-0 top-[2%] h-[28rem] w-[43%] rounded-[50%_50%_44%_56%/46%_58%_42%_54%]'
                : index === 1
                  ? 'left-[8%] top-[34%] h-[30rem] w-[46%] rounded-[44%_56%_58%_42%/52%_44%_56%_48%]'
                  : index === 2
                    ? 'right-[14%] top-[48%] h-[22rem] w-[30%] rounded-[56%_44%_42%_58%/46%_54%_48%_52%]'
                    : 'bottom-[0] right-[2%] h-[18rem] w-[24%] rounded-[48%_52%_60%_40%/58%_42%_54%_46%]'
            }`}
          >
            <ImageWithFallback src={image} alt="" className="h-full w-full object-cover saturate-[0.72]" />
            <figcaption className="absolute bottom-6 left-6 text-[0.62rem] uppercase tracking-[0.28em] text-[#F2EEEC]/78">
              {copy.captions[index % copy.captions.length]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="relative mx-auto mt-6 grid max-w-[1520px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {additionalImages.map((image, index) => (
          <motion.figure
            key={image}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.2 + index * 0.05 }}
            className="relative h-[22rem] overflow-hidden rounded-[2rem] shadow-[0_32px_90px_-70px_rgba(56,50,44,0.72)]"
          >
            <ImageWithFallback src={image} alt="" className="h-full w-full object-cover saturate-[0.72]" />
            <figcaption className="absolute bottom-6 left-6 text-[0.62rem] uppercase tracking-[0.28em] text-[#F2EEEC]/78">
              {copy.captions[(index + featuredImages.length) % copy.captions.length]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function FinalSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale].final;

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#38322C] px-5 py-16 text-[#F2EEEC] sm:px-8 lg:px-12">
      <video
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-[42%_center] opacity-42 saturate-[0.68]"
      >
        <source src="/contact-hero-clip.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.88)_0%,rgba(56,50,44,0.38)_54%,rgba(56,50,44,0.72)_100%),linear-gradient(180deg,rgba(56,50,44,0.12)_0%,rgba(56,50,44,0.92)_100%)]" />
      <AmbientLayer />
      <Grain />

      <motion.div {...reveal} className="relative mx-auto w-full max-w-[1480px] pb-[9vh]">
        <h2 className="max-w-[64rem] text-[clamp(3.3rem,8.6vw,10rem)] font-extralight leading-[0.84] tracking-[0.01em]">
          {copy.title}
        </h2>
        <div className="mt-12 flex max-w-[58rem] flex-col gap-8 md:ml-auto md:flex-row md:items-end md:justify-between">
          <p className="max-w-[30rem] text-[1.06rem] leading-relaxed text-[#F2EEEC]/72">{copy.body}</p>
          <GhostLink href="/#contact">{copy.cta}</GhostLink>
        </div>
      </motion.div>
    </section>
  );
}

export function HomePageConcept03() {
  return (
    <div className="overflow-x-hidden bg-[#F2EEEC] font-['Matt']">
      <SiteHeader />
      <HeroSection />
      <TransitionSection />
      <SkinCompositionSection />
      <PhilosophySection />
      <TreatmentsSection />
      <TrustSection />
      <SpaceSection />
      <FinalSection />
      <ConsultationFooter />
    </div>
  );
}
