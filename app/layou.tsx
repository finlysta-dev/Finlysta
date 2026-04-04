import "./globals.css";
import Providers from "./providers";
import BanWatcher from "@/components/BanWatcher";
import { NotificationProvider } from "@/context/NotificationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NotificationProvider>
            <BanWatcher />
            {children}
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}