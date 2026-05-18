import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { Hero } from './Hero';
import { MirrorCarousel } from './MirrorCarousel';
import { FaceReveal } from './FaceReveal';
import { SiteHeader } from './SiteHeader';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AtmosphereOrbs, SectionHeading, editorialFade } from './PremiumPagePrimitives';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';
import { cn } from './ui/utils';
import { useLocale, type Locale } from '../i18n';
import { clinicTeamByLocale } from '../content/clinicTeam';

type FaceZoneId = 'forehead' | 'eyes' | 'cheeks' | 'lips' | 'jawline' | 'neck';

const pageCopy: Record<
  Locale,
  {
    immersive: {
      eyebrow: string;
      title: string;
      body: string;
      floating: { title: string; body: string }[];
    };
    faceNavigation: {
      eyebrow: string;
      title: string;
      body: string;
      zones: Record<
        FaceZoneId,
        { label: string; concern: string; treatment: string; note: string }
      >;
    };
    philosophy: {
      eyebrow: string;
      title: string;
      body: string;
      points: string[];
    };
    specialists: {
      eyebrow: string;
      title: string;
      body: string;
      items: { name: string; role: string; blurb: string; image: string }[];
    };
    transformations: {
      eyebrow: string;
      title: string;
      body: string;
      labelBefore: string;
      labelAfter: string;
      cases: { id: string; title: string; note: string; before: string; after: string }[];
    };
    presence: {
      eyebrow: string;
      title: string;
      body: string;
      items: { title: string; category: string; description: string; video: string }[];
    };
    atmosphere: {
      eyebrow: string;
      title: string;
      body: string;
      captions: string[];
    };
    trust: {
      eyebrow: string;
      title: string;
      quotes: string[];
    };
    cta: {
      title: string;
      body: string;
      primary: string;
      secondary: string;
    };
  }
