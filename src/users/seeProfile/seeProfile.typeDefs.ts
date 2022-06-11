import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type seeProfileResult {
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
  }

  type Query {
    seeProfile(
      username: String!
    ): seeProfileResult
  }
`;