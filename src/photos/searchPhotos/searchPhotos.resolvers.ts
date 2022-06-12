import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    searchPhoto: (_, { hashtag }) => { return [] },
  }
}

export default resolvers;