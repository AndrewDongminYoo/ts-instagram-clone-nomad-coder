import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

// A map of functions which return data for the schema.
export default {
  Mutation: {
    signinUser: async (_: any, { username, password }: { username: string; password: string; }) => {
      try {
        // check if user exists
        const user = await client.user.findFirst({
          where: {
            username
          }
        })
        if (!user) throw new Error("Username or email does not exist");
        // check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Password is incorrect");
        // create token
        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: user.email,
        }, SECRET_KEY, { expiresIn: "1h" });
        // return user
        return {
          ok: true,
          token,
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