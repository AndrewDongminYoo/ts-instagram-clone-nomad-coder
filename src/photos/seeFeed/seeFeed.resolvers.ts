import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFeed: async (_, __, { client, activeUser, checkLogin }) => {
      try {
        let { id } = checkLogin(activeUser);
        return await client.photo.findMany({
          where: {
            OR: [
              { user: { followers: { some: { id } }, } },
              { userId: id }
            ]
          },
          orderBy: {
            createdAt: "desc"
          }
        })
      } catch (e: any) {
        return null;
      }
    },
  }
}

export default resolvers;