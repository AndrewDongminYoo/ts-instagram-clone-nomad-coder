import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type seeFollowingsResult {
    ok: Boolean!
    error: String
    followings: [User]
    totalPages: Int
  }

  type Query {
    seeFollowings(username: String!, page: Int!): seeFollowingsResult!
  }
`;