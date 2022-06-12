import { Resolvers } from "../../types";

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_,
      { username },
      { client }
    ) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username
          }
        })
        console.log("see profile", user);
        return user;
      } catch {
        return null;
      }
    },
  },
}

export default resolvers;