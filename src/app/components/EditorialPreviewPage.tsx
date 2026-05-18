import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SiteHeader } from './SiteHeader';
import {
  AtmosphereOrbs,
  CinematicHero,
  SectionHeading,
  editorialFade,
  type HeroMediaSide,
} from './PremiumPagePrimitives';
import { useLocale, type Locale } from '../i18n';

type PreviewPageProps = {
  title: string;
  subtitle: string;
  heroVideoSrc: string;
  heroMediaFrame?: 'ellipse' | 'mirror';
  heroMirrorImageSrc?: string;
  heroMirrorAspectClassName?: string;
  heroMirrorClassName?: string;
  heroMirrorVideoBounds?: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  heroBackgroundColor: string;
  heroMediaSide: HeroMediaSide;
  sectionTitle: string;
  sectionBody: string;
  previewLabel: string;
  previewItems: string[];
  message: string;
  ctaLabel: string;
  ctaHref: string;
  articleCards?: { title: string; excerpt: string }[];
};

const editorialCopy: Record<
  Locale,
  {
    articleEyebrow: string;
    secondaryActionLabel: string;
  }
> = {
  bg: {
    articleEyebrow: 'Текст в Skin Journal',
    secondaryActionLabel: 'Подходът на OBLIQ.',
  },
  en: {
    articleEyebrow: 'Skin Journal preview',
    secondaryActionLabel: 'The OBLIQ. approach',
  },
  ru: {
    articleEyebrow: 'Текст в Skin Journal',
    secondaryActionLabel: 'Подход OBLIQ.',
  },
};

const pageCopy: Record<
  Locale,
  {
    conditions: Omit<PreviewPageProps, 'heroVideoSrc'>;
    procedures: Omit<PreviewPageProps, 'heroVideoSrc'>;
    journal: Omit<PreviewPageProps, 'heroVideoSrc'>;
  }
