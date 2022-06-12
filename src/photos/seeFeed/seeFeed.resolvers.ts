import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFeed: ({ userId }) => { return null },
  }
}

export default resolvers;