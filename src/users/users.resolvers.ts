import { User } from "@prisma/client";
import client from "../client"

export default {
  User: {
    isFollowing: async (
      { id }: { id: number; },
    ) => {
      let exists = await client.user.count({
        where: {
          following: {
            some: {
              id
            }
          }
        }
      });
      return exists > 0;
    },
    isMyAccount: async (
      { id }: { id: number; },
      _: any,
      { activeUser }: { activeUser: User | null }
    ) => {
      console.log(`${id} === ${activeUser}`);
      if (!activeUser) return false
      return activeUser.id === id;
    },
    totalFollowing: async (
      { id }: { id: number; }
    ) => {
      return await client.user.count({
        where: {
          followers: {
            some: {
              id,
            }
          }
        }
      })
    },
    totalFollowers: async (
      { id }: { id: number; }
    ) => {
      return await client.user.count({
        where: {
          following: {
            some: {
              id,
            }
          }
        }
      })
    },
  }
}