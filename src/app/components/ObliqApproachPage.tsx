import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  AtmosphereOrbs,
  CinematicHero,
  SectionHeading,
  editorialFade,
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
    image: '/doctor-portrait-1.png',
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
    image: '/precision-art-hero.png',
    alt: 'Премиум атмосфера в естетична дерматология',
  },
] as const;

const atmosphereFrames = [
  { src: '/clinic-space/reception.jpg', alt: 'Изисканата рецепция в OBLIQ', className: 'md:col-span-2 md:row-span-2' },
  { src: '/clinic-space/consultation-detail.jpg', alt: 'Сертификати и консултативна атмосфера', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/treatment-room-forma.jpg', alt: 'Технология и мека светлина в процедурната стая', className: 'md:col-span-1 md:row-span-1' },
  { src: '/clinic-space/consultation-wide.jpg', alt: 'Консултативен кабинет с дневна светлина', className: 'md:col-span-1 md:row-span-2' },
  { src: '/clinic-space/treatment-room-shelves.jpg', alt: 'Топли материали и премерено осветление', className: 'md:col-span-2 md:row-span-1' },
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
      title: 'Подходът на OBLIQ',
      subtitle:
        'Различен подход към естетичната дерматология. Фокусиран върху естествено изглеждащи резултати, здраве на кожата, персонална грижа и съвременно разбиране за естетичната медицина.',
      primaryLabel: 'Заяви консултация',
      secondaryLabel: 'Посети OBLIQ',
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
      title: 'The OBLIQ approach',
      subtitle:
        'A different approach to aesthetic dermatology. Focused on natural-looking results, skin health, personal care and a contemporary understanding of aesthetic medicine.',
      primaryLabel: 'Request a consultation',
      secondaryLabel: 'Visit OBLIQ',
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
          image: '/doctor-portrait-1.png',
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
      title: 'Подход OBLIQ',
      subtitle:
        'Другой подход к эстетической дерматологии. Фокусирован на естественном результате, здоровье кожи, персональной уходе и современном понимании эстетической медицины.',
      primaryLabel: 'Запросить консультацию',
      secondaryLabel: 'Посетить OBLIQ',
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
          image: '/doctor-portrait-1.png',
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

function PhilosophySection() {
  const { locale } = useLocale();
  const copy = approachCopy[locale].philosophy;

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
            <h2
              className="mt-5 max-w-xl text-[#38322C]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 5rem)',
                lineHeight: 0.98,
                fontWeight: 400,
                letterSpacing: '-0.05em',
              }}
            >
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

function ExperienceSection() {
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
                <h3
                  className="mt-4 max-w-xl text-[#38322C]"
                  style={{
                    fontSize: 'clamp(2rem, 3.6vw, 3.4rem)',
                    lineHeight: 1,
                    fontWeight: 400,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {moment.title}
                </h3>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#635C54]">
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
          <h2
            className="mx-auto mt-5 max-w-3xl text-[#F2EEEC]"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 4.3rem)',
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: '-0.05em',
            }}
          >
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
          backgroundGradient="linear-gradient(180deg,#38322C 0%,#635C54 76%,#8C8E77 100%)"
          primaryAction={{ href: '/#contact', label: copy.primaryLabel }}
          secondaryAction={{ href: '/contact', label: copy.secondaryLabel }}
        />
        <PhilosophySection />
        <ExperienceSection />
        <AtmosphereSection />
        <ScienceSection />
        <FinalCtaSection />
      </main>

      <ConsultationFooter />
    </div>
  );
}
