import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLocale, type Locale } from '../i18n';
import { clinicTeamByLocale } from '../content/clinicTeam';

const teamCopy: Record<
  Locale,
  {
    eyebrow: string;
    clinicTitle: string;
    clinicBody: string;
    activeLabel: string;
    teamLabel: string;
  }
> = {
  bg: {
    eyebrow: 'ЕКИП',
    clinicTitle: 'Клиника, подредена около човека.',
    clinicBody:
      'OBLIQ събира медицинска прецизност, естетичен усет и спокойна грижа в един общ протокол за лице, кожа и присъствие.',
    activeLabel: 'Във фокус',
    teamLabel: 'Екипът на OBLIQ',
  },
  en: {
    eyebrow: 'TEAM',
    clinicTitle: 'A clinic arranged around the person.',
    clinicBody:
      'OBLIQ brings medical precision, aesthetic judgement and calm care into one shared protocol for face, skin and presence.',
    activeLabel: 'In focus',
    teamLabel: 'The OBLIQ team',
  },
  ru: {
    eyebrow: 'КОМАНДА',
    clinicTitle: 'Клиника, выстроенная вокруг человека.',
    clinicBody:
      'OBLIQ объединяет медицинскую точность, эстетическое чутье и спокойную заботу в одном протоколе для лица, кожи и присутствия.',
    activeLabel: 'В фокусе',
    teamLabel: 'Команда OBLIQ',
  },
};

const orbitDuration = 52;

export function Team() {
  const { locale } = useLocale();
  const copy = teamCopy[locale];
  const [activeIndex, setActiveIndex] = useState(-1);

  const members = clinicTeamByLocale[locale];
  const activeMember = activeIndex >= 0 ? members[activeIndex] : null;
  const orbitItems = useMemo(
    () =>
      members.map((member, index) => ({
        ...member,
        delay: `-${(orbitDuration / members.length) * index}s`,
      })),
    [locale],
  );

  return (
    <section id="team" className="relative overflow-hidden bg-[#F2EEEC] text-[#38322C]">
      <style>{`
        @keyframes obliq-team-orbit {
          from { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .obliq-team-orbit-item {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#38322C]/10" />
      <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 py-16 sm:px-8 md:px-12 lg:min-h-screen lg:px-16 lg:py-24">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative z-10 mb-10 max-w-xl lg:mb-0"
        >
          <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-[#876856]">
            {copy.eyebrow}
          </p>
          <h2 className="type-h2 text-balance">
            {copy.teamLabel}
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative mx-auto flex min-h-[580px] w-full max-w-[980px] flex-1 items-center justify-center [--orbit-radius:178px] sm:[--orbit-radius:246px] lg:min-h-[800px] lg:[--orbit-radius:324px]"
        >
          {orbitItems.map((member, index) => (
            <motion.article
              key={`${member.name}-${index}`}
              role="button"
              tabIndex={0}
              aria-pressed={activeIndex === index}
              aria-label={`${copy.activeLabel}: ${member.name}`}
              className="obliq-team-orbit-item absolute left-1/2 top-1/2 z-20 flex h-[116px] w-[92px] -ml-[46px] -mt-[58px] cursor-pointer flex-col items-center gap-2 rounded-full border-0 bg-transparent p-0 outline-none sm:h-[150px] sm:w-[116px] sm:-ml-[58px] sm:-mt-[75px] lg:h-[190px] lg:w-[148px] lg:-ml-[74px] lg:-mt-[95px] focus-visible:ring-2 focus-visible:ring-[#977460]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EEEC]"
              style={{
                animation: `obliq-team-orbit ${orbitDuration}s linear infinite`,
                animationDelay: member.delay,
              }}
              animate={{
                opacity: activeIndex === index ? 0.35 : 1,
                scale: activeIndex === index ? 0.86 : 1,
              }}
              transition={{ duration: 0.5 }}
              onClick={() =>
                setActiveIndex((current) => (current === index ? -1 : index))
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveIndex((current) => (current === index ? -1 : index));
                }
              }}
            >
              <div className="h-[74px] w-[74px] overflow-hidden rounded-full border border-[#F2EEEC] bg-[#D8CDC0] shadow-[0_22px_60px_rgba(56,50,44,0.18)] sm:h-[92px] sm:w-[92px] lg:h-[118px] lg:w-[118px]">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-contain object-center p-2"
                />
              </div>
              <div className="hidden max-w-[150px] text-center lg:block">
                <p className="text-[0.7rem] leading-tight text-[#38322C]">{member.name}</p>
                <p className="mt-1 text-[0.62rem] uppercase leading-tight tracking-[0.18em] text-[#876856]">
                  {member.role}
                </p>
              </div>
            </motion.article>
          ))}

          <div className="relative z-30 flex h-[280px] w-[280px] items-center justify-center rounded-full border border-[#D8CDC0]/70 bg-[#F2EEEC]/94 p-7 text-center shadow-[0_34px_90px_rgba(56,50,44,0.14)] backdrop-blur sm:h-[340px] sm:w-[340px] sm:p-9 lg:h-[420px] lg:w-[420px] lg:p-12">
            <AnimatePresence mode="wait">
              {activeMember ? (
                <motion.div
                  key={activeMember.name}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col items-center justify-center"
                >
                  <div className="mb-5 h-24 w-24 overflow-hidden rounded-full border border-[#F2EEEC] bg-[#D8CDC0] shadow-[0_18px_40px_rgba(56,50,44,0.16)] sm:h-28 sm:w-28">
                    <ImageWithFallback
                      src={activeMember.image}
                      alt={activeMember.name}
                      className="h-full w-full object-contain object-center p-2"
                    />
                  </div>
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#876856]">
                    {copy.activeLabel}
                  </p>
                  <h3 className="mt-3 text-[1.45rem] font-normal leading-tight sm:text-[1.75rem]">
                    {activeMember.name}
                  </h3>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#876856]">
                    {activeMember.role}
                  </p>
                  <p className="mt-4 max-w-[18rem] text-[0.9rem] leading-relaxed text-[#635C54] sm:text-[0.95rem]">
                    {activeMember.blurb}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="clinic"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col items-center justify-center"
                >
                  <BrandLogo className="mb-8 w-44 sm:w-56" />
                  <h3 className="text-balance text-[1.35rem] font-normal leading-tight sm:text-[1.7rem]">
                    {copy.clinicTitle}
                  </h3>
                  <p className="mt-5 max-w-[19rem] text-[0.95rem] leading-relaxed text-[#635C54] sm:text-[1rem]">
                    {copy.clinicBody}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
