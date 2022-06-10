import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    signinUser(username: String!, password: String!): LoginResult!
  }
`;