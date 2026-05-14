import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Mini Service Board',
  description: 'Post and browse home service requests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <LanguageProvider>
            <AuthProvider>
              <Toaster position="top-right" />
              {children}
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
