import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { cn } from './ui/utils';
import { useLocale } from '../i18n';

export const editorialFade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, margin: '-80px' },
} as const;

type BackgroundOrb = {
  className: string;
};

type HeroAction = {
  href: string;
  label: string;
  external?: boolean;
  secondary?: boolean;
};

export type HeroMediaSide = 'left' | 'right';

type CinematicHeroProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  fullHeight?: boolean;
  mediaSide?: HeroMediaSide;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  backgroundGradient?: string;
  backgroundClassName?: string;
  className?: string;
};

export function useHeroVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasStartedInitialPlaybackRef = useRef(false);

  const playVideoFromStart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  const freezeVideoOnLastFrame = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(video.duration - 0.05, 0);
    }
  };

  const startInitialPlayback = () => {
    if (hasStartedInitialPlaybackRef.current) return;

    hasStartedInitialPlaybackRef.current = true;
    playVideoFromStart();
  };

  const replayVideoOnHover = () => {
    const video = videoRef.current;
    if (!video || !video.paused) return;

    const isStoppedAtEnd =
      Number.isFinite(video.duration) &&
      video.duration > 0 &&
      video.currentTime >= Math.max(video.duration - 0.1, 0);

    if (!isStoppedAtEnd) return;

    playVideoFromStart();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startInitialPlayback();
      return;
    }

    video.addEventListener('loadeddata', startInitialPlayback, { once: true });

    return () => {
      video.removeEventListener('loadeddata', startInitialPlayback);
    };
  }, []);

  return {
    videoRef,
    freezeVideoOnLastFrame,
    replayVideoOnHover,
  };
}

function VideoEllipse({ src }: { src: string }) {
  const { videoRef, freezeVideoOnLastFrame, replayVideoOnHover } = useHeroVideoPlayback();

  return (
    <motion.div {...editorialFade} className="relative mx-auto w-full max-w-[46rem] pt-6 xl:max-w-[50rem]">
      <div
        className="relative aspect-[1.12/1] rounded-[50%] border border-[#F2EEEC]/14 bg-[linear-gradient(180deg,rgba(242,238,236,0.12)_0%,rgba(242,238,236,0.05)_100%)] p-[0.8rem] shadow-[0_0_0_1px_rgba(242,238,236,0.05),0_34px_80px_-42px_rgba(56,50,44,0.72),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-18px_32px_rgba(255,255,255,0.04)] backdrop-blur-[14px] sm:aspect-[1.38/1] sm:p-[0.95rem]"
        onMouseEnter={replayVideoOnHover}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-[#F2EEEC]/6">
          <video
            ref={videoRef}
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            onEnded={freezeVideoOnLastFrame}
            className="pointer-events-none h-full w-full object-cover object-center"
          >
            <source src={src} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,50,44,0.14)_0%,rgba(56,50,44,0.68)_100%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[50%] border border-[#F2EEEC]/18 shadow-[inset_0_1px_0_rgba(242,238,236,0.18)]" />
        </div>
      </div>
    </motion.div>
  );
}

export function AtmosphereOrbs({ orbs }: { orbs: BackgroundOrb[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <div key={orb.className} className={cn('absolute rounded-full blur-3xl', orb.className)} />
      ))}
    </div>
  );
}

function HeroLink({ action }: { action: HeroAction }) {
  const { localizeHref } = useLocale();

  return (
    <a
      href={action.external ? action.href : localizeHref(action.href)}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[0.78rem] uppercase tracking-[0.22em] transition-[transform,background-color,color,border-color] duration-300',
        action.secondary
          ? 'border border-[#F2EEEC]/18 bg-[#F2EEEC]/8 text-[#F2EEEC] backdrop-blur-md hover:bg-[#F2EEEC]/12'
          : 'bg-[#F2EEEC] text-[#38322C] shadow-[0_20px_30px_-20px_rgba(242,238,236,0.7)] hover:-translate-y-0.5',
      )}
    >
      {action.label}
      {action.external ? <ExternalLink className="h-4 w-4" strokeWidth={1.6} /> : null}
      {!action.external && !action.secondary ? <ArrowRight className="h-4 w-4" strokeWidth={1.6} /> : null}
    </a>
  );
}

export function CinematicHero({
  id,
  eyebrow,
  title,
  subtitle,
  videoSrc,
  fullHeight = false,
  mediaSide = 'right',
  primaryAction,
  secondaryAction,
  backgroundGradient = 'linear-gradient(180deg,#38322C 0%,#635C54 76%,#8C8E77 100%)',
  backgroundClassName = 'bg-[#38322C]',
  className,
}: CinematicHeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex items-center overflow-hidden pt-28 text-[#F2EEEC] sm:pt-32',
        fullHeight ? 'min-h-screen' : 'min-h-[36rem] sm:min-h-[40rem] lg:min-h-[44rem]',
        backgroundClassName,
        className,
      )}
      style={{ backgroundImage: backgroundGradient }}
    >
      <AtmosphereOrbs
        orbs={[
          { className: 'left-[-8%] top-[16%] h-72 w-72 bg-[#977460]/24' },
          { className: 'right-[-6%] top-[10%] h-96 w-96 bg-[#ACB2CA]/16' },
          { className: 'bottom-[-8%] left-[22%] h-64 w-[28rem] bg-[#8C8E77]/14' },
        ]}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div
          className={cn(
            'flex flex-col gap-16 lg:items-center lg:gap-12 xl:gap-18',
            mediaSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row',
          )}
        >
          <motion.div
            {...editorialFade}
            className="max-w-[34rem] lg:basis-[42%] lg:flex-none"
          >
            {eyebrow ? (
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#D8CDC0]">{eyebrow}</p>
            ) : null}

            <h1
              className="mt-6 text-[#F2EEEC]"
              style={{
                fontSize: '5rem',
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: '-0.05em',
              }}
            >
              {title}
            </h1>

            <p className="mt-6 max-w-[30rem] text-[1.08rem] leading-relaxed text-[#F2EEEC]/76 sm:text-[1.18rem]">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <HeroLink action={primaryAction} />
              {secondaryAction ? <HeroLink action={{ ...secondaryAction, secondary: true }} /> : null}
            </div>
          </motion.div>

          <div className="w-full lg:basis-[58%] lg:flex-none">
            <VideoEllipse src={videoSrc} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  invert = false,
  className,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <motion.div {...editorialFade} className={cn('max-w-3xl', className)}>
      <p
        className={cn(
          'text-[0.72rem] uppercase tracking-[0.28em]',
          invert ? 'text-[#BAB0A8]' : 'text-[#876856]',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn('mt-5', invert ? 'text-[#F2EEEC]' : 'text-[#38322C]')}
        style={{
          fontSize: 'clamp(2.2rem, 4.2vw, 4.2rem)',
          lineHeight: 1.02,
          fontWeight: 400,
          letterSpacing: '-0.04em',
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            'mt-5 max-w-2xl text-[1.04rem] leading-relaxed',
            invert ? 'text-[#F2EEEC]/74' : 'text-[#635C54]',
          )}
        >
          {body}
        </p>
      ) : null}
    </motion.div>
  );
}
