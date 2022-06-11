import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type seeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }

  type Query {
    seeFollowers(username: String!, page: Int!): seeFollowersResult!
  }
`;