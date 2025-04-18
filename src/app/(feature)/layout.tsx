import { ReactNode, Suspense } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense>{children}</Suspense>
      <Footer />
    </div>
  );
}
