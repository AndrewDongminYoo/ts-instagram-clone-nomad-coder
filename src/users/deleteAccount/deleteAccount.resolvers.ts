import { User } from "@prisma/client";
import { Resolvers } from "../../types";

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Mutation: {
    deleteAccount: async (
      _,
      { username },
      { activeUser, protectResolver, client }
    ) => {
      try {
        // check if user exists
        let user = protectResolver(activeUser);
        // save user to db and return user
        if (user.username !== username)
          throw new Error("You can only delete your own account.");
        const deleted = await client.user.delete({
          where: {
            username,
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
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    }
  }
};

export default resolvers;