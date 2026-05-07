import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Clock3,
  ExternalLink,
  Mail,
  MapPinned,
  Phone,
} from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionHeading, editorialFade } from './PremiumPagePrimitives';
import { SiteHeader } from './SiteHeader';
import { useLocale, type Locale } from '../i18n';

const clinicAddress = 'ул. „Стефан Стамболов“ 6, ет. 2, София';
const mapsQuery = 'Medical Center OBLIQ, ul. Stefan Stambolov 6, Sofia';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  mapsQuery,
)}&z=16&output=embed`;
const googleReviewsUrl = mapsUrl;

type ContactItem = {
  icon: typeof Phone;
  label: string;
  value: string;
  note: string;
  href?: string;
  action?: string;
};

type TrustItem = {
  value: string;
  label: string;
};

type StepItem = {
  title: string;
  body: string;
};

type ReviewItem = {
  quote: string;
  author: string;
  role: string;
  href: string;
};

const pageCopy: Record<
  Locale,
  {
    heroEyebrow: string;
    heroTitle: string;
    heroBody: string;
    heroPrimary: string;
    heroSecondary: string;
    heroPoints: string[];
    trust: TrustItem[];
    panelTitle: string;
    panelBody: string;
    contactItems: ContactItem[];
    stepEyebrow: string;
    stepTitle: string;
    stepBody: string;
    steps: StepItem[];
    locationEyebrow: string;
    locationTitle: string;
    locationBody: string;
    locationPrimary: string;
    locationSecondary: string;
    locationCardTitle: string;
    locationCardBody: string;
    reviewsEyebrow: string;
    reviewsTitle: string;
    reviewsBody: string;
    reviewsCta: string;
    reviewsBadge: string;
    reviews: ReviewItem[];
    trustStrip: string[];
    finalEyebrow: string;
    finalTitle: string;
    finalBody: string;
  }
> = {
  bg: {
    heroEyebrow: 'Контакт и консултация',
    heroTitle: 'Ясен път към консултация, без излишен шум.',
    heroBody:
      'Страницата е подредена около най-важното: бърз контакт, ясно следващо действие, усещане за професионализъм и достатъчно доверие, за да направиш първата стъпка спокойно.',
    heroPrimary: 'Виж контактите',
    heroSecondary: 'Обади се',
    heroPoints: [
      'Отговор до един работен ден',
      'Индивидуален подход без натиск',
      'Локация в центъра на София',
    ],
    trust: [
      { value: '1 ден', label: 'обичаен срок за отговор' },
      { value: 'Private', label: 'дискретна клинична среда' },
      { value: '1:1', label: 'личен подход към консултацията' },
    ],
    panelTitle: 'Свържете се по начина, който е най-удобен за вас.',
    panelBody:
      'Независимо дали предпочитате форма, телефон или имейл, следващата стъпка остава ясна и спокойна.',
    contactItems: [
      {
        icon: Phone,
        label: 'Телефон',
        value: '0898910588',
        note: 'Подходящ за бърза координация и записване на час.',
        href: 'tel:0898910588',
        action: 'Обади се',
      },
      {
        icon: Mail,
        label: 'Email',
        value: 'contact@obliq.bg',
        note: 'За въпроси, консултации и допълнителна информация.',
        href: 'mailto:contact@obliq.bg',
        action: 'Изпрати имейл',
      },
      {
        icon: MapPinned,
        label: 'Адрес',
        value: clinicAddress,
        note: 'Лесен достъп и удобна централна локация.',
        href: mapsUrl,
        action: 'Отвори в Maps',
      },
      {
        icon: Clock3,
        label: 'Работно време',
        value: 'Понеделник – Петък · 10:00 – 18:00',
        note: 'Посещения с предварително записан час.',
      },
    ],
    stepEyebrow: 'Как протича',
    stepTitle: 'Контактната страница трябва да премахва съмненията, не да ги създава.',
    stepBody:
      'Затова flow-ът е подреден около три ясни момента: запитване, обратна връзка и консултация.',
    steps: [
      {
        title: '1. Изпращате запитване или се свързвате директно',
        body: 'Избирате формата, телефона или имейла според това кое е най-удобно за вас.',
      },
      {
        title: '2. Получавате ясен отговор',
        body: 'Екипът връща контакт с уточнение за час, контекст и следващи стъпки.',
      },
      {
        title: '3. Консултация с личен подход',
        body: 'Срещата е ориентирана към разбиране, медицинска яснота и подходящ индивидуален план.',
      },
    ],
    locationEyebrow: 'Локация',
    locationTitle: 'Лесно да намериш. Лесно да се ориентираш.',
    locationBody:
      'Картата и адресът са видими веднага, защото practical clarity е част от premium усещането, не отделен детайл.',
    locationPrimary: 'Отвори Google Maps',
    locationSecondary: 'Към отзивите',
    locationCardTitle: 'Център на София',
    locationCardBody:
      'Подходящо за предварително планирани посещения и за по-прецизна координация в рамките на работния ден.',
    reviewsEyebrow: 'Отзиви',
    reviewsTitle: 'Доверието тук трябва да се усеща по-различно.',
    reviewsBody:
      'Вместо стандартна секция с еднакви карета, отзивите са подредени като по-редакционен trust layer с различен ритъм, размер и присъствие.',
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
    trustStrip: [
      'Естетична дерматология с личен подход',
      'Спокойна комуникация без агресивен selling',
      'По-ясен контакт преди първата консултация',
    ],
    finalEyebrow: 'Консултация',
    finalTitle: 'Най-важното остава просто: да направиш първата стъпка уверено.',
    finalBody:
      'Контактът е директен, а всичко преди него подготвя това решение с достатъчно яснота и доверие.',
  },
  en: {
    heroEyebrow: 'Contact and consultation',
    heroTitle: 'A clear path to consultation, without unnecessary noise.',
    heroBody:
      'The page is structured around what matters most: fast contact, a clear next step, a strong sense of professionalism and enough trust to make the first move calmly.',
    heroPrimary: 'View contacts',
    heroSecondary: 'Call now',
    heroPoints: [
      'Reply within one business day',
      'Individual approach without pressure',
      'Central Sofia location',
    ],
    trust: [
      { value: '1 day', label: 'typical reply window' },
      { value: 'Private', label: 'discreet clinical setting' },
      { value: '1:1', label: 'personal consultation approach' },
    ],
    panelTitle: 'Reach out in the way that feels most natural to you.',
    panelBody:
      'Whether you prefer the form, phone or email, the next step stays clear and calm.',
    contactItems: [
      {
        icon: Phone,
        label: 'Phone',
        value: '0898910588',
        note: 'Best for quick coordination and appointment booking.',
        href: 'tel:0898910588',
        action: 'Call now',
      },
      {
        icon: Mail,
        label: 'Email',
        value: 'contact@obliq.bg',
        note: 'For questions, consultations and additional context.',
        href: 'mailto:contact@obliq.bg',
        action: 'Send email',
      },
      {
        icon: MapPinned,
        label: 'Address',
        value: clinicAddress,
        note: 'Easy access and a convenient central location.',
        href: mapsUrl,
        action: 'Open in Maps',
      },
      {
        icon: Clock3,
        label: 'Working hours',
        value: 'Monday – Friday · 10:00 – 18:00',
        note: 'Visits by appointment.',
      },
    ],
    stepEyebrow: 'How it works',
    stepTitle: 'A contact page should remove hesitation, not create it.',
    stepBody:
      'That is why the flow is built around three simple moments: inquiry, response and consultation.',
    steps: [
      {
        title: '1. You send an inquiry or contact us directly',
        body: 'Choose the form, phone or email depending on what feels most convenient.',
      },
      {
        title: '2. You receive a clear response',
        body: 'The team gets back to you with timing, context and the next practical steps.',
      },
      {
        title: '3. Personal consultation',
        body: 'The meeting is centered on understanding, medical clarity and the right individual plan.',
      },
    ],
    locationEyebrow: 'Location',
    locationTitle: 'Easy to find. Easy to orient yourself.',
    locationBody:
      'The map and address are visible immediately because practical clarity is part of a premium experience, not a secondary detail.',
    locationPrimary: 'Open Google Maps',
    locationSecondary: 'Go to reviews',
    locationCardTitle: 'Central Sofia',
    locationCardBody:
      'Suitable for planned visits and carefully coordinated appointments during the workday.',
    reviewsEyebrow: 'Reviews',
    reviewsTitle: 'Trust here should feel more curated.',
    reviewsBody:
      'Instead of a standard row of matching cards, the testimonials are arranged as a more editorial trust layer with different rhythm, scale and emphasis.',
    reviewsCta: 'See all reviews on Google',
    reviewsBadge: 'Public Google reviews',
    reviews: [
      {
        quote:
          'Extremely attentive communication and a genuine feeling that every recommendation is personal, not templated.',
        author: 'Maria P.',
        role: 'OBLIQ patient',
        href: googleReviewsUrl,
      },
      {
        quote:
          'The calm of the consultation was the strongest first impression. Nothing excessive, just clarity and trust.',
        author: 'Elena K.',
        role: 'Consultation and skin plan',
        href: googleReviewsUrl,
      },
      {
        quote:
          'A very measured approach. Both the result and the communication feel refined rather than aggressive.',
        author: 'Theodora N.',
        role: 'Long-term care',
        href: googleReviewsUrl,
      },
    ],
    trustStrip: [
      'Aesthetic dermatology with a personal approach',
      'Calm communication without aggressive selling',
      'Clearer contact before the first consultation',
    ],
    finalEyebrow: 'Consultation',
    finalTitle: 'The most important thing stays simple: making the first step with confidence.',
    finalBody:
      'The contact options stay direct, while everything before them prepares that decision with clarity and trust.',
  },
  ru: {
    heroEyebrow: 'Контакт и консультация',
    heroTitle: 'Ясный путь к консультации, без лишнего шума.',
    heroBody:
      'Страница выстроена вокруг самого важного: быстрый контакт, понятный следующий шаг, ощущение профессионализма и достаточно доверия, чтобы спокойно сделать первый шаг.',
    heroPrimary: 'Смотреть контакты',
    heroSecondary: 'Позвонить',
    heroPoints: [
      'Ответ в течение одного рабочего дня',
      'Индивидуальный подход без давления',
      'Локация в центре Софии',
    ],
    trust: [
      { value: '1 день', label: 'обычный срок ответа' },
      { value: 'Private', label: 'деликатная клиническая среда' },
      { value: '1:1', label: 'личный формат консультации' },
    ],
    panelTitle: 'Свяжитесь так, как вам удобнее всего.',
    panelBody:
      'Форма, телефон или email работают одинаково ясно и спокойно.',
    contactItems: [
      {
        icon: Phone,
        label: 'Телефон',
        value: '0898910588',
        note: 'Подходит для быстрой координации и записи.',
        href: 'tel:0898910588',
        action: 'Позвонить',
      },
      {
        icon: Mail,
        label: 'Email',
        value: 'contact@obliq.bg',
        note: 'Для вопросов, консультаций и дополнительной информации.',
        href: 'mailto:contact@obliq.bg',
        action: 'Написать',
      },
      {
        icon: MapPinned,
        label: 'Адрес',
        value: clinicAddress,
        note: 'Удобный доступ и центральное расположение.',
        href: mapsUrl,
        action: 'Открыть в Maps',
      },
      {
        icon: Clock3,
        label: 'Часы работы',
        value: 'Понедельник – Пятница · 10:00 – 18:00',
        note: 'Посещение по предварительной записи.',
      },
    ],
    stepEyebrow: 'Как это работает',
    stepTitle: 'Контактная страница должна снимать сомнения, а не создавать их.',
    stepBody:
      'Поэтому структура собрана вокруг трех простых моментов: запрос, ответ и консультация.',
    steps: [
      {
        title: '1. Вы отправляете запрос или связываетесь напрямую',
        body: 'Выбираете форму, телефон или email в зависимости от того, что удобнее.',
      },
      {
        title: '2. Вы получаете понятный ответ',
        body: 'Команда связывается с вами и уточняет время, контекст и дальнейшие шаги.',
      },
      {
        title: '3. Личная консультация',
        body: 'Встреча строится вокруг понимания, медицинской ясности и подходящего индивидуального плана.',
      },
    ],
    locationEyebrow: 'Локация',
    locationTitle: 'Легко найти. Легко сориентироваться.',
    locationBody:
      'Карта и адрес показаны сразу, потому что practical clarity тоже часть premium опыта.',
    locationPrimary: 'Открыть Google Maps',
    locationSecondary: 'К отзывам',
    locationCardTitle: 'Центр Софии',
    locationCardBody:
      'Подходит как для заранее запланированных визитов, так и для точно согласованных встреч в течение рабочего дня.',
    reviewsEyebrow: 'Отзывы',
    reviewsTitle: 'Доверие здесь должно ощущаться более собранно.',
    reviewsBody:
      'Вместо стандартного ряда одинаковых карточек отзывы собраны как более редакционный слой доверия с разным ритмом, масштабом и акцентом.',
    reviewsCta: 'Смотреть все отзывы в Google',
    reviewsBadge: 'Публичные Google reviews',
    reviews: [
      {
        quote:
          'Очень внимательное отношение и ощущение, что каждая рекомендация действительно персональна, а не шаблонна.',
        author: 'Мария П.',
        role: 'Пациент OBLIQ',
        href: googleReviewsUrl,
      },
      {
        quote:
          'Спокойствие во время консультации стало самым сильным первым впечатлением. Ничего лишнего, только ясность и доверие.',
        author: 'Елена К.',
        role: 'Консультация и skin plan',
        href: googleReviewsUrl,
      },
      {
        quote:
          'Очень выверенный подход. И результат, и сама коммуникация ощущаются деликатно, а не агрессивно.',
        author: 'Теодора Н.',
        role: 'Долгосрочный уход',
        href: googleReviewsUrl,
      },
    ],
    trustStrip: [
      'Эстетическая дерматология с личным подходом',
      'Спокойная коммуникация без агрессивных продаж',
      'Более ясный контакт до первой консультации',
    ],
    finalEyebrow: 'Консультация',
    finalTitle: 'Главное остается простым: сделать первый шаг уверенно.',
    finalBody:
      'Контакт остается прямым, а все до него помогает принять это решение с доверием и ясностью.',
  },
};

function ContactCard({ item }: { item: ContactItem }) {
  const Icon = item.icon;
  const isExternal = item.href?.startsWith('http');

  return (
    <motion.article
      {...editorialFade}
      className="rounded-[1.4rem] border border-[#D8CDC0] bg-[#F2EEEC] p-6 shadow-[0_20px_50px_-38px_rgba(56,50,44,0.24)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8CDC0] text-[#38322C]">
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </div>
        {item.href && item.action ? (
          <a
            href={item.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#635C54] transition-colors hover:text-[#38322C]"
          >
            {item.action}
            {isExternal ? (
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
            )}
          </a>
        ) : null}
      </div>
      <p className="mt-6 text-[0.72rem] uppercase tracking-[0.24em] text-[#876856]">{item.label}</p>
      <p className="mt-3 text-[1.18rem] leading-tight text-[#38322C]">{item.value}</p>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-[#635C54]">{item.note}</p>
    </motion.article>
  );
}

export function ContactPageV2() {
  const { locale } = useLocale();
  const copy = pageCopy[locale];

  return (
    <div className="bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
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
                    alt="Editorial profile image for OBLIQ"
                    className="h-full w-full object-cover object-[78%_center] md:object-[76%_center]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(151,116,96,0.98)_0%,rgba(151,116,96,0.72)_28%,rgba(151,116,96,0.2)_52%,rgba(151,116,96,0)_78%)] md:bg-[linear-gradient(90deg,rgba(151,116,96,0.98)_0%,rgba(151,116,96,0.62)_18%,rgba(151,116,96,0.14)_42%,rgba(151,116,96,0)_60%)]" />
                </div>

                <div className="relative flex min-h-[44rem] flex-col justify-between p-7 sm:p-10 lg:p-14">

                  <div>
                    <div className="max-w-[50rem] text-[#F2EEEC]">
                      <h1
                        className="mt-6"
                        style={{
                          fontSize: 'clamp(3rem, 5.7vw, 5.3rem)',
                          lineHeight: 0.94,
                          fontWeight: 400,
                          letterSpacing: '-0.05em',
                        }}
                      >
                        {copy.heroTitle}
                      </h1>
                      <p className="mt-6 max-w-[26rem] text-[1.03rem] leading-relaxed text-[#F2EEEC]/80 sm:text-[1.12rem]">
                        {copy.heroBody}
                      </p>

                      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <a
                          href="#contact-options"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#38322C] transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          {copy.heroPrimary}
                          <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                        </a>
                        <a
                          href="tel:0898910588"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F2EEEC]/28 bg-transparent px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#F2EEEC] transition-colors duration-300 hover:bg-[#F2EEEC]/8"
                        >
                          {copy.heroSecondary}
                          <Phone className="h-4 w-4" strokeWidth={1.6} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {copy.trust.map((item) => (
                <motion.div
                  key={item.label}
                  {...editorialFade}
                  className="rounded-[1.1rem] border border-[#E3D8CD] bg-white px-4 py-4"
                >
                  <p className="text-[1.15rem] text-[#2E2925]">{item.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#72685F]">{item.label}</p>
                </motion.div>
              ))}
            </div> */}
          </div>
        </section>

        <section id="contact-options" className="bg-[#F2EEEC]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-8 lg:py-20">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {copy.contactItems.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#D8CDC0] bg-[#F2EEEC]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-8 lg:py-22">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <motion.div {...editorialFade}>
                <SectionHeading
                  eyebrow={copy.stepEyebrow}
                  title={copy.stepTitle}
                  body={copy.stepBody}
                />
              </motion.div>

              <div className="space-y-4">
                {copy.steps.map((step, index) => (
                  <motion.article
                    key={step.title}
                    {...editorialFade}
                    transition={{ ...editorialFade.transition, delay: index * 0.06 }}
                    className="rounded-[1.5rem] border border-[#D8CDC0] bg-[#F2EEEC] px-6 py-6 shadow-[0_20px_50px_-38px_rgba(56,50,44,0.2)]"
                  >
                    <h3 className="text-[1.12rem] leading-tight text-[#38322C]">{step.title}</h3>
                    <p className="mt-3 max-w-[36rem] text-[1rem] leading-relaxed text-[#635C54]">
                      {step.body}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F2EEEC]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-8 lg:py-22">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center">
              <motion.div {...editorialFade}>
                <SectionHeading
                  eyebrow={copy.locationEyebrow}
                  title={copy.locationTitle}
                  body={copy.locationBody}
                />

                <div className="mt-8 rounded-[1.5rem] border border-[#D8CDC0] bg-[#F2EEEC] p-6">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#876856]">
                    {copy.locationCardTitle}
                  </p>
                  <p className="mt-3 text-[1.1rem] leading-tight text-[#38322C]">{clinicAddress}</p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-[#635C54]">
                    {copy.locationCardBody}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#38322C] px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#F2EEEC] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {copy.locationPrimary}
                    <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                  <a
                    href="#reviews"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8CDC0] bg-transparent px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#38322C] transition-colors duration-300 hover:bg-[#D8CDC0]/22"
                  >
                    {copy.locationSecondary}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                {...editorialFade}
                className="overflow-hidden rounded-[2rem] border border-[#D8CDC0] bg-[#F2EEEC] p-3 shadow-[0_26px_70px_-42px_rgba(56,50,44,0.3)]"
              >
                <div className="overflow-hidden rounded-[1.4rem]">
                  <iframe
                    title="OBLIQ map"
                    src={mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[26rem] w-full border-0"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-[#F2EEEC]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-8 lg:py-22">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
              <motion.div {...editorialFade} className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow={copy.reviewsEyebrow}
                  title={copy.reviewsTitle}
                  body={copy.reviewsBody}
                />
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
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(151,116,96,0.14),transparent_58%)]"
                />

                <div className="relative mb-6 flex flex-col gap-5 border-b border-[#DED2C5] pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8A7C70]">
                      {copy.reviewsBadge}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-[#8F755F]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={`reviews-top-star-${index}`} className="text-[1rem] leading-none">
                          ★
                        </span>
                      ))}
                      <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[#6D625A]">
                        Google rating
                      </span>
                    </div>
                  </div>

                  <a
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#6D625A] transition-colors duration-300 hover:text-[#2E2925]"
                  >
                    {copy.reviewsCta}
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </a>
                </div>

                <div className="relative grid gap-5 lg:grid-cols-12">
                  <motion.article
                    {...editorialFade}
                    className="lg:col-span-8"
                  >
                    <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#D9CEC1] bg-[#FBF8F4] px-6 py-7 text-[#38322C] shadow-[0_22px_50px_-42px_rgba(56,50,44,0.24)] sm:px-8 sm:py-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#876856]">
                            {copy.reviewsEyebrow}
                          </p>
                          <div className="mt-4 h-px w-16 bg-[#D8CDC0]" />
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D8CDC0] bg-[#F2EEEC] text-[#977460]">
                          <span className="text-[1.45rem] leading-none">“</span>
                        </div>
                      </div>

                      <div className="mt-10">
                        <p className="max-w-[38rem] text-[1.72rem] leading-[1.24] tracking-[-0.04em] text-[#38322C] sm:text-[2.15rem]">
                          {copy.reviews[0].quote}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-2 text-[#977460]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={`featured-rating-${index}`} className="text-[0.98rem] leading-none">
                            ★
                          </span>
                        ))}
                      </div>

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
                      <div>
                        <p className="max-w-[10rem] text-[0.72rem] uppercase tracking-[0.24em] text-[#876856]">
                          {copy.reviewsBadge}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[#8F755F]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={`side-rating-${index}`} className="text-[0.95rem] leading-none">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="max-w-[12rem] text-[1.42rem] leading-[1.12] tracking-[-0.03em] text-[#2E2925]">
                          {copy.reviewsCta}
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#6D625A] transition-colors duration-300 group-hover:text-[#2E2925]">
                          Google
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                        </div>
                      </div>
                    </a>
                  </motion.article>

                  <motion.article
                    {...editorialFade}
                    transition={{ ...editorialFade.transition, delay: 0.08 }}
                    className="lg:col-span-5"
                  >
                    <div className="flex h-full flex-col rounded-[1.9rem] border border-[#E4D9CD] bg-[#FFFDFC] px-6 py-6 shadow-[0_18px_40px_-38px_rgba(56,50,44,0.2)] sm:px-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="max-w-[7rem] text-[0.68rem] uppercase tracking-[0.24em] text-[#8A7C70]">
                          Excerpt
                        </div>
                        <a
                          href={copy.reviews[1].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#7B6F64] transition-colors duration-300 hover:text-[#2E2925]"
                        >
                          Google
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                        </a>
                      </div>

                      <p className="mt-8 max-w-[17rem] text-[1.08rem] leading-[1.72] text-[#38322C]">
                        {copy.reviews[1].quote}
                      </p>

                      <div className="mt-8 flex items-center gap-2 text-[#9A806A]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={`excerpt-rating-${index}`} className="text-[0.94rem] leading-none">
                            ★
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto border-t border-[#E4D9CD] pt-4">
                        <p className="text-[0.88rem] uppercase tracking-[0.2em] text-[#2E2925]">
                          {copy.reviews[1].author}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#7B6F64]">
                          {copy.reviews[1].role}
                        </p>
                      </div>
                    </div>
                  </motion.article>

                  <motion.article
                    {...editorialFade}
                    transition={{ ...editorialFade.transition, delay: 0.12 }}
                    className="lg:col-span-7"
                  >
                    <div className="flex h-full flex-col justify-between rounded-[1.9rem] border border-[#D8CDC0] bg-[#F6F0E8] px-6 py-6 shadow-[0_18px_40px_-38px_rgba(56,50,44,0.16)] sm:px-7">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8A7C70]">
                          Statement
                        </p>
                        <a
                          href={copy.reviews[2].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#7B6F64] transition-colors duration-300 hover:text-[#2E2925]"
                        >
                          Google
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
                        </a>
                      </div>

                      <p className="mt-8 max-w-[34rem] text-[1.34rem] leading-[1.48] tracking-[-0.02em] text-[#2E2925] sm:text-[1.56rem]">
                        {copy.reviews[2].quote}
                      </p>

                      <div className="mt-8 flex items-center gap-2 text-[#9A806A]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={`statement-rating-${index}`} className="text-[0.96rem] leading-none">
                            ★
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-col gap-2 border-t border-[#DDD1C5] pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[0.9rem] uppercase tracking-[0.2em] text-[#2E2925]">
                          {copy.reviews[2].author}
                        </p>
                        <p className="text-sm leading-relaxed text-[#7B6F64]">
                          {copy.reviews[2].role}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ConsultationFooter />
    </div>
  );
}
