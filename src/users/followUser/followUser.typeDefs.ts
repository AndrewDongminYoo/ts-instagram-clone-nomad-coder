import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type followUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(toFollow: String!): followUserResult!
  }
`;