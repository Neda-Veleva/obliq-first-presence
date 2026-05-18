import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { ConsultationFooter } from './ConsultationFooter';
import { SiteHeader } from './SiteHeader';
import { cn } from './ui/utils';

type BreakpointId = 'smallMobile' | 'mobile' | 'tablet' | 'laptop' | 'desktop';

type TypeStyle = {
  id: string;
  name: string;
  preview: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  weight: string;
  transform?: 'uppercase';
  usage: string;
};

type BreakpointScale = {
  id: BreakpointId;
  label: string;
  range: string;
  styles: TypeStyle[];
};

const revealTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

const baseStyles = [
  {
    id: 'h1',
    name: 'H1',
    preview: 'Precision begins quietly',
    usage:
      'Използва се само за основното заглавие на страница или hero секция. Трябва да създава силно, editorial и премиум първо впечатление. Да не се използва повече от веднъж на страница.',
  },
  {
    id: 'h2',
    name: 'H2',
    preview: 'Editorial hierarchy',
    usage:
      'Основни заглавия на големи секции. Използва се за разделяне на съдържанието и създаване на ритъм.',
  },
  {
    id: 'h3',
    name: 'H3',
    preview: 'Measured section presence',
    usage:
      'Заглавия на под-секции, feature blocks, card groups или важни editorial блокове.',
  },
  {
    id: 'h4',
    name: 'H4',
    preview: 'Calm information blocks',
    usage:
      'По-малки секционни заглавия, заглавия в cards, trust blocks и informational modules.',
  },
  {
    id: 'h5',
    name: 'H5',
    preview: 'Compact title rhythm',
    usage:
      'Компактни заглавия за card titles, preview modules и вътрешна йерархия.',
  },
  {
    id: 'h6',
    name: 'H6',
    preview: 'Functional heading',
    usage:
      'Малки функционални заглавия. Подходящо за FAQ, specs, footer групи, малки UI блокове.',
  },
  {
    id: 'paragraphLarge',
    name: 'Paragraph large',
    preview: 'Типографията въвежда читателя с уверен тон, въздух и балансирана четимост.',
    usage:
      'Въвеждащ текст след H1 или H2. Използва се за важни обяснения, които трябва да звучат спокойно, уверено и премиум.',
  },
  {
    id: 'paragraph',
    name: 'Paragraph default',
    preview: 'Основният текст носи информацията спокойно, без визуално напрежение и без излишна тежест.',
    usage:
      'Основен текст за четене. Трябва да бъде максимално четим, спокоен и балансиран.',
  },
  {
    id: 'paragraphSmall',
    name: 'Paragraph small',
    preview: 'Вторичен текст за контекст, пояснения и meta информация.',
    usage: 'Вторичен текст, пояснения, meta информация, помощни описания.',
  },
  {
    id: 'link',
    name: 'Link',
    preview: 'EXPLORE TYPOGRAPHY',
    usage:
      'Текстови линкове. Трябва да са ясни, но не агресивни. Използвай subtle underline или opacity transition on hover.',
  },
  {
    id: 'button',
    name: 'Button',
    preview: 'BOOK CONSULTATION',
    usage:
      'CTA текст. Използва Bold и controlled letter-spacing. Трябва да звучи уверено и премиум, не агресивно.',
  },
  {
    id: 'eyebrow',
    name: 'Eyebrow / Label',
    preview: 'TYPOGRAPHY SYSTEM',
    transform: 'uppercase' as const,
    usage:
      'Малък текст над заглавия. Използва се за категория, контекст или навигационен сигнал. Обикновено uppercase с по-голям letter-spacing.',
  },
  {
    id: 'caption',
    name: 'Caption',
    preview: 'Caption text for notes, image context and small supporting information.',
    usage:
      'Най-малкият помощен текст. Използва се за бележки, image captions, legal text или допълнителна информация.',
  },
] as const;

