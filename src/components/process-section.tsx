'use client';

import type { ProcessStep } from '@/lib/config';
import { useLocale } from '@/lib/i18n';
import { AnimatedReveal } from './animated-reveal';

interface Props {
  process: ProcessStep[];
}

export function ProcessSection({ process }: Props) {
  const { locale, t } = useLocale();

  if (!process || process.length === 0) return null;

  return (
    <section id="process" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5b13ec] mb-3 text-center">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
            {t('process.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-14 text-center max-w-lg mx-auto leading-relaxed">
            {t('process.desc')}
          </p>
        </AnimatedReveal>

        <div className="process-grid">
          {process.map((step, i) => {
            const title = locale === 'en' && step.titleEn ? step.titleEn : step.title;
            const desc = locale === 'en' && step.descEn ? step.descEn : step.desc;
            return (
              <AnimatedReveal key={i} delay={i * 100}>
                <div className="process-step">
                  <div className="process-num">{step.number}</div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[180px] mx-auto">
                    {desc}
                  </p>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
