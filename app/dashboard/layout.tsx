import DashboardHeader from "@/components/Header";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"h-screen"}>
      <DashboardHeader />
      {children}
      <p className="sticky bottom-4 right-4 bg-accent/80 p-2 rounded-md cursor-none max-w-[200px] text-center">
        Work in Progress
      </p>
    </div>
  );
}
