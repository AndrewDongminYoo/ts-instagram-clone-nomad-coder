import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type Mutation {
    createAccount(firstName: String!, lastName: String, username: String!, email: String!, password: String!): User
  }
`;