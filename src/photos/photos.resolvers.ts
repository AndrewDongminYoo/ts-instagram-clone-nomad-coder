import client from "../client"
import { Resolvers } from "../types"

const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }) => {
      return await client.user.findUnique({
        where: { id: userId }
      })
    },
    hashtags: async ({ id }) => {
      return await client.hashtag.findMany({
        where: { photos: { some: { id } } }
      })
    },
    likes: async ({ id }) => {
      return await client.like.count({
        where: { photoId: id }
      })
    },
    didILiked: async ({ id }, _, { activeUser, client, checkLogin }) => {
      let user = checkLogin(activeUser);
      if (!user) return false;
      let like = client.like.findUnique({
        where: {
          userId_photoId: {
            userId: user.id,
            photoId: id,
          }
        }
      })
      return !!like;
    }
  }
}

export default resolvers;