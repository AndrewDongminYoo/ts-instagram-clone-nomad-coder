import client from "../../client";
import bcrypt from "bcrypt";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    createAccount: async (_: any, {
      firstName, lastName, username, email, password
    }: {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    }) => {
      try {// check if user exists or username is taken
        const existUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }]
          }
        })
        if (existUser) throw new Error("Username or email already exists");
        // check hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // save user to db and return user
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          }
        })
      } catch (e: any) {
        return e.message;
      }
    },
  }
};