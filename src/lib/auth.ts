import NextAuth, { AuthError } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { findOrCreateUser, getUser, getUserFullName } from './api';

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials provided');
        const { data: user, error } = await getUser(credentials?.email as string, credentials?.password as string);
        if (error) throw new AuthError(error.message);
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
      return !!auth;
    },
    async jwt({ token, account, profile, trigger, user }) {
      if (account?.provider === 'google') {
        const { data, error } = await findOrCreateUser({
          email: profile?.email as string,
          full_name: profile?.name as string,
          image: profile?.picture as string,
          password: 'defaultPassword',
        });
        console.log(data, error);
      }
      return token;
    },
    async session({ session }) {
      const fullName = await getUserFullName(session.user.email);
      if (!session.user.name) session.user.name = fullName;
      return session;
    },
  },
  pages: { signIn: '/signin' },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
