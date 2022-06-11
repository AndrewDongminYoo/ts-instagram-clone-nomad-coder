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
        // console.log("resolver", activeUser);
        protectResolver(activeUser);
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