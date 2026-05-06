import { useEffect, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

const slides = [
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
    image: '/mirror-carousel/forehead.png',
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
    image: '/mirror-carousel/neck.png',
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
] as const;

const AUTO_PLAY_MS = 14600000;

function wrapIndex(index: number) {
  return (index + slides.length) % slides.length;
}

export function MirrorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1));
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const goTo = (nextIndex: number) => {
    setActiveIndex(wrapIndex(nextIndex));
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
      aria-label="Зони на фокус и желан резултат"
      className="relative overflow-hidden bg-[#F2EEEC] py-20 sm:py-24 lg:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={onBlurCapture}
      onKeyDown={onKeyDown}
    >
      <div
        className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#E8DDD2]/70 blur-3xl sm:h-80 sm:w-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-[40%] bg-[#DDD0C2]/55 blur-3xl sm:h-80 sm:w-80"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 lg:px-16">
        <div className="relative">
          <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-[#D9CBBB]/70 bg-white/25 sm:left-10 sm:top-10 sm:h-28 sm:w-28" />

          <div className="relative mx-auto max-w-[17.5rem] sm:max-w-[21rem] lg:max-w-[25rem]">
            <div className="relative isolate aspect-[544/1086]">
              <div
                className="absolute left-[8.1%] top-[11.5%] z-10 aspect-square w-[83.3%] overflow-hidden rounded-full bg-[#E6D9CC]"
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
          <div className="mb-6 flex items-center justify-between gap-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#8D8177]">
            <span>Интерактивен фокус</span>
            <span>
              {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="max-w-xl">
            <p className="mb-3 text-[0.8rem] uppercase tracking-[0.32em] text-[#9A8B80]">
              Зона: {activeSlide.label}
            </p>

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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CCBDAF] bg-white/35 text-[#38322C] transition-[transform,background-color,border-color] hover:border-[#B9A999] hover:bg-white/50 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A897]"
                  aria-label="Предишен фокус"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CCBDAF] bg-white/35 text-[#38322C] transition-[transform,background-color,border-color] hover:border-[#B9A999] hover:bg-white/50 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A897]"
                  aria-label="Следващ фокус"
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
                        'relative h-2.5 rounded-full transition-[width,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A897]',
                        active ? 'w-10 bg-[#635C54]' : 'w-2.5 bg-[#CDBFB1] hover:scale-110 hover:bg-[#B9A999]',
                      )}
                      aria-label={`Покажи ${slide.label.toLowerCase()}`}
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
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[#C9BBAD] bg-[#F6F2EF] px-6 py-3 text-[0.95rem] font-medium text-[#38322C] transition-[transform,background-color,border-color] hover:border-[#B5A595] hover:bg-[#ECE5DF] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A897]"
            >
              Разгледай подходите
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
