import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id }) => { return null },
  }
}

export default resolvers;