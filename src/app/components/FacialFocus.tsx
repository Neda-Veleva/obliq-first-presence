import { useCallback, useEffect, useState } from 'react';
import { cn } from './ui/utils';
import { FacialFocusFaceMap } from './FacialFocusFaceMap';

const STORAGE_KEY = 'obliq-facial-focus';

const options: { id: string; title: string; line: string }[] = [
  { id: 'skin', title: 'Кожа', line: 'Акне, текстура, пори, сияние' },
  {
    id: 'wrinkles',
    title: 'Бръчки и фини линии',
    line: 'Фини линии и мимика по челото',
  },
  { id: 'contour', title: 'Контур и обем на лицето', line: 'Скули, челюстна линия, баланс' },
  { id: 'undereye', title: 'Околоочен контур', line: 'Тъмни кръгове, вдлъбнатини, торбички' },
  { id: 'lips', title: 'Устни', line: 'Форма, обем, хидратация' },
  {
    id: 'rejuvenation',
    title: 'Цялостно подмладяване на лицето',
    line: 'Освежен, отпочинал вид',
  },
];

/** Плаващо позициониране около лицето (само lg+; асиметрично, без решетка). */
const floatById: Record<string, string> = {
  wrinkles:
    'left-0 top-[8%] w-[12rem] -rotate-[1.5deg] -translate-x-1 sm:w-[12.5rem] sm:translate-x-0',
  skin:
    'right-0 top-[8%] w-[12rem] rotate-[1.2deg] translate-x-0 sm:w-[12.5rem] sm:translate-x-1',
  contour:
    'left-0 top-[44%] w-[12.5rem] -translate-y-1/2 -rotate-1 -translate-x-2 sm:-translate-x-1',
  undereye:
    'right-0 top-[44%] w-[12.5rem] -translate-y-1/2 translate-x-0 sm:translate-x-1 rotate-1',
  lips:
    'left-0 bottom-[10%] w-[12rem] -rotate-2 -translate-x-1 sm:translate-x-0',
  rejuvenation:
    'right-0 bottom-[10%] w-[12.5rem] translate-x-0 rotate-[1.3deg] sm:translate-x-0.5',
};

const OPTION_IDS = new Set(options.map((o) => o.id));

function loadStored(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.every((x) => typeof x === 'string') ? parsed : [];
  } catch {
    return [];
  }
}

function FloatingFocusCard({
  title,
  line,
  isOn,
  accentHover,
  onSelect,
  onEnter,
  onLeave,
  className,
  stackOffsetClass,
}: {
  title: string;
  line: string;
  isOn: boolean;
  accentHover: boolean;
  onSelect: () => void;
  onEnter: () => void;
  onLeave: () => void;
  className?: string;
  /** Мобилен стек: леко разчупване, без grid */
  stackOffsetClass?: string;
}) {
  return (
    <div className={cn('relative w-full', stackOffsetClass, className)}>
      <button
        type="button"
        onClick={onSelect}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        aria-pressed={isOn}
        className={cn(
          'w-full text-left',
          'rounded-[1.4rem] border-0',
          'backdrop-blur-md',
          'px-5 py-5',
          'transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'text-stone-800',
          isOn
            ? cn(
                'bg-gradient-to-b from-[#E9DFD0] via-[#E0D4C2] to-[#D2C2AE]',
                'shadow-[0_8px_32px_-4px_rgba(55,40,20,0.12),0_0_0_1px_rgba(90,70,50,0.12),inset_0_1px_0_rgba(242,238,236,0.5)]',
                'ring-1 ring-amber-900/20',
                accentHover && 'ring-2 ring-amber-800/25 shadow-[0_12px_40px_-4px_rgba(90,60,20,0.16)]',
              )
            : cn(
                'bg-gradient-to-b from-[#FDFCF8]/[0.92] via-[#FAF7F0]/80 to-[#F0EBE0]/[0.7]',
                'shadow-[0_18px_50px_-16px_rgba(38,32,24,0.12),0_1px_0_0_rgba(242,238,236,0.65)_inset]',
                'hover:shadow-[0_26px_64px_-14px_rgba(38,32,24,0.16)]',
                accentHover &&
                  'from-[#FCFAF4] to-[#F2ECE2]/80 shadow-[0_24px_60px_-10px_rgba(120,90,50,0.12)]',
              ),
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-400/30 focus-visible:outline-offset-2',
        )}
      >
        <p className="mb-1.5 text-[0.9rem] font-light tracking-[-0.01em] text-stone-800/95 sm:text-[0.95rem]">
          {title}
        </p>
        <p className="text-[0.8rem] font-light leading-relaxed text-stone-500/95 sm:text-[0.85rem]">
          {line}
        </p>
      </button>
    </div>
  );
}

