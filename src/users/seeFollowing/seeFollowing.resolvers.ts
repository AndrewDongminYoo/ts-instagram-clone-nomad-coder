import { User } from "@prisma/client";
import client from "../../client";

// take means how many items to take from the database
const take = 5;

// A map of functions which return data for the schema.
export default {
  Query: {
    seeFollowing: async (_: any,
      { username, last }: {
        username: string;
        last: number;
      },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      try {
        protectResolver(activeUser);
        const existUser = await client.user.findUnique({
          where: { username }, select: { id: true }
        })
        if (!existUser) throw new Error("User does not exist");
        const following = await client.user.findUnique({
          where: {
            username
          }
        }).following({
          take,
          skip: last ? 1 : 0,
          ...(last && { cursor: { id: last } }),
        });
        const countFollowing = await client.user.count({
          where: {
            followers: {
              some: {
                username,
              }
            }
          }
        })
        const totalPages = Math.ceil(countFollowing / take)
        return {
          ok: true,
          following,
          totalPages,
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