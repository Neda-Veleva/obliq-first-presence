import { ArrowRight } from 'lucide-react';
import { useLocale, type Locale } from '../i18n';

const ctaCopy: Record<Locale, string> = {
  bg: 'Запази консултация',
  en: 'Book consultation',
  ru: 'Записаться',
};

export function FloatingConsultationCta() {
  const { locale, localizeHref } = useLocale();

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-end px-4 pb-4 sm:left-auto sm:px-6 sm:pb-6"
      style={{
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <a
        href={localizeHref('/#contact')}
        className="pointer-events-auto inline-flex min-h-14 w-full max-w-full items-center justify-center gap-2 rounded-full border border-[#F2EEEC]/14 bg-[linear-gradient(135deg,#38322C_0%,#4C423A_58%,#876856_100%)] px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.18em] text-[#F2EEEC] shadow-[0_30px_60px_-22px_rgba(56,50,44,0.72),0_0_0_1px_rgba(242,238,236,0.08)_inset] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_34px_70px_-22px_rgba(56,50,44,0.8),0_0_0_1px_rgba(242,238,236,0.12)_inset] sm:min-h-0 sm:w-auto sm:max-w-[22rem] sm:px-6 sm:text-[0.78rem] sm:tracking-[0.22em]"
      >
        {ctaCopy[locale]}
        <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
      </a>
    </div>
  );
}
