import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, {
      firstName, lastName, username, email, password
    }, { client }) => {
      try {
        // check if user exists or username is taken
        const existUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }]
          }
        })
        if (existUser) throw new Error("Username or email already exists");
        // check hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // save user to db and return user
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          }
        })
        return {
          ok: true,
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    },
  }
};

export default resolvers;