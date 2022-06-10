import client from "../../client";
import { ExecutionArgs } from "graphql";
import { User } from "@prisma/client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    deleteAccount: async (
      _: any,
      args: ExecutionArgs,
      { activeUser }: { activeUser: User | null }
    ) => {
      try {
        // check if user exists
        if (!activeUser) throw new Error("You must be logged in.");
        // save user to db and return user
        const deleted = await client.user.delete({
          where: {
            id: activeUser.id
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