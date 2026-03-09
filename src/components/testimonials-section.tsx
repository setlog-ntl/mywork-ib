'use client';

import type { TestimonialItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';
import { AnimatedReveal } from './animated-reveal';

interface Props {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: Props) {
  const { locale, t } = useLocale();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 bg-gray-50/60 dark:bg-[#1a1a1a]/60">
      <div className="max-w-5xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5b13ec] mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-lg leading-relaxed">
            {t('testimonials.desc')}
          </p>
        </AnimatedReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, i) => {
            const author = locale === 'en' && item.authorEn ? item.authorEn : item.author;
            const role = locale === 'en' && item.roleEn ? item.roleEn : item.role;
            const company = locale === 'en' && item.companyEn ? item.companyEn : item.company;
            const content = locale === 'en' && item.contentEn ? item.contentEn : item.content;
            const rating = Math.min(5, Math.max(1, item.rating));
            // 이름 첫 글자 (아바타 이니셜)
            const initial = author ? author.charAt(0) : '?';
            return (
              <AnimatedReveal key={i} delay={i * 120}>
                <div className="testimonial-card">
                  {/* 본문 */}
                  <p className="testimonial-body">{content}</p>

                  {/* 별점 */}
                  <div className="flex gap-0.5 mb-4" aria-label={`별점 ${rating}점`}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`text-base ${j < rating ? 'text-[#f59e0b]' : 'text-gray-300 dark:text-gray-600'}`}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* 작성자 */}
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" aria-hidden="true">{initial}</div>
                    <div>
                      <strong className="block text-[0.9375rem] font-bold text-gray-900 dark:text-gray-100">
                        {author}
                      </strong>
                      <span className="text-[0.8125rem] text-gray-500 dark:text-gray-400">
                        {role}{role && company ? ' · ' : ''}{company}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
