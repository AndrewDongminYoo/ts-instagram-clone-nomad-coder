import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    seeFollowers: async (_: any,
      { username, page }: {
        username: string;
        page: number;
      },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      const followers = await client.user.findUnique({ where: { username } }).followers();
      const followers2 = await client.user.findMany({
        where: {
          followers: {
            some: {
              username,
            }
          }
        }
      })
      return followers;
    },
  },
}