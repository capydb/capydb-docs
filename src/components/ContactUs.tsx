import React from 'react';

interface ContactUsProps {
  // Optional variant to support both "Got question?" and "Got a question?" formats
  variant?: 'default' | 'with-a';
}

export default function ContactUs({ variant = 'default' }: ContactUsProps) {
  const questionText = variant === 'with-a' ? 'Got a question?' : 'Got question?';
  
  return (
    <h3>
      {questionText}{' '}
      <a 
        href="mailto:hello@capydb.com" 
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Email us
      </a>
    </h3>
  );
} 