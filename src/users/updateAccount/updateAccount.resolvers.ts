import client from "../../client";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    updateAccount: async (
      _: any,
      {
        firstName,
        lastName,
        username,
        email,
        password
      }: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
      },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      try {
        let { id } = protectResolver(activeUser);
        // check if user exists or username is taken
        const existUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }]
          }
        })
        if (existUser) throw new Error("Username or email already exists.");
        // check hash password
        let hashedPassword = undefined;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
        }
        // save user to db and return user
        let updated = await client.user.update({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          },
          where: {
            id
          }
        })
        if (updated.id) {
          return {
            ok: true,
          }
        } else {
          return {
            ok: false,
            error: "Could not update user"
          }
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    }
  },
}