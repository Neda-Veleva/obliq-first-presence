import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { SiteHeader } from './SiteHeader';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AtmosphereOrbs, editorialFade } from './PremiumPagePrimitives';
import { useLocale, type Locale } from '../i18n';

const editorialPresenceCopy: Record<
  Locale,
  {
    hero: {
      eyebrow: string;
      title: string;
      body: string;
      primary: string;
      secondary: string;
    };
    pause: string;
    composition: {
      eyebrow: string;
      title: string;
      body: string;
      notes: string[];
    };
    approach: {
      eyebrow: string;
      title: string;
      layers: { title: string; body: string }[];
    };
    philosophyVideo: {
      eyebrow: string;
      title: string;
      body: string;
      caption: string;
      soundOn: string;
      soundOff: string;
    };
    atmosphere: {
      eyebrow: string;
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
    transition: {
      eyebrow: string;
      title: string;
      body: string;
      items: { value: string; label: string }[];
    };
  }
> = {
  bg: {
    hero: {
      eyebrow: 'Редакционно присъствие',
      title: 'Кожа, светлина, тишина.',
      body:
        'Спокойна естетика с мека светлина и естествено присъствие.',
      primary: 'Заяви консултация',
      secondary: 'Подходът на OBLIQ',
    },
    pause: 'Красота, която се усеща като баланс.',
    composition: {
      eyebrow: 'Присъствие в пластове',
      title: 'OBLIQ комуникира чрез композиция, текстура и внимателно режисирана близост.',
      body:
        'Вместо стандартни карти, образите носят усещане за качество на кожата, мек контур и естествена светлина.',
      notes: ['мек фокус', 'тиха прецизност', 'естествена кожа'],
    },
    approach: {
      eyebrow: 'Подходът на OBLIQ',
      title: 'Модерна естетика, която не променя идентичността. Само връща яснота, баланс и добро усещане в кожата.',
      layers: [
        {
          title: 'Кожата е на първо място',
          body:
            'Всяка стъпка започва от качеството на кожата, а не от агресивна корекция или прекомерна намеса.',
        },
        {
          title: 'Тиха прецизност',
          body:
            'Прецизно планиране, което уважава пропорциите, мимиката и начина, по който лицето носи светлината.',
        },
        {
          title: 'Дългосрочна грижа',
          body:
            'Резултатът е замислен като устойчиво състояние, не като еднократен визуален ефект.',
        },
      ],
    },
    philosophyVideo: {
      eyebrow: 'Философията зад бранда',
      title: 'Видео разказ, който влиза в ритъм със скрола и оставя усещане за мярка, тишина и внимателна грижа.',
      body:
        'Тази секция може да носи по-емоционалната история на OBLIQ. Когато видеото влезе в изгледа, то започва да се движи естествено, а звукът остава под контрола на клиента.',
      caption: 'Спокойна визуална история за светлина, кожа и философията на OBLIQ.',
      soundOn: 'Пусни звук',
      soundOff: 'Спри звук',
    },
    atmosphere: {
      eyebrow: 'Атмосфера',
      title: 'Пространство, което говори тихо.',
      captions: [
        'мека дневна светлина',
        'спокойни материали',
        'прецизна тишина',
        'лично усещане за комфорт',
      ],
    },
    trust: {
      eyebrow: 'Доверието, преосмислено',
      title: 'Доверието тук не идва от шум. То идва от мярка.',
      quote: '“Нищо не изглежда направено. Просто изглеждам по-спокойна, по-свежа и повече като себе си.”',
      fragments: [
        'много фино',
        'усетих внимание, не натиск',
        'резултатът остана естествен',
        'спокойствие още от консултацията',
      ],
    },
    cta: {
      title: 'Твоята кожа в най-добрата си светлина.',
      body:
        'Едно по-тихо, по-редакционно присъствие за OBLIQ. Спокойна консултация, прецизен план и грижа, която остава естествена.',
      primary: 'Запази своята консултация',
    },
    transition: {
      eyebrow: 'Как протича',
      title: 'Спокойно начало, ясен план, прецизна грижа.',
      body: 'Кратък процес, създаден да носи яснота още от първата среща.',
      items: [
        { value: '01', label: 'лична консултация' },
        { value: '02', label: 'индивидуален план' },
        { value: '03', label: 'естествен резултат' },
      ],
    },
  },
  en: {
    hero: {
      eyebrow: 'Editorial Presence',
      title: 'Skin, light and stillness in a more emotional rhythm.',
      body:
        'Aesthetic dermatology presented like a calm luxury wellness campaign. Less explanation. More atmosphere, confidence and soft daylight.',
      primary: 'Request a consultation',
      secondary: 'The OBLIQ approach',
    },
    pause: 'Feel good in your skin.',
    composition: {
      eyebrow: 'Presence in layers',
      title: 'OBLIQ communicates through composition, texture and carefully directed closeness.',
      body:
        'Instead of standard cards, the imagery carries the feeling of skin quality, soft contour and natural light.',
      notes: ['soft focus', 'quiet precision', 'natural skin'],
    },
    approach: {
      eyebrow: 'The OBLIQ approach',
      title: 'A modern aesthetic that does not change identity. It simply brings back clarity, balance and comfort in your skin.',
      layers: [
        {
          title: 'Skin-first thinking',
          body:
            'Every step begins with skin quality rather than aggressive correction or unnecessary intervention.',
        },
        {
          title: 'Quiet tailoring',
          body:
            'Careful planning that respects proportion, expression and the way the face holds light.',
        },
        {
          title: 'Long-view care',
          body:
            'The result is designed as a sustainable state, not a one-time visual effect.',
        },
      ],
    },
    philosophyVideo: {
      eyebrow: 'The philosophy behind the brand',
      title: 'A video story that comes alive on scroll and leaves a sense of restraint, calm and careful care.',
      body:
        'This section can carry the more emotional layer of OBLIQ. As the video enters the viewport it begins to play naturally, while sound stays fully in the visitor’s control.',
      caption: 'A calm visual narrative about light, skin and the philosophy behind OBLIQ.',
      soundOn: 'Enable sound',
      soundOff: 'Mute sound',
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'A space that speaks quietly.',
      captions: ['soft daylight', 'calm materials', 'precise stillness', 'personal comfort'],
    },
    trust: {
      eyebrow: 'Trust, reimagined',
      title: 'Trust here does not come from noise. It comes from restraint.',
      quote:
        '“Nothing looks done. I simply look calmer, fresher and more like myself.”',
      fragments: [
        'very subtle',
        'I felt care, not pressure',
        'the result stayed natural',
        'calm from the first consultation',
      ],
    },
    cta: {
      title: 'Your skin, in its best light.',
      body:
        'A quieter, more editorial digital presence for OBLIQ. Calm consultation, precise planning and care that stays natural.',
      primary: 'Book your consultation',
    },
    transition: {
      eyebrow: 'What to expect',
      title: 'A calm beginning, a clear plan, precise care.',
      body: 'A concise process designed to create clarity from the very first meeting.',
      items: [
        { value: '01', label: 'personal consultation' },
        { value: '02', label: 'individual plan' },
        { value: '03', label: 'natural result' },
      ],
    },
  },
  ru: {
    hero: {
      eyebrow: 'Editorial Presence',
      title: 'Кожа, свет и тишина в более эмоциональном ритме.',
      body:
        'Эстетическая дерматология, поданная как спокойная luxury wellness кампания. Меньше объяснений. Больше атмосферы, уверенности и мягкого дневного света.',
      primary: 'Запросить консультацию',
      secondary: 'Подход OBLIQ',
    },
    pause: 'Feel good in your skin.',
    composition: {
      eyebrow: 'Presence in layers',
      title: 'OBLIQ говорит через композицию, текстуру и тщательно выстроенную близость.',
      body:
        'Вместо стандартных карточек атмосферу передают изображения, качество кожи, мягкий контур и естественный свет.',
      notes: ['soft focus', 'quiet precision', 'natural skin'],
    },
    approach: {
      eyebrow: 'The OBLIQ approach',
      title: 'Современная эстетика, которая не меняет идентичность. Она возвращает ясность, баланс и комфорт в собственной коже.',
      layers: [
        {
          title: 'Skin-first thinking',
          body:
            'Каждый шаг начинается с качества кожи, а не с агрессивной коррекции или лишнего вмешательства.',
        },
        {
          title: 'Quiet tailoring',
          body:
            'Точное планирование, которое уважает пропорции, мимику и то, как лицо принимает свет.',
        },
        {
          title: 'Long-view care',
          body:
            'Результат задуман как устойчивое состояние, а не как одноразовый визуальный эффект.',
        },
      ],
    },
    philosophyVideo: {
      eyebrow: 'Философия бренда',
      title: 'Видеоистория, которая оживает при скролле и оставляет ощущение меры, тишины и внимательного ухода.',
      body:
        'Этот блок может передавать более эмоциональный слой OBLIQ. Когда видео попадает в область видимости, оно начинает проигрываться естественно, а звук полностью остается под контролем посетителя.',
      caption: 'Спокойный визуальный рассказ о свете, коже и философии OBLIQ.',
      soundOn: 'Включить звук',
      soundOff: 'Выключить звук',
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'Пространство, которое говорит тихо.',
      captions: ['мягкий дневной свет', 'спокойные материалы', 'точная тишина', 'личный комфорт'],
    },
    trust: {
      eyebrow: 'Trust, reimagined',
      title: 'Доверие здесь рождается не из шума. Оно рождается из меры.',
      quote:
        '“Ничего не выглядит сделанным. Я просто выгляжу спокойнее, свежее и больше похожа на себя.”',
      fragments: [
        'очень деликатно',
        'я почувствовала внимание, а не давление',
        'результат остался естественным',
        'спокойствие уже на консультации',
      ],
    },
    cta: {
      title: 'Your skin, in its best light.',
      body:
        'Более тихое, более редакционное цифровое присутствие для OBLIQ. Спокойная консультация, точный план и уход, который остается естественным.',
      primary: 'Записаться на консультацию',
    },
    transition: {
      eyebrow: 'Как это проходит',
      title: 'Спокойное начало, ясный план, точный уход.',
      body: 'Краткий процесс, который создает ясность уже с первой встречи.',
      items: [
        { value: '01', label: 'личная консультация' },
        { value: '02', label: 'индивидуальный план' },
        { value: '03', label: 'естественный результат' },
      ],
    },
  },
};

function EditorialLink({
  href,
  label,
  secondary = false,
  light = false,
}: {
  href: string;
  label: string;
  secondary?: boolean;
  light?: boolean;
}) {
  const { localizeHref } = useLocale();

  return (
    <a
      href={localizeHref(href)}
      className={
        secondary
          ? light
            ? 'inline-flex items-center rounded-full border border-[#BAB0A8]/40 bg-[#F2EEEC]/72 px-6 py-3 text-[0.74rem] uppercase tracking-[0.24em] text-[#635C54] backdrop-blur-xl transition duration-500 hover:bg-[#F2EEEC]'
            : 'inline-flex items-center rounded-full border border-[#F2EEEC]/16 bg-[#F2EEEC]/8 px-6 py-3 text-[0.74rem] uppercase tracking-[0.24em] text-[#F2EEEC]/84 backdrop-blur-xl transition duration-500 hover:bg-[#F2EEEC]/12'
          : light
            ? 'inline-flex items-center gap-2 rounded-full bg-[#38322C] px-6 py-3 text-[0.74rem] uppercase tracking-[0.24em] text-[#F2EEEC] shadow-[0_24px_50px_-28px_rgba(56,50,44,0.42)] transition duration-500 hover:-translate-y-0.5'
            : 'inline-flex items-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-3 text-[0.74rem] uppercase tracking-[0.24em] text-[#38322C] shadow-[0_24px_50px_-28px_rgba(56,50,44,0.6)] transition duration-500 hover:-translate-y-0.5'
      }
    >
      {label}
      {secondary ? null : <ArrowRight className="h-4 w-4" strokeWidth={1.6} />}
    </a>
  );
}

function HeroSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].hero;
  const heroNote =
    locale === 'bg'
      ? {
          label: 'мека дневна светлина',
          body: 'Кинематографично присъствие с тиха, мека преливка.',
        }
      : locale === 'ru'
        ? {
            label: 'мягкий дневной свет',
            body: 'Спокойное кинематографичное первое впечатление, построенное вокруг кожи, света и редакционной воздушности.',
          }
        : {
            label: 'soft daylight',
            body: 'A calm, cinematic first impression built around skin, light and editorial spacing.',
          };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F4F0EC_0%,#EFE7E0_50%,#E7DBD1_100%)] text-[#38322C]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(242,238,236,0.96),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(172,178,202,0.14),transparent_22%),linear-gradient(180deg,rgba(242,238,236,0.24)_0%,rgba(216,205,192,0.08)_100%)]" />
      <div className="absolute inset-y-0 left-0 right-0 overflow-hidden">
        <video
          autoPlay
          muted
          defaultMuted
          playsInline
          preload="auto"
          className="absolute left-0 top-0 h-full w-full object-cover object-[42%_center] opacity-[0.94] lg:w-[50%]"
        >
          <source src="/journal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.22)_0%,rgba(56,50,44,0.1)_22%,rgba(244,240,236,0.08)_34%,rgba(244,240,236,0.3)_42%,rgba(244,240,236,0.62)_50%,rgba(244,240,236,0.9)_60%,rgba(244,240,236,0.98)_100%)]" />
        <div className="absolute inset-y-0 right-[42%] w-[24%] bg-[linear-gradient(90deg,rgba(244,240,236,0)_0%,rgba(244,240,236,0.1)_18%,rgba(244,240,236,0.42)_48%,rgba(244,240,236,0.78)_72%,rgba(244,240,236,0.98)_100%)] blur-[28px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,240,236,0.22)_0%,rgba(244,240,236,0.02)_22%,rgba(56,50,44,0.08)_72%,rgba(56,50,44,0.22)_100%)]" />
      </div>

      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-10%] top-[2%] h-[22rem] w-[22rem] bg-[#D8CDC0]/34 blur-[120px]' },
          { className: 'right-[0%] top-[8%] h-[18rem] w-[18rem] bg-[#ACB2CA]/12 blur-[120px]' },
          { className: 'bottom-[-14%] left-[34%] h-[20rem] w-[26rem] bg-[#977460]/12 blur-[135px]' },
        ]}
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-16 pt-24 sm:px-6 sm:pb-22 lg:px-8 lg:pb-24 lg:pt-30">
        <div className="relative flex min-h-[32rem] items-center sm:min-h-[38rem] lg:min-h-[44rem] xl:min-h-[49rem]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 ml-auto max-w-[31rem] py-6 lg:mr-[6%] lg:max-w-[25rem] lg:py-8"
          >
            <p className="text-[0.66rem] uppercase tracking-[0.34em] text-[#876856]">
              {copy.eyebrow}
            </p>
            <h1
              className="mt-4 max-w-[18rem] text-[#38322C]"
              style={{
                fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)',
                lineHeight: 1.06,
                fontWeight: 400,
                letterSpacing: '-0.04em',
              }}
            >
              {copy.title}
            </h1>

            <p className="mt-7 max-w-[22rem] text-[0.98rem] leading-relaxed text-[#635C54] sm:text-[1.04rem]">
              {copy.body}
            </p>

            <div className="mt-6 max-w-[18rem]">
              <p className="text-[0.7rem] uppercase tracking-[0.26em] text-[#876856]">
                {heroNote.label}
              </p>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-[#635C54]">
                {heroNote.body}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <EditorialLink href="/#contact" label={copy.primary} light />
              <EditorialLink href="/the-obliq-approach" label={copy.secondary} secondary light />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PauseSection() {
  const { locale } = useLocale();
  const pause = editorialPresenceCopy[locale].pause;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...editorialFade}
          className="max-w-4xl text-[#38322C]"
          style={{
            fontSize: 'clamp(2.7rem, 7vw, 6.6rem)',
            lineHeight: 0.96,
            fontWeight: 400,
            letterSpacing: '-0.06em',
          }}
        >
          {pause}
        </motion.p>
      </div>
    </section>
  );
}

function EditorialCompositionSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].composition;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] px-5 pb-28 sm:px-8 sm:pb-36 lg:px-10 lg:pb-44">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[4%] top-[18%] h-48 w-48 bg-[#D8CDC0]/55 blur-[90px]' },
          { className: 'right-[8%] top-[34%] h-56 w-56 bg-[#ACB2CA]/22 blur-[95px]' },
        ]}
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          {...editorialFade}
          className="relative min-h-[32rem] sm:min-h-[42rem]"
        >
          <div className="absolute left-[4%] top-0 h-[72%] w-[62%] overflow-hidden rounded-[2.75rem] shadow-[0_38px_90px_-50px_rgba(56,50,44,0.45)]">
            <ImageWithFallback
              src="/doctor-portrait-1.png"
              alt="Editorial portrait"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute right-[3%] top-[10%] h-[26%] w-[30%] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-46px_rgba(56,50,44,0.35)]">
            <ImageWithFallback
              src="/section-2-clinical-closeup.png"
              alt="Skin close-up"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute bottom-[5%] left-[22%] h-[28%] w-[34%] overflow-hidden rounded-[2rem] shadow-[0_34px_80px_-48px_rgba(56,50,44,0.34)]">
            <ImageWithFallback
              src="/hero-exosome-treatment.png"
              alt="Treatment detail"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute bottom-[14%] right-[8%] h-36 w-36 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(242,238,236,0.9),rgba(216,205,192,0.58)_44%,rgba(151,116,96,0.28)_100%)] blur-[1px]" />
          <div className="absolute left-[2%] top-[54%] h-28 w-52 rounded-full bg-[linear-gradient(135deg,rgba(186,176,168,0.55),rgba(172,178,202,0.18))] blur-[2px]" />
        </motion.div>

        <div className="relative z-10">
          <motion.p
            {...editorialFade}
            className="text-[0.72rem] uppercase tracking-[0.3em] text-[#876856]"
          >
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.05 }}
            className="mt-6 max-w-[28rem] text-[#38322C]"
            style={{
              fontSize: 'clamp(2.35rem, 5vw, 4.6rem)',
              lineHeight: 0.98,
              fontWeight: 400,
              letterSpacing: '-0.05em',
            }}
          >
            {copy.title}
          </motion.h2>
          <motion.p
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.12 }}
            className="mt-6 max-w-[24rem] text-[1rem] leading-relaxed text-[#635C54]"
          >
            {copy.body}
          </motion.p>
          <div className="mt-10 flex flex-wrap gap-3">
            {copy.notes.map((note, index) => (
              <motion.div
                key={note}
                {...editorialFade}
                transition={{ ...editorialFade.transition, delay: 0.16 + index * 0.05 }}
                className="rounded-full border border-[#BAB0A8]/40 bg-[#F2EEEC]/72 px-5 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-[#635C54] backdrop-blur-md"
              >
                {note}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].approach;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#EEE7E1_0%,#E6DED8_100%)] px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(172,178,202,0.16),transparent_24%),radial-gradient(circle_at_18%_70%,rgba(151,116,96,0.14),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-18">
        <motion.div {...editorialFade} className="max-w-[26rem]">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#876856]">
            {copy.eyebrow}
          </p>
          <h2
            className="mt-6 text-[#38322C]"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 3.4rem)',
              lineHeight: 0.94,
              fontWeight: 400,
              letterSpacing: '-0.055em',
            }}
          >
            {copy.title}
          </h2>
        </motion.div>

        <div className="grid gap-5">
          {copy.layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.08 }}
              className="max-w-[34rem] rounded-[2rem] border border-[#BAB0A8]/26 bg-[#F2EEEC]/60 px-6 py-6 shadow-[0_32px_70px_-50px_rgba(56,50,44,0.28)] backdrop-blur-sm sm:px-8 sm:py-7"
            >
              <p className="text-[0.8rem] uppercase tracking-[0.24em] text-[#876856]">
                {layer.title}
              </p>
              <p className="mt-3 text-[1rem] leading-relaxed text-[#635C54]">{layer.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyVideoSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].philosophyVideo;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise) {
            playPromise.catch(() => {});
          }
          return;
        }

        video.pause();
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#EEE7E1_0%,#F4F0EC_100%)] px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(216,205,192,0.36),transparent_24%),radial-gradient(circle_at_82%_70%,rgba(172,178,202,0.14),transparent_26%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="max-w-[28rem]">
          <motion.p
            {...editorialFade}
            className="text-[0.72rem] uppercase tracking-[0.3em] text-[#876856]"
          >
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.05 }}
            className="mt-6 text-[#38322C]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 2.8rem)',
              lineHeight: 0.96,
              fontWeight: 400,
              letterSpacing: '-0.05em',
            }}
          >
            {copy.title}
          </motion.h2>
          <motion.p
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.12 }}
            className="mt-6 text-[1rem] leading-relaxed text-[#635C54]"
          >
            {copy.body}
          </motion.p>
        </div>

        <motion.div
          {...editorialFade}
          transition={{ ...editorialFade.transition, delay: 0.08 }}
          className="relative overflow-hidden rounded-[2.6rem] bg-[#D8CDC0]/26 p-3 shadow-[0_42px_100px_-58px_rgba(56,50,44,0.42)]"
        >
          <div className="relative overflow-hidden rounded-[2rem]">
            <video
              ref={videoRef}
              muted
              defaultMuted
              loop
              playsInline
              preload="metadata"
              className="aspect-[4/5] w-full object-cover object-center sm:aspect-[16/10]"
            >
              <source src="/obliq-approach-hero.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.06)_0%,rgba(56,50,44,0.12)_44%,rgba(56,50,44,0.42)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <p className="max-w-[20rem] text-[0.72rem] uppercase tracking-[0.22em] text-[#F2EEEC]/86">
                {copy.caption}
              </p>
              <button
                type="button"
                onClick={toggleMuted}
                aria-pressed={!isMuted}
                aria-label={isMuted ? copy.soundOn : copy.soundOff}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F2EEEC]/24 bg-[#F2EEEC]/14 text-[#F2EEEC] backdrop-blur-md transition duration-300 hover:bg-[#F2EEEC]/20"
              >
                {isMuted ? <VolumeX className="h-5 w-5" strokeWidth={1.8} /> : <Volume2 className="h-5 w-5" strokeWidth={1.8} />}
              </button>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#F2EEEC]/26" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AtmosphereSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].atmosphere;
  const images = [
    { src: '/clinic-space/reception.jpg', alt: 'Reception', className: 'lg:translate-y-0' },
    { src: '/clinic-space/consultation-wide.jpg', alt: 'Consultation room', className: 'lg:translate-y-16' },
    { src: '/clinic-space/treatment-room-forma.jpg', alt: 'Treatment room', className: 'lg:-translate-y-6' },
    { src: '/clinic-space/consultation-detail.jpg', alt: 'Interior detail', className: 'lg:translate-y-14' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#38322C] px-5 py-28 text-[#F2EEEC] sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,205,192,0.18),transparent_20%),radial-gradient(circle_at_82%_30%,rgba(172,178,202,0.1),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div {...editorialFade} className="max-w-[34rem]">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#BAB0A8]">
            {copy.eyebrow}
          </p>
          <h2
            className="mt-6 text-[#F2EEEC]"
            style={{
              fontSize: 'clamp(2.8rem, 5.6vw, 5.2rem)',
              lineHeight: 0.96,
              fontWeight: 400,
              letterSpacing: '-0.05em',
            }}
          >
            {copy.title}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {images.map((image, index) => (
            <motion.figure
              key={image.src}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.06 }}
              className={image.className}
            >
              <div className="overflow-hidden rounded-[2rem] bg-[#F2EEEC]/8 shadow-[0_36px_80px_-48px_rgba(0,0,0,0.55)]">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="h-[21rem] w-full object-cover object-center"
                />
              </div>
              <figcaption className="pt-4 text-[0.78rem] uppercase tracking-[0.24em] text-[#D8CDC0]/74">
                {copy.captions[index]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].trust;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <motion.p
            {...editorialFade}
            className="text-[0.72rem] uppercase tracking-[0.3em] text-[#876856]"
          >
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.06 }}
            className="mt-6 max-w-[26rem] text-[#38322C]"
            style={{
              fontSize: 'clamp(2.8rem, 5.4vw, 5rem)',
              lineHeight: 0.96,
              fontWeight: 400,
              letterSpacing: '-0.05em',
            }}
          >
            {copy.title}
          </motion.h2>
          <motion.blockquote
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.12 }}
            className="mt-10 max-w-[38rem] text-[#38322C]"
            style={{
              fontSize: 'clamp(1.8rem, 3.6vw, 3.5rem)',
              lineHeight: 1.04,
              fontWeight: 400,
              letterSpacing: '-0.04em',
            }}
          >
            {copy.quote}
          </motion.blockquote>
        </div>

        <div className="relative min-h-[20rem]">
          {copy.fragments.map((fragment, index) => {
            const positions = [
              'left-[2%] top-[6%]',
              'right-[10%] top-[24%]',
              'left-[12%] top-[54%]',
              'right-[0%] top-[70%]',
            ];

            return (
              <motion.div
                key={fragment}
                {...editorialFade}
                transition={{ ...editorialFade.transition, delay: index * 0.08 }}
                className={`absolute rounded-full border border-[#BAB0A8]/40 bg-[#F2EEEC]/82 px-5 py-4 text-[0.8rem] uppercase tracking-[0.22em] text-[#635C54] shadow-[0_22px_40px_-28px_rgba(56,50,44,0.22)] backdrop-blur-sm ${positions[index]}`}
              >
                {fragment}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].cta;

  return (
    <section className="relative overflow-hidden bg-[#38322C] px-5 py-28 text-[#F2EEEC] sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/precision-art-hero-2.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,50,44,0.86)_12%,rgba(56,50,44,0.42)_48%,rgba(56,50,44,0.84)_100%)]" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          {...editorialFade}
          className="rounded-[2.5rem] border border-[#F2EEEC]/12 bg-[#F2EEEC]/8 px-6 py-14 text-center shadow-[0_40px_90px_-50px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:px-10 sm:py-18 lg:px-16 lg:py-22"
        >
          <h2
            className="mx-auto max-w-3xl text-[#F2EEEC]"
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)',
              lineHeight: 0.94,
              fontWeight: 400,
              letterSpacing: '-0.05em',
            }}
          >
            {copy.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[34rem] text-[1rem] leading-relaxed text-[#F2EEEC]/74 sm:text-[1.08rem]">
            {copy.body}
          </p>
          <div className="mt-10 flex justify-center">
            <EditorialLink href="/#contact" label={copy.primary} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FooterTransitionSection() {
  const { locale } = useLocale();
  const copy = editorialPresenceCopy[locale].transition;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F4F0EC_0%,#EEE5DE_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(216,205,192,0.42),transparent_24%),radial-gradient(circle_at_82%_60%,rgba(172,178,202,0.14),transparent_20%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="h-px w-full bg-[linear-gradient(90deg,rgba(99,92,84,0)_0%,rgba(99,92,84,0.18)_18%,rgba(99,92,84,0.18)_82%,rgba(99,92,84,0)_100%)]" />
        <div className="grid gap-10 pt-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-start lg:gap-16">
          <motion.div {...editorialFade} className="max-w-[24rem]">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#876856]">
              {copy.eyebrow}
            </p>
            <h3
              className="mt-4 text-[#38322C]"
              style={{
                fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
                lineHeight: 0.98,
                fontWeight: 400,
                letterSpacing: '-0.04em',
              }}
            >
              {copy.title}
            </h3>
            <p className="mt-4 max-w-[22rem] text-[0.98rem] leading-relaxed text-[#635C54]">
              {copy.body}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {copy.items.map((item, index) => (
              <motion.div
                key={item.value}
                {...editorialFade}
                transition={{ ...editorialFade.transition, delay: index * 0.06 }}
                className="rounded-[1.6rem] border border-[#BAB0A8]/24 bg-[#F2EEEC]/44 px-5 py-6 shadow-[0_24px_60px_-48px_rgba(56,50,44,0.14)] backdrop-blur-md"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">
                  {item.value}
                </p>
                <p className="mt-3 text-[1rem] leading-relaxed text-[#38322C]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageV3() {
  return (
    <div className="bg-[#F2EEEC]">
      <SiteHeader tone="light" />
      <HeroSection />
      <PauseSection />
      <EditorialCompositionSection />
      <ApproachSection />
      <PhilosophyVideoSection />
      <AtmosphereSection />
      <TrustSection />
      <FinalCtaSection />
      <FooterTransitionSection />
      <ConsultationFooter />
    </div>
  );
}
