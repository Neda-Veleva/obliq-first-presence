import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  AtmosphereOrbs,
  CinematicHero,
  SectionHeading,
  editorialFade,
  useHeroVideoPlayback,
} from './PremiumPagePrimitives';
import { SiteHeader } from './SiteHeader';
import { useLocale, type Locale } from '../i18n';

const philosophyBlocks = [
  {
    title: 'Естествено изглеждаща красота',
    body: 'Подходът в OBLIQ е воден от мярка и прецизност. Целта никога не е промяна на идентичността, а повече яснота, баланс и лице, което остава напълно ваше.',
  },
  {
    title: 'Кожата е на първо място',
    body: 'Здравата и качествена кожа е в основата на естетическата увереност и насочва всяка препоръка много преди да се мисли за обем или контур.',
  },
  {
    title: 'Дългосрочен поглед',
    body: 'Всяко решение се взема с мисъл за бъдещата хармония: как ще се развива кожата, как ще се установят резултатите и как грижата ще остане елегантна във времето.',
  },
] as const;

const journeyMoments = [
  {
    eyebrow: 'Консултация',
    title: 'Първата среща започва със слушане.',
    body: 'Всяка консултация е замислена като спокоен разговор, а не като търговски момент. Притесненията, навиците, предишните терапии и естетичните цели се разбират в контекст, за да започне планът с нюанс, а не с предположения.',
    image: '/doctor-portrait-bg.jpg',
    alt: 'Лекар в спокойна консултативна атмосфера',
  },
  {
    eyebrow: 'Оценка',
    title: 'Разбиране на кожата преди решението за процедура.',
    body: 'Текстурата, тонът, движението, структурният баланс и устойчивостта на кожата се разглеждат заедно. Целта е лицето и кожата да бъдат прочетени като цялостна система, а не като отделни проблеми за бързо коригиране.',
    image: '/section-2-clinical-closeup-1.png',
    alt: 'Клиничен близък кадър на оценка на кожата',
  },
  {
    eyebrow: 'Стратегия',
    title: 'Персонален план, изграден около ритъм, а не около спешност.',
    body: 'Препоръките се подреждат така, че да уважават дългосрочното качество на кожата, естетичната пропорция и възстановяването. Някои планове са насочени към фина превенция, други към постепенно усъвършенстване, но всички са изградени с мисъл за цялостност.',
    image: '/hero-exosome-treatment.png',
    alt: 'Детайл от естетична процедура',
  },
  {
    eyebrow: 'Проследяване',
    title: 'Грижата продължава и след самия час.',
    body: 'Проследяването е част от преживяването, а не допълнение. Реакцията на кожата, ритъмът на терапиите и бъдещата поддръжка се разглеждат със същата прецизност, както и първоначалната консултация.',
    image: '/mirror-carousel/face.png',
    alt: 'Премиум атмосфера в естетична дерматология',
  },
] as const;

