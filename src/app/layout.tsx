import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ApiLanguageProvider } from '@/context/ApiLanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const ibmPlexSans = IBM_Plex_Sans({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang="en" className="light">
      <body className={ibmPlexSans.className}>
        <ThemeProvider>
          <LanguageProvider>
            <ApiLanguageProvider>
              <div className="flex min-h-screen content-bg">
                {/* Sidebar - Now extracted to its own component with memoization */}
                <Sidebar />
                
                {/* Main content area */}
                <div className="flex-1 ml-56">
                  {/* Navbar - Also extracted and memoized */}
                  <Navbar />
                  
                  {/* Content */}
                  <div className="max-w-[1400px] mx-auto px-6 pt-2 pb-8">
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
        </ThemeProvider>
      </body>
    </html>
  );
} 