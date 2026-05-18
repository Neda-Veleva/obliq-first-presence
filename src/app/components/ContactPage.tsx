import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPinned,
  MoveRight,
  Phone,
  Star,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ConsultationFooter } from './ConsultationFooter';
import { SiteHeader } from './SiteHeader';
import { useLocale, type Locale } from '../i18n';

const clinicAddressByLocale: Record<Locale, string> = {
  bg: 'ул. „Стефан Стамболов“ 6, ет. 2,\nгр. София',
  en: '6 Stefan Stambolov St., floor 2,\nSofia, Bulgaria',
  ru: 'ул. «Стефан Стамболов» 6, эт. 2,\nг. София',
};
const mapsQuery = 'Medical Center OBLIQ, ul. Stefan Stambolov 6, Sofia';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  mapsQuery,
)}&z=16&output=embed`;
const doctorReviewsMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapsQuery,
)}`;
const bookingUrl = '/#contact';

type ContactDetail = {
  icon: typeof MapPinned;
  label: string;
  value: string;
  actionLabel?: string;
  href?: string;
  secondaryValue?: string;
};

const contactDetailsByLocale: Record<Locale, ContactDetail[]> = {
  bg: [
    {
      icon: MapPinned,
      label: 'Адрес',
      value: clinicAddressByLocale.bg,
      actionLabel: 'Отвори в Google Maps',
      href: mapsUrl,
    },
    {
      icon: Phone,
      label: 'Телефон',
      value: '+359 - 898 - 910 - 588',
      actionLabel: 'Запази час',
      href: 'tel:+359898910588',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@obliq.bg',
      actionLabel: 'Изпрати имейл',
      href: 'mailto:contact@obliq.bg',
    },
    {
      icon: Clock3,
      label: 'Работно време',
      value: 'Понеделник – Петък · 10:00 – 19:00',
      secondaryValue: 'С предварително запазен час',
    },
  ],
  en: [
    {
      icon: MapPinned,
      label: 'Address',
      value: clinicAddressByLocale.en,
      actionLabel: 'Open in Google Maps',
      href: mapsUrl,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+359 - 898 - 910 - 588',
      actionLabel: 'Book appointment',
      href: 'tel:+359898910588',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@obliq.bg',
      actionLabel: 'Send email',
      href: 'mailto:contact@obliq.bg',
    },
    {
      icon: Clock3,
      label: 'Working hours',
      value: 'Monday – Friday · 10:00 – 19:00',
      secondaryValue: 'By appointment',
    },
  ],
  ru: [
    {
      icon: MapPinned,
      label: 'Адрес',
      value: clinicAddressByLocale.ru,
      actionLabel: 'Открыть в Google Maps',
      href: mapsUrl,
    },
    {
      icon: Phone,
      label: 'Телефон',
      value: '+359 - 898 - 910 - 588',
      actionLabel: 'Записаться',
      href: 'tel:+359898910588',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@obliq.bg',
      actionLabel: 'Отправить email',
      href: 'mailto:contact@obliq.bg',
    },
    {
      icon: Clock3,
      label: 'Часы работы',
      value: 'Понедельник – Пятница · 10:00 – 19:00',
      secondaryValue: 'По предварительной записи',
    },
  ],
};

const contactCopy: Record<
  Locale,
  {
    heroTitle: string;
    heroBody: string;
    bookingButton: string;
    mapsButton: string;
    infoEyebrow: string;
    infoTitle: string;
    infoBody: string;
    mapBadge: string;
    mapEyebrow: string;
    mapBody: string;
    mapCta: string;
    socialEyebrow: string;
    socialTitle: string;
    socialBody: string;
    reviewsEyebrow: string;
    reviewsTitle: string;
    reviewsBody: string;
    reviewsNote: string;
    reviewsCta: string;
    reviewCardLink: string;
    finalEyebrow: string;
    finalTitle: string;
    finalBody: string;
    finalBooking: string;
    finalPhone: string;
    footerText: string;
    footerHome: string;
    footerContact: string;
    footerConsultation: string;
    footerAddress: string;
  }
