"use client";
import QueryProvider from "@/context/QueryContext";
import {ThemeProvider} from "@/context/ThemeContext";
import React from "react";

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