export function FacialFocus() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ids = loadStored().filter((id) => OPTION_IDS.has(id));
    if (ids.length) setSelected(new Set(ids));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
  }, [selected, ready]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onCta = useCallback(() => {
    document.getElementById('treatments')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const hasSelection = selected.size > 0;

  const mapProps = {
    selected,
    onToggleOption: toggle,
    hoveredOptionId,
    onHoverOption: setHoveredOptionId,
    optionHoverLabel: (id: string) => options.find((o) => o.id === id)?.title ?? '',
  };

  return (
    <section
      id="facial-focus"
      className="overflow-x-hidden bg-gradient-to-b from-[#F7F3EC] via-[#F3EFE6] to-[#ECE4D8] py-20 text-stone-800 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 md:px-10">
        <header className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="mb-4 text-[0.65rem] font-light uppercase tracking-[0.42em] text-stone-500/80">
            Фокус
          </p>
          <h2
            className="mb-5 font-extralight leading-[1.12] text-stone-800/90"
            style={{ fontSize: 'clamp(1.85rem, 4.2vw, 2.65rem)' }}
          >
            Какво бихте искали да подобрите?
          </h2>
          <p
            className="mx-auto max-w-xl text-balance font-light leading-relaxed text-stone-600/95"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}
          >
            Изберете една или повече зони и ще ви насочим към най-подходящия за вас подход.
          </p>
        </header>

        {/* Мобилен / таблет: лице центрирано, картите в колона с органични отмествания (не grid) */}
        <div className="mb-2 lg:mb-0 lg:hidden">
          <div className="mx-auto mb-12 w-full max-w-md min-[400px]:max-w-lg">
            <FacialFocusFaceMap {...mapProps} className="w-full max-w-none" />
          </div>
          <div className="mx-auto w-full max-w-md min-[400px]:max-w-lg space-y-4 pb-2">
            {options.map((opt, i) => {
              const isOn = selected.has(opt.id);
              return (
                <FloatingFocusCard
                  key={opt.id}
                  title={opt.title}
                  line={opt.line}
                  isOn={isOn}
                  accentHover={hoveredOptionId === opt.id}
                  onSelect={() => toggle(opt.id)}
                  onEnter={() => setHoveredOptionId(opt.id)}
                  onLeave={() => setHoveredOptionId(null)}
                  stackOffsetClass={cn(
                    i % 2 === 0 ? 'ml-0 pl-1 -rotate-[0.5deg]' : 'ml-auto mr-0 max-w-[98%] rotate-[0.7deg] pr-1',
                    i % 3 === 0 && 'translate-y-0.5',
                    i % 3 === 1 && '-translate-y-0.5',
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Настолен: лице в центъра, плаващи карти около него — абсолютно позициониране, без grid */}
        <div className="relative mb-2 hidden min-h-[min(84vh,46rem)] w-full max-w-6xl px-2 pb-4 pt-2 sm:px-4 lg:mx-auto lg:mb-6 lg:block lg:min-h-[min(78vh,42rem)] lg:max-w-[min(100%,80rem)] lg:px-2 xl:min-h-[min(76vh,48rem)]">
          <div
            className="pointer-events-none absolute inset-0 -z-0 rounded-[3rem] bg-gradient-to-br from-white/[0.04] to-transparent"
            aria-hidden
          />
          {options.map((opt) => {
            const isOn = selected.has(opt.id);
            return (
              <div
                key={opt.id}
                className={cn(
                  'absolute z-10',
                  'pointer-events-auto',
                  floatById[opt.id],
                )}
              >
                <FloatingFocusCard
                  title={opt.title}
                  line={opt.line}
                  isOn={isOn}
                  accentHover={hoveredOptionId === opt.id}
                  onSelect={() => toggle(opt.id)}
                  onEnter={() => setHoveredOptionId(opt.id)}
                  onLeave={() => setHoveredOptionId(null)}
                />
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 z-20 w-[min(27rem,92%)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(28rem,90%)] lg:w-[min(30rem,88%)] xl:w-[min(34rem,86%)] 2xl:w-[36rem]">
            <FacialFocusFaceMap {...mapProps} className="w-full max-w-none" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center text-center sm:mt-16 lg:mt-8">
          <button
            type="button"
            onClick={onCta}
            disabled={!hasSelection}
            className={cn(
              'rounded-full px-10 py-3.5 text-sm font-light tracking-[0.12em] transition-all duration-500',
              hasSelection
                ? 'bg-stone-900/95 text-[#F9F6F0] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-[0_16px_48px_-6px_rgba(0,0,0,0.28)]'
                : 'cursor-not-allowed bg-stone-200/50 text-stone-400',
            )}
          >
            Вижте препоръчаните за вас процедури
          </button>
        </div>
      </div>
    </section>
  );
}
