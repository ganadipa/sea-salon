// @ts-nocheck
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authorize } from "@/actions/authorize";
import { AdapterUser } from "next-auth/adapters";

type UserWithRole = User & { role: string };

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: authorize,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
} satisfies NextAuthConfig;
