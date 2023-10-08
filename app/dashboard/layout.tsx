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
    </div>
  );
}
