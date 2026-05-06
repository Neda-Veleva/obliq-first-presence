import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLocale, type Locale } from '../i18n';

const doctorCopy: Record<
  Locale,
  { imageAlt: string; eyebrow: string; name: string; body: string; credential: string }
> = {
  bg: {
    imageAlt: 'д-р Михаил Михайлов',
    eyebrow: 'ОСНОВАТЕЛ',
    name: 'д-р Михаил Михайлов',
    body:
      'Като сертифициран обучител на Merz Aesthetics, д-р Михайлов провежда тренинги по работа с хиалуронови филъри, ботулинов токсин и колагенови стимулатори (Radiesse, Belotero, BoCouture). Той активно популяризира етичната и безопасна практика в естетичната медицина, подчертавайки значението на медицинската квалификация при естетичните процедури.',
    credential: 'Бордова сертификация • Merz Aesthetics',
  },
  en: {
    imageAlt: 'Dr. Mihail Mihaylov',
    eyebrow: 'FOUNDER',
    name: 'Dr. Mihail Mihaylov',
    body:
      'As a certified Merz Aesthetics trainer, Dr. Mihaylov leads trainings in hyaluronic fillers, botulinum toxin and collagen stimulators (Radiesse, Belotero, BoCouture). He actively promotes ethical and safe practice in aesthetic medicine, emphasizing the importance of medical qualification in aesthetic procedures.',
    credential: 'Board certification • Merz Aesthetics',
  },
  ru: {
    imageAlt: 'д-р Михаил Михайлов',
    eyebrow: 'ОСНОВАТЕЛЬ',
    name: 'д-р Михаил Михайлов',
    body:
      'Как сертифицированный тренер Merz Aesthetics, д-р Михайлов проводит обучения по работе с гиалуроновыми филлерами, ботулиническим токсином и коллагеновыми стимуляторами (Radiesse, Belotero, BoCouture). Он активно поддерживает этичную и безопасную практику в эстетической медицине, подчеркивая значение медицинской квалификации.',
    credential: 'Бордовая сертификация • Merz Aesthetics',
  },
};

export function Doctor() {
  const { locale } = useLocale();
  const copy = doctorCopy[locale];
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /**
   * p: 0 = секцията влиза отдолу, 1 = напуска нагоре. Обратен скрол връща p назад.
   * sin(p * π) = 0 при вход/изход, 1 в „средата“ → замъглява се отново и при тръгване, и с долен вход.
   */
  const imageFilter = useTransform(scrollYProgress, (p) => {
    const t = Math.sin(Math.max(0, Math.min(1, p)) * Math.PI);
    const blur = 20 * (1 - t);
    const brightness = 0.4 + 0.6 * t;
    return `blur(${blur}px) brightness(${brightness})`;
  });
  const veilOpacity = useTransform(scrollYProgress, (p) => {
    const t = Math.sin(Math.max(0, Math.min(1, p)) * Math.PI);
    return 0.55 * (1 - t) + 0.1;
  });

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative bg-black text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative h-[60vh] min-h-[50vh] lg:min-h-screen lg:h-auto overflow-hidden">
          <motion.div
            className="absolute inset-0 will-change-[filter]"
            style={{ filter: imageFilter }}
          >
            <ImageWithFallback
              src="/doctor-portrait.png"
              alt={copy.imageAlt}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/50"
            style={{ opacity: veilOpacity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20"
        >
          <p className="text-white/40 tracking-[0.3em] mb-8" style={{ fontSize: '0.75rem' }}>
            {copy.eyebrow}
          </p>

          <h2 className="mb-6 tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, fontWeight: 400 }}>
            {copy.name}
          </h2>

          <div className="space-y-6 text-white/70 max-w-lg" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
            <p>
              {copy.body}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/50" style={{ fontSize: '0.875rem' }}>
              {copy.credential}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