> = {
  bg: {
    immersive: {
      eyebrow: 'Потапящо изживяване',
      title: 'Когато кожата се усеща в баланс, увереността не се нуждае от усилие.',
      body:
        'OBLIQ. разглежда естетичната дерматология като дългосрочна грижа за качеството на кожата, естествените пропорции и тихото присъствие на добре поддържаното лице.',
      floating: [
        { title: 'Здраве на кожата', body: 'наука, която подкрепя естествения вид' },
        { title: 'Дългосрочна грижа', body: 'план, изграден около устойчив резултат' },
        { title: 'Фина увереност', body: 'дискретни подобрения без визуален шум' },
      ],
    },
    faceNavigation: {
      eyebrow: 'Интерактивна карта на кожата',
      title: 'Една деликатна навигация през зоните, които оформят цялостното излъчване.',
      body:
        'Задръж или докосни зона, за да видиш как OBLIQ. мисли за текстура, баланс, отпочинал вид и меко възстановяване на хармонията.',
      zones: {
        forehead: {
          label: 'Чело',
          concern: 'Фини линии',
          treatment: 'Фино ботулиново омекотяване',
          note: 'По-мека мимика, без загуба на естествено движение.',
        },
        eyes: {
          label: 'Очи',
          concern: 'Отпочинал блясък',
          treatment: 'Качество на кожата и деликатна подкрепа',
          note: 'Подход към зоната, който озарява, без да утежнява израза.',
        },
        cheeks: {
          label: 'Бузи',
          concern: 'Текстура и сияние',
          treatment: 'Колагенова и регенеративна грижа',
          note: 'Фокус върху гладкост, плътност и жива светлина в кожата.',
        },
        lips: {
          label: 'Устни',
          concern: 'Форма и хидратация',
          treatment: 'Балансирано оформяне на устни',
          note: 'Дискретно оформяне, което остава вярно на лицето.',
        },
        jawline: {
          label: 'Челюстна линия',
          concern: 'Дефиниция',
          treatment: 'Хармония в контура',
          note: 'Прецизност в структурата, без усещане за твърд резултат.',
        },
        neck: {
          label: 'Шия',
          concern: 'Еластичност',
          treatment: 'Биостимулация',
          note: 'Грижа за зоната, която най-често издава нуждата от внимание.',
        },
      },
    },
    philosophy: {
      eyebrow: 'Философията на OBLIQ.',
      title: 'Фино подчертаване. Кожа на първо място. Резултати, които все още се усещат като теб.',
      body:
        'Това е естетика, водена от медицинска прецизност и уважение към индивидуалните черти. Не преследва тенденции. Изгражда увереност, която остава естествена и устойчива във времето.',
      points: [
        'Индивидуалността е отправна точка, не ограничение.',
        'Науката и естетиката работят заедно, а не поотделно.',
        'Всеки детайл е подчинен на хармонията на цялото лице.',
      ],
    },
    specialists: {
      eyebrow: 'Специалисти',
      title: 'Лицата зад прецизността в OBLIQ.',
      body:
        'Подбор от специалисти, които работят с еднакво внимание към естествения резултат, спокойната консултация и медицинската яснота.',
      items: clinicTeamByLocale.bg,
    },
    transformations: {
      eyebrow: 'Трансформации',
      title: 'Трансформации, които не крещят. Те просто променят начина, по който светлината стои върху кожата.',
      body:
        'Вместо стандартен плъзгач преди и след, тази секция разказва за по-фина еволюция: текстура, сияние, контур и усещане за свежест.',
      labelBefore: 'Преди',
      labelAfter: 'След',
      cases: [
        {
          id: 'texture',
          title: 'Изглаждане на текстурата',
          note: 'По-равномерен релеф и по-тиха повърхност на кожата.',
          before: '/results-case-2-before.png',
          after: '/results-case-2-after.png',
        },
        {
          id: 'glow',
          title: 'Възстановено сияние',
          note: 'Възстановена светлина и по-жива, еластична кожа.',
          before: '/results-case-3-before.png',
          after: '/results-case-3-after.png',
        },
      ],
    },
    presence: {
      eyebrow: 'Видео присъствие',
      title: 'Присъствието на д-р Михайлов като слой на доверие, образование и спокойствие.',
      body:
        'Курирани видео моменти, които говорят не само за терапии, а за начина на мислене зад тях.',
      items: [
        {
          title: 'Философията на естествено изглеждащите резултати',
          category: 'Редакционен разговор',
          description: 'Как изглежда модерната естетика, когато медицинското мислене води процеса.',
          video: '/contact-hero-clip.mp4',
        },
        {
          title: 'Консултацията като стратегия за кожата',
          category: 'Консултация',
          description: 'Защо добрата консултация е началото на по-умен и устойчив резултат.',
          video: '/procedures-hero.mp4',
        },
        {
          title: 'Образование преди намеса',
          category: 'Образование за кожата',
          description: 'Доверие, изградено чрез яснота, а не чрез агресивни обещания.',
          video: '/conditions-hero.mp4',
        },
      ],
    },
    atmosphere: {
      eyebrow: 'Атмосфера',
      title: 'Пространство, което създава усещане за тишина, светлина и премерена грижа.',
      body:
        'Материали, отражения, сенки и мека дневна светлина, подредени като част от цялостното възприятие за OBLIQ.',
      captions: ['Мека дневна светлина', 'Архитектурно спокойствие', 'Отразяващи материали', 'Личен комфорт'],
    },
    trust: {
      eyebrow: 'Гласове на пациенти',
      title: 'Кратки думи, които носят повече доверие от всеки стандартен отзив.',
      quotes: [
        'Най-после се почувствах разбрана.',
        'Резултатът все още изглежда като мен.',
        'Нищо не беше прекалено. Всичко беше точно.',
      ],
    },
    cta: {
      title: 'Бъдещето на естетичната дерматология е лично.',
      body:
        'Прецизна, водена от наука грижа, фокусирана върху дългосрочното здраве на кожата и естествено изглеждащите резултати.',
      primary: 'Заяви консултация',
      secondary: 'Разгледай подхода',
    },
  },
  en: {
    immersive: {
      eyebrow: 'Immersive experience',
      title: 'When skin feels balanced, confidence never has to perform.',
      body:
        'OBLIQ. approaches aesthetic dermatology as long-term care for skin quality, natural proportions and the quiet presence of a well-kept face.',
      floating: [
        { title: 'Skin health', body: 'science-led care that protects a natural look' },
        { title: 'Long-term care', body: 'a plan designed for sustainable results' },
        { title: 'Refined confidence', body: 'subtle enhancement without visual noise' },
      ],
    },
    faceNavigation: {
      eyebrow: 'Interactive skin map',
      title: 'A refined exploration of the zones that shape the whole expression.',
      body:
        'Hover or tap a zone to see how OBLIQ. thinks about texture, balance, a rested look and subtle restoration.',
      zones: {
        forehead: {
          label: 'Forehead',
          concern: 'Fine lines',
          treatment: 'Botulinum refinement',
          note: 'Softer expression without sacrificing natural movement.',
        },
        eyes: {
          label: 'Eyes',
          concern: 'Rested brightness',
          treatment: 'Skin quality and subtle support',
          note: 'An approach that brightens the area without weighing down the expression.',
        },
        cheeks: {
          label: 'Cheeks',
          concern: 'Texture and glow',
          treatment: 'Collagen and regenerative care',
          note: 'Focused on smoothness, density and living light in the skin.',
        },
        lips: {
          label: 'Lips',
          concern: 'Shape and hydration',
          treatment: 'Balanced lip artistry',
          note: 'Discreet shaping that remains true to the face.',
        },
        jawline: {
          label: 'Jawline',
          concern: 'Definition',
          treatment: 'Contour harmony',
          note: 'Structural precision without a hard result.',
        },
        neck: {
          label: 'Neck',
          concern: 'Elasticity',
          treatment: 'Biostimulation',
          note: 'Care for the area that most often reveals the need for attention.',
        },
      },
    },
    philosophy: {
      eyebrow: 'The OBLIQ. philosophy',
      title: 'Subtle enhancement. Skin-first thinking. Results that still feel like you.',
      body:
        'This is aesthetics guided by medical precision and respect for individual features. It does not chase trends. It builds confidence that feels natural and lasting.',
      points: [
        'Individuality is the starting point, not a limitation.',
        'Science and aesthetics are designed to work together.',
        'Every detail serves the harmony of the whole face.',
      ],
    },
    specialists: {
      eyebrow: 'Specialists',
      title: 'The faces behind OBLIQ. precision.',
      body:
        'A curated group of specialists working with the same sensitivity toward natural results, calm consultation and medical clarity.',
      items: clinicTeamByLocale.en,
    },
    transformations: {
      eyebrow: 'Transformation studies',
      title: 'Transformations that do not shout. They simply change how light rests on the skin.',
      body:
        'Instead of a standard before-and-after slider, this section presents a subtler evolution through texture, glow, contour and freshness.',
      labelBefore: 'Before',
      labelAfter: 'After',
      cases: [
        {
          id: 'texture',
          title: 'Texture refinement',
          note: 'A calmer surface and a more even skin rhythm.',
          before: '/results-case-2-before.png',
          after: '/results-case-2-after.png',
        },
        {
          id: 'glow',
          title: 'Glow recovery',
          note: 'Recovered light and a more resilient skin finish.',
          before: '/results-case-3-before.png',
          after: '/results-case-3-after.png',
        },
      ],
    },
    presence: {
      eyebrow: 'Video presence',
      title: 'Dr. Mihaylov’s presence as a layer of trust, education and calm authority.',
      body:
        'Curated video moments that speak not only about therapies, but about the thinking behind them.',
      items: [
        {
          title: 'The philosophy of natural-looking results',
          category: 'Editorial talk',
          description: 'What modern aesthetics looks like when medical thinking leads the process.',
          video: '/contact-hero-clip.mp4',
        },
        {
          title: 'Consultation as skin strategy',
          category: 'Consultation',
          description: 'Why a good consultation is the beginning of a smarter, more durable result.',
          video: '/procedures-hero.mp4',
        },
        {
          title: 'Education before intervention',
          category: 'Skin education',
          description: 'Trust built through clarity rather than aggressive promises.',
          video: '/conditions-hero.mp4',
        },
      ],
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'A space designed to feel quiet, luminous and carefully composed.',
      body:
        'Materials, reflections, shadows and soft daylight arranged as part of the full OBLIQ. experience.',
      captions: ['Soft daylight', 'Architectural calm', 'Reflective materials', 'Private comfort'],
    },
    trust: {
      eyebrow: 'Patient voices',
      title: 'Short words that carry more trust than a generic testimonial ever could.',
      quotes: [
        'I finally felt understood.',
        'The result still feels like me.',
        'Nothing looked overdone. Everything felt considered.',
      ],
    },
    cta: {
      title: 'The future of aesthetic dermatology is personal.',
      body:
        'Refined, science-led care focused on long-term skin health and natural-looking results.',
      primary: 'Request Consultation',
      secondary: 'Explore The Approach',
    },
  },
  ru: {
    immersive: {
      eyebrow: 'Immersive experience',
      title: 'Когда кожа ощущается в балансе, уверенности не нужно стараться.',
      body:
        'OBLIQ. рассматривает эстетическую дерматологию как долгосрочную заботу о качестве кожи, естественных пропорциях и тихом присутствии ухоженного лица.',
      floating: [
        { title: 'Skin health', body: 'научный подход, который сохраняет естественный вид' },
        { title: 'Long-term care', body: 'план, рассчитанный на устойчивый результат' },
        { title: 'Refined confidence', body: 'деликатные улучшения без визуального шума' },
      ],
    },
    faceNavigation: {
      eyebrow: 'Interactive skin map',
      title: 'Деликатная навигация по зонам, которые формируют общее впечатление.',
      body:
        'Наведите или коснитесь зоны, чтобы увидеть, как OBLIQ. думает о текстуре, балансе, свежем взгляде и мягком восстановлении гармонии.',
      zones: {
        forehead: {
          label: 'Лоб',
          concern: 'Fine lines',
          treatment: 'Botulinum refinement',
          note: 'Более мягкая мимика без потери естественного движения.',
        },
        eyes: {
          label: 'Глаза',
          concern: 'Rested brightness',
          treatment: 'Skin quality and subtle support',
          note: 'Подход, который освежает взгляд, не утяжеляя выражение лица.',
        },
        cheeks: {
          label: 'Щеки',
          concern: 'Texture and glow',
          treatment: 'Collagen and regenerative care',
          note: 'Фокус на гладкости, плотности и живом свете кожи.',
        },
        lips: {
          label: 'Губы',
          concern: 'Shape and hydration',
          treatment: 'Balanced lip artistry',
          note: 'Деликатная форма, которая остается верной лицу.',
        },
        jawline: {
          label: 'Jawline',
          concern: 'Definition',
          treatment: 'Contour harmony',
          note: 'Точная работа со структурой без жесткого эффекта.',
        },
        neck: {
          label: 'Шея',
          concern: 'Elasticity',
          treatment: 'Biostimulation',
          note: 'Забота о зоне, которая чаще всего выдает необходимость внимания.',
        },
      },
    },
    philosophy: {
      eyebrow: 'The OBLIQ. philosophy',
      title: 'Subtle enhancement. Skin-first thinking. Results that still feel like you.',
      body:
        'Это эстетика, основанная на медицинской точности и уважении к индивидуальным чертам. Она не гонится за трендами. Она создает уверенность, которая остается естественной.',
      points: [
        'Индивидуальность является отправной точкой.',
        'Наука и эстетика работают вместе.',
        'Каждая деталь служит гармонии всего лица.',
      ],
    },
    specialists: {
      eyebrow: 'Специалисты',
      title: 'Лица, стоящие за точностью OBLIQ.',
      body:
        'Подбор специалистов, которых объединяет деликатный подход к естественному результату, спокойной консультации и медицинской ясности.',
      items: clinicTeamByLocale.ru,
    },
    transformations: {
      eyebrow: 'Transformation studies',
      title: 'Трансформации, которые не кричат. Они просто меняют то, как свет ложится на кожу.',
      body:
        'Вместо стандартного before-and-after slider здесь показана более тонкая эволюция через текстуру, сияние, контур и свежесть.',
      labelBefore: 'Before',
      labelAfter: 'After',
      cases: [
        {
          id: 'texture',
          title: 'Texture refinement',
          note: 'Более спокойная поверхность и ровный ритм кожи.',
          before: '/results-case-2-before.png',
          after: '/results-case-2-after.png',
        },
        {
          id: 'glow',
          title: 'Glow recovery',
          note: 'Возвращенный свет и более живая, упругая кожа.',
          before: '/results-case-3-before.png',
          after: '/results-case-3-after.png',
        },
      ],
    },
    presence: {
      eyebrow: 'Video presence',
      title: 'Присутствие д-ра Михайлова как слой доверия, образования и спокойной экспертности.',
      body:
        'Кураторские видео-моменты, которые говорят не только о процедурах, но и о мышлении за ними.',
      items: [
        {
          title: 'The philosophy of natural-looking results',
          category: 'Editorial talk',
          description: 'Как выглядит современная эстетика, когда медицинское мышление ведет процесс.',
          video: '/contact-hero-clip.mp4',
        },
        {
          title: 'Consultation as skin strategy',
          category: 'Consultation',
          description: 'Почему хорошая консультация становится началом более умного результата.',
          video: '/procedures-hero.mp4',
        },
        {
          title: 'Education before intervention',
          category: 'Skin education',
          description: 'Доверие, построенное на ясности, а не на агрессивных обещаниях.',
          video: '/conditions-hero.mp4',
        },
      ],
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'Пространство, которое ощущается тихим, светлым и тщательно выстроенным.',
      body:
        'Материалы, отражения, тени и мягкий дневной свет как часть полного впечатления OBLIQ.',
      captions: ['Soft daylight', 'Architectural calm', 'Reflective materials', 'Private comfort'],
    },
    trust: {
      eyebrow: 'Patient voices',
      title: 'Короткие слова, в которых больше доверия, чем в типовом отзыве.',
      quotes: [
        'Наконец-то я почувствовала, что меня поняли.',
        'Результат по-прежнему ощущается как я.',
        'Ничего не выглядело чрезмерно. Все было точно.',
      ],
    },
    cta: {
      title: 'The future of aesthetic dermatology is personal.',
      body:
        'Refined, science-led care focused on long-term skin health and natural-looking results.',
      primary: 'Request Consultation',
      secondary: 'Explore The Approach',
    },
  },
};

