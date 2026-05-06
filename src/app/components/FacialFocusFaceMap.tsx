import { useId, useState } from 'react';
import { cn } from './ui/utils';
import { ImageWithFallback } from './figma/ImageWithFallback';

export type FaceZoneId =
  | 'forehead'
  | 'eyes'
  | 'cheeks'
  | 'lips'
  | 'chin'
  | 'jawline'
  | 'full_face';

/** Локален кадър 5:7 (като viewBox 200×280) — 1365×1911; центриран кроп от същия кадър, без hotlink. */
const FACE_PHOTO_SRC = '/facial-focus-face.jpg';

const FACE_ZONES: {
  id: FaceZoneId;
  label: string;
  optionId: string;
  tooltip: string;
  d: string;
}[] = [
  {
    id: 'full_face',
    label: 'Цяло лице',
    optionId: 'rejuvenation',
    tooltip: 'Цялостно подмладяване',
    d: 'M 100 25 C 48 25 20 80 20 130 C 20 195 58 255 100 255 C 142 255 180 195 180 130 C 180 80 152 25 100 25 Z M 100 48 C 64 48 45 90 45 128 C 45 176 70 230 100 230 C 130 230 155 176 155 128 C 155 90 136 48 100 48 Z',
  },
  {
    id: 'forehead',
    label: 'Чело',
    optionId: 'wrinkles',
    tooltip: 'Фини линии, мимика',
    d: 'M 100 45 C 58 45 32 70 32 95 Q 100 100 168 95 C 168 70 142 45 100 45 Z',
  },
  {
    id: 'eyes',
    label: 'Околоочна зона',
    optionId: 'undereye',
    tooltip: 'Сияние, отпочинал вид',
    d: 'M 24 100 Q 100 90 176 100 Q 176 122 170 140 Q 100 128 30 140 Q 24 122 24 100 Z',
  },
  {
    id: 'cheeks',
    label: 'Буза / кожа',
    optionId: 'skin',
    tooltip: 'Текстура, хидратация, пори',
    d: 'M 32 100 L 38 150 Q 70 170 100 168 Q 130 170 162 150 L 168 100 C 170 100 175 120 174 140 L 26 140 C 26 110 32 100 32 100 Z',
  },
  {
    id: 'jawline',
    label: 'Контур',
    optionId: 'contour',
    tooltip: 'Обем, скули, линия',
    d: 'M 20 150 Q 20 200 100 255 Q 180 200 180 150 L 155 198 Q 100 240 45 198 Z',
  },
  {
    id: 'chin',
    label: 'Брадичка',
    optionId: 'contour',
    tooltip: 'Баланс, обем',
    d: 'M 70 200 Q 100 220 130 200 Q 100 255 100 255 Q 100 255 70 200 Z',
  },
  {
    id: 'lips',
    label: 'Устни',
    optionId: 'lips',
    tooltip: 'Форма, обем, хидратация',
    /* Елипса: център (100, 199), rx=36, ry=12. */
    d: 'M 136 199 A 36 12 0 1 0 64 199 A 36 12 0 1 0 136 199 Z',
  },
];

const ZONE_ORDER: FaceZoneId[] = [
  'full_face',
  'forehead',
  'eyes',
  'cheeks',
  'jawline',
  'chin',
  'lips',
];

function getZonesOrdered() {
  const map = new Map(FACE_ZONES.map((z) => [z.id, z]));
  return ZONE_ORDER.map((id) => map.get(id)!);
}

/** Предишната, по-четима прозрачност (active / hover). */
const ZONE_COLOR: Record<
  FaceZoneId,
  { active: string; hover: string }
> = {
  full_face: {
    active: 'rgba(255, 220, 185, 0.48)',
    hover: 'rgba(255, 225, 200, 0.3)',
  },
  forehead: {
    active: 'rgba(200, 185, 250, 0.5)',
    hover: 'rgba(210, 198, 252, 0.32)',
  },
  eyes: {
    active: 'rgba(160, 200, 255, 0.5)',
    hover: 'rgba(175, 210, 255, 0.32)',
  },
  cheeks: {
    active: 'rgba(255, 185, 200, 0.48)',
    hover: 'rgba(255, 200, 210, 0.32)',
  },
  jawline: {
    active: 'rgba(120, 215, 190, 0.48)',
    hover: 'rgba(145, 225, 200, 0.32)',
  },
  chin: {
    active: 'rgba(120, 215, 190, 0.48)',
    hover: 'rgba(145, 225, 200, 0.32)',
  },
  lips: {
    active: 'rgba(240, 150, 175, 0.52)',
    hover: 'rgba(245, 175, 195, 0.34)',
  },
};