> = {
  bg: {
    conditions: {
      title: 'Състояния',
      subtitle: 'Разбиране на кожните състояния чрез персонален подход и мислене, водено от наука.',
      heroBackgroundColor: '#635C54',
      heroMediaSide: 'right',
      sectionTitle: 'Разбирането изисква време.',
      sectionBody:
        'Скоро ще представим внимателно подбрана информация за кожните състояния и ново дигитално изживяване.',
      previewLabel: 'Преглед на състоянията',
      previewItems: ['Акне', 'Пигментация', 'Зачервяване', 'Отпуснат контур', 'Дехтеринация'],
      message: 'Състояния, разгледани с внимание към детайла.',
      ctaLabel: 'Заяви консултация',
      ctaHref: '/#contact',
    },
    procedures: {
      title: 'Терапии',
      subtitle:
        'Съвременни естетични терапии с фокус върху естествено изглеждащи резултати и дългосрочно качество на кожата.',
      // heroBackgroundColor: '#977460',
      heroMediaSide: 'left',
      sectionTitle: 'Естетиката изисква време.',
      sectionBody:
        'Скоро ще представим внимателно подбрани терапии и ново дигитално изживяване.',
      previewLabel: 'Преглед на терапиите',
      previewItems: ['Инжекционни терапии', 'Лазерни терапии', 'Качество на кожата', 'Регенеративна естетика'],
      message: 'Терапии, създадени с внимание към детайла.',
      ctaLabel: 'Запази консултация',
      ctaHref: '/#contact',
    },
    journal: {
      title: 'Skin Journal',
      subtitle:
        'Мисли, наблюдения и гледни точки за здравето на кожата, активните съставки и съвременната естетична грижа.',
      heroBackgroundColor: '#2F2B28',
      heroMediaSide: 'right',
      sectionTitle: 'Кожата има собствен ритъм.',
      sectionBody:
        'Skin Journal събира кратки, ясни и внимателно подбрани насоки за кожа, терапии и ежедневна грижа.',
      previewLabel: 'Skin Journal preview',
      previewItems: [],
      articleCards: [
        {
          title: 'Какво означава качество на кожата',
          excerpt:
            'По-близък поглед към текстурата, тена, устойчивостта и защо качеството на кожата определя естетическия резултат далеч отвъд повърхностния блясък.',
        },
        {
          title: 'Ролята на превенцията',
          excerpt:
            'Защо правилният момент, поддръжката и малките намеси често създават по-елегантни дългосрочни резултати от реактивната корекция.',
        },
        {
          title: 'Здраве на кожата отвъд тенденциите',
          excerpt:
            'Редакционна гледна точка към избора на грижа, която уважава биологията, индивидуалността и тихата увереност на естествено изглеждащата кожа.',
        },
      ],
      message: 'Още теми от Skin Journal идват скоро.',
      ctaLabel: 'Разгледай OBLIQ.',
      ctaHref: '/the-obliq-approach',
    },
  },
  en: {
    conditions: {
      title: 'Conditions',
      subtitle: 'Understanding skin conditions through a personal, science-led approach.',
      heroBackgroundColor: '#635C54',
      heroMediaSide: 'right',
      sectionTitle: 'Understanding takes time.',
      sectionBody:
        'Soon, we will present carefully selected guidance on skin conditions and a new digital experience.',
      previewLabel: 'Conditions overview',
      previewItems: ['Acne', 'Pigmentation', 'Redness', 'Loose contour', 'Exfoliation'],
      message: 'Conditions explored with attention to detail.',
      ctaLabel: 'Request a consultation',
      ctaHref: '/#contact',
    },
    procedures: {
      title: 'Therapies',
      subtitle:
        'Contemporary aesthetic therapies focused on natural-looking results and long-term skin quality.',
      heroBackgroundColor: '#977460',
      heroMediaSide: 'left',
      sectionTitle: 'Aesthetics take time.',
      sectionBody:
        'Soon, we will present a carefully selected range of therapies and a new digital experience.',
      previewLabel: 'Therapy overview',
      previewItems: ['Injectable therapies', 'Laser therapies', 'Skin quality', 'Regenerative aesthetics'],
      message: 'Therapies created with attention to detail.',
      ctaLabel: 'Book consultation',
      ctaHref: '/#contact',
    },
    journal: {
      title: 'Skin Journal',
      subtitle: 'Thoughts, observations and perspectives on skin health, active ingredients and modern aesthetic care.',
      heroBackgroundColor: '#2F2B28',
      heroMediaSide: 'right',
      sectionTitle: 'Skin has its own rhythm.',
      sectionBody:
        'Skin Journal gathers concise, carefully selected guidance on skin, therapies and daily care.',
      previewLabel: 'Skin Journal preview',
      previewItems: [],
      articleCards: [
        {
          title: 'What skin quality means',
          excerpt:
            'A closer look at texture, tone, resilience and why skin quality defines aesthetic results far beyond surface glow.',
        },
        {
          title: 'The role of prevention',
          excerpt:
            'Why timing, maintenance and small interventions often create more elegant long-term outcomes than reactive correction.',
        },
        {
          title: 'Skin health beyond trends',
          excerpt:
            'An editorial view on choosing care that respects biology, individuality and the quiet confidence of natural-looking skin.',
        },
      ],
      message: 'More from Skin Journal is coming soon.',
      ctaLabel: 'Explore OBLIQ.',
      ctaHref: '/the-obliq-approach',
    },
  },
  ru: {
    conditions: {
      title: 'Состояния',
      subtitle: 'Понимание состояний кожи через персональный подход и научное мышление.',
      heroBackgroundColor: '#635C54',
      heroMediaSide: 'right',
      sectionTitle: 'Понимание требует времени.',
      sectionBody:
        'Скоро мы представим тщательно подготовленную информацию о состояниях кожи и новый цифровой опыт.',
      previewLabel: 'Обзор состояний',
      previewItems: ['Акне', 'Пигментация', 'Покраснение', 'Отпуснат контур', 'Дехтеринация'],
      message: 'Состояния, рассмотренные с вниманием к деталям.',
      ctaLabel: 'Запросить консультацию',
      ctaHref: '/#contact',
    },
    procedures: {
      title: 'Терапии',
      subtitle:
        'Современные эстетические терапии с фокусом на естественный результат и долгосрочное качество кожи.',
      heroBackgroundColor: '#977460',
      heroMediaSide: 'left',
      sectionTitle: 'Эстетика требует времени.',
      sectionBody:
        'Скоро мы представим тщательно подобранные терапии и новый цифровой опыт.',
      previewLabel: 'Обзор терапий',
      previewItems: ['Инъекционные терапии', 'Лазерные терапии', 'Качество кожи', 'Регенеративная эстетика'],
      message: 'Терапии, созданные с вниманием к деталям.',
      ctaLabel: 'Записаться на консультацию',
      ctaHref: '/#contact',
    },
    journal: {
      title: 'Skin Journal',
      subtitle: 'Мысли, наблюдения и взгляды на здоровье кожи, активные ингредиенты и современный эстетический уход.',
      heroBackgroundColor: '#2F2B28',
      heroMediaSide: 'right',
      sectionTitle: 'У кожи есть свой ритм.',
      sectionBody:
        'Skin Journal собирает краткие и тщательно подобранные рекомендации о коже, терапиях и ежедневном уходе.',
      previewLabel: 'Skin Journal preview',
      previewItems: [],
      articleCards: [
        {
          title: 'Что означает качество кожи',
          excerpt:
            'Более близкий взгляд на текстуру, тон, устойчивость и то, почему качество кожи определяет эстетический результат глубже поверхностного сияния.',
        },
        {
          title: 'Роль профилактики',
          excerpt:
            'Почему правильный момент, поддержка и малые вмешательства часто создают более элегантные долгосрочные результаты.',
        },
        {
          title: 'Здоровье кожи вне тенденций',
          excerpt:
            'Редакционный взгляд на уход, который уважает биологию, индивидуальность и спокойную уверенность естественного результата.',
        },
      ],
      message: 'Скоро появятся новые темы из Skin Journal.',
      ctaLabel: 'Посмотреть OBLIQ.',
      ctaHref: '/the-obliq-approach',
    },
  },
};

