'use client';

import { ArrowDown } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';
import { RotatingText } from './rotating-text';

interface Props {
  config: SiteConfig;
}

export function HeroSection({ config }: Props) {
  const { locale, t } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const title = locale === 'en' && config.titleEn ? config.titleEn : config.title;
  const tagline = locale === 'en' && config.taglineEn ? config.taglineEn : config.tagline;

  const rotatingWords = config.rotatingWords && config.rotatingWords.length > 0
    ? config.rotatingWords
    : ['Brand Identity', 'Packaging', 'Social Media', 'Web Design'];

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, color-mix(in oklch, var(--color-primary, #5b13ec) 15%, transparent) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center max-w-3xl animate-fade-up">
        {/* Avatar */}
        {config.avatarUrl && (
          <div className="relative inline-block mb-8">
            <img
              src={config.avatarUrl}
              alt={name}
              className="w-28 h-28 rounded-2xl object-cover ring-2 ring-[#5b13ec]/30 mx-auto"
            />
          </div>
        )}

        {/* Name — small uppercase label */}
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 animate-fade-up">
          {name}
        </p>

        {/* Title — large gradient headline */}
        <h1
          className="font-extrabold leading-[1.1] mb-6 bg-gradient-to-r from-[#5b13ec] to-[#06b6d4] bg-clip-text text-transparent animate-fade-up-d1"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {title || name}
        </h1>

        {/* Tagline */}
        <p
          className="text-gray-500 dark:text-gray-400 mb-6 mx-auto animate-fade-up-d1"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '560px', lineHeight: '1.7' }}
        >
          {tagline}
        </p>

        {/* Rotating words */}
        <div
          className="rotating-text-wrapper mb-10 animate-fade-up-d2"
          aria-live="polite"
        >
          <RotatingText
            words={rotatingWords}
            className="text-lg font-semibold text-[#06b6d4] whitespace-nowrap"
          />
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#5b13ec] to-[#06b6d4] text-white text-base font-semibold hover:opacity-90 transition-opacity animate-fade-up-d2 btn-press"
        >
          {t('hero.cta')}
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.75rem] tracking-[0.15em] text-gray-400"
        style={{ animation: 'float 2s ease-in-out infinite' }}
      >
        SCROLL
        <span className="block w-px h-8 bg-gray-300 dark:bg-gray-700" />
      </div>
    </section>
  );
}
