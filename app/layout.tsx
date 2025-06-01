import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MAGLEV TECH AFRIKA - Madaraka Day 2025',
  description: 'Celebrating 62 Years of Kenyan Independence and the Future of Smart Cities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}