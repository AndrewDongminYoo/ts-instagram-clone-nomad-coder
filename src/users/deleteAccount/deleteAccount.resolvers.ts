import client from "../../client";
import { ExecutionArgs } from "graphql";
import { User } from "@prisma/client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    deleteAccount: async (
      _: any,
      { username }: { username: string; },
      { activeUser }: { activeUser: User | null }
    ) => {
      try {
        // check if user exists
        if (!activeUser) throw new Error("You must be logged in.");
        // save user to db and return user
        if (activeUser.username !== username)
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