import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'Mini Service Board',
  description: 'Post and browse home service requests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
