import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../util/mongodb";
import User from "../../../models/User";
import dbConnect from "@/util/dbConnect";
import { signIn } from "next-auth/react";
import bcrypt from "bcryptjs";

dbConnect();
export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found!");
        } else if (user) {
          return signInUser({ user, password });
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
  database: process.env.MONGODB_URI,
  secret: "secret",
};

const signInUser = async ({ user, password }) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect Password");
  }
  return user;
};

export default NextAuth(authOptions);
