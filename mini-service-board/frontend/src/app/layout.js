import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '../context/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'Mini Service Board',
  description: 'Post and browse home service requests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Toaster position="top-right" />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
