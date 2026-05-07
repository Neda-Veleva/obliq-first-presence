import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLocale, type Locale } from '../i18n';

const faceRevealCopy: Record<Locale, { alt: string; caption: string }> = {
  bg: {
    alt: 'Клинична естетична процедура — прецизна инжекция в зоната на лицето',
    caption: 'ПРЕЦИЗНОСТТА Е ИЗКУСТВО',
  },
  en: {
    alt: 'Clinical aesthetic procedure — precise injection in the facial area',
    caption: 'PRECISION IS ART',
  },
  ru: {
    alt: 'Клиническая эстетическая процедура — точная инъекция в зоне лица',
    caption: 'ТОЧНОСТЬ — ЭТО ИСКУССТВО',
  },
};

export function FaceReveal() {
  const { locale } = useLocale();
  const copy = faceRevealCopy[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.05]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    ]
  );

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#F2EEEC]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="relative w-full max-w-6xl aspect-[5/3] max-h-[min(85vh,52rem)] sm:aspect-[2/1]"
        >
          <motion.div style={{ clipPath }} className="absolute inset-0">
            <ImageWithFallback
              src="/section-2-clinical-closeup.png"
              alt={copy.alt}
              className="h-full w-full object-cover object-[45%_center] sm:object-center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="pointer-events-none absolute right-4 top-1/2 z-10 max-w-[45%] -translate-y-1/2 text-right text-[#38322C]/92 sm:right-8 md:right-12"
            style={{ writingMode: 'vertical-rl', fontSize: '0.875rem', letterSpacing: '0.3em', fontWeight: 500 }}
          >
            <span className="drop-shadow-[0_1px_8px_rgba(242,238,236,0.6)]">{copy.caption}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
