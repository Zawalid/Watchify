import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const user = {
          email: credentials.email as string,
          password: credentials.password as string,
        };
        return user;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to signIn page
      return !!auth;
    },
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  pages: { signIn: "/signin" },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
