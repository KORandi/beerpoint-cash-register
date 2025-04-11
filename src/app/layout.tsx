import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

interface MyAppProps extends AppProps {
  pageProps: {
    session?: Session;
    [key: string]: unknown;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { session, ...restPageProps } = pageProps;

  return (
    <SessionProvider session={session}>
      <Component {...restPageProps} />
    </SessionProvider>
  );
}

export default MyApp;
