import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type seeFollowingsResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    seeFollowings(username: String!): seeFollowingsResult!
  }
`;