> = {
  bg: {
    heroTitle: 'Посетете OBLIQ.',
    heroBody:
      'Пространство за естетична дерматология, в което грижата започва с внимание, спокойствие и индивидуален подход.',
    bookingButton: 'Запази консултация',
    mapsButton: 'Отвори в Google Maps',
    infoEyebrow: 'Контакт и посещение',
    infoTitle: 'Пространство, създадено за спокойно доверие.',
    infoBody:
      'Всеки детайл е подреден така, че да влезете в ритъм на внимание, яснота и дискретна грижа още от първия контакт.',
    mapBadge: 'Sofia center',
    mapEyebrow: 'Маршрут и достъп',
    mapBody:
      'Топъл, спокоен маршрут към пространство, в което вниманието започва още с пристигането.',
    mapCta: 'Виж маршрута',
    socialEyebrow: 'Social presence',
    socialTitle: 'Останете близо до OBLIQ.',
    socialBody:
      'Следвайте ни за атмосфера от клиниката, експертно съдържание и моменти от ежедневната грижа.',
    reviewsEyebrow: 'Google reviews',
    reviewsTitle: 'Доверие, споделено от нашите пациенти.',
    reviewsBody: 'Реални впечатления от хора, които са преминали през своя път на грижа с OBLIQ.',
    reviewsNote: 'Публични Google review excerpts, които споменават д-р Михайлов',
    reviewsCta: 'Прочетете още отзиви в Google',
    reviewCardLink: 'Виж в Google Maps',
    finalEyebrow: 'Final consultation',
    finalTitle: 'Първата стъпка започва с консултация.',
    finalBody: 'Ще ви насочим спокойно, ясно и с внимание към вашите индивидуални нужди.',
    finalBooking: 'Запази консултация',
    finalPhone: 'Свържи се с нас',
    footerText:
      'Aesthetic Dermatology by Dr. Mihaylov. Спокойна прецизност, индивидуален подход и премерен ритъм на грижа.',
    footerHome: 'Начало',
    footerContact: 'Контакти',
    footerConsultation: 'Консултация',
    footerAddress: clinicAddressByLocale.bg,
  },
  en: {
    heroTitle: 'Visit OBLIQ.',
    heroBody:
      'An aesthetic dermatology space where care begins with attention, calm and an individual approach.',
    bookingButton: 'Book consultation',
    mapsButton: 'Open in Google Maps',
    infoEyebrow: 'Contact and visit',
    infoTitle: 'A space created for calm trust.',
    infoBody:
      'Every detail is arranged so you enter a rhythm of attention, clarity and discreet care from the first contact.',
    mapBadge: 'Sofia center',
    mapEyebrow: 'Route and access',
    mapBody: 'A calm route to a space where attention begins the moment you arrive.',
    mapCta: 'View route',
    socialEyebrow: 'Social presence',
    socialTitle: 'Stay close to OBLIQ.',
    socialBody: 'Follow us for clinic atmosphere, expert content and moments from everyday care.',
    reviewsEyebrow: 'Google reviews',
    reviewsTitle: 'Trust shared by our patients.',
    reviewsBody: 'Real impressions from people who have experienced their care journey with OBLIQ.',
    reviewsNote: 'Public Google review excerpts mentioning Dr. Mihaylov',
    reviewsCta: 'Read more reviews on Google',
    reviewCardLink: 'View on Google Maps',
    finalEyebrow: 'Final consultation',
    finalTitle: 'The first step begins with a consultation.',
    finalBody: 'We will guide you calmly, clearly and with attention to your individual needs.',
    finalBooking: 'Book consultation',
    finalPhone: 'Contact us',
    footerText:
      'Aesthetic Dermatology by Dr. Mihaylov. Calm precision, an individual approach and a measured rhythm of care.',
    footerHome: 'Home',
    footerContact: 'Contact',
    footerConsultation: 'Consultation',
    footerAddress: clinicAddressByLocale.en,
  },
  ru: {
    heroTitle: 'Посетите OBLIQ.',
    heroBody:
      'Пространство эстетической дерматологии, где забота начинается с внимания, спокойствия и индивидуального подхода.',
    bookingButton: 'Записаться на консультацию',
    mapsButton: 'Открыть в Google Maps',
    infoEyebrow: 'Контакт и визит',
    infoTitle: 'Пространство, созданное для спокойного доверия.',
    infoBody:
      'Каждая деталь выстроена так, чтобы с первого контакта вы вошли в ритм внимания, ясности и дискретной заботы.',
    mapBadge: 'Центр Софии',
    mapEyebrow: 'Маршрут и доступ',
    mapBody: 'Спокойный маршрут к пространству, где внимание начинается уже с прибытия.',
    mapCta: 'Посмотреть маршрут',
    socialEyebrow: 'Social presence',
    socialTitle: 'Оставайтесь ближе к OBLIQ.',
    socialBody: 'Следите за атмосферой клиники, экспертным содержанием и моментами ежедневной заботы.',
    reviewsEyebrow: 'Google reviews',
    reviewsTitle: 'Доверие, которым делятся наши пациенты.',
    reviewsBody: 'Реальные впечатления людей, прошедших свой путь заботы с OBLIQ.',
    reviewsNote: 'Публичные выдержки из Google reviews, где упоминается д-р Михайлов',
    reviewsCta: 'Прочитать больше отзывов в Google',
    reviewCardLink: 'Посмотреть в Google Maps',
    finalEyebrow: 'Final consultation',
    finalTitle: 'Первый шаг начинается с консультации.',
    finalBody: 'Мы направим вас спокойно, ясно и с вниманием к вашим индивидуальным потребностям.',
    finalBooking: 'Записаться на консультацию',
    finalPhone: 'Связаться с нами',
    footerText:
      'Aesthetic Dermatology by Dr. Mihaylov. Спокойная точность, индивидуальный подход и выверенный ритм заботы.',
    footerHome: 'Главная',
    footerContact: 'Контакты',
    footerConsultation: 'Консультация',
    footerAddress: clinicAddressByLocale.ru,
  },
};

