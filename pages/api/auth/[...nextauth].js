import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

console.log(process.env.GOOGLE_ID)

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adaptor: MongoDBAdapter(clientPromise),
})
