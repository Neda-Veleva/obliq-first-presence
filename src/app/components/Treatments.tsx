import { motion } from 'motion/react';
import { useLocale, type Locale } from '../i18n';

const treatmentsCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    treatments: { id: string; name: string; area: string }[];
  }
> = {
  bg: {
    eyebrow: 'УСЛУГИ',
    title: 'Премерена намеса.',
    treatments: [
      {
        id: 'mimic',
        name: 'Модулиране на мимиката',
        area: 'Прецизна корекция на динамичните линии, естествен израз',
      },
      {
        id: 'fillers',
        name: 'Контур и обем',
        area: 'Хиалуронови филъри за пропорция и дефиниция',
      },
      {
        id: 'skin',
        name: 'Протоколи за кожата',
        area: 'Текстура, тон и сияние',
      },
      {
        id: 'threads',
        name: 'Лифтинг с конци',
        area: 'Повдигане и подкрепа без операция',
      },
    ],
  },
  en: {
    eyebrow: 'SERVICES',
    title: 'Measured intervention.',
    treatments: [
      {
        id: 'mimic',
        name: 'Mimic modulation',
        area: 'Precise correction of dynamic lines with natural expression',
      },
      {
        id: 'fillers',
        name: 'Contour and volume',
        area: 'Hyaluronic fillers for proportion and definition',
      },
      {
        id: 'skin',
        name: 'Skin protocols',
        area: 'Texture, tone and radiance',
      },
      {
        id: 'threads',
        name: 'Thread lifting',
        area: 'Lifting and support without surgery',
      },
    ],
  },
  ru: {
    eyebrow: 'УСЛУГИ',
    title: 'Выверенное вмешательство.',
    treatments: [
      {
        id: 'mimic',
        name: 'Модуляция мимики',
        area: 'Точная коррекция динамических линий и естественное выражение',
      },
      {
        id: 'fillers',
        name: 'Контур и объем',
        area: 'Гиалуроновые филлеры для пропорции и дефиниции',
      },
      {
        id: 'skin',
        name: 'Протоколы для кожи',
        area: 'Текстура, тон и сияние',
      },
      {
        id: 'threads',
        name: 'Нитевой лифтинг',
        area: 'Лифтинг и поддержка без операции',
      },
    ],
  },
};

export function Treatments() {
  const { locale } = useLocale();
  const copy = treatmentsCopy[locale];

  return (
    <section
      id="treatments"
      className="relative bg-white py-40 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <p className="text-black/40 tracking-[0.3em] mb-6" style={{ fontSize: '0.75rem' }}>
            {copy.eyebrow}
          </p>
          <h2 className="tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, fontWeight: 400 }}>
            {copy.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {copy.treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-black/10 pt-8"
              style={{ marginTop: index % 2 === 1 ? '6rem' : '0' }}
            >
              <h3 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                {treatment.name}
              </h3>
              <p className="text-black/60" style={{ fontSize: '1rem' }}>
                {treatment.area}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
