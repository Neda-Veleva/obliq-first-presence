import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import {
  AtmosphereOrbs,
  SectionHeading,
  editorialFade,
  useHeroVideoPlayback,
} from './PremiumPagePrimitives';
import { SiteHeader } from './SiteHeader';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';
import { Slider } from './ui/slider';
import { cn } from './ui/utils';
import { useLocale, type Locale } from '../i18n';

const heroCopy: Record<Locale, { headline: [string, string]; byline: string }> = {
  bg: {
    headline: ['истинската красота', 'идва отвътре.'],
    byline: 'by dr. mihaylov',
  },
  en: {
    headline: ['true beauty', 'comes from within.'],
    byline: 'by dr. mihaylov',
  },
  ru: {
    headline: ['истинная красота', 'идет изнутри.'],
    byline: 'by dr. mihaylov',
  },
};

const doctorCopy: Record<
  Locale,
  { imageAlt: string; eyebrow: string; name: string; body: string; credential: string }
> = {
  bg: {
    imageAlt: 'д-р Михаил Михайлов',
    eyebrow: 'Основател',
    name: 'д-р Михаил Михайлов',
    body:
      'Като сертифициран обучител на Merz Aesthetics, д-р Михайлов провежда тренинги по работа с хиалуронови филъри, ботулинов токсин и колагенови стимулатори (Radiesse, Belotero, BoCouture). Той активно популяризира етичната и безопасна практика в естетичната медицина, подчертавайки значението на медицинската квалификация при естетичните терапии.',
    credential: '',
  },
  en: {
    imageAlt: 'Dr. Mihail Mihaylov',
    eyebrow: 'Founder',
    name: 'Dr. Mihail Mihaylov',
    body:
      'As a certified Merz Aesthetics trainer, Dr. Mihaylov leads trainings in hyaluronic fillers, botulinum toxin and collagen stimulators (Radiesse, Belotero, BoCouture). He actively promotes ethical and safe practice in aesthetic medicine, emphasizing the importance of medical qualification in aesthetic therapies.',
    credential: 'Board certification • Merz Aesthetics',
  },
  ru: {
    imageAlt: 'д-р Михаил Михайлов',
    eyebrow: 'Основатель',
    name: 'д-р Михаил Михайлов',
    body:
      'Как сертифицированный тренер Merz Aesthetics, д-р Михайлов проводит обучения по работе с гиалуроновыми филлерами, ботулиническим токсином и коллагеновыми стимуляторами (Radiesse, Belotero, BoCouture). Он активно поддерживает этичную и безопасную практику в эстетической медицине, подчеркивая значение медицинской квалификации.',
    credential: 'Бордовая сертификация • Merz Aesthetics',
  },
};

const pageCopy: Record<
  Locale,
  {
    immersive: {
      eyebrow: string;
      title: string;
      body: string;
      floating: { title: string; body: string }[];
    };
    specialists: {
      eyebrow: string;
      title: string;
      body: string;
      items: { name: string; role: string; blurb: string; image: string }[];
    };
    presence: {
      eyebrow: string;
      title: string;
      body: string;
      soundOn: string;
      soundOff: string;
      volumeLabel: string;
      items: { title: string; category: string; description: string; video: string }[];
    };
    cta: {
      title: string;
      body: string;
      primary: string;
      secondary: string;
    };
    philosophyVideo: {
      eyebrow: string;
      title: string;
      body: string;
      caption: string;
      soundOn: string;
      soundOff: string;
      volumeLabel: string;
    };
    atmosphere: {
      eyebrow: string;
      title: string;
      captions: string[];
    };
  }
