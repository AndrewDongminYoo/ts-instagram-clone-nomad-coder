import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    seeFollowings: async (_: any,
      { username, page }: {
        username: string;
        page: number;
      },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      const followings = await client.user.findUnique({ where: { username } }).following();
      return followings;
    },
  },
}