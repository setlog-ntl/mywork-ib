'use client';

import { useSyncExternalStore } from 'react';

export type Locale = 'ko' | 'en';

const translations: Record<Locale, Record<string, string>> = {
  ko: {
    'nav.home': '홈',
    'nav.services': '서비스',
    'nav.portfolio': '포트폴리오',
    'nav.process': '진행 방식',
    'nav.contact': '연락하기',
    'hero.cta': '프로젝트 의뢰하기',
    'services.title': '제공 서비스',
    'services.desc': '각 프로젝트의 맥락과 목표에 맞춰 최적의 솔루션을 설계합니다.',
    'portfolio.title': '선택된 작업들',
    'portfolio.desc': '브랜드의 본질을 시각 언어로 번역한 프로젝트 모음입니다.',
    'portfolio.all': '전체',
    'testimonials.title': '클라이언트 후기',
    'testimonials.desc': '함께 일한 분들이 남긴 이야기입니다.',
    'process.title': '작업 프로세스',
    'process.desc': '체계적인 프로세스로 최상의 결과물을 만들어냅니다.',
    'contact.title': '함께 만들어요',
    'contact.desc': '새로운 프로젝트나 협업 제안은 언제든 환영합니다.',
    'contact.email': '이메일 보내기',
    'theme.light': '라이트 모드로 전환',
    'theme.dark': '다크 모드로 전환',
    'lang.switchLabel': 'Switch to English',
    'lang.toggle': 'EN',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'hero.cta': 'Start a Project',
    'services.title': 'Services',
    'services.desc': 'Tailored visual solutions designed to match your project context and goals.',
    'portfolio.title': 'Selected Works',
    'portfolio.desc': 'A collection of projects that translate brand essence into visual language.',
    'portfolio.all': 'All',
    'testimonials.title': 'Client Testimonials',
    'testimonials.desc': 'Stories from those I have had the pleasure of working with.',
    'process.title': 'How I Work',
    'process.desc': 'A systematic process to deliver the best results for every project.',
    'contact.title': "Let's Work Together",
    'contact.desc': 'Open to new projects and collaboration opportunities.',
    'contact.email': 'Send Email',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',
    'lang.switchLabel': '한국어로 전환',
    'lang.toggle': '한국어',
  },
};

let _locale: Locale = 'ko';
const _listeners = new Set<() => void>();
function subscribe(cb: () => void) { _listeners.add(cb); return () => { _listeners.delete(cb); }; }
function getSnapshot() { return _locale; }
function getServerSnapshot() { return 'ko' as Locale; }

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('locale');
  if (saved === 'ko' || saved === 'en') { _locale = saved; document.documentElement.lang = saved; }
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = (l: Locale) => {
    _locale = l;
    localStorage.setItem('locale', l);
    document.documentElement.lang = l;
    _listeners.forEach((cb) => cb());
  };
  const t = (key: string) => translations[locale]?.[key] ?? key;
  return { locale, setLocale, t };
}
