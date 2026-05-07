import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { useLocale, type Locale } from '../i18n';

const INTENT_THRESHOLD = 7;

type PointerIntent = 'undecided' | 'split' | 'carousel';

type BeforeAfterCompareProps = {
  beforeImage: string;
  afterImage: string;
  isActive: boolean;
  className?: string;
};

const beforeAfterCopy: Record<Locale, { ariaLabel: string; before: string; after: string }> = {
  bg: {
    ariaLabel: 'Сравнение преди и след, плъзнете хоризонтално',
    before: 'Преди',
    after: 'След',
  },
  en: {
    ariaLabel: 'Before and after comparison, drag horizontally',
    before: 'Before',
    after: 'After',
  },
  ru: {
    ariaLabel: 'Сравнение до и после, потяните горизонтально',
    before: 'До',
    after: 'После',
  },
};

export function BeforeAfterCompare({
  beforeImage,
  afterImage,
  isActive,
  className = '',
}: BeforeAfterCompareProps) {
  const { locale } = useLocale();
  const copy = beforeAfterCopy[locale];
  const [pct, setPct] = useState(50);
  const [containerW, setContainerW] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intentRef = useRef<PointerIntent>('undecided');
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) setPct(50);
  }, [isActive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerW(el.offsetWidth);
    });
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const p = ((clientX - left) / width) * 100;
    setPct(Math.min(100, Math.max(0, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    intentRef.current = 'undecided';
    pointerIdRef.current = e.pointerId;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = startRef.current;
    if (start) {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (intentRef.current === 'undecided' && (Math.abs(dx) > INTENT_THRESHOLD || Math.abs(dy) > INTENT_THRESHOLD)) {
        if (Math.abs(dx) >= Math.abs(dy)) {
          intentRef.current = 'split';
          e.preventDefault();
          const el = containerRef.current;
          if (el) {
            el.setPointerCapture(e.pointerId);
            dragging.current = true;
            setFromClientX(e.clientX);
          }
        } else {
          intentRef.current = 'carousel';
          startRef.current = null;
          return;
        }
      }
    }

    if (intentRef.current !== 'split' || !dragging.current) return;
    e.preventDefault();
    setFromClientX(e.clientX);
  };

  const endPointer = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const el = containerRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    dragging.current = false;
    intentRef.current = 'undecided';
    startRef.current = null;
    pointerIdRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`group relative w-full select-none [touch-action:pan-y] ${className}`.trim()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onPointerLeave={(e) => {
        if (pointerIdRef.current === e.pointerId) endPointer(e);
      }}
      role="slider"
      tabIndex={0}
      aria-label={copy.ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPct((p) => Math.max(0, p - 2));
        if (e.key === 'ArrowRight') setPct((p) => Math.min(100, p + 2));
        if (e.key === 'Home') setPct(0);
        if (e.key === 'End') setPct(100);
      }}
    >
      <img
        src={afterImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${pct}%` }}>
        <img
          src={beforeImage}
          alt=""
          className="h-full max-w-none object-cover"
          style={{
            width: containerW > 0 ? `${containerW}px` : '100%',
          }}
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 z-10 h-full w-px bg-[#BAB0A8]/70 shadow-sm"
        style={{ left: `${pct}%`, transform: 'translateX(-0.5px)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8CDC0]/80 bg-[#F2EEEC] text-[#38322C] shadow-md ring-1 ring-[#38322C]/10"
        style={{ left: `${pct}%` }}
      >
        <ChevronsLeftRight className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div className="pointer-events-none absolute left-2 top-2 z-[5] rounded-sm bg-[#38322C]/60 px-2 py-1 text-xs font-medium text-[#F2EEEC]/95 backdrop-blur-sm">
        {copy.before}
      </div>
      <div className="pointer-events-none absolute right-2 top-2 z-[5] rounded-sm bg-[#38322C]/60 px-2 py-1 text-xs font-medium text-[#F2EEEC]/95 backdrop-blur-sm">
        {copy.after}
      </div>
    </div>
  );
}
