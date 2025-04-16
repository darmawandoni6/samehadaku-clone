import { ReactNode, Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
