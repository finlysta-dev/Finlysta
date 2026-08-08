import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function InternalTrafficLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}