import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth-password";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        await dbConnect();

        const dbUser = await User.findOne({ username: credentials.username });

        if (!dbUser) {
          throw new Error("Account does not exist!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          dbUser.password
        );

        if (!isValid) {
          throw new Error("Invalid email or password!");
        }

        return {
          name: dbUser.username,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      if (session.user) {
        try {
          const userId = await User.findOne({ username: session.user.name });
          session.user.id = userId._id.toString();
        } catch (error) {
          console.log(error);
        }
      }
      return session;
    },
  },
});
