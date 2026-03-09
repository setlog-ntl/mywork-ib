'use client';

import { useState, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import type { PortfolioItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';
import { AnimatedReveal } from './animated-reveal';

interface Props {
  portfolio: PortfolioItem[];
  columns?: '2' | '3' | '4';
}

const colClass: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

export function PortfolioSection({ portfolio, columns = '3' }: Props) {
  const { locale, t } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [lightboxItem, setLightboxItem] = useState<{ src: string; alt: string; desc: string } | null>(null);

  const allCats = ['all', ...Array.from(new Set(
    portfolio.map((p) => (locale === 'en' && p.categoryEn ? p.categoryEn : p.category))
  ))];
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? portfolio
    : portfolio.filter((p) => {
        const cat = locale === 'en' && p.categoryEn ? p.categoryEn : p.category;
        return cat === activeCategory;
      });

  const openLightbox = useCallback((src: string, alt: string, desc: string) => {
    setLightboxItem({ src, alt, desc });
    dialogRef.current?.showModal();
  }, []);

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
    setLightboxItem(null);
  }, []);

  if (!portfolio || portfolio.length === 0) return null;

  const gridCols = colClass[columns] ?? colClass['3'];

  return (
    <section id="portfolio" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedReveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5b13ec] mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('portfolio.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
            {t('portfolio.desc')}
          </p>
        </AnimatedReveal>

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#5b13ec] text-white'
                  : 'text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-[#5b13ec] hover:text-[#5b13ec]'
              }`}
            >
              {cat === 'all' ? t('portfolio.all') : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div key={activeCategory} className={`grid ${gridCols} gap-6`}>
          {filtered.map((item, i) => {
            const title = locale === 'en' && item.titleEn ? item.titleEn : item.title;
            const desc = locale === 'en' && item.descEn ? item.descEn : (item.desc ?? '');
            const category = locale === 'en' && item.categoryEn ? item.categoryEn : item.category;
            return (
              <AnimatedReveal key={i} delay={i * 60} variant="scale">
                <div
                  className="portfolio-card"
                  onClick={() => openLightbox(item.imageUrl, title, desc)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(item.imageUrl, title, desc); }}
                  aria-label={`${title} 상세보기`}
                >
                  <img
                    src={item.imageUrl}
                    alt={title}
                    loading="lazy"
                  />
                  <div className="portfolio-overlay">
                    <span className="portfolio-tag">{category}</span>
                    <h3>{title}</h3>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        className="lightbox"
        onClick={(e) => { if (e.target === dialogRef.current) closeLightbox(); }}
        onKeyDown={(e) => { if (e.key === 'Escape') closeLightbox(); }}
      >
        {lightboxItem && (
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={lightboxItem.src}
              alt={lightboxItem.alt}
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
              <h3 className="text-white font-semibold">{lightboxItem.alt}</h3>
              {lightboxItem.desc && (
                <p className="text-gray-300 text-sm mt-1">{lightboxItem.desc}</p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