const faceHotspots: Record<FaceZoneId, string> = {
  forehead: 'left-[50%] top-[18%]',
  eyes: 'left-[51%] top-[33%]',
  cheeks: 'left-[48%] top-[49%]',
  lips: 'left-[50%] top-[63%]',
  jawline: 'left-[51%] top-[76%]',
  neck: 'left-[49%] top-[91%]',
};

const clinicAtmosphereImages = [
  {
    src: '/clinic-space/reception.jpg',
    alt: 'Рецепцията на OBLIQ. с мека светлина и тиха атмосфера',
  },
  {
    src: '/clinic-space/consultation-wide.jpg',
    alt: 'Консултативният кабинет в OBLIQ.',
  },
  {
    src: '/clinic-space/treatment-room-shelves.jpg',
    alt: 'Процедурна стая с топли материали и премерено осветление',
  },
  {
    src: '/clinic-space/treatment-room-forma.jpg',
    alt: 'Процедурна стая с Forma апарат в OBLIQ.',
  },
  {
    src: '/clinic-space/treatment-room-front.jpg',
    alt: 'Светла процедурна стая с естетичен стол',
  },
  {
    src: '/clinic-space/treatment-room-device.jpg',
    alt: 'Процедурна стая с апаратура и дневна светлина',
  },
  {
    src: '/clinic-space/treatment-room-desk.jpg',
    alt: 'Процедурна стая с работен кът и спокойна атмосфера',
  },
  {
    src: '/clinic-space/treatment-room-mirror.png',
    alt: 'Процедурна зона с огледало и топли материали',
  },
  {
    src: '/clinic-space/treatment-room-sink.png',
    alt: 'Процедурна стая с мивка и минималистичен интериор',
  },
  {
    src: '/clinic-space/clinic-lounge-view.jpg',
    alt: 'Зона за почивка и поглед към процедурната стая',
  },
] as const;

