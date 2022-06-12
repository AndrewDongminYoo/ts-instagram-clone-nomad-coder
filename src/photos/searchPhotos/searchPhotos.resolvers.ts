import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhoto: async (_, { hashtag }, { client }) => {
      try {
        return await client.photo.findMany({
          where: {
            hashtags: {
              some: {
                hashtag,
              }
            }
          }
        })
      } catch (e: any) {
        return [];
      }
    },
  }
}

export default resolvers;