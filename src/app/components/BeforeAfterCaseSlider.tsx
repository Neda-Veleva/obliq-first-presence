import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BeforeAfterCompare } from './BeforeAfterCompare';
import { cn } from './ui/utils';
import { useLocale, type Locale } from '../i18n';

export type BeforeAfterSlide = {
  id: string;
  before: string;
  after: string;
};

type BeforeAfterCaseSliderProps = {
  slides: readonly BeforeAfterSlide[];
  className?: string;
  labelHint?: string;
};

const sliderCopy: Record<
  Locale,
  { mobileHint: string; previous: string; next: string; examples: string; example: string }
> = {
  bg: {
    mobileHint: 'Свайп нагоре/надолу за още',
    previous: 'Предишен пример',
    next: 'Следващ пример',
    examples: 'Примери',
    example: 'Пример',
  },
  en: {
    mobileHint: 'Swipe up/down for more',
    previous: 'Previous example',
    next: 'Next example',
    examples: 'Examples',
    example: 'Example',
  },
  ru: {
    mobileHint: 'Свайп вверх/вниз для еще',
    previous: 'Предыдущий пример',
    next: 'Следующий пример',
    examples: 'Примеры',
    example: 'Пример',
  },
};

function applySlideOpacity(embla: EmblaCarouselType) {
  const nodes = embla.slideNodes();
  const inView = embla.slidesInView();
  const selected = embla.selectedScrollSnap();
  nodes.forEach((node, i) => {
    if (!node) return;
    const isActive = i === selected;
    const isPeek = inView.includes(i) && !isActive;
    node.style.transition = 'opacity 0.28s ease';
    node.style.willChange = 'opacity';
    if (isActive) node.style.opacity = '1';
    else if (isPeek) node.style.opacity = '0.42';
    else node.style.opacity = '0.2';
  });
}

/**
 * Вертикален Embla: по-висок (портретен) преглед, подравнено по център, слаби съседи с opacity.
 * Втори аргумент: само празен plugins масив [].
 */
export function BeforeAfterCaseSlider({ slides, className, labelHint }: BeforeAfterCaseSliderProps) {
  const { locale } = useLocale();
  const copy = sliderCopy[locale];
  const n = slides.length;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'y',
      loop: false,
      align: 'center',
      containScroll: 'trimSnaps',
      duration: 32,
      /** Мишката не върти слайдовете (конкурира split-а); на touch остава свайп за слайд. */
      watchDrag: (_embla, evt) => evt.pointerType !== 'mouse',
    },
    [],
  );

  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const run = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
      applySlideOpacity(emblaApi);
    };
    run();
    const onScroll = () => applySlideOpacity(emblaApi);
    emblaApi.on('reInit', run);
    emblaApi.on('select', run);
    emblaApi.on('scroll', onScroll);
    return () => {
      emblaApi.off('reInit', run);
      emblaApi.off('select', run);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (n === 0) return null;

  return (
    <div className={cn('relative w-full', className)}>
      {labelHint ? (
        <p className="mb-2 text-center text-xs tracking-[0.2em] text-[#876856]">{labelHint}</p>
      ) : null}

      <p className="mb-1 text-center text-[0.7rem] text-[#BAB0A8] md:hidden">{copy.mobileHint}</p>

      <div className="relative">
        <div
          ref={emblaRef}
          className="mx-auto w-full max-w-md cursor-ew-resize overflow-hidden [touch-pan-y] md:ml-auto md:max-w-lg"
          style={{ height: 'min(38rem, 92vw)' }}
        >
          <div className="flex h-full min-h-0 w-full flex-col">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className="min-h-0 w-full shrink-0 [flex:0_0_26rem] py-1 sm:[flex:0_0_29rem]"
              >
                <div className="h-full min-h-0 w-full">
                  <BeforeAfterCompare
                    isActive={selected === i}
                    beforeImage={s.before}
                    afterImage={s.after}
                    className="h-full w-full rounded-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {n > 1 ? (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute left-1.5 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[#D8CDC0]/70 bg-[#F2EEEC]/92 p-2 text-[#38322C] shadow-sm backdrop-blur-sm transition-[opacity,background-color,transform] hover:bg-[#F2EEEC] md:left-2"
              aria-label={copy.previous}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute right-1.5 top-1/2 z-30 -translate-y-1/2 rounded-full border border-[#D8CDC0]/70 bg-[#F2EEEC]/92 p-2 text-[#38322C] shadow-sm backdrop-blur-sm transition-[opacity,background-color,transform] hover:bg-[#F2EEEC] md:right-2"
              aria-label={copy.next}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </>
        ) : null}
      </div>

      {n > 1 ? (
        <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label={copy.examples}>
          {Array.from({ length: snapCount || n }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                'h-1.5 rounded-full transition-[width,background-color,opacity] duration-300',
                selected === i
                  ? 'w-4 bg-[#38322C]'
                  : 'w-1.5 bg-[#BAB0A8]/90 hover:bg-[#876856]',
              )}
              aria-label={`${copy.example} ${i + 1}`}
              aria-current={selected === i ? 'true' : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
