import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhoto: async (_, { keyword }, { client }) => {
      try {
        if (keyword.length < 3) throw new Error("Keyword too short");
        return await client.photo.findMany({
          where: {
            caption: {
              contains: keyword
            }
          }
        });
      } catch (e: any) {
        return [];
      }
    },
  }
}

export default resolvers;