const ellipseDesktopClasses = [
  'left-0 top-0 w-[33%]',
  'left-[22.3%] top-0 w-[33%]',
  'left-[44.6%] top-0 w-[33%]',
  'left-[66.9%] top-0 w-[33%]',
] as const;

type SocialCardData = {
  iconSrc: string;
  title: string;
  description: string;
  eyebrow: string;
  accent: string;
  status: string;
};

const socialCardsByLocale: Record<Locale, SocialCardData[]> = {
  bg: [
    {
      iconSrc: '/social/instagram.png',
      title: 'Instagram',
      description: 'Визуални истории, терапии и атмосфера.',
      eyebrow: 'Editorial moments',
      accent: 'linear-gradient(90deg, #977460 0%, #8C8E77 100%)',
      status: 'Профил в подготовка',
    },
    {
      iconSrc: '/social/facebook.png',
      title: 'Facebook',
      description: 'Новини, полезна информация и актуални съобщения.',
      eyebrow: 'Clinic updates',
      accent: 'linear-gradient(90deg, #ACB2CA 0%, #BAB0A8 100%)',
      status: 'Профил в подготовка',
    },
    {
      iconSrc: '/social/youtube.png',
      title: 'YouTube',
      description: 'Видео присъствие и експертни насоки, когато каналът е активен.',
      eyebrow: 'Long-form care',
      accent: 'linear-gradient(90deg, #8C8E77 0%, #977460 100%)',
      status: 'Канал в подготовка',
    },
  ],
  en: [
    {
      iconSrc: '/social/instagram.png',
      title: 'Instagram',
      description: 'Visual stories, therapies and atmosphere.',
      eyebrow: 'Editorial moments',
      accent: 'linear-gradient(90deg, #977460 0%, #8C8E77 100%)',
      status: 'Profile in preparation',
    },
    {
      iconSrc: '/social/facebook.png',
      title: 'Facebook',
      description: 'News, useful information and current updates.',
      eyebrow: 'Clinic updates',
      accent: 'linear-gradient(90deg, #ACB2CA 0%, #BAB0A8 100%)',
      status: 'Profile in preparation',
    },
    {
      iconSrc: '/social/youtube.png',
      title: 'YouTube',
      description: 'Video presence and expert guidance when the channel is active.',
      eyebrow: 'Long-form care',
      accent: 'linear-gradient(90deg, #8C8E77 0%, #977460 100%)',
      status: 'Channel in preparation',
    },
  ],
  ru: [
    {
      iconSrc: '/social/instagram.png',
      title: 'Instagram',
      description: 'Визуальные истории, терапии и атмосфера.',
      eyebrow: 'Editorial moments',
      accent: 'linear-gradient(90deg, #977460 0%, #8C8E77 100%)',
      status: 'Профиль готовится',
    },
    {
      iconSrc: '/social/facebook.png',
      title: 'Facebook',
      description: 'Новости, полезная информация и актуальные сообщения.',
      eyebrow: 'Clinic updates',
      accent: 'linear-gradient(90deg, #ACB2CA 0%, #BAB0A8 100%)',
      status: 'Профиль готовится',
    },
    {
      iconSrc: '/social/youtube.png',
      title: 'YouTube',
      description: 'Видео и экспертные рекомендации, когда канал активен.',
      eyebrow: 'Long-form care',
      accent: 'linear-gradient(90deg, #8C8E77 0%, #977460 100%)',
      status: 'Канал готовится',
    },
  ],
};

const reviewCards = [
  {
    quote:
      'PRP face for the second time. Dr. Mihail Mihaylov is really professional and careful. I recommend it.',
    author: 'Isa',
  },
  {
    quote:
      'A great doctor who takes his time. He really knows what he is doing and works with calm precision.',
    author: 'Stephanie',
  },
  {
    quote:
      'Very well prepared and dedicated. The interventions are precise, gentle and almost painless.',
    author: 'Kristina',
  },
] as const;

const editorialFade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, margin: '-80px' },
} as const;

function LayeredOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-[#977460]/40 blur-3xl" />
      <div className="absolute bottom-[-8%] right-[-2%] h-64 w-64 rounded-full bg-[#ACB2CA]/25 blur-3xl" />
      <div className="absolute right-[12%] top-[18%] h-48 w-96 rounded-full bg-[#8C8E77]/18 blur-3xl" />
      <div className="absolute left-[16%] top-[26%] h-32 w-32 rounded-full border border-[#F2EEEC]/10" />
      <div className="absolute bottom-[14%] right-[18%] h-24 w-24 rounded-full border border-[#BAB0A8]/14" />
      <div className="absolute left-[36%] top-[14%] h-24 w-56 rounded-[50%] border border-[#F2EEEC]/8" />
    </div>
  );
}

