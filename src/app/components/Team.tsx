import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

const members = [
  {
    name: 'д-р Елена Стоянова',
    role: 'Дерматолог, лазерни терапии',
    blurb: 'Сертифицирано обучение в Европа и САЩ. Фокус върху сигурност и естествен резултат.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'д-р Андрей Георгиев',
    role: 'Пластичен хирург',
    blurb: 'Прецизни интервенции с внимание към пропорция и възстановяване.',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Мадлен Христова',
    role: 'Клиничен координатор',
    blurb: 'Вашата връзка с екипа — от първото обаждане до следоперативната грижа.',
    image: '/doctor-portrait-1.png',
  },
  {
    name: 'д-р Калоян Петров',
    role: 'Естетична медицина',
    blurb: 'Протоколи за лице и инжекции с минимален отпечатък, максимален контрол.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
] as const;

export function Team() {
  return (
    <section id="team" className="relative bg-[#F2EEEC] text-[#38322C]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 max-w-2xl border-b border-[#D8CDC0] pb-8 lg:mb-12 lg:pb-9"
        >
          <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-[#876856]">
            Хора
          </p>
          <h2
            className="mb-4 text-balance tracking-tight"
            style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              lineHeight: 1.08,
              fontWeight: 400,
              fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Екипът зад OBLIQ.
          </h2>
          <p
            className="max-w-xl text-pretty text-[#635C54]"
            style={{ fontSize: '1rem', lineHeight: 1.65 }}
          >
            Съвместни консултации, сходни стандарти. Всеки с роля в протокола — без компромис с
            безопасността и вкуса.
          </p>
        </motion.header>

        <ul className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
          {members.map((m, i) => (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.04 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className={cn(
                'flex flex-col gap-5 border-t border-[#D8CDC0] py-7 first:border-t-0 first:pt-0 sm:gap-6 md:flex-row md:items-center md:gap-8 md:py-8 lg:border-t-0 lg:py-5',
                i % 2 === 1 && 'md:flex-row-reverse',
                i >= 2 && 'lg:border-t lg:border-[#D8CDC0] lg:pt-7',
              )}
            >
              <div className="relative w-full shrink-0 overflow-hidden bg-[#D8CDC0] sm:max-w-[200px] md:max-w-[220px]">
                <div className="aspect-[4/5] w-full">
                  <ImageWithFallback
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center pt-1 sm:pt-0">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#876856]">
                  {m.role}
                </p>
                <h3
                  className="mt-2 text-balance text-[#38322C]"
                  style={{
                    fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                  }}
                >
                  {m.name}
                </h3>
                <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-[#635C54]">
                  {m.blurb}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
