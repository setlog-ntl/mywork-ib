'use client';

import type { ServiceItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';
import { AnimatedReveal } from './animated-reveal';

interface Props {
  services: ServiceItem[];
}

export function ServicesSection({ services }: Props) {
  const { locale, t } = useLocale();

  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 bg-gray-50/60 dark:bg-[#1a1a1a]/60">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5b13ec] mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('services.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-lg leading-relaxed">
            {t('services.desc')}
          </p>
        </AnimatedReveal>

        <div className="service-table">
          {services.map((service, i) => {
            const title = locale === 'en' && service.titleEn ? service.titleEn : service.title;
            const desc = locale === 'en' && service.descEn ? service.descEn : service.desc;
            const price = locale === 'en' && service.priceEn ? service.priceEn : service.price;
            return (
              <AnimatedReveal key={i} delay={i * 80}>
                <div className="service-row group hover-glow">
                  <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#5b13ec] transition-colors duration-200 mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                  {price && <span className="service-price">{price}</span>}
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