> = {
  bg: {
    immersive: {
      eyebrow: 'Потапящо изживяване',
      title: 'Когато кожата се усеща в баланс, увереността не се нуждае от усилие.',
      body:
        'OBLIQ разглежда естетичната дерматология като дългосрочна грижа за качеството на кожата, естествените пропорции и тихото присъствие на добре поддържаното лице.',
      floating: [
        { title: 'Здраве на кожата', body: 'наука, която подкрепя естествения вид' },
        { title: 'Дългосрочна грижа', body: 'план, изграден около устойчив резултат' },
        { title: 'Фина увереност', body: 'дискретни подобрения без визуален шум' },
      ],
    },
    specialists: {
      eyebrow: 'Специалисти',
      title: 'Лицата зад прецизността в OBLIQ.',
      body:
        'Подбор от специалисти, които работят с еднакво внимание към естествения резултат, спокойната консултация и медицинската яснота.',
      items: [
        {
          name: 'д-р Елена Стоянова',
          role: 'ДЕРМАТОЛОГ И SKIN HEALTH SPECIALIST',
          blurb: 'Фокус върху текстура, качество на кожата и дългосрочни протоколи с естествена финалност.',
          image:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'д-р Маркус Торн',
          role: 'AESTHETIC SURGEON',
          blurb: 'Прецизен подход към контур, баланс и фини корекции, които пазят израза спокоен.',
          image:
            'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'д-р София Клайн',
          role: 'INJECTABLES AND FACIAL HARMONY',
          blurb: 'Работи върху дискретни подобрения в пропорцията и светлината на лицето.',
          image:
            'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'д-р Андреа Рийд',
          role: 'REGENERATIVE AESTHETICS',
          blurb: 'Комбинира биостимулация и skin-first стратегии за по-жив и отпочинал вид.',
          image:
            'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop',
        },
      ],
    },
    presence: {
      eyebrow: 'Видео присъствие',
      title: 'Присъствието на д-р Михайлов като слой на доверие, образование и спокойствие.',
      body:
        'Курирани видео моменти, които говорят не само за терапии, а за начина на мислене зад тях.',
      soundOn: 'Пусни звук',
      soundOff: 'Спри звук',
      volumeLabel: 'Сила на звука',
      items: [
        {
          title: 'Философията на естествено изглеждащите резултати',
          category: 'Редакционен разговор',
          description: 'Как изглежда модерната естетика, когато медицинското мислене води процеса.',
          video: '/doctor-videos/video-1.mp4',
        },
        {
          title: 'Консултацията като стратегия за кожата',
          category: 'Консултация',
          description: 'Защо добрата консултация е началото на по-умен и устойчив резултат.',
          video: '/doctor-videos/video-2.mp4',
        },
        {
          title: 'Образование преди намеса',
          category: 'Образование за кожата',
          description: 'Доверие, изградено чрез яснота, а не чрез агресивни обещания.',
          video: '/doctor-videos/video-3.mp4',
        },
      ],
    },
    cta: {
      title: 'Бъдещето на естетичната дерматология е лично.',
      body:
        'Прецизна, водена от наука грижа, фокусирана върху дългосрочното здраве на кожата и естествено изглеждащите резултати.',
      primary: 'Заяви консултация',
      secondary: 'Разгледай подхода',
    },
    philosophyVideo: {
      eyebrow: 'Философията зад бранда',
      title: 'Видео разказ, който влиза в ритъм със скрола и оставя усещане за мярка, тишина и внимателна грижа.',
      body:
        'Тази секция може да носи по-емоционалната история на OBLIQ. Когато видеото влезе в изгледа, то започва да се движи естествено, а звукът остава под контрола на клиента.',
      caption: 'Спокойна визуална история за светлина, кожа и философията на OBLIQ.',
      soundOn: 'Пусни звук',
      soundOff: 'Спри звук',
      volumeLabel: 'Сила на звука',
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
  },
  en: {
    immersive: {
      eyebrow: 'Immersive experience',
      title: 'When skin feels balanced, confidence never has to perform.',
      body:
        'OBLIQ approaches aesthetic dermatology as long-term care for skin quality, natural proportions and the quiet presence of a well-kept face.',
      floating: [
        { title: 'Skin health', body: 'science-led care that protects a natural look' },
        { title: 'Long-term care', body: 'a plan designed for sustainable results' },
        { title: 'Refined confidence', body: 'subtle enhancement without visual noise' },
      ],
    },
    specialists: {
      eyebrow: 'Specialists',
      title: 'The faces behind OBLIQ precision.',
      body:
        'A curated group of specialists working with the same sensitivity toward natural results, calm consultation and medical clarity.',
      items: [
        {
          name: 'Dr. Elena Stoyanova',
          role: 'DERMATOLOGIST AND SKIN HEALTH SPECIALIST',
          blurb: 'Focused on texture, skin quality and long-horizon protocols with a natural finish.',
          image:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'Dr. Marcus Thorne',
          role: 'AESTHETIC SURGEON',
          blurb: 'A precise approach to contour, balance and subtle correction that preserves expression.',
          image:
            'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'Dr. Sofia Klein',
          role: 'INJECTABLES AND FACIAL HARMONY',
          blurb: 'Works through discreet refinements in proportion, light and overall facial poise.',
          image:
            'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'Dr. Andrea Reed',
          role: 'REGENERATIVE AESTHETICS',
          blurb: 'Combines biostimulation with skin-first strategy for a more rested, luminous result.',
          image:
            'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop',
        },
      ],
    },
    presence: {
      eyebrow: 'Video presence',
      title: 'Dr. Mihaylov’s presence as a layer of trust, education and calm authority.',
      body:
        'Curated video moments that speak not only about therapies, but about the thinking behind them.',
      soundOn: 'Enable sound',
      soundOff: 'Mute sound',
      volumeLabel: 'Volume',
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
    cta: {
      title: 'The future of aesthetic dermatology is personal.',
      body:
        'Refined, science-led care focused on long-term skin health and natural-looking results.',
      primary: 'Request Consultation',
      secondary: 'Explore The Approach',
    },
    philosophyVideo: {
      eyebrow: 'The philosophy behind the brand',
      title: 'A video story that comes alive on scroll and leaves a sense of restraint, calm and careful care.',
      body:
        'This section can carry the more emotional layer of OBLIQ. As the video enters the viewport it begins to play naturally, while sound stays fully in the visitor’s control.',
      caption: 'A calm visual narrative about light, skin and the philosophy behind OBLIQ.',
      soundOn: 'Enable sound',
      soundOff: 'Mute sound',
      volumeLabel: 'Volume',
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'A space that speaks quietly.',
      captions: ['soft daylight', 'calm materials', 'precise stillness', 'personal comfort'],
    },
  },
  ru: {
    immersive: {
      eyebrow: 'Immersive experience',
      title: 'Когда кожа ощущается в балансе, уверенности не нужно стараться.',
      body:
        'OBLIQ рассматривает эстетическую дерматологию как долгосрочную заботу о качестве кожи, естественных пропорциях и тихом присутствии ухоженного лица.',
      floating: [
        { title: 'Skin health', body: 'научный подход, который сохраняет естественный вид' },
        { title: 'Long-term care', body: 'план, рассчитанный на устойчивый результат' },
        { title: 'Refined confidence', body: 'деликатные улучшения без визуального шума' },
      ],
    },
    specialists: {
      eyebrow: 'Специалисты',
      title: 'Лица, стоящие за точностью OBLIQ.',
      body:
        'Подбор специалистов, которых объединяет деликатный подход к естественному результату, спокойной консультации и медицинской ясности.',
      items: [
        {
          name: 'д-р Елена Стоянова',
          role: 'ДЕРМАТОЛОГ И СПЕЦИАЛИСТ ПО ЗДОРОВЬЮ КОЖИ',
          blurb: 'Фокусируется на текстуре, качестве кожи и долгосрочных протоколах с естественным эффектом.',
          image:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'д-р Маркус Торн',
          role: 'ЭСТЕТИЧЕСКИЙ ХИРУРГ',
          blurb: 'Точная работа с контуром, балансом и мягкими коррекциями без потери естественного выражения.',
          image:
            'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'д-р София Кляйн',
          role: 'ИНЪЕКЦИОННЫЕ МЕТОДИКИ И ГАРМОНИЯ ЛИЦА',
          blurb: 'Создает деликатные изменения в пропорциях, свете и общем ощущении баланса лица.',
          image:
            'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=1200&auto=format&fit=crop',
        },
        {
          name: 'д-р Андреа Рид',
          role: 'РЕГЕНЕРАТИВНАЯ ЭСТЕТИКА',
          blurb: 'Сочетает биостимуляцию и skin-first подход для более свежего и спокойного результата.',
          image:
            'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop',
        },
      ],
    },
    presence: {
      eyebrow: 'Video presence',
      title: 'Присутствие д-ра Михайлова как слой доверия, образования и спокойной экспертности.',
      body:
        'Кураторские видео-моменты, которые говорят не только о процедурах, но и о мышлении за ними.',
      soundOn: 'Включить звук',
      soundOff: 'Выключить звук',
      volumeLabel: 'Громкость',
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
    cta: {
      title: 'The future of aesthetic dermatology is personal.',
      body:
        'Refined, science-led care focused on long-term skin health and natural-looking results.',
      primary: 'Request Consultation',
      secondary: 'Explore The Approach',
    },
    philosophyVideo: {
      eyebrow: 'Философия бренда',
      title: 'Видеоистория, которая оживает при скролле и оставляет ощущение меры, тишины и внимательного ухода.',
      body:
        'Этот блок может передавать более эмоциональный слой OBLIQ. Когда видео попадает в область видимости, оно начинает проигрываться естественно, а звук полностью остается под контролем посетителя.',
      caption: 'Спокойный визуальный рассказ о свете, коже и философии OBLIQ.',
      soundOn: 'Включить звук',
      soundOff: 'Выключить звук',
      volumeLabel: 'Громкость',
    },
    atmosphere: {
      eyebrow: 'Atmosphere',
      title: 'Пространство, которое говорит тихо.',
      captions: ['мягкий дневной свет', 'спокойные материалы', 'точная тишина', 'личный комфорт'],
    },
  },
};

function HeroSection() {
  const { locale } = useLocale();
  const copy = heroCopy[locale];
  const { videoRef, freezeVideoOnLastFrame, replayVideoOnHover } = useHeroVideoPlayback();

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-[#38322C]">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        onMouseEnter={replayVideoOnHover}
      >
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
          className="h-full w-full object-cover object-top-center opacity-60"
        >
          <source src="/obliq-approach-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#38322C]/40 via-transparent to-[#38322C]/60" />

      <div className="relative flex h-full items-end px-8 pb-32 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="mb-6 text-[#F2EEEC] tracking-tight uppercase"
            style={{ fontSize: '5rem', lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.03em' }}
          >
            {copy.headline[0]}
            <br />
            {copy.headline[1]}
          </h1>
          <p
            className="ml-auto max-w-md uppercase text-[#F2EEEC]/70"
            style={{ fontSize: '1.125rem', lineHeight: 1.6 }}
          >
            {copy.byline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

type VideoVolumeControlProps = {
  isMuted: boolean;
  volume: number;
  soundOnLabel: string;
  soundOffLabel: string;
  volumeLabel: string;
  onToggleMuted: () => void;
  onVolumeChange: (value: number[]) => void;
  className?: string;
};

function VideoVolumeControl({
  isMuted,
  volume,
  soundOnLabel,
  soundOffLabel,
  volumeLabel,
  onToggleMuted,
  onVolumeChange,
  className,
}: VideoVolumeControlProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-full border border-[#F2EEEC]/24 bg-[#F2EEEC]/12 px-3 py-2.5 text-[#F2EEEC] backdrop-blur-md',
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggleMuted}
        aria-pressed={!isMuted}
        aria-label={isMuted ? soundOnLabel : soundOffLabel}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F2EEEC]/22 bg-[#F2EEEC]/10 transition duration-300 hover:bg-[#F2EEEC]/18"
      >
        {isMuted ? (
          <VolumeX className="h-[18px] w-[18px]" strokeWidth={1.8} />
        ) : (
          <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.8} />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <span className="sr-only">{volumeLabel}</span>
        <Slider
          value={[Math.round(volume * 100)]}
          min={0}
          max={100}
          step={1}
          aria-label={volumeLabel}
          onValueChange={onVolumeChange}
          className="w-full [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-[#F2EEEC]/24 [&_[data-slot=slider-range]]:bg-[#F2EEEC] [&_[data-slot=slider-thumb]]:size-3.5 [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:bg-[#F2EEEC] [&_[data-slot=slider-thumb]]:shadow-[0_0_0_6px_rgba(242,238,236,0.14)] [&_[data-slot=slider-thumb]]:hover:ring-0 [&_[data-slot=slider-thumb]]:focus-visible:ring-0"
        />
      </div>
    </div>
  );
}

function PhilosophyVideoSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].philosophyVideo;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const defaultVolume = 0.08;
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(defaultVolume);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = defaultVolume;

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

    const nextMuted = !isMuted;
    const nextVolume = nextMuted ? volume : Math.max(volume, 0.08);
    video.muted = nextMuted;
    video.volume = nextVolume;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      setVolume(nextVolume);
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleVolumeChange = ([nextVolume = defaultVolume * 100]: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const normalizedVolume = Math.max(0, Math.min(1, nextVolume / 100));
    const nextMuted = normalizedVolume <= 0.01;

    video.volume = normalizedVolume;
    video.muted = nextMuted;
    setVolume(normalizedVolume);
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
              muted={isMuted}
              defaultMuted
              loop
              playsInline
              preload="metadata"
              className="aspect-[4/5] w-full object-cover object-center sm:aspect-[16/10]"
            >
              <source src="/doctor-videos/video-4.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.06)_0%,rgba(56,50,44,0.12)_44%,rgba(56,50,44,0.42)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 rounded-b-[2rem] p-5 backdrop-blur-md sm:p-6">
              <p className="max-w-[20rem] text-[0.72rem] uppercase tracking-[0.22em] text-[#F2EEEC]/86">
                {copy.caption}
              </p>
              <VideoVolumeControl
                isMuted={isMuted}
                volume={volume}
                soundOnLabel={copy.soundOn}
                soundOffLabel={copy.soundOff}
                volumeLabel={copy.volumeLabel}
                onToggleMuted={toggleMuted}
                onVolumeChange={handleVolumeChange}
                className="w-[13rem] shrink-0 transition-all duration-500 sm:w-[14.5rem]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#F2EEEC]/26" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VideoPresenceSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].presence;
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const defaultVolume = 0.08;
  const [playingStates, setPlayingStates] = useState<boolean[]>(() =>
    copy.items.map(() => false),
  );
  const [mutedStates, setMutedStates] = useState<boolean[]>(() =>
    copy.items.map(() => true),
  );
  const [volumeStates, setVolumeStates] = useState<number[]>(() =>
    copy.items.map(() => defaultVolume),
  );

  useEffect(() => {
    setPlayingStates(copy.items.map(() => false));
    setMutedStates(copy.items.map(() => true));
    setVolumeStates(copy.items.map(() => defaultVolume));
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = defaultVolume;
    });
  }, [copy]);

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      videoRefs.current.forEach((otherVideo, otherIndex) => {
        if (!otherVideo || otherIndex === index) return;
        otherVideo.pause();
      });

      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => {
            setPlayingStates((current) => current.map((state, i) => (i === index ? true : false)));
          })
          .catch(() => {});
      }
      return;
    }

    video.pause();
    setPlayingStates((current) => current.map((state, i) => (i === index ? false : state)));
  };

  const toggleMuted = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    const nextMuted = !(mutedStates[index] ?? true);
    const nextVolume = nextMuted
      ? volumeStates[index] ?? defaultVolume
      : Math.max(volumeStates[index] ?? defaultVolume, 0.08);

    video.muted = nextMuted;
    video.volume = nextVolume;

    if (!nextMuted) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
      setVolumeStates((current) => current.map((volume, i) => (i === index ? nextVolume : volume)));
    }

    setMutedStates((current) => current.map((state, i) => (i === index ? nextMuted : state)));
  };

  const handleVolumeChange = (index: number, [nextVolume = defaultVolume * 100]: number[]) => {
    const video = videoRefs.current[index];
    if (!video) return;

    const normalizedVolume = Math.max(0, Math.min(1, nextVolume / 100));
    const nextMuted = normalizedVolume <= 0.01;

    video.volume = normalizedVolume;
    video.muted = nextMuted;

    if (!nextMuted) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }

    setVolumeStates((current) =>
      current.map((volume, i) => (i === index ? normalizedVolume : volume)),
    );
    setMutedStates((current) => current.map((state, i) => (i === index ? nextMuted : state)));
  };

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
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  loop
                  muted={mutedStates[index] ?? true}
                  defaultMuted
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.12)_0%,rgba(56,50,44,0.6)_100%)]" />
                <div className="absolute left-5 top-5 rounded-full border border-[#F2EEEC]/35 bg-[#F2EEEC]/12 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#F2EEEC] backdrop-blur-md">
                  {item.category}
                </div>
                <VideoVolumeControl
                  isMuted={mutedStates[index] ?? true}
                  volume={volumeStates[index] ?? defaultVolume}
                  soundOnLabel={copy.soundOn}
                  soundOffLabel={copy.soundOff}
                  volumeLabel={copy.volumeLabel}
                  onToggleMuted={() => toggleMuted(index)}
                  onVolumeChange={(value) => handleVolumeChange(index, value)}
                  className={cn(
                    'absolute bottom-5 left-5 right-24 transition-all duration-500',
                    playingStates[index]
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-3 opacity-0',
                  )}
                />
                <button
                  type="button"
                  onClick={() => toggleVideo(index)}
                  aria-pressed={playingStates[index] ?? false}
                  aria-label={playingStates[index] ? 'Pause video' : 'Play video'}
                  className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#F2EEEC]/30 bg-[#F2EEEC]/12 text-[#F2EEEC] backdrop-blur-md transition-transform duration-500 group-hover:scale-105"
                >
                  {playingStates[index] ? (
                    <Pause className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={1.5} />
                  )}
                </button>
              </div>
              <div className="p-6">
                <h3
                  style={{ fontSize: '1.55rem', lineHeight: 1.02, fontWeight: 400, letterSpacing: '-0.03em' }}
                >
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

