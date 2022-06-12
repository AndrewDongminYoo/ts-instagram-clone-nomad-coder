import { User } from "@prisma/client";
import client from "../../client";
import { Resolvers } from "../../types";


// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: async (_,
      { toUnfollow },
      { activeUser, protectResolver }) => {
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

export default resolvers;