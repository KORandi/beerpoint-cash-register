import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";

// Define props interface for the component
interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({
  children,
  title = "Hospodský systém",
}: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Hospodský pokladní a účetní systém" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
