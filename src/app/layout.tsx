import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Developer Portfolio",
  description: "Modern frontend developer portfolio with project catalog and pricing"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="siteContent">{children}</div>
      </body>
    </html>
  );
}