function PreviewPills({ items }: { items: string[] }) {
  return (
    <div className="mt-12 flex flex-wrap gap-3 lg:mt-14">
      {items.map((item, index) => (
        <motion.div
          key={item}
          {...editorialFade}
          transition={{ ...editorialFade.transition, delay: index * 0.05 }}
          className="rounded-full border border-[#BAB0A8]/20 bg-[#F2EEEC]/78 px-5 py-3 text-[0.8rem] uppercase tracking-[0.22em] text-[#635C54] shadow-[0_18px_36px_-28px_rgba(56,50,44,0.28)] backdrop-blur-md"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}

function ArticleCardGrid({
  cards,
  eyebrow,
}: {
  cards: { title: string; excerpt: string }[];
  eyebrow: string;
}) {
  return (
    <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          {...editorialFade}
          transition={{ ...editorialFade.transition, delay: index * 0.06 }}
          className="rounded-[2rem] border border-[#BAB0A8]/18 bg-[linear-gradient(180deg,#F2EEEC_0%,#D8CDC0_100%)] p-7 shadow-[0_24px_60px_-40px_rgba(56,50,44,0.28)]"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#876856]">{eyebrow}</p>
          <h3 className="type-h5 mt-4 text-[#38322C]">
            {card.title}
          </h3>
          <p className="type-body mt-4 text-[#635C54]">{card.excerpt}</p>
        </motion.article>
      ))}
    </div>
  );
}

function EditorialPreviewContentSection({
  previewLabel,
  sectionTitle,
  sectionBody,
  previewItems,
  articleCards,
  message,
  ctaHref,
  ctaLabel,
  articleEyebrow,
}: {
  previewLabel: string;
  sectionTitle: string;
  sectionBody: string;
  previewItems: string[];
  articleCards?: { title: string; excerpt: string }[];
  message: string;
  ctaHref: string;
  ctaLabel: string;
  articleEyebrow: string;
}) {
  const { localizeHref } = useLocale();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F2EEEC_0%,#D8CDC0_100%)] py-24 lg:py-32">
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-8%] top-12 h-72 w-72 bg-[#F2EEEC]/55' },
          { className: 'right-[2%] top-[18%] h-56 w-96 bg-[#ACB2CA]/12' },
          { className: 'bottom-[10%] left-[18%] h-44 w-72 bg-[#977460]/12' },
        ]}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <SectionHeading
          eyebrow={previewLabel}
          title={sectionTitle}
          body={sectionBody}
        />

        {articleCards ? (
          <ArticleCardGrid cards={articleCards} eyebrow={articleEyebrow} />
        ) : (
          <PreviewPills items={previewItems} />
        )}

        <motion.div
          {...editorialFade}
          className="mt-14 rounded-[2.4rem] border border-[#BAB0A8]/18 bg-[#38322C] px-8 py-10 text-[#F2EEEC] shadow-[0_30px_70px_-46px_rgba(56,50,44,0.5)] sm:px-10 sm:py-12 lg:mt-16 lg:px-14"
        >
          <p className="type-h3">
            {message}
          </p>

          <a
            href={localizeHref(ctaHref)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#F2EEEC] px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#38322C] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProceduresHeroV2({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const { localizeHref } = useLocale();

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#38322C] px-5 py-28 text-[#F2EEEC] sm:px-8 lg:px-12">
      <div className="absolute inset-0 opacity-[0.78]">
        <ImageWithFallback
          src="/precision-art-hero-2.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 0%' }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 20rem 25rem at 52% 30%, rgba(56,50,44,0) 0%, rgba(56,50,44,0.03) 38%, rgba(56,50,44,0.5) 70%, rgba(56,50,44,0.88) 100%), linear-gradient(90deg, rgba(56,50,44,0.94) 0%, rgba(56,50,44,0.78) 31%, rgba(56,50,44,0.18) 50%, rgba(56,50,44,0.48) 65%, rgba(56,50,44,0.82) 100%), linear-gradient(180deg, rgba(56,50,44,0.08) 0%, rgba(56,50,44,0.24) 45%, rgba(56,50,44,0.84) 100%)',
        }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.72 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 6.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            'radial-gradient(ellipse 14rem 18rem at 52% 30%, rgba(56,50,44,0.82) 0%, rgba(56,50,44,0.66) 42%, rgba(56,50,44,0.24) 70%, rgba(56,50,44,0) 100%)',
        }}
      />
      <motion.div
        {...editorialFade}
        className="relative mx-auto flex min-h-[64vh] max-w-[1320px] flex-col justify-end"
      >
        <p className="mb-8 text-[0.72rem] uppercase tracking-[0.3em] text-[#F2EEEC]/68">
          OBLIQ.
        </p>
        <h1 className="max-w-[58rem] text-6xl font-normal leading-[0.96] sm:text-8xl lg:text-9xl">
          {title}
        </h1>
        <div className="mt-10 flex max-w-[47rem] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[29rem] text-[1.06rem] leading-relaxed text-[#F2EEEC]/78">
            {subtitle}
          </p>
          <a
            href={localizeHref(ctaHref)}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#F2EEEC]/30 px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#F2EEEC] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F2EEEC]/60 hover:bg-[#F2EEEC]/10"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function ProceduresHeroV3({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const { localizeHref } = useLocale();

  return (
    <section className="relative min-h-[94vh] overflow-hidden bg-[#211E1B] px-5 pb-10 pt-28 text-[#F2EEEC] sm:px-8 lg:px-12">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1, scale: 1.018, filter: 'grayscale(0.22) contrast(0.98)' }}
          animate={{ opacity: 0.88, scale: 1, filter: 'grayscale(0.08) contrast(1)' }}
          transition={{ duration: 4.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageWithFallback
            src="/precision-art-hero-2-old.png"
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 4.5, delay: 0.18, ease: [0.65, 0, 0.35, 1] }}
        >
          <ImageWithFallback
            src="/precision-art-hero-2.png"
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 w-[30vw] min-w-[8rem] max-w-[28rem]"
          initial={{ left: '-24%', opacity: 0 }}
          animate={{ left: '100%', opacity: [0, 0.72, 0.48, 0] }}
          transition={{ duration: 4.5, delay: 0.18, ease: [0.65, 0, 0.35, 1] }}
          style={{
            background:
              'linear-gradient(90deg, rgba(242,238,236,0) 0%, rgba(242,238,236,0.34) 45%, rgba(242,238,236,0.08) 68%, rgba(242,238,236,0) 100%)',
            filter: 'blur(22px)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(33,30,27,0.93) 0%, rgba(33,30,27,0.72) 28%, rgba(33,30,27,0.2) 53%, rgba(33,30,27,0.44) 100%), linear-gradient(180deg, rgba(33,30,27,0.28) 0%, rgba(33,30,27,0.1) 38%, rgba(33,30,27,0.86) 100%)',
          }}
        />
      </div>

      <motion.div
        {...editorialFade}
        className="relative mx-auto flex min-h-[68vh] max-w-[1320px] flex-col justify-end"
      >
        <p className="mb-8 text-[0.72rem] uppercase tracking-[0.3em] text-[#F2EEEC]/68">
          OBLIQ.
        </p>
        <h1 className="max-w-[58rem] text-6xl font-normal leading-[0.96] sm:text-8xl lg:text-9xl">
          {title}
        </h1>
        <div className="mt-10 flex max-w-[47rem] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[29rem] text-[1.06rem] leading-relaxed text-[#F2EEEC]/78">
            {subtitle}
          </p>
          <a
            href={localizeHref(ctaHref)}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#F2EEEC]/30 px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-[#F2EEEC] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F2EEEC]/60 hover:bg-[#F2EEEC]/10"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export function EditorialPreviewPage({
  title,
  subtitle,
  heroVideoSrc,
  heroMediaFrame,
  heroMirrorImageSrc,
  heroMirrorAspectClassName,
  heroMirrorClassName,
  heroMirrorVideoBounds,
  heroBackgroundColor,
  heroMediaSide,
  sectionTitle,
  sectionBody,
  previewLabel,
  previewItems,
  message,
  ctaLabel,
  ctaHref,
  articleCards,
}: PreviewPageProps) {
  const { locale } = useLocale();
  const copy = editorialCopy[locale];

  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
        <CinematicHero
          eyebrow="OBLIQ."
          title={title}
          subtitle={subtitle}
          videoSrc={heroVideoSrc}
          mediaFrame={heroMediaFrame}
          mirrorImageSrc={heroMirrorImageSrc}
          mirrorAspectClassName={heroMirrorAspectClassName}
          mirrorClassName={heroMirrorClassName}
          mirrorVideoBounds={heroMirrorVideoBounds}
          mediaSide={heroMediaSide}
          backgroundColor={heroBackgroundColor}
          primaryAction={{ href: ctaHref, label: ctaLabel }}
          secondaryAction={{ href: '/the-obliq-approach', label: copy.secondaryActionLabel }}
        />

        <EditorialPreviewContentSection
          previewLabel={previewLabel}
          sectionTitle={sectionTitle}
          sectionBody={sectionBody}
          previewItems={previewItems}
          articleCards={articleCards}
          message={message}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
          articleEyebrow={copy.articleEyebrow}
        />
      </main>

      <ConsultationFooter />
    </div>
  );
}

