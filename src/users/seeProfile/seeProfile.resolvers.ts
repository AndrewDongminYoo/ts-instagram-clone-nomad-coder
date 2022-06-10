import { User } from "@prisma/client";
import { UserInputError } from "apollo-server";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    seeProfile: async (_: any,
      { username }: { username: string; },
      { activeUser }: { activeUser: User | null }
    ) => {
      try {
        if (!activeUser)
          throw new UserInputError("You must be logged in.");
        return await client.user.findUnique({
          where: {
            username
          }
        })
      } catch {
        return null;
      }
    },
  },
}