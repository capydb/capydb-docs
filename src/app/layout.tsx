import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ApiLanguageProvider } from '@/context/ApiLanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CapyDB Docs',
  description: 'The chillest AI-native database out there.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ApiLanguageProvider>
            {children}
            <ToastContainer 
              position="bottom-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ApiLanguageProvider>
        </LanguageProvider>
      </body>
    </html>
  );
} 