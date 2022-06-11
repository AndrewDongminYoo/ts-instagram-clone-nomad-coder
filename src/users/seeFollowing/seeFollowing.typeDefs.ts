import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type seeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }

  type Query {
    seeFollowing(username: String!, last: Int): seeFollowingResult!
  }
`;