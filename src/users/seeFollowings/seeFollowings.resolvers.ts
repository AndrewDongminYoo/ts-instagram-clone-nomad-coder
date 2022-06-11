import { User } from "@prisma/client";
import client from "../../client";

// take means how many items to take from the database
const take = 5;

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
      try {
        protectResolver(activeUser);
        const existUser = await client.user.findUnique({
          where: { username }, select: { id: true }
        })
        if (!existUser) throw new Error("User does not exist");
        const followings = await client.user.findUnique({
          where: {
            username
          }
        }).following({
          take,
          skip: take * (page - 1),
        });
        const countFollowings = await client.user.count({
          where: {
            followers: {
              some: {
                username,
              }
            }
          }
        })
        const totalPages = Math.ceil(countFollowings / take)
        return {
          ok: true,
          followings,
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