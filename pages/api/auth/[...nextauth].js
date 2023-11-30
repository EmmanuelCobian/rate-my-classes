import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "76159749ce1a1f0f817e",
      clientSecret: "62ae68ac62e5b68c4a851c10b0b9a7b9a72cba26",
    }),
  ],
}

export default NextAuth(authOptions)