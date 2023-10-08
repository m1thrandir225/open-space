import "./globals.css";
import type {Metadata} from "next";
import {ThemeProvider} from "@/components/theme-provider";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Open Space - Marketplace",
  description: "Open Space Marketplace, Open Source",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (

    <html lang="en" style={{ scrollBehavior: "smooth"}} suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