export function HomePageV2ImmersiveExperienceSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].immersive;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#38322c] text-[#f2eeec]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      >
        <source src="/journal-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.24)_0%,rgba(56,50,44,0.6)_46%,rgba(56,50,44,0.92)_100%)]" />
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-8%] top-[12%] h-72 w-72 bg-[#d8cdc0]/20' },
          { className: 'right-[6%] top-[18%] h-96 w-96 bg-[#acb2ca]/16' },
          { className: 'bottom-[-6%] left-[22%] h-72 w-[30rem] bg-[#876856]/20' },
        ]}
      />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        <motion.div {...editorialFade} className="max-w-4xl">
          <p className="type-eyebrow text-[#d8cdc0]">{copy.eyebrow}</p>
          <h2 className="type-h1 mt-8 max-w-5xl">
            {copy.title}
          </h2>
          <p className="type-body-lg mt-7 max-w-2xl text-[#f2eeec]/76">
            {copy.body}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {copy.floating.map((item, index) => (
            <motion.div
              key={item.title}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.12 }}
              className="rounded-[2rem] border border-[#F2EEEC]/10 bg-[#F2EEEC]/8 p-6 backdrop-blur-xl"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#d8cdc0]">{item.title}</p>
              <p className="mt-4 max-w-xs text-[1rem] leading-relaxed text-[#f2eeec]/82">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveSkinNavigationSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].faceNavigation;
  const zoneEntries = useMemo(
    () =>
      Object.entries(copy.zones) as [
        FaceZoneId,
        { label: string; concern: string; treatment: string; note: string },
      ][],
    [copy.zones],
  );
  const [activeZone, setActiveZone] = useState<FaceZoneId>('eyes');
  const zone = copy.zones[activeZone];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f2eeec_0%,#ece4df_100%)] py-24 text-[#38322c] md:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-10%] top-[14%] h-72 w-72 bg-[#d8cdc0]/42' },
          { className: 'right-[-6%] bottom-[14%] h-80 w-80 bg-[#acb2ca]/24' },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.78fr)] xl:gap-16">
          <motion.div
            {...editorialFade}
            className="relative mx-auto aspect-[5/7] w-full max-w-[32rem] overflow-hidden rounded-[2.5rem] border border-[#F2EEEC]/70 bg-[#D8CDC0] shadow-[0_35px_100px_-45px_rgba(56,50,44,0.35)]"
          >
            <ImageWithFallback
              src="/facial-focus-face.jpg"
              alt="Портрет за интерактивен фокус на лицето"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,238,236,0.04)_0%,rgba(56,50,44,0.08)_100%)]" />

            {zoneEntries.map(([zoneId, item]) => {
              const isActive = zoneId === activeZone;

              return (
                <button
                  key={zoneId}
                  type="button"
                  onMouseEnter={() => setActiveZone(zoneId)}
                  onFocus={() => setActiveZone(zoneId)}
                  onClick={() => setActiveZone(zoneId)}
                  className={cn(
                    'absolute z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500',
                    faceHotspots[zoneId],
                    isActive
                      ? 'border-[#f2eeec] bg-[#f2eeec] shadow-[0_0_0_10px_rgba(242,238,236,0.12),0_0_55px_rgba(242,238,236,0.55)]'
                      : 'border-[#f2eeec]/68 bg-[#f2eeec]/42 hover:bg-[#f2eeec]/68',
                  )}
                  aria-label={item.label}
                >
                  <span className="sr-only">{item.label}</span>
                  <span
                    className={cn(
                      'absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F2EEEC]/18 bg-[#F2EEEC]/10 blur-[2px] transition-opacity duration-500',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </motion.div>

          <div className="space-y-6">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-[#F2EEEC]/70 bg-[#F2EEEC]/74 p-8 shadow-[0_28px_80px_-44px_rgba(56,50,44,0.28)] backdrop-blur-xl"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">{zone.label}</p>
              <h3 className="type-h2 mt-4">
                {zone.concern}
              </h3>
              <p className="mt-5 text-[1rem] uppercase tracking-[0.22em] text-[#635c54]">{zone.treatment}</p>
              <p className="mt-6 max-w-lg text-[1.06rem] leading-relaxed text-[#635c54]">{zone.note}</p>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              {zoneEntries.map(([zoneId, item]) => {
                const isActive = zoneId === activeZone;

                return (
                  <button
                    key={zoneId}
                    type="button"
                    onMouseEnter={() => setActiveZone(zoneId)}
                    onFocus={() => setActiveZone(zoneId)}
                    onClick={() => setActiveZone(zoneId)}
                    className={cn(
                      'rounded-full border px-5 py-4 text-left text-[0.78rem] uppercase tracking-[0.24em] transition-all duration-300',
                      isActive
                        ? 'border-[#38322c] bg-[#38322c] text-[#f2eeec]'
                        : 'border-[#D8CDC0] bg-[#F2EEEC]/55 text-[#635C54] hover:border-[#876856] hover:text-[#38322C]',
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophyPreviewSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].philosophy;

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] py-24 text-[#38322c] md:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[8%] top-[12%] h-72 w-72 bg-[#d8cdc0]/30' },
          { className: 'right-[4%] bottom-[8%] h-96 w-96 bg-[#acb2ca]/18' },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:items-center">
          <div>
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
            <div className="mt-10 space-y-4">
              {copy.points.map((point, index) => (
                <motion.div
                  key={point}
                  {...editorialFade}
                  transition={{ ...editorialFade.transition, delay: index * 0.08 }}
                  className="rounded-[1.75rem] border border-[#F2EEEC]/70 bg-[#F2EEEC]/78 px-6 py-5 text-[1rem] leading-relaxed text-[#635c54] backdrop-blur-xl"
                >
                  {point}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...editorialFade} className="relative min-h-[28rem] lg:min-h-[40rem]">
            <div className="absolute left-[6%] top-[3%] h-[68%] w-[58%] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-40px_rgba(56,50,44,0.3)]">
              <ImageWithFallback
                src="/doctor-portrait-test.png"
                alt="Портрет за философията на OBLIQ."
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-[4%] right-[4%] h-[52%] w-[46%] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-40px_rgba(56,50,44,0.3)]">
              <ImageWithFallback
                src="/precision-art-hero.png"
                alt="Прецизност и естетика"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-[20%] top-[18%] h-40 w-40 rounded-full bg-[#d8cdc0]/40 blur-3xl" aria-hidden />
            <div className="absolute bottom-[14%] left-[12%] h-52 w-52 rounded-full bg-[#acb2ca]/24 blur-3xl" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TransformationCase({
  title,
  note,
  before,
  after,
  labelBefore,
  labelAfter,
}: {
  title: string;
  note: string;
  before: string;
  after: string;
  labelBefore: string;
  labelAfter: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      {...editorialFade}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className="group rounded-[2rem] border border-[#F2EEEC]/10 bg-[#F2EEEC]/6 p-4 backdrop-blur-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
        <ImageWithFallback
          src={after}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <ImageWithFallback src={before} alt="" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0)_20%,rgba(56,50,44,0.55)_100%)]" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.24em] text-[#f2eeec]">
          <span className={cn('transition-opacity duration-500', hovered ? 'opacity-30' : 'opacity-100')}>
            {labelBefore}
          </span>
          <span className={cn('transition-opacity duration-500', hovered ? 'opacity-100' : 'opacity-30')}>
            {labelAfter}
          </span>
        </div>
      </div>
      <div className="px-2 pb-2 pt-5 text-[#f2eeec]">
        <h3 className="type-h5">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-[#f2eeec]/72">{note}</p>
      </div>
    </motion.article>
  );
}

export function HomePageV2SpecialistsSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].specialists;
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  return (
    <section className="relative overflow-hidden bg-[#F2EEEC] py-24 text-[#38322c] md:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-8%] top-[6%] h-72 w-72 bg-[#ebe2db]/80' },
          { className: 'right-[-10%] bottom-[10%] h-80 w-80 bg-[#ddd5cf]/70' },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} className="max-w-2xl" />

          <motion.div
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.08 }}
            className="flex items-center gap-3 self-start lg:self-end"
          >
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D8CDC0] bg-[#F2EEEC]/78 text-[#635C54] transition-colors hover:bg-[#F2EEEC]"
              aria-label="Previous specialist"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D8CDC0] bg-[#F2EEEC]/78 text-[#635C54] transition-colors hover:bg-[#F2EEEC]"
              aria-label="Next specialist"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </motion.div>
        </div>

        <motion.div {...editorialFade} transition={{ ...editorialFade.transition, delay: 0.12 }} className="mt-14">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-5">
              {copy.items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <CarouselItem
                    key={item.name}
                    className="pl-5 md:basis-[78%] lg:basis-[56%] xl:basis-[48%]"
                  >
                    <article
                      className={cn(
                        'transition-[opacity,transform] duration-500',
                        isActive ? 'opacity-100' : 'opacity-72 lg:translate-y-6',
                      )}
                    >
                      <div className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-[50%] bg-[#D8CDC0] p-4 shadow-[0_30px_80px_-50px_rgba(56,50,44,0.28)] sm:p-5">
                        <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-[#BAB0A8]">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center grayscale-[10%] saturate-[0.82]"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,242,238,0.16)_0%,rgba(247,242,238,0.04)_48%,rgba(56,50,44,0.16)_100%)]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="px-6 text-center text-[0.9rem] italic tracking-[0.01em] text-[#8a817b]/60">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mx-auto max-w-[34rem] px-1 pt-7">
                        <h3 className="type-h2 text-balance">
                          {item.name}
                        </h3>
                        <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#9a8f87]">
                          {item.role}
                        </p>
                        <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-[#6e645d]">
                          {item.blurb}
                        </p>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-2">
            {copy.items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-10 bg-[#635c54]' : 'w-2.5 bg-[#cfc2b8]',
                )}
                aria-label={`Go to specialist ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TransformationShowcaseSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].transformations;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#3a342e_0%,#4b443d_100%)] py-24 text-[#f2eeec] md:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-8%] top-[8%] h-80 w-80 bg-[#876856]/24' },
          { className: 'right-[4%] bottom-[10%] h-96 w-96 bg-[#acb2ca]/10' },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} invert />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {copy.cases.map((item) => (
            <TransformationCase
              key={item.id}
              title={item.title}
              note={item.note}
              before={item.before}
              after={item.after}
              labelBefore={copy.labelBefore}
              labelAfter={copy.labelAfter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePageV2VideoPresenceSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].presence;

  return (
    <section className="overflow-hidden bg-[#f3ede8] py-24 text-[#38322c] md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {copy.items.map((item, index) => (
            <motion.article
              key={item.title}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[2rem] border border-[#F2EEEC]/70 bg-[#F2EEEC]/82 shadow-[0_30px_90px_-55px_rgba(56,50,44,0.25)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.12)_0%,rgba(56,50,44,0.6)_100%)]" />
                <div className="absolute left-5 top-5 rounded-full border border-[#F2EEEC]/35 bg-[#F2EEEC]/12 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#F2EEEC] backdrop-blur-md">
                  {item.category}
                </div>
                <div className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#F2EEEC]/30 bg-[#F2EEEC]/12 text-[#F2EEEC] backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="type-h5">
                  {item.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-[#635c54]">{item.description}</p>
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
  const copy = pageCopy[locale].atmosphere;
  const [heroImage, supportImage, detailImage, accentImage] = clinicAtmosphereImages;

  return (
    <section className="overflow-hidden bg-[#F2EEEC] py-24 text-[#38322c] md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div {...editorialFade} className="overflow-hidden rounded-[2rem]">
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[2rem]">
              <ImageWithFallback
                src={heroImage.src}
                alt={heroImage.alt}
                className="h-full min-h-[26rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.04)_0%,rgba(56,50,44,0.3)_100%)]" />
            </div>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div {...editorialFade} className="overflow-hidden rounded-[2rem]">
              <ImageWithFallback
                src={supportImage.src}
                alt={supportImage.alt}
                className="h-full min-h-[12rem] w-full object-cover"
              />
            </motion.div>
            <motion.div {...editorialFade} className="overflow-hidden rounded-[2rem]">
              <ImageWithFallback
                src={detailImage.src}
                alt={detailImage.alt}
                className="h-full min-h-[12rem] w-full object-cover"
              />
            </motion.div>
            <motion.div
              {...editorialFade}
              className="sm:col-span-2 rounded-[2rem] border border-[#D8CDC0]/60 bg-[#F2EEEC]/82 p-8 shadow-[0_28px_80px_-50px_rgba(56,50,44,0.24)]"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_10rem] lg:items-center">
                <div className="grid gap-4 sm:grid-cols-2">
                  {copy.captions.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-[#D8CDC0] bg-[#F2EEEC] px-5 py-4 text-[0.76rem] uppercase tracking-[0.25em] text-[#635c54]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="overflow-hidden rounded-[1.5rem] border border-[#D8CDC0] bg-[#F2EEEC]">
                  <ImageWithFallback
                    src={accentImage.src}
                    alt={accentImage.alt}
                    className="h-40 w-full object-cover lg:h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinicAtmosphereImages.slice(4).map((image, index) => (
            <motion.div
              key={image.src}
              {...editorialFade}
              transition={{ ...editorialFade.transition, delay: 0.08 + index * 0.04 }}
              className="overflow-hidden rounded-[2rem]"
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="h-72 w-full object-cover lg:h-80"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].trust;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#38322c] py-24 text-[#f2eeec] md:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[10%] top-[24%] h-72 w-72 bg-[#876856]/18' },
          { className: 'right-[8%] bottom-[14%] h-80 w-80 bg-[#acb2ca]/12' },
        ]}
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-8">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} invert className="mx-auto text-center" />
        <div className="mt-16 rounded-[2.5rem] border border-[#F2EEEC]/10 bg-[#F2EEEC]/6 px-8 py-16 backdrop-blur-xl md:px-16">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={copy.quotes[activeIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-4xl"
            >
              <p className="type-h2">
                “{copy.quotes[activeIndex]}”
              </p>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-10 flex justify-center gap-3">
            {copy.quotes.map((quote, index) => (
              <button
                key={quote}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-12 bg-[#f2eeec]' : 'w-2.5 bg-[#f2eeec]/28 hover:bg-[#f2eeec]/45',
                )}
                aria-label={`Цитат ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePageV2FinalCtaSection() {
  const { locale, localizeHref } = useLocale();
  const copy = pageCopy[locale].cta;

  return (
    <section className="relative overflow-hidden bg-[#2f2a26] py-28 text-[#f2eeec]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-24"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,42,38,0.76)_0%,rgba(47,42,38,0.92)_100%)]" />
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-8%] top-[18%] h-72 w-72 bg-[#d8cdc0]/18' },
          { className: 'right-[8%] bottom-[18%] h-96 w-96 bg-[#876856]/14' },
        ]}
      />
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
        <motion.h2
          {...editorialFade}
          className="type-h1"
        >
          {copy.title}
        </motion.h2>
        <motion.p
          {...editorialFade}
          transition={{ ...editorialFade.transition, delay: 0.08 }}
          className="type-body-lg mx-auto mt-7 max-w-3xl text-[#f2eeec]/76"
        >
          {copy.body}
        </motion.p>
        <motion.div
          {...editorialFade}
          transition={{ ...editorialFade.transition, delay: 0.14 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <a
            href={localizeHref('/#contact')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eeec] px-7 py-4 text-[0.78rem] uppercase tracking-[0.24em] text-[#38322c] shadow-[0_24px_45px_-24px_rgba(242,238,236,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {copy.primary}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </a>
          <a
            href={localizeHref('/the-obliq-approach')}
            className="inline-flex items-center justify-center rounded-full border border-[#F2EEEC]/16 bg-[#F2EEEC]/8 px-7 py-4 text-[0.78rem] uppercase tracking-[0.24em] text-[#f2eeec] backdrop-blur-md transition-colors duration-300 hover:bg-[#F2EEEC]/12"
          >
            {copy.secondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePageV2() {
  return (
    <div className="bg-[#F2EEEC]">
      <SiteHeader />
      <Hero />
      <MirrorCarousel />
      <FaceReveal />
      <HomePageV2ImmersiveExperienceSection />
      <InteractiveSkinNavigationSection />
      <PhilosophyPreviewSection />
      <HomePageV2SpecialistsSection />
      <TransformationShowcaseSection />
      <HomePageV2VideoPresenceSection />
      <AtmosphereSection />
      <TrustSection />
      <HomePageV2FinalCtaSection />
      <ConsultationFooter />
    </div>
  );
}
