import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';
import { useLocale, type Locale } from '../i18n';

const inputClass =
  'w-full rounded-lg border border-[#D8CDC0] bg-[#F2EEEC] px-4 py-3 text-[0.9375rem] text-[#38322C] shadow-sm transition-[border-color,box-shadow] placeholder:text-[#876856]/70 focus:border-[#977460] focus:outline-none focus:ring-2 focus:ring-[#977460]/12';

const formCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    body: string;
    thankYou: string;
    name: string;
    phone: string;
    email: string;
    comment: string;
    privacyPrefix: string;
    privacyLink: string;
    privacySuffix: string;
    marketing: string;
    submit: string;
  }
> = {
  bg: {
    eyebrow: 'Частна клиника',
    title: 'Запазете консултация',
    body:
      'Ще се свържем с вас в рамките на един работен ден. Без ангажимент — само ясен разговор, индивидуален подход и спокойно планиране на следващата стъпка.',
    thankYou: 'Благодарим ви за доверието. Екипът ни ще потвърди часа по телефон или имейл.',
    name: 'Име',
    phone: 'Телефон',
    email: 'Имейл',
    comment: 'Коментар (по желание)',
    privacyPrefix: 'Съгласен/а съм с обработката на личните ми данни за отговор на това запитване, съгласно',
    privacyLink: 'политиката за поверителност',
    privacySuffix: '.',
    marketing: 'Желая да получавам дискретни съобщения за нови терапии и свободни часове.',
    submit: 'Изпрати запитване',
  },
  en: {
    eyebrow: 'Private clinic',
    title: 'Book a consultation',
    body:
      'We will contact you within one business day. No obligation, just a clear conversation, an individual approach and calm planning for the next step.',
    thankYou: 'Thank you for your trust. Our team will confirm the appointment by phone or email.',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    comment: 'Comment (optional)',
    privacyPrefix: 'I agree to the processing of my personal data for a response to this inquiry, according to the',
    privacyLink: 'privacy policy',
    privacySuffix: '.',
    marketing: 'I would like to receive discreet updates about new therapies and available appointments.',
    submit: 'Send inquiry',
  },
  ru: {
    eyebrow: 'Частная клиника',
    title: 'Запишитесь на консультацию',
    body:
      'Мы свяжемся с вами в течение одного рабочего дня. Без обязательств — только ясный разговор, индивидуальный подход и спокойное планирование следующего шага.',
    thankYou: 'Спасибо за доверие. Наша команда подтвердит время по телефону или email.',
    name: 'Имя',
    phone: 'Телефон',
    email: 'Email',
    comment: 'Комментарий (по желанию)',
    privacyPrefix: 'Я согласен/согласна на обработку моих персональных данных для ответа на этот запрос согласно',
    privacyLink: 'политике конфиденциальности',
    privacySuffix: '.',
    marketing: 'Я хочу получать дискретные сообщения о новых терапиях и свободных часах.',
    submit: 'Отправить запрос',
  },
};

export function ConsultationForm() {
  const { locale } = useLocale();
  const copy = formCopy[locale];
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="bg-[#F2EEEC] text-[#38322C]">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 md:px-12 lg:px-16 lg:pb-20 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-[1.35rem] border border-[#D8CDC0]/72 bg-[#F2EEEC] p-8 shadow-[0_24px_80px_-24px_rgba(56,50,44,0.12)] sm:p-10 md:p-12 lg:p-14"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-5">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-[#876856]">
                {copy.eyebrow}
              </p>
              <h2
                className="text-balance text-[#38322C]"
                style={{
                  fontFamily: "'Matt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  fontWeight: 400,
                  lineHeight: 1.12,
                }}
              >
                {copy.title}
              </h2>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-[#635C54]">
                {copy.body}
              </p>
            </div>

            <div>
              {sent ? (
                <p
                  className="rounded-lg border border-[#D8CDC0]/80 bg-[#F2EEEC] px-6 py-10 text-center text-[#635C54]"
                  role="status"
                >
                  {copy.thankYou}
                </p>
              ) : (
                <form className="space-y-5" onSubmit={onSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={copy.name}
                      aria-label={copy.name}
                      className={inputClass}
                    />
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={copy.phone}
                      aria-label={copy.phone}
                      className={inputClass}
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={copy.email}
                    aria-label={copy.email}
                    className={inputClass}
                  />
                  <textarea
                    name="comment"
                    rows={4}
                    placeholder={copy.comment}
                    aria-label={copy.comment}
                    className={cn(inputClass, 'min-h-[7.5rem] resize-y')}
                  />
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-start gap-3 text-left text-[0.8125rem] leading-snug text-[#635C54]">
                      <input
                        name="gdpr"
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#BAB0A8] text-[#38322C] focus:ring-[#977460]/20"
                      />
                      <span>
                        {copy.privacyPrefix}{' '}
                        <a
                          href="#"
                          className="text-[#38322C] underline decoration-[#BAB0A8] underline-offset-2 hover:decoration-[#876856]"
                        >
                          {copy.privacyLink}
                        </a>
                        {copy.privacySuffix}
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 text-left text-[0.8125rem] leading-snug text-[#876856]">
                      <input
                        name="marketing"
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#BAB0A8] text-[#38322C] focus:ring-[#977460]/20"
                      />
                      <span>{copy.marketing}</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#38322C] py-3.5 text-[0.9375rem] font-medium tracking-wide text-[#F2EEEC] shadow-sm transition-[background-color,transform] hover:bg-[#635C54] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38322C]/30"
                  >
                    {copy.submit}
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
