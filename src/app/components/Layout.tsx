"use client";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

// Define props interface for the component
interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children }: LayoutProps) {
  // In App Router, we don't use Head component - page title should be set in layout.tsx or page.tsx metadata

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
