import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    seePhoto: (_, { id }) => { return null },
  }
}

export default resolvers;