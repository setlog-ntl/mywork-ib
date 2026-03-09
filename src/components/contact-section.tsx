'use client';

import type { ReactNode } from 'react';
import { Mail, Instagram, Linkedin, Twitter, Youtube, Github } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';
import { AnimatedReveal } from './animated-reveal';

interface Props {
  config: SiteConfig;
}

const PLATFORM_ICONS: Record<string, ReactNode> = {
  instagram: <Instagram className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
  github: <Github className="w-4 h-4" />,
  // behance, dribbble: lucide-react에 없으므로 아이콘 없이 텍스트만
};

export function ContactSection({ config }: Props) {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5b13ec] mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
            {t('contact.desc')}
          </p>
        </AnimatedReveal>

        {config.email && (
          <AnimatedReveal delay={150}>
            <a
              href={`mailto:${config.email}`}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#5b13ec] to-[#06b6d4] text-white text-base font-semibold hover:opacity-90 transition-opacity btn-press mb-8"
            >
              <Mail className="w-5 h-5" />
              {config.email}
            </a>
          </AnimatedReveal>
        )}

        {config.socials && config.socials.length > 0 && (
          <AnimatedReveal delay={250}>
            <div className="flex items-center justify-center gap-3 flex-wrap mt-2">
              {config.socials.map((social, i) => {
                const icon = PLATFORM_ICONS[social.platform.toLowerCase()];
                const label = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={label}
                  >
                    {icon}
                    <span className="capitalize">{label}</span>
                  </a>
                );
              })}
            </div>
          </AnimatedReveal>
        )}
      </div>
    </section>
  );
}
