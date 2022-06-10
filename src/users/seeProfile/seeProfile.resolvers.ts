import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    seeProfile: async (_: any,
      { username }: { username: string; },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      try {
        protectResolver(activeUser);
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