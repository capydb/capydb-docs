import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ApiLanguageProvider } from '@/context/ApiLanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

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
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
              {/* Sidebar - Now extracted to its own component with memoization */}
              <Sidebar />
              
              {/* Main content area */}
              <div className="flex-1 ml-72">
                {/* Navbar - Also extracted and memoized */}
                <Navbar />
                
                {/* Content */}
                <div className="max-w-[1200px] mx-auto px-6 py-8">
                  {children}
                </div>
              </div>
            </div>
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