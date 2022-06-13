import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client, checkLogin, activeUser }) => {
      try {
        checkLogin(activeUser);
        let likes = await client.like.findMany({
          where: {
            photoId: id,
          },
          select: {
            user: true
          }
        })
        console.log(likes);
        return likes.map(like => like.user);
      } catch (e: any) {
        return [];
      }
    }
  }
}

export default resolvers;