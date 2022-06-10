import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type Mutation {
    deleteAccount(id: Int!): User
  }
`;