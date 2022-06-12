import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: async (_, { id }, { client }) => {
      try {
        return await client.photo.findUnique({
          where: { id }
        })
      } catch (e: any) {
        return null;
      }
    },
  }
}

export default resolvers;