export function ConditionsPage() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].conditions;

  return (
    <EditorialPreviewPage
      {...copy}
      heroVideoSrc="/conditions-hero.mp4"
      heroMediaFrame="mirror"
      heroMirrorImageSrc="/hero-standing-bronze-mirror.png"
      heroMirrorAspectClassName="aspect-[668/926]"
      heroMirrorClassName="-mt-8 max-w-[18rem] sm:mt-0 sm:max-w-[25rem] lg:max-w-[27rem] xl:max-w-[29rem]"
      heroMirrorVideoBounds={{
        left: '12.2%',
        top: '2.7%',
        width: '75.6%',
        height: '53.8%',
      }}
    />
  );
}

export function ProceduresPage() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].procedures;

  return (
    <EditorialPreviewPage
      {...copy}
      heroVideoSrc="/procedures-hero.mp4"
      heroMediaFrame="mirror"
      heroMirrorImageSrc="/hero-mirror-v2.png"
      heroMirrorAspectClassName="aspect-[709/909]"
      heroMirrorClassName="max-w-[24rem] sm:max-w-[28rem] lg:max-w-[30rem] xl:max-w-[32rem]"
      heroMirrorVideoBounds={{
        left: '4.5%',
        top: '3.6%',
        width: '92%',
        height: '70.6%',
      }}
    />
  );
}

