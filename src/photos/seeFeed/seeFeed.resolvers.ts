import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFeed: async (_, { id }, { client }) => {
      try {
        return await client.photo.findMany({
          where: {
            userId: id
          }
        })
      } catch (e: any) {
        return null;
      }
    },
  }
}

export default resolvers;