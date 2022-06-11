import { User } from "@prisma/client";
import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    unfollowUser: async (_: any,
      { toUnfollow }: { toUnfollow: string; },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      try {
        // console.log("resolver", activeUser);
        let { id } = await protectResolver(activeUser);
        const checkUser = await client.user.findUnique({ where: { username: toUnfollow }, select: { id: true } });
        if (!checkUser) throw new Error("User does not exist");
        if (checkUser.id === id) throw new Error("You cannot unfollow yourself");
        await client.user.update({
          where: {
            id,
          },
          data: {
            following: {
              disconnect: {
                username: toUnfollow
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