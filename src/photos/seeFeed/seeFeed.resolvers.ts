import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    seeFeed: ({ userId }) => { return null },
  }
}

export default resolvers;