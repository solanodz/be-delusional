import { RequestInternal, Awaitable, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string>,
        req: RequestInternal
      ) {
        // Add logic here to look up the user from the credentials supplied

        if (!credentials.email || !credentials.password) {
          return null;
        }

        // check if user is in DB
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("user", user);

        if (!user) {
          return null;
        }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          permissions: user?.permissions,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: any;
      user: any;
      token: any;
    }) {
      console.log("session token", token);

      return {
        // Now all this info comes from the token, not the user
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
          role: token.role,
          permissions: token?.permissions,
        },
      };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      // after login -> jwt and get user data
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          permissions: user?.permissions,
        };
      }

      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
