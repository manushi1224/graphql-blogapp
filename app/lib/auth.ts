import { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { GraphQLClient } from "graphql-request";
import { GetUserByEmail } from "@/services";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "",
      credentials: {},
      async authorize(credentials, req) {
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };

        const { user }: any = await GetUserByEmail(email);

        if (!user) {
          throw new Error("Account doesn't exists with this eamil.");
        }
        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,

  callbacks: {
    async signIn({ user }: { user: any }) {
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        (token.email = user.email), (token.name = user.name);
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session = {
          ...session,
          user: {
            email: token.email,
            name: token.name,
            ...session.user,
          },
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};