export function ProceduresPageV2() {
  const { locale } = useLocale();
  const page = pageCopy[locale].procedures;
  const copy = editorialCopy[locale];

  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
        <ProceduresHeroV2
          title={page.title}
          subtitle={page.subtitle}
          ctaLabel={page.ctaLabel}
          ctaHref={page.ctaHref}
        />
        <EditorialPreviewContentSection
          previewLabel={page.previewLabel}
          sectionTitle={page.sectionTitle}
          sectionBody={page.sectionBody}
          previewItems={page.previewItems}
          articleCards={page.articleCards}
          message={page.message}
          ctaHref={page.ctaHref}
          ctaLabel={page.ctaLabel}
          articleEyebrow={copy.articleEyebrow}
        />
      </main>

      <ConsultationFooter />
    </div>
  );
}

export function ProceduresPageV3() {
  const { locale } = useLocale();
  const page = pageCopy[locale].procedures;
  const copy = editorialCopy[locale];

  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
        <ProceduresHeroV3
          title={page.title}
          subtitle={page.subtitle}
          ctaLabel={page.ctaLabel}
          ctaHref={page.ctaHref}
        />
        <EditorialPreviewContentSection
          previewLabel={page.previewLabel}
          sectionTitle={page.sectionTitle}
          sectionBody={page.sectionBody}
          previewItems={page.previewItems}
          articleCards={page.articleCards}
          message={page.message}
          ctaHref={page.ctaHref}
          ctaLabel={page.ctaLabel}
          articleEyebrow={copy.articleEyebrow}
        />
      </main>

      <ConsultationFooter />
    </div>
  );
}

export function JournalPage() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].journal;

  return (
    <EditorialPreviewPage
      {...copy}
      heroVideoSrc="/journal-hero.mp4"
      heroMediaFrame="mirror"
    />
  );
}
