import { useEffect, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';
import { useLocale, type Locale } from '../i18n';

const mirrorCopy = {
  bg: {
    ariaLabel: 'Зони на фокус и желан резултат',
    eyebrow: 'Интерактивен фокус',
    zoneLabel: 'Зона',
    previousLabel: 'Предишен фокус',
    nextLabel: 'Следващ фокус',
    showLabel: 'Покажи',
    cta: 'Разгледай подходите',
    slides: [
      {
        id: 'lips',
        label: 'Устни',
        title: 'Форма и баланс',
        description:
          'Дискретно подчертаване на естествения обем, с уважение към индивидуалните черти.',
        image: '/mirror-carousel/lips.png',
        alt: 'Близък кадър на естествени устни',
        objectPosition: 'center 52%',
        scale: 1,
      },
      {
        id: 'eyes',
        label: 'Очи',
        title: 'По-отпочинал поглед',
        description:
          'Подход, който намалява усещането за умора и запазва естественото излъчване.',
        image: '/mirror-carousel/eyes.png',
        alt: 'Близък кадър на око и зона под него',
        objectPosition: 'center 44%',
        scale: 1,
      },
      {
        id: 'forehead',
        label: 'Чело',
        title: 'Гладка текстура',
        description:
          'Фин баланс между изразителност, мекота и естествено движение.',
        image: '/mirror-carousel/forehead-full.png',
        alt: 'Близък кадър на чело и вежди',
        objectPosition: 'center 40%',
        scale: 1,
      },
      {
        id: 'neck',
        label: 'Шия',
        title: 'Стегнат контур',
        description:
          'Грижа за зона, която често разкрива нуждата от повече внимание.',
        image: '/mirror-carousel/face.png',
        alt: 'Близък кадър на шия',
        objectPosition: 'center 36%',
        scale: 1,
      },
      {
        id: 'cheekbones',
        label: 'Скули',
        title: 'Фина дефиниция',
        description:
          'Подчертаване на структурата на лицето без усещане за прекомерна промяна.',
        image: '/mirror-carousel/cheekbones.png',
        alt: 'Близък кадър на скула и текстура на кожа',
        objectPosition: 'center 44%',
        scale: 1,
      },
    ],
  },
  en: {
    ariaLabel: 'Focus areas and desired result',
    eyebrow: 'Interactive focus',
    zoneLabel: 'Area:',
    previousLabel: 'Previous focus',
    nextLabel: 'Next focus',
    showLabel: 'Show',
    cta: 'Explore approaches',
    slides: [
      {
        id: 'lips',
        label: 'Lips',
        title: 'Shape and balance',
        description: 'A discreet enhancement of natural volume, respecting individual features.',
        image: '/mirror-carousel/lips.png',
        alt: 'Close-up of natural lips',
        objectPosition: 'center 52%',
        scale: 1,
      },
      {
        id: 'eyes',
        label: 'Eyes',
        title: 'A more rested look',
        description: 'An approach that softens the sense of fatigue while keeping natural expression.',
        image: '/mirror-carousel/eyes.png',
        alt: 'Close-up of an eye and under-eye area',
        objectPosition: 'center 44%',
        scale: 1,
      },
      {
        id: 'forehead',
        label: 'Forehead',
        title: 'Smooth texture',
        description: 'A subtle balance between expression, softness and natural movement.',
        image: '/mirror-carousel/forehead-full.png',
        alt: 'Close-up of forehead and brows',
        objectPosition: 'center 40%',
        scale: 1,
      },
      {
        id: 'neck',
        label: 'Neck',
        title: 'Defined contour',
        description: 'Care for an area that often reveals the need for more attention.',
        image: '/mirror-carousel/face.png',
        alt: 'Close-up of the neck',
        objectPosition: 'center 36%',
        scale: 1,
      },
      {
        id: 'cheekbones',
        label: 'Cheekbones',
        title: 'Subtle definition',
        description: 'Highlighting facial structure without the feeling of excessive change.',
        image: '/mirror-carousel/cheekbones.png',
        alt: 'Close-up of cheekbone and skin texture',
        objectPosition: 'center 44%',
        scale: 1,
      },
    ],
  },
  ru: {
    ariaLabel: 'Зоны фокуса и желаемый результат',
    eyebrow: 'Интерактивный фокус',
    zoneLabel: 'Зона:',
    previousLabel: 'Предыдущий фокус',
    nextLabel: 'Следующий фокус',
    showLabel: 'Показать',
    cta: 'Посмотреть подходы',
    slides: [
      {
        id: 'lips',
        label: 'Губы',
        title: 'Форма и баланс',
        description: 'Деликатное подчеркивание естественного объема с уважением к индивидуальным чертам.',
        image: '/mirror-carousel/lips.png',
        alt: 'Крупный план естественных губ',
        objectPosition: 'center 52%',
        scale: 1,
      },
      {
        id: 'eyes',
        label: 'Глаза',
        title: 'Более отдохнувший взгляд',
        description: 'Подход, который смягчает ощущение усталости и сохраняет естественное выражение.',
        image: '/mirror-carousel/eyes.png',
        alt: 'Крупный план глаза и зоны под ним',
        objectPosition: 'center 44%',
        scale: 1,
      },
      {
        id: 'forehead',
        label: 'Лоб',
        title: 'Гладкая текстура',
        description: 'Тонкий баланс между выразительностью, мягкостью и естественным движением.',
        image: '/mirror-carousel/forehead-full.png',
        alt: 'Крупный план лба и бровей',
        objectPosition: 'center 40%',
        scale: 1,
      },
      {
        id: 'neck',
        label: 'Шея',
        title: 'Четкий контур',
        description: 'Забота о зоне, которая часто показывает потребность в большем внимании.',
        image: '/mirror-carousel/face.png',
        alt: 'Крупный план шеи',
        objectPosition: 'center 36%',
        scale: 1,
      },
      {
        id: 'cheekbones',
        label: 'Скулы',
        title: 'Мягкая дефиниция',
        description: 'Подчеркивание структуры лица без ощущения чрезмерного изменения.',
        image: '/mirror-carousel/cheekbones.png',
        alt: 'Крупный план скулы и текстуры кожи',
        objectPosition: 'center 44%',
        scale: 1,
      },
    ],
  },
} satisfies Record<Locale, unknown>;

const AUTO_PLAY_MS = 14600000;

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function MirrorCarousel() {
  const { locale } = useLocale();
  const copy = mirrorCopy[locale];
  const slides = copy.slides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, slides.length));
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length]);

  const goTo = (nextIndex: number) => {
    setActiveIndex(wrapIndex(nextIndex, slides.length));
  };

  const goToPrevious = () => goTo(activeIndex - 1);
  const goToNext = () => goTo(activeIndex + 1);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  };

  const onBlurCapture = (event: FocusEvent<HTMLElement>) => {
    const nextFocused = event.relatedTarget;
    if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      id="zones-intro"
      aria-labelledby="zones-intro-title"
      aria-roledescription="carousel"
      aria-label={copy.ariaLabel}
      className="relative overflow-hidden bg-[#F2EEEC] py-20 sm:py-24 lg:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={onBlurCapture}
      onKeyDown={onKeyDown}
    >
      <div
        className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#D8CDC0]/52 blur-3xl sm:h-80 sm:w-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-[40%] bg-[#BAB0A8]/42 blur-3xl sm:h-80 sm:w-80"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 lg:px-16">
        <div className="relative">
          <div className="relative mx-auto max-w-[17.5rem] sm:max-w-[21rem] lg:max-w-[25rem]">
            <div className="relative isolate aspect-[544/1086]">
              <div
                className="absolute left-[8.1%] top-[11.5%] z-10 aspect-square w-[83.3%] overflow-hidden rounded-full bg-[#D8CDC0]"
                aria-live={isPaused ? 'polite' : 'off'}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={activeSlide.image}
                      alt={activeSlide.alt}
                      className="h-full w-full object-cover"
                      style={{
                        objectPosition: activeSlide.objectPosition,
                        transform: `scale(${activeSlide.scale})`,
                        transformOrigin: 'center',
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.14),transparent_34%),linear-gradient(150deg,rgba(242,238,236,0.07),transparent_58%)]"
                      aria-hidden
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                className="pointer-events-none absolute left-[13.4%] top-[15.6%] z-20 aspect-square w-[73%] rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.12),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_58%)]"
                aria-hidden
              />

              <ImageWithFallback
                src="/mirror-carousel/mirror-hand-overlay.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 z-30 h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10">

          <div className="max-w-xl">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[12.5rem] sm:min-h-[10rem] lg:min-h-[15rem]"
              >
                <h2
                  id="zones-intro-title"
                  className="max-w-[12ch] text-[#38322C]"
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 4.6rem)',
                    lineHeight: 0.94,
                    fontWeight: 430,
                    letterSpacing: '-0.035em',
                  }}
                >
                  {activeSlide.title}
                </h2>
                <p
                  className="mt-5 max-w-[34rem] text-[#635C54]"
                  style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', lineHeight: 1.72 }}
                >
                  {activeSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CDC0] bg-[#F2EEEC]/55 text-[#38322C] transition-[transform,background-color,border-color] hover:border-[#BAB0A8] hover:bg-[#F2EEEC]/72 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#977460]"
                  aria-label={copy.previousLabel}
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CDC0] bg-[#F2EEEC]/55 text-[#38322C] transition-[transform,background-color,border-color] hover:border-[#BAB0A8] hover:bg-[#F2EEEC]/72 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#977460]"
                  aria-label={copy.nextLabel}
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {slides.map((slide, index) => {
                  const active = index === activeIndex;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={cn(
                        'relative h-2.5 rounded-full transition-[width,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#977460]',
                        active ? 'w-10 bg-[#635C54]' : 'w-2.5 bg-[#D8CDC0] hover:scale-110 hover:bg-[#BAB0A8]',
                      )}
                      aria-label={`${copy.showLabel} ${slide.label.toLowerCase()}`}
                      aria-current={active ? 'true' : undefined}
                    >
                      <span className="sr-only">{slide.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href="#facial-focus"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[#D8CDC0] bg-[#F2EEEC] px-6 py-3 text-[0.95rem] font-medium text-[#38322C] transition-[transform,background-color,border-color] hover:border-[#BAB0A8] hover:bg-[#D8CDC0]/26 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#977460]"
            >
              {copy.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
