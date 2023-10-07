import "./globals.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Open Space - Marketplace",
  description: "Open Space Marketplace, Open Source",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
