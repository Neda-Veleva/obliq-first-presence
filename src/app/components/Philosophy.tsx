import { motion } from 'motion/react';
import { useLocale, type Locale } from '../i18n';

const philosophyCopy: Record<Locale, { title: [string, string]; points: string[] }> = {
  bg: {
    title: ['Истинската увереност', 'не е въпрос на обем.'],
    points: ['Тя се усеща.', 'Тя е баланс.', 'Тя е резултат от правилния подход.'],
  },
  en: {
    title: ['True confidence', 'is not about volume.'],
    points: ['It is felt.', 'It is balance.', 'It is the result of the right approach.'],
  },
  ru: {
    title: ['Настоящая уверенность', 'не вопрос объема.'],
    points: ['Она ощущается.', 'Она является балансом.', 'Она результат правильного подхода.'],
  },
};

export function Philosophy() {
  const { locale } = useLocale();
  const copy = philosophyCopy[locale];

  return (
    <section
      id="philosophy"
      className="relative bg-black text-white py-32 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-start-1 lg:col-span-7"
          >
            <h2 className="mb-8 tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 400 }}>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-start-9 lg:col-span-4 flex flex-col justify-end space-y-12"
          >
            <div>
              <p className="text-white/60 mb-3 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
                01
              </p>
              <p className="text-white/90" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                {copy.points[0]}
              </p>
            </div>

            <div>
              <p className="text-white/60 mb-3 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
                02
              </p>
              <p className="text-white/90" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                {copy.points[1]}
              </p>
            </div>

            <div>
              <p className="text-white/60 mb-3 tracking-[0.2em]" style={{ fontSize: '0.75rem' }}>
                03
              </p>
              <p className="text-white/90" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                {copy.points[2]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
