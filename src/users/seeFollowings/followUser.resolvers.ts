import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    seeFollowings: async (_: any,
      { username }: { username: string; },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {

    },
  },
}