import mongoose from "mongoose";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helper/auth-utils";
import { ConnectMongoDB, findUser } from "../../../helper/db-utils";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        try {
          await ConnectMongoDB();
        } catch (error) {
          throw new Error("Failing connecting to user DB!");
        }

        const exitingUser = await findUser(credentials.email);
        if (!exitingUser) {
          mongoose.connection.close();
          throw new Error("No user founded!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          exitingUser.password
        );

        if (!isValid) {
          mongoose.connection.close();
          throw new Error("Password is invalid, authentication fail!");
        }

        mongoose.connection.close();
        return { email: exitingUser.email };
      },
    }),
  ],
});
