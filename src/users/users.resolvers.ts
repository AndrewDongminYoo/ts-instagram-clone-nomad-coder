import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    isFollowing: async (
      { id }: { id: number; },
      _,
      { client }
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
      _,
      { activeUser }
    ) => {
      console.log(`${id} === ${activeUser}`);
      if (!activeUser) return false
      return activeUser.id === id;
    },
    totalFollowing: async (
      { id }: { id: number; },
      _,
      { client }
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
      { id }: { id: number; },
      _,
      { client }
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
    photos: async ({ id }, { page }, { client }) => {
      if (!page) page = 5;
      return await client.user.findUnique({
        where: { id }
      }).photos({ take: page })
    },
    totalPhotos: async ({ id }, _, { client }) => {
      return await client.photo.count({
        where: { userId: id }
      });
    }
  }
}

export default resolvers;