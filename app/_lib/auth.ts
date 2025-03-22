import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest } from "./data-service";
import { getGuest } from "./data-service";

declare module "next-auth" {
  interface Session {
    user: {
      guest_id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    guest_id?: string;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/account");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
      }
    },
    async signIn({ user }) {
      try {
        if (!user.email) return false;

        const existingGuest = await getGuest(user.email);

        if (!existingGuest && user.email && user.name) {
          await createGuest({ email: user.email, full_name: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guest_id = guest.id;
      return session;
    },
  },
});
