import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

import { auth } from '@lib/auth';
import { SessionProvider } from '@providers/session.provider';
import { ThemeProvider } from '@providers/theme.provider';
import { ToasterProvider } from '@providers/toast.provider';

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
    'Streamline your invoicing process with ease. Create, send, and manage invoices in seconds with our user-friendly app.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
            <ToasterProvider />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