function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasStartedInitialPlaybackRef = useRef(false);

  const playVideoFromStart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  const freezeVideoOnLastFrame = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(video.duration - 0.05, 0);
    }
  };

  const startInitialPlayback = () => {
    if (hasStartedInitialPlaybackRef.current) return;

    hasStartedInitialPlaybackRef.current = true;
    playVideoFromStart();
  };

  const replayVideoOnHover = () => {
    const video = videoRef.current;
    if (!video || !video.paused) return;

    const isStoppedAtEnd =
      Number.isFinite(video.duration) &&
      video.duration > 0 &&
      video.currentTime >= Math.max(video.duration - 0.1, 0);

    if (!isStoppedAtEnd) return;

    playVideoFromStart();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startInitialPlayback();
      return;
    }

    video.addEventListener('loadeddata', startInitialPlayback, { once: true });

    return () => {
      video.removeEventListener('loadeddata', startInitialPlayback);
    };
  }, []);

  return (
    <motion.div
      {...editorialFade}
      className="relative mx-auto w-full max-w-[46rem] pt-6 xl:max-w-[50rem]"
    >
      <div
        className="relative aspect-[1.12/1] rounded-[50%] border border-[#F2EEEC]/14 bg-[#F2EEEC]/10 p-[0.8rem] shadow-[0_0_0_1px_rgba(242,238,236,0.05),0_34px_80px_-42px_rgba(56,50,44,0.72),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-18px_32px_rgba(255,255,255,0.04)] backdrop-blur-[14px] sm:aspect-[1.38/1] sm:p-[0.95rem]"
        onMouseEnter={replayVideoOnHover}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-[#F2EEEC]/6">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            onEnded={freezeVideoOnLastFrame}
            className="pointer-events-none h-full w-full object-cover object-center"
          >
            <source src="/contact-hero-clip.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[#38322C]/36" />
          <div className="pointer-events-none absolute inset-0 rounded-[50%] border border-[#F2EEEC]/18 shadow-[inset_0_1px_0_rgba(242,238,236,0.18)]" />
        </div>
      </div>
    </motion.div>
  );
}

