import "./globals.css";
import type {Metadata} from "next";
import {ThemeProvider} from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Open Space - Marketplace",
  description: "Open Space Marketplace, Open Source",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
