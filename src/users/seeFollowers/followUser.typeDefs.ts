import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type seeFollowersResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    seeFollowers(username: String!): seeFollowersResult!
  }
`;