function ContactInfoCard() {
  const { locale, localizeHref } = useLocale();
  const copy = contactCopy[locale];

  return (
    <motion.div
      {...editorialFade}
      id="contact-details"
      className="relative min-h-[28rem] overflow-hidden rounded-[3.25rem] border border-[#BAB0A8]/18 bg-[#38322C] px-10 py-12 text-[#F2EEEC] shadow-[0_32px_80px_-40px_rgba(56,50,44,0.72)] sm:px-14 sm:py-14 lg:min-h-[31rem] lg:rounded-[4rem] lg:px-16 lg:pr-28 xl:px-20 xl:pr-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,50,44,0.98)_0%,rgba(99,92,84,0.94)_100%)]" />
        <div className="absolute inset-x-[7%] top-[0.08rem] h-[42%] rounded-[inherit] bg-[linear-gradient(180deg,rgba(242,238,236,0.1)_0%,rgba(242,238,236,0.035)_45%,rgba(242,238,236,0)_100%)]" />
        <div className="absolute bottom-8 right-8 h-32 w-56 rounded-full bg-[#977460]/18 blur-3xl" />
      </div>

      <div className="relative flex h-full max-w-md flex-col justify-center">
        <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#BAB0A8]">
          {copy.infoEyebrow}
        </p>
        <h2 className="type-h3 mt-4 max-w-sm text-[#F2EEEC]">
          {copy.infoTitle}
        </h2>
        <p className="type-body mt-5 max-w-md text-[#F2EEEC]/72">
          {copy.infoBody}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F2EEEC]/16 bg-[#F2EEEC]/10 px-5 py-3 text-[0.8rem] uppercase tracking-[0.2em] text-[#F2EEEC] transition-colors hover:bg-[#F2EEEC]/14"
          >
            {copy.mapsButton}
          </a>
          <a
            href={localizeHref(bookingUrl)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#977460_0%,#876856_100%)] px-5 py-3 text-[0.8rem] uppercase tracking-[0.2em] text-[#F2EEEC] shadow-[0_18px_30px_-20px_rgba(151,116,96,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {copy.bookingButton}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ContactDetailEllipses() {
  const { locale } = useLocale();
  const contactDetails = contactDetailsByLocale[locale];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inactiveGradient =
    'linear-gradient(90deg, rgba(135,104,86,0.82) 0%, rgba(186,176,168,0.58) 100%)';
  const activeGradient =
    'linear-gradient(90deg, rgba(186,176,168,0.76) 0%, rgba(135,104,86,0.9) 100%)';

  return (
    <motion.div
      {...editorialFade}
      className="relative"
      onMouseLeave={() => setActiveIndex(null)}
    >

      <div className="relative hidden h-[17rem] overflow-visible lg:block">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          const isActive = activeIndex === index;
          const actionLabel = 'actionLabel' in detail ? detail.actionLabel : undefined;
          const actionHref = 'href' in detail ? detail.href : undefined;

          const ellipseContent = (
            <>
              <div
                aria-hidden
                className="absolute inset-0 rounded-[9999px] transition-opacity duration-700"
                style={{
                  backgroundImage: inactiveGradient,
                  opacity: isActive ? 0.22 : 1,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-[9999px] transition-opacity duration-700"
                style={{
                  backgroundImage: activeGradient,
                  opacity: isActive ? 1 : 0,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-[7%] top-[0.08rem] h-[44%] rounded-[9999px] transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(242,238,236,0.18) 0%, rgba(242,238,236,0.06) 42%, rgba(242,238,236,0) 100%)',
                  opacity: isActive ? 0.9 : 0.56,
                }}
              />
              <div
                aria-hidden
                className="absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#F2EEEC]/12 blur-3xl transition-opacity duration-700"
                style={{ opacity: isActive ? 0.9 : 0.3 }}
              />

              <div className="relative flex flex-col h-full items-center px-10 py-8">
                <div
                  className={`flex h-[3.65rem] w-[3.65rem] shrink-0 items-center justify-center rounded-full border transition-[background-color,color,border-color] duration-700 ${
                    isActive
                      ? 'border-[#F2EEEC]/28 bg-[#F2EEEC]/84 text-[#38322C]'
                      : 'border-[#F2EEEC]/10 bg-[#F2EEEC]/10 text-[#F2EEEC]'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <p
                    className={`text-[0.68rem] uppercase tracking-[0.24em] transition-colors duration-700 ${
                      isActive ? 'text-[#F2EEEC]/92' : 'text-[#F2EEEC]/62'
                    }`}
                  >
                    {detail.label}
                  </p>
                  <p className="mt-2 max-w-[14.5rem] whitespace-pre-line text-[1rem] leading-relaxed text-[#F2EEEC]/94">
                    {detail.value}
                  </p>
                  {'secondaryValue' in detail && detail.secondaryValue ? (
                    <p className="mt-1 max-w-[14.5rem] text-[0.88rem] leading-relaxed text-[#F2EEEC]/62">
                      {detail.secondaryValue}
                    </p>
                  ) : null}
                  {actionLabel && actionHref ? (
                    <span
                      className={`mt-4 inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.2em] transition-colors duration-700 ${
                        isActive ? 'text-[#F2EEEC]/88' : 'text-[#F2EEEC]/56'
                      }`}
                    >
                      {actionLabel}
                      <MoveRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </span>
                  ) : null}
                </div>
              </div>
            </>
          );

          const commonClassName = `absolute block h-[17rem] overflow-hidden rounded-[9999px] border bg-transparent px-0 text-left backdrop-blur-[24px] transition-[border-color,box-shadow,transform,opacity] duration-700 ${ellipseDesktopClasses[index]}`;

          const commonMotionProps = {
            animate: {
              scale: isActive ? 1.01 : 0.992,
              y: isActive ? -2 : 0,
              opacity: isActive ? 1 : 0.9,
              boxShadow: isActive
                ? '0 20px 48px -28px rgba(56,50,44,0.34), inset 0 1px 0 rgba(242,238,236,0.18)'
                : '0 14px 34px -26px rgba(56,50,44,0.22), inset 0 1px 0 rgba(242,238,236,0.12)',
              borderColor: isActive ? 'rgba(242, 238, 236, 0.18)' : 'rgba(242, 238, 236, 0.10)',
            },
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
            onMouseEnter: () => setActiveIndex(index),
            onFocus: () => setActiveIndex(index),
            onBlur: () => setActiveIndex(null),
            style: {
              zIndex: isActive ? 40 : index + 1,
              clipPath: 'ellipse(50% 50% at 50% 50%)',
            },
            className: commonClassName,
          } as const;

          if (actionHref) {
            return (
              <motion.a
                key={detail.label}
                {...commonMotionProps}
                href={actionHref}
                target={actionHref.startsWith('http') ? '_blank' : undefined}
                rel={actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {ellipseContent}
              </motion.a>
            );
          }

          return (
            <motion.div key={detail.label} {...commonMotionProps}>
              {ellipseContent}
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col pt-1 lg:hidden">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          const isActive = activeIndex === index;
          const actionLabel = 'actionLabel' in detail ? detail.actionLabel : undefined;
          const actionHref = 'href' in detail ? detail.href : undefined;

          const mobileContent = (
            <div
              className={`relative overflow-hidden rounded-[9999px] border px-6 py-6 backdrop-blur-[22px] transition-all duration-700 ${
                index === 0 ? '' : '-mt-7'
              } ${isActive ? 'border-[#F2EEEC]/18' : 'border-[#F2EEEC]/10'}`}
              style={{
                backgroundImage: isActive ? activeGradient : inactiveGradient,
                boxShadow: isActive
                  ? '0 20px 48px -28px rgba(56,50,44,0.34), inset 0 1px 0 rgba(242,238,236,0.18)'
                  : '0 14px 34px -26px rgba(56,50,44,0.22), inset 0 1px 0 rgba(242,238,236,0.12)',
              }}
            >
              <div
                aria-hidden
                className="absolute inset-x-[7%] top-[0.08rem] h-[44%] rounded-[9999px] transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(242,238,236,0.18) 0%, rgba(242,238,236,0.06) 42%, rgba(242,238,236,0) 100%)',
                  opacity: isActive ? 0.9 : 0.56,
                }}
              />
              <div className="relative flex items-center gap-5">
                <div
                  className={`flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-full border ${
                    isActive
                      ? 'border-[#F2EEEC]/28 bg-[#F2EEEC]/84 text-[#38322C]'
                      : 'border-[#F2EEEC]/10 bg-[#F2EEEC]/10 text-[#F2EEEC]'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <p className={`text-[0.68rem] uppercase tracking-[0.24em] ${isActive ? 'text-[#F2EEEC]/92' : 'text-[#F2EEEC]/62'}`}>
                    {detail.label}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-[1rem] leading-relaxed text-[#F2EEEC]/94">{detail.value}</p>
                  {'secondaryValue' in detail && detail.secondaryValue ? (
                    <p className="mt-1 text-[0.88rem] leading-relaxed text-[#F2EEEC]/62">
                      {detail.secondaryValue}
                    </p>
                  ) : null}
                  {actionLabel && actionHref ? (
                    <span className={`mt-4 inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.2em] ${isActive ? 'text-[#F2EEEC]/88' : 'text-[#F2EEEC]/56'}`}>
                      {actionLabel}
                      <MoveRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );

          if (actionHref) {
            return (
              <a
                key={detail.label}
                href={actionHref}
                target={actionHref.startsWith('http') ? '_blank' : undefined}
                rel={actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                {mobileContent}
              </a>
            );
          }

          return (
            <div
              key={detail.label}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            >
              {mobileContent}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function MapPanel() {
  const { locale } = useLocale();
  const copy = contactCopy[locale];

  return (
    <motion.a
      {...editorialFade}
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block min-h-[28rem] overflow-hidden rounded-[3.25rem] border border-[#BAB0A8]/22 bg-[#F2EEEC] shadow-[0_34px_80px_-44px_rgba(56,50,44,0.38)] lg:min-h-[27rem] lg:rounded-[4rem]"
    >
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(242,238,236,0.1)_0%,rgba(216,205,192,0.4)_100%)]" />
      <iframe
        title="OBLIQ. Google Maps"
        src={mapsEmbedUrl}
        className="pointer-events-none absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <motion.div
        className="absolute left-[50%] top-[34%] z-30 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -3, 0], scale: [1, 1.035, 1] }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#F2EEEC]/42 bg-[linear-gradient(180deg,#38322C_0%,#635C54_100%)] text-[#F2EEEC] shadow-[0_26px_36px_-22px_rgba(56,50,44,0.8)] transition-shadow duration-500 group-hover:shadow-[0_28px_42px_-20px_rgba(56,50,44,0.92)]">
          <motion.span
            className="absolute inset-[-0.55rem] rounded-full border border-[#F2EEEC]/32"
            animate={{ opacity: [0, 0.52, 0], scale: [0.86, 1.18, 1.34] }}
            transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
          />
          <span className="absolute inset-0 rounded-full border border-[#F2EEEC]/16" />
          <BrandLogo alt="OBLIQ. pin" inverted className="relative z-10 w-12" />
        </div>  
      </motion.div>

      <div className="absolute inset-x-[9%] top-8 z-30 flex items-start justify-end gap-4">
        <div className="rounded-full bg-[#38322C]/72 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#F2EEEC]/82 backdrop-blur-md">
          {copy.mapBadge}
        </div>
      </div>
{/* 
      <div className="absolute inset-x-0 bottom-0 z-30 bg-[linear-gradient(180deg,rgba(56,50,44,0)_0%,rgba(56,50,44,0.84)_100%)] px-[8%] pb-9 pt-20 text-[#F2EEEC] transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#BAB0A8]">
              {copy.mapEyebrow}
            </p>
            <p className="mt-2 max-w-md text-[1rem] leading-relaxed text-[#F2EEEC]/86">
              {copy.mapBody}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2EEEC]/16 bg-[#F2EEEC]/10 px-4 py-3 text-[0.78rem] uppercase tracking-[0.18em] text-[#F2EEEC] backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
            {copy.mapCta}
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.6} />
          </div>
        </div>
      </div> */}
    </motion.a>
  );
}

function SocialCard({
  iconSrc,
  title,
  description,
  eyebrow,
  accent,
  status,
}: SocialCardData) {
  return (
    <motion.div
      {...editorialFade}
      className="relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.9rem] border border-[#BAB0A8]/18 bg-[#F2EEEC] p-7 shadow-[0_30px_70px_-48px_rgba(56,50,44,0.35)]"
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-1.5"
        style={{ backgroundImage: accent }}
      />
      <div aria-hidden className="absolute -right-12 top-10 h-24 w-24 rounded-full bg-[#ACB2CA]/16 blur-2xl" />

      <div className="relative">
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#876856]">{eyebrow}</p>
        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#D8CDC0_0%,#F2EEEC_100%)] text-[#38322C] shadow-[0_18px_24px_-20px_rgba(56,50,44,0.4)]">
            <img
              src={iconSrc}
              alt=""
              className="h-6 w-6 object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="type-h5 text-[#38322C]">
            {title}
          </h3>
        </div>
        <p className="type-body mt-6 max-w-sm text-[#635C54]">{description}</p>
      </div>
      <p className="relative mt-8 text-[0.68rem] uppercase tracking-[0.22em] text-[#876856]">
        {status}
      </p>
    </motion.div>
  );
}

function ReviewCard({
  quote,
  author,
  index,
}: (typeof reviewCards)[number] & { index: number }) {
  const { locale } = useLocale();
  const copy = contactCopy[locale];

  return (
    <motion.article
      {...editorialFade}
      className="relative overflow-hidden rounded-[1.75rem] border border-[#BAB0A8]/20 bg-[#F2EEEC]/12 p-7 text-[#F2EEEC] shadow-[0_24px_60px_-40px_rgba(56,50,44,0.9)] backdrop-blur-xl"
    >
      <div aria-hidden className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#977460]/18 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 text-[#D8CDC0]">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star
              key={`${author}-${starIndex}`}
              className="h-4 w-4 fill-current"
              strokeWidth={1.4}
            />
          ))}
        </div>
        <p className="mt-6 text-[1rem] leading-relaxed text-[#F2EEEC]/90">“{quote}”</p>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.98rem] text-[#F2EEEC]">{author}</p>
          </div>
          <a
            href={doctorReviewsMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#F2EEEC]/78 transition-colors hover:text-[#F2EEEC]"
          >
            {copy.reviewCardLink}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ContactHeroSection() {
  const { locale, localizeHref } = useLocale();
  const copy = contactCopy[locale];

  return (
    <section
      id="contact-top"
      className="relative overflow-hidden bg-[#8C8E77] pt-28 text-[#F2EEEC] sm:pt-32"
    >
      {/* <LayeredOrbs /> */}

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:gap-12 xl:gap-18">
          <motion.div {...editorialFade} className="max-w-[34rem]">
            <h1 className="type-h1 mt-6 text-[#F2EEEC]">
              {copy.heroTitle}
            </h1>
            <p className="type-body-lg mt-6 max-w-xl text-[#F2EEEC]/76">
              {copy.heroBody}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={localizeHref(bookingUrl)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-4 text-[0.8rem] uppercase tracking-[0.22em] text-[#38322C] shadow-[0_20px_30px_-20px_rgba(242,238,236,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {copy.bookingButton}
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F2EEEC]/18 bg-[#F2EEEC]/8 px-6 py-4 text-[0.8rem] uppercase tracking-[0.22em] text-[#F2EEEC] backdrop-blur-md transition-colors hover:bg-[#F2EEEC]/12"
              >
                {copy.mapsButton}
                <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
              </a>
            </div>
          </motion.div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export function ContactVisitSection() {
  return (
    <section
      id="visit-details"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F2EEEC_0%,#DDD2C7_100%)] py-20 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6%] top-[10%] h-64 w-64 rounded-full bg-[#F2EEEC]/55 blur-3xl" />
        <div className="absolute right-[2%] top-[18%] h-56 w-96 rounded-full bg-[#ACB2CA]/12 blur-3xl" />
        <div className="absolute bottom-[8%] left-[18%] h-44 w-72 rounded-full bg-[#977460]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <div className="relative z-10 flex flex-col gap-8 lg:min-h-[35rem] lg:flex-row lg:items-center lg:gap-0">
          <div className="relative z-10 lg:w-[58%] xl:w-[56%]">
            <ContactInfoCard />
          </div>
          <div className="relative z-20 lg:-ml-24 lg:mt-8 lg:w-[48%] xl:-ml-28 xl:w-[46%]">
            <MapPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactPage() {
  const { locale, localizeHref } = useLocale();
  const copy = contactCopy[locale];
  const socialCards = socialCardsByLocale[locale];

  return (
    <div className="min-h-screen bg-[#977460] text-[#8c8e77]">
      <SiteHeader />

      <main>
        <ContactHeroSection />

        <ContactVisitSection />

        <section
          id="contact-details"
          className="relative overflow-hidden border-t border-[#CABCB0]/55 bg-[linear-gradient(180deg,#DDD2C7_0%,#D8CDC0_100%)] py-14 lg:py-18"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[12%] top-[-8%] h-44 w-72 rounded-full bg-[#F2EEEC]/26 blur-3xl" />
            <div className="absolute right-[10%] bottom-[-12%] h-48 w-80 rounded-full bg-[#977460]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
            <ContactDetailEllipses />
          </div>
        </section>

        <section
          id="social-presence"
          className="relative overflow-hidden bg-[#D8CDC0] py-20 lg:py-24"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[6%] top-10 h-40 w-72 rounded-full bg-[#F2EEEC]/34 blur-3xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#ACB2CA]/16 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
            <motion.div {...editorialFade} className="max-w-2xl">
              <p className="text-[0.74rem] uppercase tracking-[0.26em] text-[#876856]">
                {copy.socialEyebrow}
              </p>
              <h2 className="type-h2 mt-5 text-[#38322C]">
                {copy.socialTitle}
              </h2>
              <p className="type-body mt-5 max-w-xl text-[#635C54]">
                {copy.socialBody}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {socialCards.map((card) => (
                <SocialCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="google-reviews"
          className="relative overflow-hidden bg-[linear-gradient(180deg,#38322C_0%,#635C54_100%)] py-20 text-[#F2EEEC] lg:py-28"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-8%] top-12 h-72 w-72 rounded-full bg-[#876856]/34 blur-3xl" />
            <div className="absolute right-[-6%] top-10 h-96 w-96 rounded-full bg-[#977460]/28 blur-3xl" />
            <div className="absolute bottom-0 left-[28%] h-60 w-96 rounded-full bg-[#ACB2CA]/14 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
            <motion.div {...editorialFade} className="max-w-3xl">
              <p className="text-[0.74rem] uppercase tracking-[0.26em] text-[#BAB0A8]">
                {copy.reviewsEyebrow}
              </p>
              <h2 className="type-h2 mt-5 text-[#F2EEEC]">
                {copy.reviewsTitle}
              </h2>
              <p className="type-body mt-5 max-w-2xl text-[#F2EEEC]/74">
                {copy.reviewsBody}
              </p>
              <p className="mt-4 inline-flex rounded-full border border-[#BAB0A8]/18 bg-[#F2EEEC]/8 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#BAB0A8] backdrop-blur-md">
                {copy.reviewsNote}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {reviewCards.map((review, index) => (
                <ReviewCard key={`${review.author}-${index}`} index={index} {...review} />
              ))}
            </div>

            <motion.div {...editorialFade} className="mt-12">
              <a
                href={doctorReviewsMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#F2EEEC]/16 bg-[#F2EEEC]/10 px-6 py-4 text-[0.8rem] uppercase tracking-[0.2em] text-[#F2EEEC] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
              >
                {copy.reviewsCta}
                <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
              </a>
            </motion.div>
          </div>
        </section>

        <section
          id="final-consultation"
          className="relative overflow-hidden bg-[#F2EEEC] py-20 lg:py-24"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[10%] top-[-8%] h-80 w-80 rounded-full bg-[#D8CDC0]/70 blur-3xl" />
            <div className="absolute right-[10%] bottom-[-12%] h-72 w-96 rounded-full bg-[#BAB0A8]/40 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
            <motion.div
              {...editorialFade}
              className="overflow-hidden rounded-[2.5rem] border border-[#BAB0A8]/18 bg-[linear-gradient(180deg,#F2EEEC_0%,#D8CDC0_100%)] px-8 py-10 shadow-[0_34px_80px_-50px_rgba(56,50,44,0.32)] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
            >
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="max-w-2xl">
                  <p className="text-[0.74rem] uppercase tracking-[0.26em] text-[#876856]">
                    {copy.finalEyebrow}
                  </p>
                  <h2 className="type-h2 mt-5 text-[#38322C]">
                    {copy.finalTitle}
                  </h2>
                  <p className="type-body mt-5 max-w-xl text-[#635C54]">
                    {copy.finalBody}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <a
                    href={localizeHref(bookingUrl)}
                    className="inline-flex items-center justify-center rounded-full bg-[#38322C] px-6 py-4 text-[0.8rem] uppercase tracking-[0.2em] text-[#F2EEEC] shadow-[0_24px_38px_-24px_rgba(56,50,44,0.62)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {copy.finalBooking}
                  </a>
                  <a
                    href="tel:+359898910588"
                    className="inline-flex items-center justify-center rounded-full border border-[#38322C]/12 bg-[#F2EEEC]/72 px-6 py-4 text-[0.8rem] uppercase tracking-[0.2em] text-[#38322C] backdrop-blur-md transition-colors hover:bg-[#F2EEEC]"
                  >
                    {copy.finalPhone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <ConsultationFooter />
    </div>
  );
}
