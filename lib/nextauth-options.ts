import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {
  signInWithOauth,
  getUserByEmail,
  signInWithCredentials
} from "@/lib/actions/auth.actions"

export const nextauthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin", // app/signin
    error: "/error",   // app/error
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await signInWithCredentials({
          email: credentials.email,
          password: credentials.password
        })

        return user
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.type === "oauth" && profile) {
        return await signInWithOauth({ account, profile })
      }
      return true
    },

    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.name = session.name
      } else {
        if (token.email) {
          const user = await getUserByEmail({ email: token.email })
          token.name = user.name
          token._id = user._id
          token.role = user.email === process.env.ADMIN_EMAIL ? "admin" : user.role || "user"
          token.provider = user.provider
        }
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          _id: token._id,
          role: token.role,
          provider: token.provider
        }
      }
    }
  }
}
