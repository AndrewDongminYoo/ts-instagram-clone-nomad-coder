import { User } from "@prisma/client";
import client from "../../client";

// take means how many items to take from the database
const take = 5;

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
      try {
        protectResolver(activeUser);
        const existUser = await client.user.findUnique({
          where: { username }, select: { id: true }
        })
        if (!existUser) throw new Error("User does not exist");
        const followers = await client.user.findUnique({
          where: {
            username
          }
        }).followers({
          take,
          skip: take * (page - 1),
        });
        const countFollowers = await client.user.count({
          where: {
            following: {
              some: {
                username
              }
            }
          }
        })
        const totalPages = Math.ceil(countFollowers / take)
        return {
          ok: true,
          followers,
          totalPages
        };
      } catch (e: any) {
        return {
          ok: false,
          error: e.message,
        }
      }
    },
  },
}