const scaleValues: Record<BreakpointId, Record<string, Omit<TypeStyle, 'id' | 'name' | 'preview' | 'usage'>>> = {
  desktop: {
    h1: { size: '96px', lineHeight: '0.95', letterSpacing: '-0.04em', weight: 'Regular' },
    h2: { size: '64px', lineHeight: '1', letterSpacing: '-0.035em', weight: 'Regular' },
    h3: { size: '44px', lineHeight: '1.08', letterSpacing: '-0.025em', weight: 'Regular' },
    h4: { size: '32px', lineHeight: '1.15', letterSpacing: '-0.015em', weight: 'Regular' },
    h5: { size: '24px', lineHeight: '1.25', letterSpacing: '-0.01em', weight: 'Regular' },
    h6: { size: '18px', lineHeight: '1.35', letterSpacing: '0', weight: 'Bold or Regular' },
    paragraphLarge: { size: '20px', lineHeight: '1.55', letterSpacing: '0', weight: 'Regular' },
    paragraph: { size: '17px', lineHeight: '1.6', letterSpacing: '0', weight: 'Regular' },
    paragraphSmall: { size: '14px', lineHeight: '1.5', letterSpacing: '0', weight: 'Regular' },
    link: { size: '13px', lineHeight: '1.2', letterSpacing: '0.04em', weight: 'Bold' },
    button: { size: '13px', lineHeight: '1.1', letterSpacing: '0.06em', weight: 'Bold' },
    eyebrow: { size: '12px', lineHeight: '1.1', letterSpacing: '0.12em', weight: 'Bold' },
    caption: { size: '12px', lineHeight: '1.4', letterSpacing: '0', weight: 'Regular' },
  },
  laptop: {
    h1: { size: '78px', lineHeight: '0.98', letterSpacing: '-0.04em', weight: 'Regular' },
    h2: { size: '54px', lineHeight: '1.02', letterSpacing: '-0.035em', weight: 'Regular' },
    h3: { size: '38px', lineHeight: '1.1', letterSpacing: '-0.025em', weight: 'Regular' },
    h4: { size: '28px', lineHeight: '1.18', letterSpacing: '-0.015em', weight: 'Regular' },
    h5: { size: '22px', lineHeight: '1.28', letterSpacing: '-0.01em', weight: 'Regular' },
    h6: { size: '17px', lineHeight: '1.35', letterSpacing: '0', weight: 'Bold or Regular' },
    paragraphLarge: { size: '19px', lineHeight: '1.55', letterSpacing: '0', weight: 'Regular' },
    paragraph: { size: '16px', lineHeight: '1.6', letterSpacing: '0', weight: 'Regular' },
    paragraphSmall: { size: '14px', lineHeight: '1.5', letterSpacing: '0', weight: 'Regular' },
    link: { size: '13px', lineHeight: '1.2', letterSpacing: '0.04em', weight: 'Bold' },
    button: { size: '13px', lineHeight: '1.1', letterSpacing: '0.06em', weight: 'Bold' },
    eyebrow: { size: '11px', lineHeight: '1.1', letterSpacing: '0.12em', weight: 'Bold' },
    caption: { size: '12px', lineHeight: '1.4', letterSpacing: '0', weight: 'Regular' },
  },
  tablet: {
    h1: { size: '60px', lineHeight: '1.02', letterSpacing: '-0.035em', weight: 'Regular' },
    h2: { size: '44px', lineHeight: '1.06', letterSpacing: '-0.03em', weight: 'Regular' },
    h3: { size: '34px', lineHeight: '1.12', letterSpacing: '-0.02em', weight: 'Regular' },
    h4: { size: '26px', lineHeight: '1.2', letterSpacing: '-0.015em', weight: 'Regular' },
    h5: { size: '21px', lineHeight: '1.3', letterSpacing: '-0.01em', weight: 'Regular' },
    h6: { size: '17px', lineHeight: '1.4', letterSpacing: '0', weight: 'Bold or Regular' },
    paragraphLarge: { size: '18px', lineHeight: '1.55', letterSpacing: '0', weight: 'Regular' },
    paragraph: { size: '16px', lineHeight: '1.6', letterSpacing: '0', weight: 'Regular' },
    paragraphSmall: { size: '14px', lineHeight: '1.5', letterSpacing: '0', weight: 'Regular' },
    link: { size: '13px', lineHeight: '1.2', letterSpacing: '0.04em', weight: 'Bold' },
    button: { size: '13px', lineHeight: '1.1', letterSpacing: '0.06em', weight: 'Bold' },
    eyebrow: { size: '11px', lineHeight: '1.1', letterSpacing: '0.12em', weight: 'Bold' },
    caption: { size: '12px', lineHeight: '1.4', letterSpacing: '0', weight: 'Regular' },
  },
  mobile: {
    h1: { size: '44px', lineHeight: '1.02', letterSpacing: '-0.035em', weight: 'Regular' },
    h2: { size: '36px', lineHeight: '1.06', letterSpacing: '-0.03em', weight: 'Regular' },
    h3: { size: '28px', lineHeight: '1.12', letterSpacing: '-0.02em', weight: 'Regular' },
    h4: { size: '24px', lineHeight: '1.18', letterSpacing: '-0.015em', weight: 'Regular' },
    h5: { size: '20px', lineHeight: '1.28', letterSpacing: '-0.01em', weight: 'Regular' },
    h6: { size: '16px', lineHeight: '1.35', letterSpacing: '0', weight: 'Bold or Regular' },
    paragraphLarge: { size: '17px', lineHeight: '1.55', letterSpacing: '0', weight: 'Regular' },
    paragraph: { size: '15.5px', lineHeight: '1.6', letterSpacing: '0', weight: 'Regular' },
    paragraphSmall: { size: '13px', lineHeight: '1.5', letterSpacing: '0', weight: 'Regular' },
    link: { size: '12px', lineHeight: '1.2', letterSpacing: '0.04em', weight: 'Bold' },
    button: { size: '12px', lineHeight: '1.1', letterSpacing: '0.06em', weight: 'Bold' },
    eyebrow: { size: '10px', lineHeight: '1.1', letterSpacing: '0.1em', weight: 'Bold' },
    caption: { size: '11px', lineHeight: '1.4', letterSpacing: '0', weight: 'Regular' },
  },
  smallMobile: {
    h1: { size: '38px', lineHeight: '1.04', letterSpacing: '-0.03em', weight: 'Regular' },
    h2: { size: '32px', lineHeight: '1.08', letterSpacing: '-0.025em', weight: 'Regular' },
    h3: { size: '26px', lineHeight: '1.14', letterSpacing: '-0.02em', weight: 'Regular' },
    h4: { size: '22px', lineHeight: '1.2', letterSpacing: '-0.015em', weight: 'Regular' },
    h5: { size: '19px', lineHeight: '1.28', letterSpacing: '-0.01em', weight: 'Regular' },
    h6: { size: '16px', lineHeight: '1.35', letterSpacing: '0', weight: 'Bold or Regular' },
    paragraphLarge: { size: '16px', lineHeight: '1.55', letterSpacing: '0', weight: 'Regular' },
    paragraph: { size: '15px', lineHeight: '1.58', letterSpacing: '0', weight: 'Regular' },
    paragraphSmall: { size: '13px', lineHeight: '1.5', letterSpacing: '0', weight: 'Regular' },
    link: { size: '12px', lineHeight: '1.2', letterSpacing: '0.04em', weight: 'Bold' },
    button: { size: '12px', lineHeight: '1.1', letterSpacing: '0.06em', weight: 'Bold' },
    eyebrow: { size: '10px', lineHeight: '1.1', letterSpacing: '0.1em', weight: 'Bold' },
    caption: { size: '11px', lineHeight: '1.4', letterSpacing: '0', weight: 'Regular' },
  },
};

