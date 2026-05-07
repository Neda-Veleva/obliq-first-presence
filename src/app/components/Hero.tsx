import { motion } from 'motion/react';
import { useLocale, type Locale } from '../i18n';
import { useHeroVideoPlayback } from './PremiumPagePrimitives';

const heroCopy: Record<Locale, { headline: [string, string]; byline: string }> = {
  bg: {
    headline: ['истинската красота', 'идва отвътре.'],
    byline: 'by dr. mihaylov',
  },
  en: {
    headline: ['true beauty', 'comes from within.'],
    byline: 'by dr. mihaylov',
  },
  ru: {
    headline: ['истинная красота', 'идет изнутри.'],
    byline: 'by dr. mihaylov',
  },
};

export function Hero() {
  const { locale } = useLocale();
  const copy = heroCopy[locale];
  const { videoRef, freezeVideoOnLastFrame, replayVideoOnHover } = useHeroVideoPlayback();

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-[#38322C]">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        onMouseEnter={replayVideoOnHover}
      >
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
          className="h-full w-full object-cover object-center opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#38322C]/40 via-transparent to-[#38322C]/60" />

      <div className="relative h-full flex items-end pb-32 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-6 text-[#F2EEEC] tracking-tight uppercase" style={{ fontSize: '5rem', lineHeight: 0.95, fontWeight: 400, letterSpacing: '-0.03em' }}>
            {copy.headline[0]}
            <br />
            {copy.headline[1]}
          </h1>
          <p className="ml-auto max-w-md uppercase text-[#F2EEEC]/70" style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
            {copy.byline}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
