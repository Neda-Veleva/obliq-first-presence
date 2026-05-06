import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

type BrandLogoProps = {
  alt?: string;
  className?: string;
  inverted?: boolean;
};

export function BrandLogo({
  alt = 'Obliq',
  className,
  inverted = false,
}: BrandLogoProps) {
  if (inverted) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn('block aspect-[997/210]', className)}
        style={{
          backgroundColor: 'var(--brand-white)',
          WebkitMaskImage: "url('/logo.png')",
          maskImage: "url('/logo.png')",
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    );
  }

  return (
    <ImageWithFallback
      src="/logo.png"
      alt={alt}
      className={cn('h-auto w-full object-contain', className)}
    />
  );
}
