import { motion } from 'motion/react';
import { BadgeCheck, History } from 'lucide-react';
import { BeforeAfterCaseSlider, type BeforeAfterSlide } from './BeforeAfterCaseSlider';

const FACE_CASE_BEFORE =
  'https://eng.banobagi.com/wp-content/uploads/2024/02/asset-face-cheeckbone-reduction-103.jpeg.webp';
const FACE_CASE_AFTER =
  'https://eng.banobagi.com/wp-content/uploads/2024/02/asset-face-cheeckbone-reduction-104.jpeg.webp';

const RESULT_SLIDES: readonly BeforeAfterSlide[] = [
  {
    id: 'image-1',
    before: FACE_CASE_BEFORE,
    after: FACE_CASE_AFTER,
  },
  {
    id: 'image-2',
    before: '/results-case-2-before.png',
    after: '/results-case-2-after.png',
  },
  {
    id: 'image-3',
    before: '/results-case-3-before.png',
    after: '/results-case-3-after.png',
  },
];

export function ProvenResults() {
  return (
    <section
      id="results"
      className="overflow-hidden bg-stone-100 py-24 text-stone-900 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-6 max-w-lg tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, fontWeight: 400 }}
            >
              Доказани резултати
            </h2>
            <p
              className="mb-10 max-w-lg text-pretty text-stone-600"
              style={{ fontSize: '1.125rem', lineHeight: 1.7 }}
            >
              Ние не обещаваме невъзможното. Ние показваме реални промени, постигнати чрез
              търпение и професионализъм.
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4 rounded-sm border border-stone-200/90 bg-white p-6 shadow-sm">
                <BadgeCheck
                  className="mt-0.5 h-6 w-6 shrink-0 text-amber-800/80"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="mb-1.5 font-medium" style={{ fontSize: '1.125rem' }}>
                    98% удовлетвореност
                  </p>
                  <p className="text-sm text-stone-600">
                    Нашите клиенти се връщат при нас заради консистентното качество.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-sm border border-stone-200/90 bg-white p-6 shadow-sm">
                <History
                  className="mt-0.5 h-6 w-6 shrink-0 text-amber-800/80"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="mb-1.5 font-medium" style={{ fontSize: '1.125rem' }}>
                    Дълготраен ефект
                  </p>
                  <p className="text-sm text-stone-600">
                    Фокусираме се върху здравето на кожата, което гарантира трайност на
                    естетичните корекции.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            <BeforeAfterCaseSlider
              slides={RESULT_SLIDES}
              labelHint="плъзнете, за да сравните"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