function ImmersiveExperienceSection() {
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
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[#d8cdc0]">{copy.eyebrow}</p>
          <h2
            className="mt-8 max-w-5xl"
            style={{ fontSize: 'clamp(3.2rem, 8vw, 5.2rem)', lineHeight: 0.92, fontWeight: 400, letterSpacing: '-0.05em' }}
          >
            {copy.title}
          </h2>
          <p className="mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-[#f2eeec]/76 sm:text-[1.16rem]">
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

function AtmosphereSection() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].atmosphere;
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

function FounderSection() {
  const { locale } = useLocale();
  const copy = doctorCopy[locale];
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageFilter = useTransform(scrollYProgress, (p) => {
    const t = Math.sin(Math.max(0, Math.min(1, p)) * Math.PI);
    const blur = 20 * (1 - t);
    const brightness = 0.4 + 0.6 * t;
    return `blur(${blur}px) brightness(${brightness})`;
  });
  const veilOpacity = useTransform(scrollYProgress, (p) => {
    const t = Math.sin(Math.max(0, Math.min(1, p)) * Math.PI);
    return 0.55 * (1 - t) + 0.1;
  });

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative overflow-x-clip bg-[#38322C] text-[#F2EEEC]"
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[60vh] min-h-[50vh] overflow-hidden lg:h-auto lg:min-h-screen">
          <motion.div
            className="absolute inset-0 will-change-[filter]"
            style={{ filter: imageFilter }}
          >
            <ImageWithFallback
              src="/doctor-portrait.png"
              alt={copy.imageAlt}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#38322C]/54 via-[#38322C]/24 to-[#38322C]/58"
            style={{ opacity: veilOpacity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center px-8 py-20 md:px-16 lg:px-20"
        >
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#BAB0A8]">
            {copy.eyebrow}
          </p>

          <h2 className="mb-6 tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, fontWeight: 400 }}>
            {copy.name}
          </h2>

          <div className="max-w-lg space-y-6 text-[#F2EEEC]/74" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
            <p>{copy.body}</p>
          </div>

          <div className="mt-12 border-t border-[#BAB0A8]/16 pt-8">
            <p className="text-[#BAB0A8]" style={{ fontSize: '0.875rem' }}>
              {copy.credential}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SpecialistsSection() {
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
          <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="w-full">
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
                        <h3
                          className="text-balance"
                          style={{
                            fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            lineHeight: 0.98,
                            fontWeight: 400,
                            letterSpacing: '-0.04em',
                          }}
                        >
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

function FinalCtaSection() {
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
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.92, fontWeight: 400, letterSpacing: '-0.05em' }}
        >
          {copy.title}
        </motion.h2>
        <motion.p
          {...editorialFade}
          transition={{ ...editorialFade.transition, delay: 0.08 }}
          className="mx-auto mt-7 max-w-3xl text-[1.08rem] leading-relaxed text-[#f2eeec]/76 sm:text-[1.16rem]"
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

export function HomePageV4() {
  return (
    <div className="bg-[#F2EEEC]">
      <SiteHeader />
      <HeroSection />
      <PhilosophyVideoSection />
      <VideoPresenceSection />
      <ImmersiveExperienceSection />
      <AtmosphereSection />
      <FounderSection />
      <SpecialistsSection />
      <FinalCtaSection />
      <ConsultationFooter />
    </div>
  );
}
