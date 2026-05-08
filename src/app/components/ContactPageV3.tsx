import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPinned,
  Phone,
  Star,
  Volume2,
  VolumeX,
  Youtube,
} from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { ContactHeroSection, ContactVisitSection } from './ContactPage';
import { SiteHeader } from './SiteHeader';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { editorialFade } from './PremiumPagePrimitives';
import { cn } from './ui/utils';
import { useLocale, type Locale } from '../i18n';

const clinicAddress = 'ул. „Стефан Стамболов“ 6, ет. 2, София';
const mapsQuery = 'Medical Center OBLIQ, ul. Stefan Stambolov 6, Sofia';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const googleReviewsUrl = mapsUrl;
const bookingUrl = '/#contact';

type DetailItem = {
  icon: typeof Phone;
  label: string;
  value: string;
  note: string;
  href?: string;
  action?: string;
};

type SocialItem = {
  icon: typeof Instagram;
  label: string;
  title: string;
  body: string;
  href: string;
  action: string;
};

type ReviewItem = {
  quote: string;
  author: string;
  role: string;
  href: string;
};

const copyByLocale: Record<
  Locale,
  {
    detailsEyebrow: string;
    detailsTitle: string;
    detailsBody: string;
    details: DetailItem[];
    socialEyebrow: string;
    socialTitle: string;
    socialBody: string;
    social: SocialItem[];
    reviewsEyebrow: string;
    reviewsTitle: string;
    reviewsBody: string;
    reviewsCta: string;
    reviewsBadge: string;
    reviews: ReviewItem[];
    consultationEyebrow: string;
    consultationTitle: string;
    consultationBody: string;
    consultationPrimary: string;
    consultationSecondary: string;
    consultationImageAlt: string;
    ctaTitle: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
    soundOn: string;
    soundOff: string;
  }
