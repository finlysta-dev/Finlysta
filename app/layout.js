// app/layout.js
import SchemaScript from './components/SchemaScript';

export const metadata = {
  title: "Entry Level Financial Analyst Jobs & Internships | Finlysta",
  description: "Find entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free for students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* ✅ Favicon - using local files in app folder */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        
        {/* Optional: PWA manifest */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <SchemaScript />
        {children}
      </body>
    </html>
  );
}