type Props = {
  selected: Set<string>;
  onToggleOption: (optionId: string) => void;
  /** Двупосочен изглед: съвпада с ховер на същата опция (от карта или зона) */
  hoveredOptionId: string | null;
  onHoverOption: (optionId: string | null) => void;
  /** Кратка подсказка при ховер от картa (когато няма пръст върху конкретна зона) */
  optionHoverLabel: (optionId: string) => string;
  className?: string;
};

export function FacialFocusFaceMap({
  selected,
  onToggleOption,
  hoveredOptionId,
  onHoverOption,
  optionHoverLabel,
  className,
}: Props) {
  const [facePointerZone, setFacePointerZone] = useState<FaceZoneId | null>(null);
  const idBase = useId();
  const ordered = getZonesOrdered();

  const clearFaceHover = () => {
    setFacePointerZone(null);
    onHoverOption(null);
  };

  const tooltipText = facePointerZone
    ? FACE_ZONES.find((z) => z.id === facePointerZone)?.tooltip ?? null
    : hoveredOptionId
      ? optionHoverLabel(hoveredOptionId)
      : null;

  return (
    <div
      className={cn('flex w-full max-w-md flex-col items-stretch sm:max-w-lg lg:max-w-xl', className)}
    >
      <p className="mb-4 text-center text-[0.6rem] font-light tracking-[0.32em] text-stone-400/70">
        Интерактивна зона
      </p>
      <div
        className="relative w-full aspect-[5/7] max-h-[min(78vh,46rem)] overflow-hidden rounded-[1.5rem] bg-[#E8E3DA] shadow-[0_8px_48px_-20px_rgba(35,28,20,0.12),0_2px_0_0_rgba(242,238,236,0.2)_inset]"
        onPointerLeave={clearFaceHover}
        style={{ backgroundColor: '#EAE7E1' }}
      >
        <ImageWithFallback
          src={FACE_PHOTO_SRC}
          alt="Портрет, лице отпред, неутрален фон"
          className="absolute inset-0 h-full w-full origin-center scale-105 object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F5F5F0]/0 via-[#F5F5F0]/0 to-stone-200/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-300/20 via-transparent to-stone-100/10"
          aria-hidden
        />

        <svg
          viewBox="0 0 200 280"
          className="absolute inset-0 h-full w-full [touch-action:none]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Снимка с интерактивни зони"
        >
          <defs>
            <filter
              id={`${idBase}-soften`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="s" />
              <feMerge>
                <feMergeNode in="s" />
              </feMerge>
            </filter>
            <filter
              id={`${idBase}-soften-lip`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.55" result="s" />
              <feMerge>
                <feMergeNode in="s" />
              </feMerge>
            </filter>
          </defs>

          {ordered.map((z) => {
            const isOn = selected.has(z.optionId);
            const optionHover = hoveredOptionId === z.optionId;
            const pointerOnZone = facePointerZone === z.id;
            const isRing = z.id === 'full_face';
            const zc = ZONE_COLOR[z.id];
            const base = isRing ? 'rgba(0,0,0,0.01)' : 'rgba(255, 255, 255, 0.04)';

            let fillC = base;
            if (isOn) {
              fillC = zc.active;
            } else if (pointerOnZone || optionHover) {
              fillC = zc.hover;
            }

            const softFilterId =
              z.id === 'lips' ? `${idBase}-soften-lip` : `${idBase}-soften`;
            return (
              <path
                key={z.id}
                d={z.d}
                fill={fillC}
                fillRule={isRing ? 'evenodd' : 'nonzero'}
                stroke="none"
                className="cursor-pointer touch-manipulation transition-[fill] duration-700 ease-out outline-none focus-visible:ring-2 focus-visible:ring-stone-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white/0"
                style={{ filter: `url(#${softFilterId})` }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onToggleOption(z.optionId);
                }}
                onPointerEnter={() => {
                  setFacePointerZone(z.id);
                  onHoverOption(z.optionId);
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onToggleOption(z.optionId);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={z.label}
                aria-pressed={isOn}
              />
            );
          })}
        </svg>

        {tooltipText && (
          <div
            className="pointer-events-none absolute bottom-3 left-1/2 z-20 max-w-[90%] -translate-x-1/2 rounded-2xl bg-stone-800/50 px-4 py-2.5 text-center text-[11px] font-light leading-snug text-[#F7F2EA]/95 shadow-[0_6px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
            role="tooltip"
          >
            {tooltipText}
          </div>
        )}
      </div>
    </div>
  );
}
