'use client'
import { useLanguage } from '../context/LanguageContext';
import { ReactNode } from 'react';

interface LanguageContentProps {
  children: ReactNode;
  lang: 'python' | 'javascript';
}

export default function LanguageContent({ children, lang }: LanguageContentProps) {
  const { language } = useLanguage();

  if (language !== lang) {
    return null;
  }

  return <>{children}</>;
}