type JourneyMoment = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const atmosphereFrames = [
  { src: '/clinic-space/reception.jpg', alt: 'Изисканата рецепция в OBLIQ', className: 'md:col-span-2 md:row-span-2' },
  { src: '/clinic-space/consultation-detail.jpg', alt: 'Сертификати и консултативна атмосфера', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/treatment-room-forma.jpg', alt: 'Технология и мека светлина в процедурната стая', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/consultation-wide.jpg', alt: 'Консултативен кабинет с дневна светлина', className: 'md:col-span-1 md:row-span-2' },
  { src: '/clinic-space/treatment-room-shelves.jpg', alt: 'Топли материали и премерено осветление', className: 'md:col-span-2 md:row-span-1' },
  { src: '/clinic-space/treatment-room-front.jpg', alt: 'Светла процедурна стая с естетичен стол', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/treatment-room-device.jpg', alt: 'Процедурна стая с апаратура и дневна светлина', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/treatment-room-desk.jpg', alt: 'Процедурна стая с работен кът и мека светлина', className: 'md:col-span-2 md:row-span-1' },
  { src: '/clinic-space/treatment-room-mirror.png', alt: 'Процедурна зона с огледало и топли материали', className: 'md:col-span-1 md:row-span-2' },
  { src: '/clinic-space/treatment-room-sink.png', alt: 'Процедурна стая с мивка и минималистичен интериор', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/clinic-lounge-view.jpg', alt: 'Поглед към зоната за почивка и процедурната стая', className: 'md:col-span-2 md:row-span-1' },
] as const;

const expertiseBlocks = [
  {
    title: 'Решения, водени от наука',
    body: 'Съвременните технологии и методите, основани на доказателства, стоят зад всяка препоръка, а изборът на терапии се адаптира към реалното поведение на кожата, а не към тенденциите.',
  },
  {
    title: 'Изтънчено естетическо усещане',
    body: 'Оценката надхвърля техниката. Хармонията, движението на лицето, пропорцията и финесът определят както избора на намеса, така и нейната мярка.',
  },
  {
    title: 'Превенция и дълготрайност',
    body: 'Най-силните резултати често идват от правилния момент, постоянството и съхраняването на кожата. OBLIQ предпочита грижа, която пази бъдещото качество толкова, колкото подобрява настоящето.',
  },
] as const;

const approachCopy = {
  bg: {
    hero: {
      eyebrow: 'Методология',
      title: 'Подходът на OBLIQ',
      subtitle:
        'Различен подход към естетичната дерматология. Фокусиран върху естествено изглеждащи резултати, здраве на кожата, персонална грижа и съвременно разбиране за естетичната медицина.',
      primaryLabel: 'Заяви консултация',
      secondaryLabel: 'Посети OBLIQ',
      markers: ['Кожа', 'Мярка', 'Ритъм'],
    },
    philosophy: {
      eyebrow: 'Философия',
      title:
        'Естетична дерматология, изградена около здравето на кожата, естествената мярка и личния ритъм.',
      blocks: philosophyBlocks,
    },
    experience: {
      eyebrow: 'Преживяването',
      title: 'Пътят на пациента е създаден да бъде внимателен, а не транзакционен.',
      body:
        'Ритъмът е умишлено спокоен: редакционно усещане за наблюдение, разговор, стратегия и продължаваща грижа.',
      moments: journeyMoments,
    },
    atmosphere: {
      eyebrow: 'Атмосфера',
      title: 'Тиха елегантност, дневна светлина, текстура и усещане за спокойна прецизност.',
      body: 'Средата е част от грижата: минималистична, намерена и емоционално успокояваща.',
      frames: atmosphereFrames,
    },
    science: {
      eyebrow: 'Наука + естетика',
      title: 'Медицинската експертиза и естетическата чувствителност са в баланс.',
      body:
        'OBLIQ съчетава съвременно дерматологично познание с усет за пропорция, финес и дългосрочна хармония.',
      blocks: expertiseBlocks,
    },
    finalCta: {
      eyebrow: 'Консултация',
      title: 'Истинската естетична грижа започва с разбиране.',
      label: 'Запази консултация',
    },
  },
  en: {
    hero: {
      eyebrow: 'Methodology',
      title: 'The OBLIQ approach',
      subtitle:
        'A different approach to aesthetic dermatology. Focused on natural-looking results, skin health, personal care and a contemporary understanding of aesthetic medicine.',
      primaryLabel: 'Request a consultation',
      secondaryLabel: 'Visit OBLIQ',
      markers: ['Skin', 'Measure', 'Rhythm'],
    },
    philosophy: {
      eyebrow: 'Philosophy',
      title:
        'Aesthetic dermatology built around skin health, natural measure and personal rhythm.',
      blocks: [
        {
          title: 'Natural-looking beauty',
          body:
            'The OBLIQ approach is guided by restraint and precision. The goal is never to change identity, but to bring more clarity, balance and a face that remains fully yours.',
        },
        {
          title: 'Skin comes first',
          body:
            'Healthy, high-quality skin is the foundation of aesthetic confidence and guides every recommendation long before volume or contour is considered.',
        },
        {
          title: 'A long-term view',
          body:
            'Every decision considers future harmony: how the skin will evolve, how results will settle and how care will remain elegant over time.',
        },
      ],
    },
    experience: {
      eyebrow: 'The experience',
      title: 'The patient journey is designed to feel considered, not transactional.',
      body:
        'The rhythm is intentionally calm: observation, conversation, strategy and continued care.',
      moments: [
        {
          eyebrow: 'Consultation',
          title: 'The first meeting begins with listening.',
          body:
            'Every consultation is shaped as a calm conversation, not a sales moment. Concerns, habits, previous therapies and aesthetic goals are understood in context, so the plan begins with nuance rather than assumptions.',
          image: '/doctor-portrait-test.png',
          alt: 'Doctor in a calm consultation atmosphere',
        },
        {
          eyebrow: 'Assessment',
          title: 'Understanding the skin before deciding on a procedure.',
          body:
            'Texture, tone, movement, structural balance and skin resilience are considered together. The goal is to read the face and skin as one system, not as isolated issues for quick correction.',
          image: '/section-2-clinical-closeup-1.png',
          alt: 'Clinical close-up of skin assessment',
        },
        {
          eyebrow: 'Strategy',
          title: 'A personal plan built around rhythm, not urgency.',
          body:
            'Recommendations are arranged to respect long-term skin quality, aesthetic proportion and recovery. Some plans focus on subtle prevention, others on gradual refinement, but all are built with wholeness in mind.',
          image: '/hero-exosome-treatment.png',
          alt: 'Detail from an aesthetic procedure',
        },
        {
          eyebrow: 'Follow-up',
          title: 'Care continues after the appointment.',
          body:
            'Follow-up is part of the experience. Skin response, treatment rhythm and future maintenance are considered with the same precision as the initial consultation.',
          image: '/precision-art-hero.png',
          alt: 'Premium atmosphere in aesthetic dermatology',
        },
      ],
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'Quiet elegance, daylight, texture and a feeling of calm precision.',
      body: 'The environment is part of the care: minimal, intentional and emotionally reassuring.',
      frames: [
        { src: '/clinic-space/reception.jpg', alt: 'Refined reception space', className: 'md:col-span-2 md:row-span-2' },
        { src: '/clinic-space/consultation-detail.jpg', alt: 'Certificates and consultation atmosphere', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/treatment-room-forma.jpg', alt: 'Technology and soft light in the treatment room', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/consultation-wide.jpg', alt: 'Consultation room in daylight', className: 'md:col-span-1 md:row-span-2' },
        { src: '/clinic-space/treatment-room-shelves.jpg', alt: 'Warm materials and calm lighting', className: 'md:col-span-2 md:row-span-1' },
        { src: '/clinic-space/treatment-room-front.jpg', alt: 'Bright treatment room with aesthetic chair', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/treatment-room-device.jpg', alt: 'Treatment room with technology and daylight', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/treatment-room-desk.jpg', alt: 'Treatment room with a quiet work area', className: 'md:col-span-2 md:row-span-1' },
        { src: '/clinic-space/treatment-room-mirror.png', alt: 'Treatment area with mirror and warm materials', className: 'md:col-span-1 md:row-span-2' },
        { src: '/clinic-space/treatment-room-sink.png', alt: 'Minimal treatment room with sink and soft light', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/clinic-lounge-view.jpg', alt: 'View toward the lounge and treatment area', className: 'md:col-span-2 md:row-span-1' },
      ],
    },
    science: {
      eyebrow: 'Science + aesthetics',
      title: 'Medical expertise and aesthetic sensitivity are held in balance.',
      body:
        'OBLIQ combines contemporary dermatological knowledge with a sense of proportion, finesse and long-term harmony.',
      blocks: [
        {
          title: 'Science-led decisions',
          body:
            'Contemporary technologies and evidence-based methods stand behind every recommendation, while therapy choices adapt to the real behavior of the skin, not to trends.',
        },
        {
          title: 'Refined aesthetic judgment',
          body:
            'Assessment goes beyond technique. Harmony, facial movement, proportion and finesse determine both the choice of intervention and its measure.',
        },
        {
          title: 'Prevention and longevity',
          body:
            'The strongest results often come from timing, consistency and preserving the skin. OBLIQ prefers care that protects future quality as much as it improves the present.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Consultation',
      title: 'True aesthetic care begins with understanding.',
      label: 'Book consultation',
    },
  },
  ru: {
    hero: {
      eyebrow: 'Методология',
      title: 'Подход OBLIQ',
      subtitle:
        'Другой подход к эстетической дерматологии. Фокусирован на естественном результате, здоровье кожи, персональной уходе и современном понимании эстетической медицины.',
      primaryLabel: 'Запросить консультацию',
      secondaryLabel: 'Посетить OBLIQ',
      markers: ['Кожа', 'Мера', 'Ритм'],
    },
    philosophy: {
      eyebrow: 'Философия',
      title:
        'Эстетическая дерматология, построенная вокруг здоровья кожи, естественной меры и личного ритма.',
      blocks: [
        {
          title: 'Естественная красота',
          body:
            'Подход OBLIQ основан на мере и точности. Цель никогда не в изменении идентичности, а в большей ясности, балансе и лице, которое остается полностью вашим.',
        },
        {
          title: 'Кожа на первом месте',
          body:
            'Здоровая и качественная кожа лежит в основе эстетической уверенности и направляет каждую рекомендацию задолго до мыслей об объеме или контуре.',
        },
        {
          title: 'Долгосрочный взгляд',
          body:
            'Каждое решение принимается с мыслью о будущей гармонии: как будет меняться кожа, как закрепится результат и как уход останется элегантным со временем.',
        },
      ],
    },
    experience: {
      eyebrow: 'Опыт',
      title: 'Путь пациента создан быть внимательным, а не транзакционным.',
      body:
        'Ритм намеренно спокойный: наблюдение, разговор, стратегия и продолжающаяся забота.',
      moments: [
        {
          eyebrow: 'Консультация',
          title: 'Первая встреча начинается со слушания.',
          body:
            'Каждая консультация задумана как спокойный разговор, а не коммерческий момент. Запросы, привычки, предыдущие терапии и эстетические цели рассматриваются в контексте.',
          image: '/doctor-portrait-test.png',
          alt: 'Врач в спокойной консультационной атмосфере',
        },
        {
          eyebrow: 'Оценка',
          title: 'Понимание кожи до решения о процедуре.',
          body:
            'Текстура, тон, движение, структурный баланс и устойчивость кожи рассматриваются вместе. Цель — видеть лицо и кожу как единую систему.',
          image: '/section-2-clinical-closeup-1.png',
          alt: 'Клинический близкий кадр оценки кожи',
        },
        {
          eyebrow: 'Стратегия',
          title: 'Персональный план вокруг ритма, а не срочности.',
          body:
            'Рекомендации выстраиваются так, чтобы уважать долгосрочное качество кожи, эстетическую пропорцию и восстановление.',
          image: '/hero-exosome-treatment.png',
          alt: 'Деталь эстетической терапии',
        },
        {
          eyebrow: 'Наблюдение',
          title: 'Забота продолжается после приема.',
          body:
            'Наблюдение является частью опыта. Реакция кожи, ритм терапий и будущая поддержка рассматриваются с той же точностью, что и первая консультация.',
          image: '/precision-art-hero.png',
          alt: 'Премиальная атмосфера эстетической дерматологии',
        },
      ],
    },
    atmosphere: {
      eyebrow: 'Атмосфера',
      title: 'Тихая элегантность, дневной свет, текстура и ощущение спокойной точности.',
      body: 'Среда является частью заботы: минималистичная, продуманная и эмоционально успокаивающая.',
      frames: [
        { src: '/clinic-space/reception.jpg', alt: 'Изысканное пространство рецепции', className: 'md:col-span-2 md:row-span-2' },
        { src: '/clinic-space/consultation-detail.jpg', alt: 'Сертификаты и атмосфера консультации', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/treatment-room-forma.jpg', alt: 'Технология и мягкий свет в процедурной комнате', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/consultation-wide.jpg', alt: 'Консультационный кабинет при дневном свете', className: 'md:col-span-1 md:row-span-2' },
        { src: '/clinic-space/treatment-room-shelves.jpg', alt: 'Теплые материалы и спокойный свет', className: 'md:col-span-2 md:row-span-1' },
        { src: '/clinic-space/treatment-room-front.jpg', alt: 'Светлая процедурная комната с эстетическим креслом', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/treatment-room-device.jpg', alt: 'Процедурная комната с технологией и дневным светом', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/treatment-room-desk.jpg', alt: 'Процедурная комната с рабочей зоной', className: 'md:col-span-2 md:row-span-1' },
        { src: '/clinic-space/treatment-room-mirror.png', alt: 'Процедурная зона с зеркалом и теплыми материалами', className: 'md:col-span-1 md:row-span-2' },
        { src: '/clinic-space/treatment-room-sink.png', alt: 'Минималистичная процедурная комната с раковиной', className: 'md:col-span-1 md:row-span-1' },
        { src: '/clinic-space/clinic-lounge-view.jpg', alt: 'Вид на зону отдыха и процедурное пространство', className: 'md:col-span-2 md:row-span-1' },
      ],
    },
    science: {
      eyebrow: 'Наука + эстетика',
      title: 'Медицинская экспертиза и эстетическая чувствительность находятся в балансе.',
      body:
        'OBLIQ сочетает современное дерматологическое знание с чувством пропорции, тонкости и долгосрочной гармонии.',
      blocks: [
        {
          title: 'Решения, основанные на науке',
          body:
            'Современные технологии и доказательные методы стоят за каждой рекомендацией, а выбор процедур адаптируется к реальному поведению кожи.',
        },
        {
          title: 'Тонкое эстетическое чувство',
          body:
            'Оценка выходит за пределы техники. Гармония, движение лица, пропорция и финес определяют и выбор вмешательства, и его меру.',
        },
        {
          title: 'Профилактика и долговечность',
          body:
            'Самые сильные результаты часто приходят от правильного момента, постоянства и сохранения кожи.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Консультация',
      title: 'Настоящая эстетическая забота начинается с понимания.',
      label: 'Записаться на консультацию',
    },
  },
} satisfies Record<Locale, unknown>;

/** Shared copy: patient journey / experience (e.g. homepage concept treatments block). */
export const approachExperienceByLocale: Record<
  Locale,
  { eyebrow: string; title: string; body: string; moments: readonly JourneyMoment[] }
> = {
  bg: approachCopy.bg.experience,
  en: approachCopy.en.experience,
  ru: approachCopy.ru.experience,
};

function ApproachHero() {
  const { locale, localizeHref } = useLocale();
  const copy = approachCopy[locale].hero;
  const { videoRef, freezeVideoOnLastFrame, replayVideoOnHover } = useHeroVideoPlayback();

  return (
    <section
      id="approach-top"
      className="relative min-h-[100svh] overflow-hidden bg-[#221F1B] text-[#F2EEEC]"
      onMouseEnter={replayVideoOnHover}
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          defaultMuted
          playsInline
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          onEnded={freezeVideoOnLastFrame}
          className="h-full w-full object-cover object-center opacity-[0.82]"
        >
          <source src="/obliq-approach-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(242,238,236,0.18),transparent_28%),linear-gradient(90deg,rgba(34,31,27,0.94)_0%,rgba(34,31,27,0.70)_38%,rgba(34,31,27,0.20)_70%,rgba(34,31,27,0.48)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(34,31,27,0)_0%,rgba(34,31,27,0.86)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-8 lg:pb-10 lg:pt-32">
        <motion.div
          {...editorialFade}
          className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(12rem,0.26fr)]"
        >
          <div className="flex max-w-5xl flex-col justify-end pb-8 lg:pb-14">
            <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[#D8CDC0]">
              {copy.eyebrow}
            </p>
            <h1 className="type-h1 mt-6 max-w-[54rem] text-[#F2EEEC]">
              {copy.title}
            </h1>
          </div>

          <div className="flex flex-col justify-end border-t border-[#F2EEEC]/18 pb-20 pt-6 lg:border-l lg:border-t-0 lg:pb-24 lg:pl-8">
            <div className="flex gap-3 lg:flex-col">
              {copy.markers.map((marker, index) => (
                <div key={marker} className="flex items-center gap-3 text-[#F2EEEC]/78">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D8CDC0]" />
                  <span className="text-[0.68rem] uppercase tracking-[0.24em]">
                    {String(index + 1).padStart(2, '0')} {marker}
                  </span>
                </div>
              ))}
            </div>

            <p className="type-body-lg mt-8 max-w-sm text-[#F2EEEC]/76">
              {copy.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={localizeHref('/#contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-4 text-[0.76rem] uppercase tracking-[0.22em] text-[#38322C] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {copy.primaryLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhilosophySection({ variant = 'ambient' }: { variant?: 'ambient' | 'editorial' }) {
  const { locale } = useLocale();
  const copy = approachCopy[locale].philosophy;

  if (variant === 'editorial') {
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
          <motion.div {...editorialFade} className="lg:sticky lg:top-32">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#876856]">{copy.eyebrow}</p>
            <h2 className="mt-8 max-w-[43rem] text-5xl font-normal leading-[1.02] text-[#38322C] sm:text-7xl">
              {copy.title}
            </h2>
          </motion.div>

          <div className="space-y-16 pt-4 lg:pt-28">
            {copy.blocks.map((block, index) => (
              <motion.div
                key={block.title}
                {...editorialFade}
                transition={{ ...editorialFade.transition, delay: index * 0.08 }}
                className="grid gap-6 border-t border-[#635C54]/18 pt-8 sm:grid-cols-[8rem_1fr]"
              >
                <span className="text-[0.72rem] uppercase tracking-[0.28em] text-[#977460]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-2xl font-normal text-[#38322C] sm:text-3xl">{block.title}</h3>
                  <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-[#635C54]">{block.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F2EEEC_0%,#D8CDC0_100%)] py-24 lg:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-6%] top-[12%] h-72 w-72 bg-[#F2EEEC]/60' },
          { className: 'right-[8%] top-[18%] h-64 w-[24rem] bg-[#ACB2CA]/16' },
          { className: 'bottom-[8%] left-[24%] h-52 w-80 bg-[#977460]/14' },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <motion.div {...editorialFade}>
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">
              {copy.eyebrow}
            </p>
            <h2 className="type-h2 mt-5 max-w-xl text-[#38322C]">
              {copy.title}
            </h2>
          </motion.div>

          <div className="space-y-8">
            {copy.blocks.map((block, index) => (
              <motion.div
                key={block.title}
                {...editorialFade}
                transition={{ ...editorialFade.transition, delay: index * 0.08 }}
                className="border-t border-[#BAB0A8]/28 pt-6"
              >
                <h3 className="text-[1.2rem] text-[#38322C]">{block.title}</h3>
                <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-[#635C54]">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceLayeredPanel({
  moment,
  index,
  total,
  progress,
  cardHeight,
  revealedIndex,
  onReveal,
  panelRef,
}: {
  moment: JourneyMoment;
  index: number;
  total: number;
  progress: MotionValue<number>;
  cardHeight?: number;
  revealedIndex: number | null;
  onReveal: (index: number) => void;
  panelRef: (node: HTMLElement | null) => void;
}) {
  const start = index * 0.18;
  const settle = Math.min(start + 0.12, 1);
  const restingY = index * 82;
  const entryY = index === 0 ? restingY : 600 + (index - 1) * 72;
  const y = useTransform(progress, [Math.max(start - 0.04, 0), settle], [entryY, restingY]);
  const zIndex = useTransform(progress, (value) => {
    if (index === 0) return 1;

    return value < start ? total - index : index + 1;
  });

  const revealOffset = revealedIndex !== null && index > revealedIndex ? (cardHeight ?? 520) + 24 : 0;

  return (
    <motion.div
      style={{ y, zIndex, height: cardHeight }}
      className="absolute left-1/2 top-0 min-h-[31rem] w-[calc(100vw-3rem)] max-w-[74rem] -translate-x-1/2"
    >
      <motion.article
        ref={panelRef}
        animate={{ y: revealOffset }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="h-full min-h-[31rem] overflow-hidden rounded-[1.55rem] border border-[#D8CDC0] bg-[#F8F4F1] shadow-[0_30px_80px_-52px_rgba(56,50,44,0.48)]"
        data-experience-card
      >
        <div
          className="grid min-h-[31rem] grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          style={cardHeight ? { height: cardHeight } : undefined}
        >
          <div className="relative overflow-hidden bg-[#D8CDC0]">
            <ImageWithFallback
              src={moment.image}
              alt={moment.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.08)_0%,rgba(242,238,236,0.02)_100%)]" />
            <button
              type="button"
              className="absolute left-6 top-5 inline-flex items-center overflow-hidden rounded-full border border-[#F2EEEC]/28 bg-[#38322C]/42 text-[0.68rem] uppercase tracking-[0.24em] text-[#F2EEEC] backdrop-blur-md transition-colors duration-200 hover:bg-[#38322C]/62 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EEEC]/80"
              aria-label={`Покажи стъпка ${String(index + 1).padStart(2, '0')}: ${moment.eyebrow}`}
              onClick={() => onReveal(index)}
            >
              <span className="border-r border-[#F2EEEC]/24 px-4 py-2">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="px-4 py-2">
                {moment.eyebrow}
              </span>
            </button>
          </div>

          <div
            className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-14"
            data-experience-card-content
          >
            <div data-experience-card-copy>
              <h3 className="type-h4 max-w-xl text-[#38322C]">
                {moment.title}
              </h3>
              <p className="type-body mt-6 max-w-xl text-[#635C54]">
                {moment.body}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ClassicExperienceSection() {
  const { locale } = useLocale();
  const copy = approachCopy[locale].experience;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] py-24 lg:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[10%] top-[8%] h-40 w-72 bg-[#D8CDC0]/50' },
          { className: 'right-[-4%] top-[26%] h-72 w-72 bg-[#ACB2CA]/14' },
          { className: 'bottom-[10%] left-[30%] h-56 w-[28rem] bg-[#8C8E77]/10' },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div className="mt-16 space-y-14 lg:mt-20">
          {copy.moments.map((moment, index) => (
            <motion.article
              key={moment.title}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.06 }}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <div className="overflow-hidden rounded-[2rem] border border-[#BAB0A8]/18 bg-[#D8CDC0]/30 p-3 shadow-[0_28px_70px_-44px_rgba(56,50,44,0.34)]">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <ImageWithFallback
                      src={moment.image}
                      alt={moment.alt}
                      className="h-[23rem] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">
                  {moment.eyebrow}
                </p>
                <h3 className="type-h3 mt-4 max-w-xl text-[#38322C]">
                  {moment.title}
                </h3>
                <p className="type-body mt-5 max-w-xl text-[#635C54]">
                  {moment.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackedExperienceSection() {
  const { locale } = useLocale();
  const copy = approachCopy[locale].experience;
  const ref = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const revealScrollYRef = useRef(0);
  const revealProgressRef = useRef<number | null>(null);
  const [cardHeight, setCardHeight] = useState<number>();
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 18%', 'end end'],
  });
  const stackOffset = 82;
  const stackHeight = cardHeight ? cardHeight + stackOffset * (copy.moments.length - 1) : undefined;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (
      revealedIndex !== null
      && revealProgressRef.current !== null
      && Math.abs(latest - revealProgressRef.current) > 0.002
    ) {
      setRevealedIndex(null);
      revealProgressRef.current = null;
    }
  });

  useLayoutEffect(() => {
    const measureCards = () => {
      const maxHeight = panelRefs.current.reduce((max, panel) => {
        if (!panel) return max;

        const copy = panel.querySelector<HTMLElement>('[data-experience-card-copy]');
        const height = Math.max(
          520,
          (copy?.scrollHeight ?? 0) + 120,
        );

        return Math.max(max, Math.ceil(height));
      }, 0);

      if (maxHeight > 0) {
        setCardHeight((current) => (current === maxHeight ? current : maxHeight));
      }
    };

    measureCards();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureCards);
      return () => window.removeEventListener('resize', measureCards);
    }

    const resizeObserver = new ResizeObserver(measureCards);
    panelRefs.current.forEach((panel) => {
      if (panel) resizeObserver.observe(panel);
    });
    window.addEventListener('resize', measureCards);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureCards);
    };
  }, [locale, copy.moments.length]);

  useEffect(() => {
    if (revealedIndex === null) return undefined;

    const closeOnScroll = () => {
      if (Math.abs(window.scrollY - revealScrollYRef.current) > 8) {
        setRevealedIndex(null);
      }
    };

    window.addEventListener('scroll', closeOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', closeOnScroll);
  }, [revealedIndex]);

  return (
    <section className="relative bg-[#F2EEEC] py-24 lg:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[10%] top-[8%] h-40 w-72 bg-[#D8CDC0]/50' },
          { className: 'right-[-4%] top-[26%] h-72 w-72 bg-[#ACB2CA]/14' },
          { className: 'bottom-[10%] left-[30%] h-56 w-[28rem] bg-[#8C8E77]/10' },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
          className="lg:max-w-3xl"
        />

        <div className="mt-16 space-y-8 lg:hidden">
          {copy.moments.map((moment, index) => (
            <motion.article
              key={moment.title}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.06 }}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <div className="overflow-hidden rounded-[2rem] border border-[#BAB0A8]/18 bg-[#D8CDC0]/30 p-3 shadow-[0_28px_70px_-44px_rgba(56,50,44,0.34)]">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <ImageWithFallback
                      src={moment.image}
                      alt={moment.alt}
                      className="h-[23rem] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">
                  {moment.eyebrow}
                </p>
                <h3 className="type-h3 mt-4 max-w-xl text-[#38322C]">
                  {moment.title}
                </h3>
                <p className="type-body mt-5 max-w-xl text-[#635C54]">
                  {moment.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="relative mt-16 hidden lg:block lg:min-h-[420vh]"
        onWheel={() => setRevealedIndex(null)}
        onTouchMove={() => setRevealedIndex(null)}
      >
        <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-hidden">
          <div
            className="relative left-1/2 top-0 min-h-[38rem] w-screen -translate-x-1/2"
            style={stackHeight ? { height: stackHeight } : undefined}
          >
            {copy.moments.map((moment, index) => (
              <ExperienceLayeredPanel
                key={moment.title}
                moment={moment}
                index={index}
                total={copy.moments.length}
                progress={scrollYProgress}
                cardHeight={cardHeight}
                revealedIndex={revealedIndex}
                onReveal={(nextIndex) => {
                  revealScrollYRef.current = window.scrollY;
                  revealProgressRef.current = scrollYProgress.get();
                  setRevealedIndex((currentIndex) => (
                    currentIndex === nextIndex ? null : nextIndex
                  ));
                }}
                panelRef={(node) => {
                  panelRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AtmosphereSection() {
  const { locale } = useLocale();
  const copy = approachCopy[locale].atmosphere;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#D8CDC0_0%,#F2EEEC_100%)] py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            body={copy.body}
          />

          <motion.div
            {...editorialFade}
            className="grid auto-rows-[13rem] gap-4 md:grid-cols-3 md:auto-rows-[10rem]"
          >
            {copy.frames.map((frame) => (
              <div
                key={frame.src}
                className={`group relative overflow-hidden rounded-[1.9rem] border border-[#BAB0A8]/18 bg-[#F2EEEC]/40 shadow-[0_24px_60px_-36px_rgba(56,50,44,0.28)] ${frame.className}`}
              >
                <ImageWithFallback
                  src={frame.src}
                  alt={frame.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,238,236,0.02)_0%,rgba(56,50,44,0.26)_100%)]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  const { locale } = useLocale();
  const copy = approachCopy[locale].science;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#38322C_0%,#635C54_100%)] py-24 text-[#F2EEEC] lg:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-6%] top-12 h-72 w-72 bg-[#876856]/34' },
          { className: 'right-[-4%] top-[18%] h-96 w-96 bg-[#977460]/22' },
          { className: 'bottom-[-8%] left-[30%] h-72 w-[28rem] bg-[#ACB2CA]/10' },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
          invert
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {copy.blocks.map((block, index) => (
            <motion.article
              key={block.title}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.07 }}
              className="rounded-[2rem] border border-[#BAB0A8]/16 bg-[#F2EEEC]/8 p-7 backdrop-blur-md"
            >
              <h3 className="text-[1.18rem] text-[#F2EEEC]">{block.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-[#F2EEEC]/72">{block.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const { locale, localizeHref } = useLocale();
  const copy = approachCopy[locale].finalCta;

  return (
    <section className="relative overflow-hidden bg-[#38322C] py-24 text-[#F2EEEC] lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <video
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-32"
        >
          <source src="/contact-hero-clip-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.7)_0%,rgba(56,50,44,0.9)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <motion.div
          {...editorialFade}
          className="rounded-[2.6rem] border border-[#BAB0A8]/18 bg-[#F2EEEC]/8 px-8 py-12 text-center shadow-[0_34px_80px_-50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-10 lg:px-16 lg:py-16"
        >
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#BAB0A8]">
            {copy.eyebrow}
          </p>
          <h2 className="type-h2 mx-auto mt-5 max-w-3xl text-[#F2EEEC]">
            {copy.title}
          </h2>
          <a
            href={localizeHref('/#contact')}
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#F2EEEC] px-7 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#38322C] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {copy.label}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function ObliqApproachPage() {
  const { locale } = useLocale();
  const copy = approachCopy[locale].hero;

  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
        <CinematicHero
          id="approach-top"
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
          videoSrc="/obliq-approach-hero.mp4"
          backgroundColor="#38322C"
          primaryAction={{ href: '/#contact', label: copy.primaryLabel }}
          secondaryAction={{ href: '/contact', label: copy.secondaryLabel }}
        />
        <PhilosophySection />
        <ClassicExperienceSection />
        {/* <AtmosphereSection /> */}
        <ScienceSection />
        <FinalCtaSection />
      </main>

      <ConsultationFooter />
    </div>
  );
}

export function TheObliqApproachPage() {
  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
        <ApproachHero />
        <PhilosophySection variant="editorial" />
        <StackedExperienceSection />
        {/* <AtmosphereSection /> */}
        <ScienceSection />
        <FinalCtaSection />
      </main>

      <ConsultationFooter />
    </div>
  );
}
