import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    unlikePhoto: (_, { id }) => { return null }
  }
}

export default resolvers;