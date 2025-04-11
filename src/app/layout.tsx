import "../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@beerpoint/lib/auth";
import AuthProvider from "@beerpoint/app/components/AuthProvider";

// Add metadata configuration
export const metadata = {
  title: "Hospodský systém",
  description: "Hospodský pokladní a účetní systém",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
