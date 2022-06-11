import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type unfollowUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(toUnollow: String!): unfollowUserResult!
  }
`;