import type { Metadata } from 'next';
import { Roboto, Roboto_Serif } from 'next/font/google';

import './globals.css';

import Footer from '@components/common/Footer';

const roboto = Roboto({
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'QuickBill',
  description:
    'Streamline your invoicing process with ease. Create, send, and manage invoices in seconds with our user-friendly app. ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
