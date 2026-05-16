import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'SourceTradesman — Find Trusted Tradespeople in Sri Lanka',
  description: 'Connect with verified electricians, plumbers, carpenters & more across Sri Lanka. Post jobs and get quotes fast.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ErrorBoundary>
          <LanguageProvider>
            <AuthProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(124,58,237,0.15)',
                  },
                  success: {
                    iconTheme: { primary: '#7c3aed', secondary: '#fff' },
                  },
                }}
              />
              {children}
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}