import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhoto: (_, { hashtag }) => { return [] },
  }
}

export default resolvers;