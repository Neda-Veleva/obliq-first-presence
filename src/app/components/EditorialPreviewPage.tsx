import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ConsultationFooter } from './ConsultationFooter';
import { SiteHeader } from './SiteHeader';
import { AtmosphereOrbs, CinematicHero, SectionHeading, editorialFade } from './PremiumPagePrimitives';
import { useLocale, type Locale } from '../i18n';

type PreviewPageProps = {
  title: string;
  subtitle: string;
  heroVideoSrc: string;
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
    sectionTitle: string;
    sectionBody: string;
    secondaryActionLabel: string;
  }
> = {
  bg: {
    articleEyebrow: 'Текст в Journal',
    sectionTitle: 'Подготвя се внимателно курирана перспектива.',
    sectionBody:
      'Страницата е умишлено изградена като preview на темите, визуалния език и нивото на грижа, които ще оформят цялостното изживяване.',
    secondaryActionLabel: 'Подходът на OBLIQ',
  },
  en: {
    articleEyebrow: 'Journal preview',
    sectionTitle: 'A carefully curated perspective is being prepared.',
    sectionBody:
      'This page is intentionally shaped as a preview of the themes, visual language and level of care that will define the full experience.',
    secondaryActionLabel: 'The OBLIQ approach',
  },
  ru: {
    articleEyebrow: 'Текст в журнале',
    sectionTitle: 'Готовится тщательно выстроенная перспектива.',
    sectionBody:
      'Эта страница задумана как preview тем, визуального языка и уровня заботы, которые сформируют полное впечатление.',
    secondaryActionLabel: 'Подход OBLIQ',
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
      previewLabel: 'Преглед на състоянията',
      previewItems: ['Акне', 'Пигментация', 'Зачервяване', 'Текстура', 'Фини линии'],
      message: 'Подготвяме по-задълбочена библиотека от знания.',
      ctaLabel: 'Заяви консултация',
      ctaHref: '/#contact',
    },
    procedures: {
      title: 'Процедури',
      subtitle:
        'Съвременни естетични процедури с фокус върху естествено изглеждащи резултати и дългосрочно качество на кожата.',
      previewLabel: 'Преглед на процедурите',
      previewItems: ['Инжекционни процедури', 'Лазерни терапии', 'Качество на кожата', 'Регенеративна естетика'],
      message: 'Подготвя се внимателно курирано преживяване около процедурите.',
      ctaLabel: 'Запази консултация',
      ctaHref: '/#contact',
    },
    journal: {
      title: 'Journal',
      subtitle:
        'Мисли, наблюдения и гледни точки за здравето на кожата, естетиката и съвременната грижа.',
      previewLabel: 'Редакционни preview текстове',
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
      message: 'Очаквайте още редакционно съдържание.',
      ctaLabel: 'Разгледай OBLIQ',
      ctaHref: '/the-obliq-approach',
    },
  },
  en: {
    conditions: {
      title: 'Conditions',
      subtitle: 'Understanding skin conditions through a personal, science-led approach.',
      previewLabel: 'Conditions overview',
      previewItems: ['Acne', 'Pigmentation', 'Redness', 'Texture', 'Fine lines'],
      message: 'We are preparing a deeper knowledge library.',
      ctaLabel: 'Request a consultation',
      ctaHref: '/#contact',
    },
    procedures: {
      title: 'Procedures',
      subtitle:
        'Contemporary aesthetic procedures focused on natural-looking results and long-term skin quality.',
      previewLabel: 'Procedure overview',
      previewItems: ['Injectables', 'Laser therapies', 'Skin quality', 'Regenerative aesthetics'],
      message: 'A carefully curated procedure experience is being prepared.',
      ctaLabel: 'Book consultation',
      ctaHref: '/#contact',
    },
    journal: {
      title: 'Journal',
      subtitle: 'Thoughts, observations and perspectives on skin health, aesthetics and modern care.',
      previewLabel: 'Editorial previews',
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
      message: 'More editorial content is coming soon.',
      ctaLabel: 'Explore OBLIQ',
      ctaHref: '/the-obliq-approach',
    },
  },
  ru: {
    conditions: {
      title: 'Состояния',
      subtitle: 'Понимание состояний кожи через персональный подход и научное мышление.',
      previewLabel: 'Обзор состояний',
      previewItems: ['Акне', 'Пигментация', 'Покраснение', 'Текстура', 'Тонкие линии'],
      message: 'Мы готовим более глубокую библиотеку знаний.',
      ctaLabel: 'Запросить консультацию',
      ctaHref: '/#contact',
    },
    procedures: {
      title: 'Процедуры',
      subtitle:
        'Современные эстетические процедуры с фокусом на естественный результат и долгосрочное качество кожи.',
      previewLabel: 'Обзор процедур',
      previewItems: ['Инъекционные процедуры', 'Лазерные терапии', 'Качество кожи', 'Регенеративная эстетика'],
      message: 'Готовится тщательно продуманный опыт вокруг процедур.',
      ctaLabel: 'Записаться на консультацию',
      ctaHref: '/#contact',
    },
    journal: {
      title: 'Journal',
      subtitle: 'Мысли, наблюдения и взгляды на здоровье кожи, эстетику и современный уход.',
      previewLabel: 'Редакционные preview тексты',
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
      message: 'Скоро появится больше редакционного содержания.',
      ctaLabel: 'Посмотреть OBLIQ',
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
          <h3
            className="mt-4 text-[#38322C]"
            style={{
              fontSize: 'clamp(1.45rem, 2.6vw, 2rem)',
              lineHeight: 1.08,
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            {card.title}
          </h3>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-[#635C54]">{card.excerpt}</p>
        </motion.article>
      ))}
    </div>
  );
}

export function EditorialPreviewPage({
  title,
  subtitle,
  heroVideoSrc,
  previewLabel,
  previewItems,
  message,
  ctaLabel,
  ctaHref,
  articleCards,
}: PreviewPageProps) {
  const { locale, localizeHref } = useLocale();
  const copy = editorialCopy[locale];

  return (
    <div className="min-h-screen bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main>
        <CinematicHero
          eyebrow="OBLIQ"
          title={title}
          subtitle={subtitle}
          videoSrc={heroVideoSrc}
          primaryAction={{ href: ctaHref, label: ctaLabel }}
          secondaryAction={{ href: '/the-obliq-approach', label: copy.secondaryActionLabel }}
        />

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
              title={copy.sectionTitle}
              body={copy.sectionBody}
            />

            {articleCards ? (
              <ArticleCardGrid cards={articleCards} eyebrow={copy.articleEyebrow} />
            ) : (
              <PreviewPills items={previewItems} />
            )}

            <motion.div
              {...editorialFade}
              className="mt-14 rounded-[2.4rem] border border-[#BAB0A8]/18 bg-[#38322C] px-8 py-10 text-[#F2EEEC] shadow-[0_30px_70px_-46px_rgba(56,50,44,0.5)] sm:px-10 sm:py-12 lg:mt-16 lg:px-14"
            >
              <p
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3.1rem)',
                  lineHeight: 1.04,
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                }}
              >
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
      heroVideoSrc="/contact-hero-clip-1.mp4"
    />
  );
}

export function ProceduresPage() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].procedures;

  return (
    <EditorialPreviewPage
      {...copy}
      heroVideoSrc="/contact-hero-clip.mp4"
    />
  );
}

export function JournalPage() {
  const { locale } = useLocale();
  const copy = pageCopy[locale].journal;

  return (
    <EditorialPreviewPage
      {...copy}
      heroVideoSrc="/hero-video.mp4"
    />
  );
}