> = {
  bg: {
    detailsEyebrow: 'Директен контакт',
    detailsTitle: 'Всичко важно е видимо, подредено и лесно за действие.',
    detailsBody:
      'Телефон, адрес, имейл и работно време са представени като ясни точки за следваща стъпка, без да прекъсват спокойния ритъм на страницата.',
    details: [
      {
        icon: Phone,
        label: 'Телефон',
        value: '0898910588',
        note: 'За бърза координация и записване на час.',
        href: 'tel:0898910588',
        action: 'Обади се',
      },
      {
        icon: MapPinned,
        label: 'Адрес',
        value: clinicAddress,
        note: 'Централна локация с лесен достъп.',
        href: mapsUrl,
        action: 'Маршрут',
      },
      {
        icon: Mail,
        label: 'Email',
        value: 'contact@obliq.bg',
        note: 'За въпроси, контекст и допълнителна информация.',
        href: 'mailto:contact@obliq.bg',
        action: 'Пиши ни',
      },
      {
        icon: Clock3,
        label: 'Работно време',
        value: 'Понеделник - Петък · 10:00 - 18:00',
        note: 'Посещенията са с предварително записан час.',
      },
    ],
    socialEyebrow: 'Social presence',
    socialTitle: 'По-близко до атмосферата на OBLIQ.',
    socialBody:
      'Социалните канали могат да водят с визуален ритъм, експертност и усещане за ежедневна грижа.',
    social: [
      {
        icon: Instagram,
        label: 'Editorial moments',
        title: 'Instagram',
        body: 'Визуални истории, терапии и атмосфера от клиниката.',
        href: '#',
        action: 'Профил в подготовка',
      },
      {
        icon: Facebook,
        label: 'Clinic updates',
        title: 'Facebook',
        body: 'Новини, полезна информация и актуални съобщения.',
        href: '#',
        action: 'Профил в подготовка',
      },
      {
        icon: Youtube,
        label: 'Video care',
        title: 'YouTube',
        body: 'Видео присъствие и експертни насоки в по-спокоен формат.',
        href: '#',
        action: 'Канал в подготовка',
      },
    ],
    reviewsEyebrow: 'Отзиви',
    reviewsTitle: 'Доверието тук трябва да се усеща по-различно.',
    reviewsBody:
      'Визията следва /contact-v2: различни мащаби, повече въздух и акцент върху човешкия глас.',
    reviewsCta: 'Виж всички отзиви в Google',
    reviewsBadge: 'Публични Google reviews',
    reviews: [
      {
        quote:
          'Изключително внимателно отношение, ясна комуникация и усещане, че всяка препоръка е наистина персонална.',
        author: 'Мария П.',
        role: 'Пациент на OBLIQ',
        href: googleReviewsUrl,
      },
      {
        quote:
          'Спокойствието по време на консултацията беше най-силното първо впечатление. Нищо излишно, само точност и доверие.',
        author: 'Елена К.',
        role: 'Консултация и skin plan',
        href: googleReviewsUrl,
      },
      {
        quote:
          'Много премерен подход. Резултатът и комуникацията са фини, а не агресивни, което рядко се среща.',
        author: 'Теодора Н.',
        role: 'Дългосрочна грижа',
        href: googleReviewsUrl,
      },
    ],
    consultationEyebrow: 'Следваща стъпка',
    consultationTitle: 'Ясен път към консултация',
    consultationBody:
      'Страницата е подредена около най-важното: бърз контакт, ясно следващо действие, усещане за професионализъм и достатъчно доверие, за да направите първата стъпка спокойно.',
    consultationPrimary: 'Виж контактите',
    consultationSecondary: 'Обади се',
    consultationImageAlt: 'Спокоен профил на жена с естествена кожа',
    ctaTitle: 'Твоята кожа в най-добрата си светлина.',
    ctaBody:
      'Спокойна консултация, прецизен план и грижа, която остава естествена. Започваме с разговор.',
    ctaPrimary: 'Запази консултация',
    ctaSecondary: 'Обади се',
    soundOn: 'Пусни звук',
    soundOff: 'Спри звук',
  },
  en: {
    detailsEyebrow: 'Direct contact',
    detailsTitle: 'Everything important is visible, composed and easy to act on.',
    detailsBody:
      'Phone, address, email and working hours become clear next-step points while keeping the page calm.',
    details: [
      {
        icon: Phone,
        label: 'Phone',
        value: '0898910588',
        note: 'For quick coordination and appointment booking.',
        href: 'tel:0898910588',
        action: 'Call',
      },
      {
        icon: MapPinned,
        label: 'Address',
        value: clinicAddress,
        note: 'A central location with easy access.',
        href: mapsUrl,
        action: 'Route',
      },
      {
        icon: Mail,
        label: 'Email',
        value: 'contact@obliq.bg',
        note: 'For questions, context and additional information.',
        href: 'mailto:contact@obliq.bg',
        action: 'Write',
      },
      {
        icon: Clock3,
        label: 'Working hours',
        value: 'Monday - Friday · 10:00 - 18:00',
        note: 'Visits are by appointment.',
      },
    ],
    socialEyebrow: 'Social presence',
    socialTitle: 'Closer to the atmosphere of OBLIQ.',
    socialBody:
      'The social layer can carry visual rhythm, expertise and the feeling of everyday care.',
    social: [
      {
        icon: Instagram,
        label: 'Editorial moments',
        title: 'Instagram',
        body: 'Visual stories, therapies and clinic atmosphere.',
        href: '#',
        action: 'Profile in preparation',
      },
      {
        icon: Facebook,
        label: 'Clinic updates',
        title: 'Facebook',
        body: 'News, useful information and current updates.',
        href: '#',
        action: 'Profile in preparation',
      },
      {
        icon: Youtube,
        label: 'Video care',
        title: 'YouTube',
        body: 'Video presence and expert guidance in a calmer format.',
        href: '#',
        action: 'Channel in preparation',
      },
    ],
    reviewsEyebrow: 'Reviews',
    reviewsTitle: 'Trust behaves like an editorial layer here, not a standard section.',
    reviewsBody:
      'The visual rhythm follows /contact-v2: varied scale, more air and emphasis on the human voice.',
    reviewsCta: 'View all reviews on Google',
    reviewsBadge: 'Public Google reviews',
    reviews: [
      {
        quote:
          'Extremely careful attitude, clear communication and a feeling that every recommendation is truly personal.',
        author: 'Maria P.',
        role: 'OBLIQ patient',
        href: googleReviewsUrl,
      },
      {
        quote:
          'The calm during the consultation was the strongest first impression. Nothing excessive, only precision and trust.',
        author: 'Elena K.',
        role: 'Consultation and skin plan',
        href: googleReviewsUrl,
      },
      {
        quote:
          'A very measured approach. The result and communication are subtle rather than aggressive, which is rare.',
        author: 'Teodora N.',
        role: 'Long-term care',
        href: googleReviewsUrl,
      },
    ],
    consultationEyebrow: 'Next step',
    consultationTitle: 'A clear path to consultation.',
    consultationBody:
      'The page is shaped around what matters most: quick contact, a clear next action, a professional feeling and enough trust to take the first step calmly.',
    consultationPrimary: 'View contacts',
    consultationSecondary: 'Call now',
    consultationImageAlt: 'Calm profile of a woman with natural skin',
    ctaTitle: 'Your skin, in its best light.',
    ctaBody:
      'Calm consultation, precise planning and care that stays natural. We begin with a conversation.',
    ctaPrimary: 'Book consultation',
    ctaSecondary: 'Call now',
    soundOn: 'Enable sound',
    soundOff: 'Mute sound',
  },
  ru: {
    detailsEyebrow: 'Прямой контакт',
    detailsTitle: 'Все важное видно, понятно и легко ведет к следующему шагу.',
    detailsBody:
      'Телефон, адрес, email и часы работы представлены как спокойные точки действия.',
    details: [
      {
        icon: Phone,
        label: 'Телефон',
        value: '0898910588',
        note: 'Для быстрой координации и записи.',
        href: 'tel:0898910588',
        action: 'Позвонить',
      },
      {
        icon: MapPinned,
        label: 'Адрес',
        value: clinicAddress,
        note: 'Центральная локация с удобным доступом.',
        href: mapsUrl,
        action: 'Маршрут',
      },
      {
        icon: Mail,
        label: 'Email',
        value: 'contact@obliq.bg',
        note: 'Для вопросов, контекста и дополнительной информации.',
        href: 'mailto:contact@obliq.bg',
        action: 'Написать',
      },
      {
        icon: Clock3,
        label: 'Часы работы',
        value: 'Понедельник - Пятница · 10:00 - 18:00',
        note: 'Визиты по предварительной записи.',
      },
    ],
    socialEyebrow: 'Social presence',
    socialTitle: 'Ближе к атмосфере OBLIQ.',
    socialBody:
      'Социальные каналы могут передавать визуальный ритм, экспертность и ощущение ежедневной заботы.',
    social: [
      {
        icon: Instagram,
        label: 'Editorial moments',
        title: 'Instagram',
        body: 'Визуальные истории, процедуры и атмосфера клиники.',
        href: '#',
        action: 'Профиль готовится',
      },
      {
        icon: Facebook,
        label: 'Clinic updates',
        title: 'Facebook',
        body: 'Новости, полезная информация и актуальные сообщения.',
        href: '#',
        action: 'Профиль готовится',
      },
      {
        icon: Youtube,
        label: 'Video care',
        title: 'YouTube',
        body: 'Видео и экспертные рекомендации в более спокойном формате.',
        href: '#',
        action: 'Канал готовится',
      },
    ],
    reviewsEyebrow: 'Отзывы',
    reviewsTitle: 'Доверие здесь выглядит как редакционный слой, а не стандартный блок.',
    reviewsBody:
      'Визуальный ритм следует /contact-v2: разный масштаб, больше воздуха и акцент на человеческом голосе.',
    reviewsCta: 'Посмотреть все отзывы в Google',
    reviewsBadge: 'Public Google reviews',
    reviews: [
      {
        quote:
          'Очень внимательное отношение, ясная коммуникация и ощущение, что каждая рекомендация действительно персональна.',
        author: 'Мария П.',
        role: 'Пациент OBLIQ',
        href: googleReviewsUrl,
      },
      {
        quote:
          'Спокойствие во время консультации стало самым сильным первым впечатлением. Ничего лишнего, только точность и доверие.',
        author: 'Елена К.',
        role: 'Консультация и skin plan',
        href: googleReviewsUrl,
      },
      {
        quote:
          'Очень выверенный подход. Результат и коммуникация деликатные, а не агрессивные, что встречается редко.',
        author: 'Теодора Н.',
        role: 'Долгосрочный уход',
        href: googleReviewsUrl,
      },
    ],
    consultationEyebrow: 'Следующий шаг',
    consultationTitle: 'Понятный путь к консультации.',
    consultationBody:
      'Страница выстроена вокруг главного: быстрый контакт, понятное следующее действие, ощущение профессионализма и достаточно доверия, чтобы спокойно сделать первый шаг.',
    consultationPrimary: 'Посмотреть контакты',
    consultationSecondary: 'Позвонить',
    consultationImageAlt: 'Спокойный профиль женщины с естественной кожей',
    ctaTitle: 'Your skin, in its best light.',
    ctaBody:
      'Спокойная консультация, точный план и уход, который остается естественным. Начинаем с разговора.',
    ctaPrimary: 'Записаться на консультацию',
    ctaSecondary: 'Позвонить',
    soundOn: 'Включить звук',
    soundOff: 'Выключить звук',
  },
};

