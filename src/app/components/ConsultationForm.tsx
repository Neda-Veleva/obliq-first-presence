import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';

const inputClass =
  'w-full rounded-lg border border-stone-200/90 bg-white px-4 py-3 text-[0.9375rem] text-stone-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-900/10';

export function ConsultationForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="bg-[#faf7f2] text-stone-900">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 md:px-12 lg:px-16 lg:pb-20 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-[1.35rem] border border-stone-200/60 bg-white p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)] sm:p-10 md:p-12 lg:p-14"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-5">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-stone-500">
                Частна клиника
              </p>
              <h2
                className="text-balance text-stone-900"
                style={{
                  fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  fontWeight: 400,
                  lineHeight: 1.12,
                }}
              >
                Запазете консултация
              </h2>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-stone-600">
                Ще се свържем с вас в рамките на един работен ден. Без ангажимент — само ясен
                разговор, индивидуален подход и спокойно планиране на следващата стъпка.
              </p>
            </div>

            <div>
              {sent ? (
                <p
                  className="rounded-lg border border-stone-200/80 bg-stone-50 px-6 py-10 text-center text-stone-700"
                  role="status"
                >
                  Благодарим ви за доверието. Екипът ни ще потвърди часа по телефон или имейл.
                </p>
              ) : (
                <form className="space-y-5" onSubmit={onSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Име"
                      aria-label="Име"
                      className={inputClass}
                    />
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Телефон"
                      aria-label="Телефон"
                      className={inputClass}
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Имейл"
                    aria-label="Имейл"
                    className={inputClass}
                  />
                  <textarea
                    name="comment"
                    rows={4}
                    placeholder="Коментар (по желание)"
                    aria-label="Коментар"
                    className={cn(inputClass, 'min-h-[7.5rem] resize-y')}
                  />
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-start gap-3 text-left text-[0.8125rem] leading-snug text-stone-600">
                      <input
                        name="gdpr"
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-stone-900 focus:ring-stone-900/20"
                      />
                      <span>
                        Съгласен/а съм с обработката на личните ми данни за отговор на това запитване,
                        съгласно{' '}
                        <a
                          href="#"
                          className="text-stone-900 underline decoration-stone-300 underline-offset-2 hover:decoration-stone-600"
                        >
                          политиката за поверителност
                        </a>
                        .
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 text-left text-[0.8125rem] leading-snug text-stone-500">
                      <input
                        name="marketing"
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-stone-900 focus:ring-stone-900/20"
                      />
                      <span>Желая да получавам дискретни съобщения за нови процедури и свободни часове.</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-stone-900 py-3.5 text-[0.9375rem] font-medium tracking-wide text-white shadow-sm transition-[background-color,transform] hover:bg-stone-800 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/30"
                  >
                    Изпрати запитване
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
