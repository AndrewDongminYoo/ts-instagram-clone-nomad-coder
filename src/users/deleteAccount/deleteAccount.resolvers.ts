import client from "../../client";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

// A map of functions which return data for the schema.
export default {
  Mutation: {
    deleteAccount: (_: any, { token }: {
      token: string;
    }) => {

      try {
        // check if user exists
        jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {
          if (err) throw new Error("Invalid token");
          // save user to db and return user
          const deleted = await client.user.delete({
            where: {
              id: decoded.id
            }
          })
          if (deleted.id) {
            return {
              ok: true,
            }
          } else {
            return {
              ok: false,
              error: "Could not delete user"
            }
          }
        });
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    }
  }
};