const breakpoints: BreakpointScale[] = [
  { id: 'smallMobile', label: 'Small mobile', range: '≤389px', styles: [] },
  { id: 'mobile', label: 'Mobile', range: '390px–767px', styles: [] },
  { id: 'tablet', label: 'Tablet', range: '768px–1023px', styles: [] },
  { id: 'laptop', label: 'Laptop', range: '1024px–1439px', styles: [] },
  { id: 'desktop', label: 'Desktop', range: '≥1440px', styles: [] },
].map((breakpoint) => ({
  ...breakpoint,
  styles: baseStyles.map((style) => ({ ...style, ...scaleValues[breakpoint.id][style.id] })),
}));

const fontSamples = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ',
  'абвгдежзийклмнопрстуфхцчшщъьюя',
  '0123456789',
  '.,:;!?()@№&',
];

const cssTokens = `:root {
  --font-primary: 'Matt', sans-serif;

  --text-h1-desktop: 96px;
  --text-h2-desktop: 64px;
  --text-h3-desktop: 44px;
  --text-h4-desktop: 32px;
  --text-h5-desktop: 24px;
  --text-h6-desktop: 18px;

  --text-body-large-desktop: 20px;
  --text-body-desktop: 17px;
  --text-body-small-desktop: 14px;

  --tracking-h1: -0.04em;
  --tracking-h2: -0.035em;
  --tracking-h3: -0.025em;
  --tracking-h4: -0.015em;
  --tracking-h5: -0.01em;

  --leading-tight: 0.95;
  --leading-heading: 1.08;
  --leading-body: 1.6;
}`;

