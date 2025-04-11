import { compare, hash } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import dbConnect from "./database";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    role: string;
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Uživatelské jméno", type: "text" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        await dbConnect();

        // V reálném nasazení by zde byla kontrola proti databázi
        // Pro ukázku pevně nastavené přihlašovací údaje
        const validUsername = "admin";
        const validPassword = "hospoda123";

        if (
          credentials.username === validUsername &&
          credentials.password === validPassword
        ) {
          return {
            id: "1",
            name: "Administrátor",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dní
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
export { authOptions };
