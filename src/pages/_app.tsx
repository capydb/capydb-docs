import { LanguageProvider } from '../context/LanguageContext';
import type { AppProps } from 'next/app';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
