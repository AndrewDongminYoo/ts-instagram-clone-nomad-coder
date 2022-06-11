import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    seeProfile: async (_: any,
      { username }: { username: string; },
    ) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username
          }
        })
        console.log("see profile", user);
        return user;
      } catch {
        return null;
      }
    },
  },
}