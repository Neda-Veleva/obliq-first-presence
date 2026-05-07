import { motion } from 'motion/react';
import { BadgeCheck, History } from 'lucide-react';
import { BeforeAfterCaseSlider, type BeforeAfterSlide } from './BeforeAfterCaseSlider';
import { useLocale, type Locale } from '../i18n';

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

const resultsCopy: Record<
  Locale,
  {
    title: string;
    body: string;
    satisfactionTitle: string;
    satisfactionBody: string;
    longevityTitle: string;
    longevityBody: string;
    sliderHint: string;
  }
> = {
  bg: {
    title: 'Доказани резултати',
    body:
      'Ние не обещаваме невъзможното. Ние показваме реални промени, постигнати чрез търпение и професионализъм.',
    satisfactionTitle: '98% удовлетвореност',
    satisfactionBody: 'Нашите клиенти се връщат при нас заради консистентното качество.',
    longevityTitle: 'Дълготраен ефект',
    longevityBody:
      'Фокусираме се върху здравето на кожата, което гарантира трайност на естетичните корекции.',
    sliderHint: 'плъзнете, за да сравните',
  },
  en: {
    title: 'Proven results',
    body:
      'We do not promise the impossible. We show real changes achieved through patience and professionalism.',
    satisfactionTitle: '98% satisfaction',
    satisfactionBody: 'Our clients return because of consistent quality.',
    longevityTitle: 'Long-lasting effect',
    longevityBody:
      'We focus on skin health, supporting the longevity of aesthetic corrections.',
    sliderHint: 'drag to compare',
  },
  ru: {
    title: 'Доказанные результаты',
    body:
      'Мы не обещаем невозможного. Мы показываем реальные изменения, достигнутые через терпение и профессионализм.',
    satisfactionTitle: '98% удовлетворенности',
    satisfactionBody: 'Наши клиенты возвращаются благодаря стабильному качеству.',
    longevityTitle: 'Долговременный эффект',
    longevityBody:
      'Мы фокусируемся на здоровье кожи, что поддерживает стойкость эстетических коррекций.',
    sliderHint: 'потяните, чтобы сравнить',
  },
};

export function ProvenResults() {
  const { locale } = useLocale();
  const copy = resultsCopy[locale];

  return (
    <section
      id="results"
      className="overflow-hidden bg-[#F2EEEC] py-24 text-[#38322C] md:py-32"
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
              {copy.title}
            </h2>
            <p
              className="mb-10 max-w-lg text-pretty text-[#635C54]"
              style={{ fontSize: '1.125rem', lineHeight: 1.7 }}
            >
              {copy.body}
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4 rounded-sm border border-[#D8CDC0]/90 bg-[#F2EEEC] p-6 shadow-sm">
                <BadgeCheck
                  className="mt-0.5 h-6 w-6 shrink-0 text-[#977460]"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="mb-1.5 font-medium" style={{ fontSize: '1.125rem' }}>
                    {copy.satisfactionTitle}
                  </p>
                  <p className="text-sm text-[#635C54]">
                    {copy.satisfactionBody}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-sm border border-[#D8CDC0]/90 bg-[#F2EEEC] p-6 shadow-sm">
                <History
                  className="mt-0.5 h-6 w-6 shrink-0 text-[#8C8E77]"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="mb-1.5 font-medium" style={{ fontSize: '1.125rem' }}>
                    {copy.longevityTitle}
                  </p>
                  <p className="text-sm text-[#635C54]">
                    {copy.longevityBody}
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
              labelHint={copy.sliderHint}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
