import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client, checkLogin, activeUser }) => {
      try {
        checkLogin(activeUser);
        return await client.like.findMany({
          where: {
            photoId: id,
          },
          select: {
            user: {
              select: {
                username: true,
              }
            }
          }
        })
      } catch (e: any) {
        return [];
      }
    }
  }
}

export default resolvers;