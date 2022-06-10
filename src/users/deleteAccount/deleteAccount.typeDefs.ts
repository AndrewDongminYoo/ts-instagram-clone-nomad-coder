import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type Mutation {
    deleteUser(id: Int!): User
  }
`;