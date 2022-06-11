import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    followUser: async (_: any,
      { toFollow }: { toFollow: string; },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      try {
        // console.log("resolver", activeUser);
        let { id } = await protectResolver(activeUser);
        const checkUser = await client.user.findUnique({ where: { username: toFollow } });
        if (!checkUser) throw new Error("User does not exist");
        await client.user.update({
          where: {
            id,
          },
          data: {
            following: {
              connect: {
                username: toFollow
              }
            },
          }
        });
        return {
          ok: true,
          error: null
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message,
        }
      }
    },
  },
}