function getCss(style: TypeStyle) {
  const fontWeight = style.weight.includes('Bold') ? '700' : '400';
  const textTransform = style.transform ? `\n  text-transform: ${style.transform};` : '';

  return `font-family: 'Matt', sans-serif;
font-size: ${style.size};
line-height: ${style.lineHeight};
letter-spacing: ${style.letterSpacing};
font-weight: ${fontWeight};${textTransform}`;
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={revealTransition}
      className="max-w-[42rem]"
    >
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-[#876856]">{eyebrow}</p>
      <h2 className="mt-5 text-[2.5rem] font-normal leading-[0.98] tracking-[-0.04em] text-[#38322C] sm:text-[4rem] lg:text-[5rem]">
        {title}
      </h2>
      {body ? <p className="mt-6 max-w-[34rem] text-[1rem] leading-[1.65] text-[#635C54] sm:text-[1.08rem]">{body}</p> : null}
    </motion.div>
  );
}

function CopyButton({ value, label = 'Copy CSS' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#38322C]/14 px-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#38322C] transition-[background-color,color,border-color] duration-300 hover:border-[#38322C] hover:bg-[#38322C] hover:text-[#F2EEEC]"
    >
      {copied ? <Check className="h-3.5 w-3.5" strokeWidth={1.7} /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.7} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

function TypeStyleRow({ style }: { style: TypeStyle }) {
  const css = getCss(style);
  const previewSize = style.id.startsWith('h')
    ? `clamp(${Math.min(parseFloat(style.size), 30)}px, 5vw, ${style.size})`
    : style.size;

  return (
    <article className="grid gap-7 border-t border-[#38322C]/12 py-9 transition-colors duration-300 hover:border-[#876856]/45 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
      <div>
        <p
          className="max-w-[52rem] break-words text-[#38322C]"
          style={{
            fontSize: previewSize,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            fontWeight: style.weight.includes('Bold') ? 700 : 400,
            textTransform: style.transform,
          }}
        >
          {style.preview}
        </p>
        <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-[1.62] text-[#635C54]">{style.usage}</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[0.82rem] text-[#635C54] sm:grid-cols-4 lg:grid-cols-2">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#876856]">Style</p>
            <p className="mt-1 text-[#38322C]">{style.name}</p>
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#876856]">Size</p>
            <p className="mt-1 text-[#38322C]">{style.size}</p>
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#876856]">Leading</p>
            <p className="mt-1 text-[#38322C]">{style.lineHeight}</p>
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#876856]">Tracking</p>
            <p className="mt-1 text-[#38322C]">{style.letterSpacing}</p>
          </div>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#876856]">Weight</p>
            <p className="mt-1 text-[#38322C]">{style.weight}</p>
          </div>
        </div>
        <CopyButton value={css} />
      </div>
    </article>
  );
}

export function ObliqTypographySystemPage() {
  const [activeBreakpointId, setActiveBreakpointId] = useState<BreakpointId>('desktop');
  const activeBreakpoint = useMemo(
    () => breakpoints.find((breakpoint) => breakpoint.id === activeBreakpointId) ?? breakpoints[0],
    [activeBreakpointId],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F2EEEC] text-[#38322C]">
      <SiteHeader />

      <main className="overflow-x-hidden bg-[#F2EEEC]">
        <section className="relative border-b border-[#38322C]/10">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.36fr)] lg:px-10 lg:pb-28 lg:pt-48">
            <motion.div
              initial={{ opacity: 0, y: 32, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={revealTransition}
              className="max-w-[58rem]"
              style={{ maxWidth: 'min(58rem, calc(100vw - 2.5rem))' }}
            >
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#876856]">OBLIQ. Brand Guide</p>
              <h1 className="mt-7 max-w-full text-[3.08rem] font-normal leading-[0.94] tracking-[-0.05em] text-[#38322C] min-[390px]:text-[3.32rem] sm:text-[5.8rem] sm:leading-[0.92] sm:tracking-[-0.055em] lg:text-[7.4rem]">
                <span className="block">OBLIQ.</span>
                <span className="block">Typography</span>
                <span className="block">System</span>
              </h1>
              <p
                className="mt-8 text-[1.12rem] leading-[1.48] tracking-[-0.015em] text-[#635C54] sm:text-[1.55rem] sm:leading-[1.44]"
                style={{ maxWidth: '31ch' }}
              >
                Responsive type scale, hierarchy and editorial rhythm
              </p>
              <p
                className="mt-8 text-[1rem] leading-[1.7] text-[#635C54] sm:text-[1.08rem]"
                style={{ maxWidth: 'clamp(30ch, 42vw, 42rem)' }}
              >
                Типографската система на OBLIQ. използва Matt като основен шрифт и изгражда йерархия чрез контролирани пропорции, въздух и спокойна четимост. Целта е текстът да носи усещане за прецизност, доверие и премиум присъствие.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.12 }}
              className="self-end border-l border-[#38322C]/12 pl-6"
            >
              <p className="text-[5.5rem] font-normal leading-none tracking-[-0.06em] text-[#38322C]">1.618</p>
              <p className="mt-4 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#876856]">Golden ratio basis</p>
              <p className="mt-3 text-[0.92rem] leading-[1.6] text-[#635C54]">Оптична система за мащаб, ритъм и responsive баланс.</p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#38322C]/10 bg-[#F2EEEC]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-10 lg:py-28">
            <SectionIntro
              eyebrow="Font Overview"
              title="Matt as a quiet signature"
              body="Regular е основното начертание за заглавия, параграфи и описателни текстове. Bold се използва пестеливо - за CTA, навигация, labels и малки акценти. Не използвай прекомерно Bold, защото OBLIQ. трябва да запази спокойно, премиум и ненатрапчиво усещане."
            />

            <div className="space-y-10">
              <div className="grid gap-4 border-y border-[#38322C]/12 py-6 sm:grid-cols-3">
                {[
                  ['Font family', 'Matt'],
                  ['Fallback', 'sans-serif'],
                  ['Weights', 'Regular / Bold'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#876856]">{label}</p>
                    <p className="mt-2 text-[1.45rem] leading-tight tracking-[-0.025em] text-[#38322C]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#D8CDC0]/34 px-5 py-6 sm:px-8 sm:py-8">
                <p className="mb-5 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[#876856]">Sample block</p>
                <div className="space-y-4 overflow-hidden">
                  {fontSamples.map((sample) => (
                    <p key={sample} className="break-words text-[1.55rem] font-normal leading-[1.22] tracking-[-0.025em] text-[#38322C] sm:text-[2.2rem]">
                      {sample}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#38322C]/10 bg-[#E8E0D8]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.44fr_1fr] lg:px-10 lg:py-28">
            <SectionIntro
              eyebrow="Golden Ratio"
              title="Proportion with optical restraint"
              body="Златното сечение 1.618 се използва като основа за типографската йерархия. Всеки следващ размер може да бъде изведен чрез умножение или деление по 1.618. В уеб среда стойностите са леко оптически коригирани, за да работят по-добре при responsive layout, различна дължина на текстовете и четимост на малки екрани."
            />

            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#38322C]/12 bg-[#F2EEEC]/58 p-6">
                  <p className="font-mono text-[0.95rem] leading-relaxed text-[#38322C]">Base size × 1.618 = next larger size</p>
                </div>
                <div className="border border-[#38322C]/12 bg-[#F2EEEC]/58 p-6">
                  <p className="font-mono text-[0.95rem] leading-relaxed text-[#38322C]">Base size ÷ 1.618 = next smaller size</p>
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-x-5 gap-y-4 border-y border-[#38322C]/12 py-8">
                {['16', '26', '42', '68', '110'].map((value, index) => (
                  <div key={value} className="flex items-end gap-5">
                    <span
                      className="font-normal leading-none tracking-[-0.05em] text-[#38322C]"
                      style={{ fontSize: `${1.2 + index * 0.72}rem` }}
                    >
                      {value}
                    </span>
                    {index < 4 ? <span className="pb-1 text-[#876856]/70">→</span> : null}
                  </div>
                ))}
              </div>

              <p className="max-w-[42rem] text-[1rem] leading-[1.65] text-[#635C54]">
                Golden ratio е основа, не ограничение. При реален UI стойностите се коригират оптически, за да се запази баланс между бранд усещане и четимост.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F2EEEC]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.44fr_1fr]">
              <SectionIntro
                eyebrow="Responsive Preview"
                title="One voice across every viewport"
                body="Избери breakpoint, за да видиш визуалния размер, ритъм, tracking и готов CSS за всеки текстов стил."
              />

              <div>
                <div className="flex flex-wrap gap-2 border-b border-[#38322C]/12 pb-5">
                  {breakpoints.map((breakpoint) => (
                    <button
                      key={breakpoint.id}
                      type="button"
                      onClick={() => setActiveBreakpointId(breakpoint.id)}
                      className={cn(
                        'min-h-12 border px-4 text-left transition-[background-color,color,border-color] duration-300',
                        activeBreakpoint.id === breakpoint.id
                          ? 'border-[#38322C] bg-[#38322C] text-[#F2EEEC]'
                          : 'border-[#38322C]/14 text-[#38322C] hover:border-[#876856]/55 hover:bg-[#D8CDC0]/28',
                      )}
                    >
                      <span className="block text-[0.72rem] font-bold uppercase tracking-[0.16em]">{breakpoint.label}</span>
                      <span className="mt-1 block text-[0.72rem] opacity-75">{breakpoint.range}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#876856]">
                    {activeBreakpoint.label} / {activeBreakpoint.range}
                  </p>
                  <div className="mt-4">
                    {activeBreakpoint.styles.map((style) => (
                      <TypeStyleRow key={`${activeBreakpoint.id}-${style.id}`} style={style} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#38322C]/10 bg-[#D8CDC0]/34">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.44fr_1fr] lg:px-10 lg:py-28">
            <SectionIntro
              eyebrow="CSS Tokens"
              title="CSS Typography Tokens"
              body="Основни tokens за директна употреба и бъдещо разширяване на типографската система в целия сайт."
            />

            <div>
              <div className="border border-[#38322C]/12 bg-[#F2EEEC]">
                <div className="flex items-center justify-between gap-4 border-b border-[#38322C]/10 px-5 py-4">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#876856]">:root tokens</p>
                  <CopyButton value={cssTokens} label="Copy Tokens" />
                </div>
                <pre className="overflow-x-auto p-5 text-[0.82rem] leading-[1.7] text-[#38322C] sm:p-7">
                  <code>{cssTokens}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ConsultationFooter />
    </div>
  );
}