function ContactDetailGrid() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale];
  const [phone, address, email, hours] = copy.details;

  const detailLinkProps = (item: DetailItem) => {
    if (!item.href) return {};

    return {
      href: item.href,
      target: item.href.startsWith('http') ? '_blank' : undefined,
      rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
    };
  };

  return (
    <section id="direct-contact" className="relative overflow-hidden bg-[#E9E1D8] px-5 py-20 sm:px-8 lg:px-10 lg:py-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(242,238,236,0.82),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(172,178,202,0.18),transparent_22%),linear-gradient(180deg,#E9E1D8_0%,#DED4CA_100%)]" />
      <div className="absolute left-0 top-0 h-full w-px bg-[#38322C]/10 lg:left-[8%]" />
      <div className="absolute bottom-12 right-[-8rem] hidden h-64 w-64 rounded-full border border-[#977460]/18 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div {...editorialFade} className="grid gap-8 border-b border-[#CFC2B7] pb-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#876856]">
            {copy.detailsEyebrow}
            </p>
            <h2
              className="mt-5 max-w-[37rem] text-[#38322C]"
              style={{
                fontSize: 'clamp(2.45rem, 5vw, 5.2rem)',
                lineHeight: 0.92,
                fontWeight: 400,
              }}
            >
              {copy.detailsTitle}
            </h2>
          </div>
          <p className="max-w-[32rem] text-[1.02rem] leading-relaxed text-[#635C54] lg:justify-self-end">
            {copy.detailsBody}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-[12rem_8rem_12rem]">
          <motion.a
            {...editorialFade}
            {...detailLinkProps(phone)}
            className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2.4rem] bg-[#38322C] p-7 text-[#F2EEEC] shadow-[0_34px_90px_-52px_rgba(56,50,44,0.74)] transition duration-500 hover:-translate-y-1 lg:col-span-7 lg:row-span-2"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(151,116,96,0.42),transparent_26%),linear-gradient(135deg,rgba(56,50,44,0)_0%,rgba(242,238,236,0.08)_100%)]" />
            <div className="relative flex items-start justify-between gap-6">
              <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#F2EEEC]/14 bg-[#F2EEEC]/10">
                <Phone className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F2EEEC]/12 bg-[#F2EEEC]/8 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#F2EEEC]/72 transition-colors group-hover:text-[#F2EEEC]">
                {phone.action}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
              </span>
            </div>

            <div className="relative mt-12">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#BAB0A8]">
                {phone.label}
              </p>
              <p
                className="mt-4 text-[#F2EEEC]"
                style={{
                  fontSize: 'clamp(3.7rem, 10vw, 8.5rem)',
                  lineHeight: 0.82,
                  fontWeight: 400,
                }}
              >
                {phone.value}
              </p>
              <p className="mt-7 max-w-[22rem] text-[1rem] leading-relaxed text-[#F2EEEC]/66">
                {phone.note}
              </p>
            </div>
          </motion.a>

          <motion.a
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.05 }}
            {...detailLinkProps(address)}
            className="group relative min-h-[14rem] overflow-hidden rounded-[2.4rem] border border-[#CABCB0] bg-[#F7F3EE] p-7 shadow-[0_28px_70px_-52px_rgba(56,50,44,0.32)] transition duration-500 hover:-translate-y-1 lg:col-span-5 lg:row-span-1"
          >
            <div className="absolute left-7 right-7 top-7 h-px bg-[#CFC2B7]" />
            <div className="absolute bottom-7 left-7 right-7 h-px bg-[#CFC2B7]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <MapPinned className="h-5 w-5 text-[#876856]" strokeWidth={1.65} />
                <span className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#876856] transition-colors group-hover:text-[#38322C]">
                  {address.action}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                </span>
              </div>
              <div className="mt-10">
                <p className="text-[0.7rem] uppercase tracking-[0.26em] text-[#876856]">
                  {address.label}
                </p>
                <p className="mt-3 max-w-[24rem] text-[1.45rem] leading-tight text-[#38322C]">
                  {address.value}
                </p>
              </div>
            </div>
          </motion.a>

          <motion.a
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.1 }}
            {...detailLinkProps(email)}
            className="group relative min-h-[14rem] overflow-hidden rounded-[2rem] border border-[#D8CDC0] bg-[#F2EEEC] p-6 shadow-[0_24px_60px_-48px_rgba(56,50,44,0.24)] transition duration-500 hover:-translate-y-1 lg:col-span-3 lg:row-span-1"
          >
            <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#E9E1D8]" />
            <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#E9E1D8]" />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <Mail className="h-5 w-5 text-[#876856]" strokeWidth={1.65} />
                <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#876856]">
                  {email.action}
                </span>
              </div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.26em] text-[#876856]">
                  {email.label}
                </p>
                <p className="mt-3 break-words text-[1.16rem] leading-tight text-[#38322C]">
                  {email.value}
                </p>
              </div>
            </div>
          </motion.a>

          <motion.div
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.15 }}
            className="relative min-h-[14rem] overflow-hidden rounded-[9999px] border border-[#BAB0A8]/38 bg-[#D8CDC0]/76 px-7 py-8 shadow-[0_24px_60px_-48px_rgba(56,50,44,0.3)] backdrop-blur-md lg:col-span-2 lg:row-span-1"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F2EEEC]/74 text-[#38322C]">
              <Clock3 className="h-5 w-5" strokeWidth={1.65} />
            </div>
            <p className="mt-5 text-center text-[0.68rem] uppercase tracking-[0.24em] text-[#876856]">
              {hours.label}
            </p>
            <p className="mx-auto mt-3 max-w-[13rem] text-center text-[1rem] leading-tight text-[#38322C]">
              {hours.value}
            </p>
          </motion.div>

          <motion.div
            {...editorialFade}
            transition={{ ...editorialFade.transition, delay: 0.2 }}
            className="relative hidden overflow-hidden rounded-[2.4rem] border border-[#D8CDC0] bg-[#8C8E77] p-7 text-[#F2EEEC] shadow-[0_24px_60px_-48px_rgba(56,50,44,0.36)] lg:col-span-5 lg:row-span-1 lg:block"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(56,50,44,0.22)_0%,rgba(242,238,236,0.08)_100%)]" />
            <p className="relative max-w-[20rem] text-[1.45rem] leading-tight">
              {address.note}
            </p>
            <p className="relative mt-6 max-w-[17rem] text-[0.92rem] leading-relaxed text-[#F2EEEC]/72">
              {hours.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ConsultationPathSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale];
  const [phone, , email, hours] = copy.details;
  const [activePillIndex, setActivePillIndex] = useState<number | null>(null);
  const contactPills = [
    { ...phone, href: phone.href, icon: Phone },
    { ...email, href: email.href, icon: Mail },
    { ...hours, icon: Clock3 },
  ];
  const inactiveGradient =
    'linear-gradient(90deg, rgba(135,104,86,0.82) 0%, rgba(186,176,168,0.58) 100%)';
  const activeGradient =
    'linear-gradient(90deg, rgba(186,176,168,0.76) 0%, rgba(135,104,86,0.9) 100%)';

  return (
    <section className="border-b border-[#D8CDC0] bg-[#977460] pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <motion.div
          {...editorialFade}
          className="relative overflow-hidden bg-[#977460]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.34) 0.7px, transparent 0.7px), radial-gradient(rgba(44,36,31,0.2) 0.7px, transparent 0.7px)',
              backgroundPosition: '0 0, 3px 3px',
              backgroundSize: '6px 6px',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(151,116,96,0)_28%,rgba(151,116,96,0.24)_44%,rgba(151,116,96,0.78)_64%,rgba(151,116,96,1)_100%)] md:w-[62%]"
          />

          <div className="relative min-h-[44rem] md:min-h-[46rem]">
            <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
              <ImageWithFallback
                src="/precision-art-hero-1.png"
                alt={copy.consultationImageAlt}
                className="h-full w-full object-cover object-[78%_center] md:object-[76%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(151,116,96,0.98)_0%,rgba(151,116,96,0.72)_28%,rgba(151,116,96,0.2)_52%,rgba(151,116,96,0)_78%)] md:bg-[linear-gradient(90deg,rgba(151,116,96,0.98)_0%,rgba(151,116,96,0.62)_18%,rgba(151,116,96,0.14)_42%,rgba(151,116,96,0)_60%)]" />
            </div>

            <div className="relative flex min-h-[44rem] flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <div className="max-w-[50rem] text-[#F2EEEC]">
                  <h2
                    className="mt-6"
                    style={{
                      fontSize: 'clamp(3rem, 5.7vw, 5.3rem)',
                      lineHeight: 0.94,
                      fontWeight: 400,
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {copy.consultationTitle}
                  </h2>
                  <p className="mt-6 max-w-[26rem] text-[1.03rem] leading-relaxed text-[#F2EEEC]/80 sm:text-[1.12rem]">
                    {copy.consultationBody}
                  </p>
                </div>
              </div>

              <div
                className="mt-10 grid max-w-[70rem] gap-5 sm:grid-cols-3 lg:mt-12 lg:gap-6"
                onMouseLeave={() => setActivePillIndex(null)}
              >
                {contactPills.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activePillIndex === index;
                  const content = (
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-[9999px] transition-opacity duration-700"
                        style={{
                          backgroundImage: inactiveGradient,
                          opacity: isActive ? 0.22 : 1,
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-[9999px] transition-opacity duration-700"
                        style={{
                          backgroundImage: activeGradient,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-[7%] top-[0.08rem] h-[44%] rounded-[9999px] transition-opacity duration-700"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(242,238,236,0.18) 0%, rgba(242,238,236,0.06) 42%, rgba(242,238,236,0) 100%)',
                          opacity: isActive ? 0.9 : 0.56,
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute -right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#F2EEEC]/12 blur-3xl transition-opacity duration-700"
                        style={{ opacity: isActive ? 0.9 : 0.3 }}
                      />

                      <span className="relative flex h-full flex-row items-center gap-3 px-5">
                        <span
                          className={cn(
                            'flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border transition-[background-color,color,border-color] duration-700',
                            isActive
                              ? 'border-[#F2EEEC]/28 bg-[#F2EEEC]/84 text-[#38322C]'
                              : 'border-[#F2EEEC]/10 bg-[#F2EEEC]/10 text-[#F2EEEC]',
                          )}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col justify-center text-left">
                          <span
                            className={cn(
                              'block text-[0.66rem] uppercase tracking-[0.24em] transition-colors duration-700',
                              isActive ? 'text-[#F2EEEC]/92' : 'text-[#F2EEEC]/62',
                            )}
                          >
                          {item.label}
                          </span>
                          <span className="mt-2 block max-w-[16rem] text-[1rem] leading-relaxed text-[#F2EEEC]/94">
                          {item.value}
                          </span>
                          <span className="mt-1 block max-w-[16rem] text-[0.88rem] leading-relaxed text-[#F2EEEC]/62">
                          {item.note}
                          </span>
                        </span>
                      </span>
                    </>
                  );
                  const className = cn(
                    'relative block h-[13.25rem] overflow-hidden rounded-[9999px] border bg-transparent px-0 text-left backdrop-blur-[24px] transition-[border-color,box-shadow,transform,opacity] duration-700 sm:h-[12.75rem] lg:h-[12.5rem]',
                  );
                  const interactiveProps = {
                    onMouseEnter: () => setActivePillIndex(index),
                    onFocus: () => setActivePillIndex(index),
                    onBlur: () => setActivePillIndex(null),
                    style: {
                      clipPath: 'ellipse(50% 50% at 50% 50%)',
                      borderColor: isActive ? 'rgba(242, 238, 236, 0.18)' : 'rgba(242, 238, 236, 0.10)',
                      boxShadow: isActive
                        ? '0 20px 48px -28px rgba(56,50,44,0.34), inset 0 1px 0 rgba(242,238,236,0.18)'
                        : '0 14px 34px -26px rgba(56,50,44,0.22), inset 0 1px 0 rgba(242,238,236,0.12)',
                      transform: isActive ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(0.992)',
                      opacity: isActive ? 1 : 0.9,
                    },
                  };

                  return item.href ? (
                    <a key={item.label} href={item.href} className={className} {...interactiveProps}>
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className={className} {...interactiveProps}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialPresenceSection() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale];

  return (
    <section className="relative overflow-hidden bg-[#38322C] px-5 py-20 text-[#F2EEEC] sm:px-8 lg:px-10 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(151,116,96,0.24),transparent_24%),radial-gradient(circle_at_86%_18%,rgba(172,178,202,0.12),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <motion.div {...editorialFade} className="max-w-[33rem]">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#BAB0A8]">
              {copy.socialEyebrow}
            </p>
            <h2
              className="mt-5 text-[#F2EEEC]"
              style={{
                fontSize: 'clamp(2.35rem, 4.7vw, 4.7rem)',
                lineHeight: 0.98,
                fontWeight: 400,
              }}
            >
              {copy.socialTitle}
            </h2>
            <p className="mt-6 text-[1rem] leading-relaxed text-[#F2EEEC]/72">{copy.socialBody}</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {copy.social.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  {...editorialFade}
                  transition={{ ...editorialFade.transition, delay: index * 0.06 }}
                  href={item.href}
                  className="group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-[#F2EEEC]/12 bg-[#F2EEEC]/8 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[#F2EEEC]/12"
                >
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(242,238,236,0)_0%,rgba(242,238,236,0.1)_100%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F2EEEC]/16 bg-[#F2EEEC]/10 text-[#F2EEEC]">
                          <Icon className="h-5 w-5" strokeWidth={1.65} />
                        </div>
                        <ExternalLink className="h-4 w-4 text-[#F2EEEC]/42 transition-colors group-hover:text-[#F2EEEC]" strokeWidth={1.6} />
                      </div>
                      <p className="mt-8 text-[0.68rem] uppercase tracking-[0.24em] text-[#BAB0A8]">
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-[1.72rem] leading-none text-[#F2EEEC]">
                        {item.title}
                      </h3>
                      <p className="mt-5 text-[0.98rem] leading-relaxed text-[#F2EEEC]/70">
                        {item.body}
                      </p>
                    </div>
                    <p className="relative mt-10 text-[0.68rem] uppercase tracking-[0.22em] text-[#D8CDC0]">
                      {item.action}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsFromV2Section() {
  const { locale } = useLocale();
  const copy = copyByLocale[locale];

  return (
    <section id="reviews" className="bg-[#F2EEEC]">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-8 lg:py-22">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <motion.div {...editorialFade} className="lg:sticky lg:top-28">
            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#876856]">
              {copy.reviewsEyebrow}
            </p>
            <h2
              className="mt-5 text-[#38322C]"
              style={{
                fontSize: 'clamp(2.35rem, 4.7vw, 4.6rem)',
                lineHeight: 0.98,
                fontWeight: 400,
              }}
            >
              {copy.reviewsTitle}
            </h2>
            <p className="mt-5 max-w-[29rem] text-[1rem] leading-relaxed text-[#635C54]">
              {copy.reviewsBody}
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D8CDC0] bg-[#F2EEEC] px-5 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-[#635C54] transition-colors duration-300 hover:border-[#977460] hover:text-[#38322C]"
            >
              {copy.reviewsCta}
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
            </a>
          </motion.div>

          <div className="relative overflow-hidden rounded-[2.4rem] border border-[#DDD1C5] bg-[linear-gradient(180deg,#F7F3EE_0%,#EFE8DF_100%)] p-5 shadow-[0_30px_80px_-48px_rgba(56,50,44,0.18)] sm:p-7 lg:p-8">
            <div className="relative mb-6 flex flex-col gap-5 border-b border-[#DED2C5] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8A7C70]">
                  {copy.reviewsBadge}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[#8F755F]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={`contact-v3-top-star-${index}`}
                      className="h-4 w-4 fill-current"
                      strokeWidth={1.4}
                    />
                  ))}
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[#6D625A]">
                    Google rating
                  </span>
                </div>
              </div>
            </div>

            <div className="relative grid gap-5 lg:grid-cols-12">
              <motion.article {...editorialFade} className="lg:col-span-8">
                <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#D9CEC1] bg-[#FBF8F4] px-6 py-7 text-[#38322C] shadow-[0_22px_50px_-42px_rgba(56,50,44,0.24)] sm:px-8 sm:py-8">
                  <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#876856]">
                    {copy.reviewsEyebrow}
                  </p>
                  <p className="mt-10 max-w-[38rem] text-[1.72rem] leading-[1.24] text-[#38322C] sm:text-[2.15rem]">
                    {copy.reviews[0].quote}
                  </p>
                  <div className="mt-10 flex flex-col gap-4 border-t border-[#E4D9CD] pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[0.95rem] uppercase tracking-[0.22em] text-[#2E2925]">
                        {copy.reviews[0].author}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#635C54]">
                        {copy.reviews[0].role}
                      </p>
                    </div>
                    <a
                      href={copy.reviews[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#7B6F64] transition-colors duration-300 hover:text-[#2E2925]"
                    >
                      Google
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </a>
                  </div>
                </div>
              </motion.article>

              <motion.article
                {...editorialFade}
                transition={{ ...editorialFade.transition, delay: 0.04 }}
                className="lg:col-span-4"
              >
                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-[16rem] flex-col justify-between rounded-[2rem] border border-[#D8CDC0] bg-[#F4EEE7] px-5 py-6 transition-colors duration-300 hover:bg-[#EFE7DE] sm:px-6"
                >
                  <div className="flex items-center gap-2 text-[#8F755F]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`contact-v3-side-rating-${index}`}
                        className="h-4 w-4 fill-current"
                        strokeWidth={1.4}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="max-w-[12rem] text-[1.42rem] leading-[1.12] text-[#2E2925]">
                      {copy.reviewsCta}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#6D625A] transition-colors duration-300 group-hover:text-[#2E2925]">
                      Google
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </div>
                  </div>
                </a>
              </motion.article>

              {copy.reviews.slice(1).map((review, index) => (
                <motion.article
                  key={review.author}
                  {...editorialFade}
                  transition={{ ...editorialFade.transition, delay: 0.08 + index * 0.04 }}
                  className={index === 0 ? 'lg:col-span-5' : 'lg:col-span-7'}
                >
                  <div className="flex h-full flex-col justify-between rounded-[1.9rem] border border-[#E4D9CD] bg-[#FFFDFC] px-6 py-6 shadow-[0_18px_40px_-38px_rgba(56,50,44,0.2)] sm:px-7">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#8A7C70]">
                        {index === 0 ? 'Excerpt' : 'Statement'}
                      </p>
                      <a
                        href={review.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#7B6F64] transition-colors duration-300 hover:text-[#2E2925]"
                      >
                        Google
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                      </a>
                    </div>
                    <p className={index === 0 ? 'mt-8 max-w-[17rem] text-[1.08rem] leading-[1.72] text-[#38322C]' : 'mt-8 max-w-[34rem] text-[1.34rem] leading-[1.48] text-[#2E2925] sm:text-[1.56rem]'}>
                      {review.quote}
                    </p>
                    <div className="mt-8 border-t border-[#E4D9CD] pt-4">
                      <p className="text-[0.88rem] uppercase tracking-[0.2em] text-[#2E2925]">
                        {review.author}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#7B6F64]">{review.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCtaSection() {
  const { locale, localizeHref } = useLocale();
  const copy = copyByLocale[locale];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, []);

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#38322C] px-5 py-24 text-[#F2EEEC] sm:px-8 lg:px-10 lg:py-36">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src="/obliq-approach-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,50,44,0.92)_0%,rgba(56,50,44,0.52)_50%,rgba(56,50,44,0.9)_100%)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          {...editorialFade}
          className="rounded-[2.5rem] border border-[#F2EEEC]/14 bg-[#F2EEEC]/8 px-6 py-14 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-10 sm:py-18 lg:px-16 lg:py-22"
        >
          <h2
            className="mx-auto max-w-3xl text-[#F2EEEC]"
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 5.6rem)',
              lineHeight: 0.94,
              fontWeight: 400,
            }}
          >
            {copy.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-[34rem] text-[1rem] leading-relaxed text-[#F2EEEC]/76 sm:text-[1.08rem]">
            {copy.ctaBody}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={localizeHref(bookingUrl)}
              className="inline-flex items-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-4 text-[0.74rem] uppercase tracking-[0.24em] text-[#38322C] shadow-[0_24px_50px_-28px_rgba(56,50,44,0.6)] transition duration-500 hover:-translate-y-0.5"
            >
              {copy.ctaPrimary}
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="tel:0898910588"
              className="inline-flex items-center rounded-full border border-[#F2EEEC]/22 bg-[#F2EEEC]/10 px-6 py-4 text-[0.74rem] uppercase tracking-[0.24em] text-[#F2EEEC] backdrop-blur-md transition duration-500 hover:bg-[#F2EEEC]/14"
            >
              {copy.ctaSecondary}
            </a>
            <button
              type="button"
              onClick={toggleMuted}
              aria-pressed={!isMuted}
              aria-label={isMuted ? copy.soundOn : copy.soundOff}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#F2EEEC]/24 bg-[#F2EEEC]/14 text-[#F2EEEC] backdrop-blur-md transition duration-300 hover:bg-[#F2EEEC]/20"
            >
              {isMuted ? <VolumeX className="h-5 w-5" strokeWidth={1.8} /> : <Volume2 className="h-5 w-5" strokeWidth={1.8} />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ContactPageV3() {
  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />
      <main>
        <ContactHeroSection />
        <ContactVisitSection />
        <ConsultationPathSection />
        {/* <ContactDetailGrid /> */}
        <SocialPresenceSection />
        <ReviewsFromV2Section />
        <VideoCtaSection />
      </main>
      <ConsultationFooter />
    </div>
  );
}
