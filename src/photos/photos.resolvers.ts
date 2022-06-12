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
      return await client.like.findMany({
        where: { photoId: id }
      })
    }
  }
}

export default resolvers;