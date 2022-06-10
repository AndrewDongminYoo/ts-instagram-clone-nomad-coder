import { gql } from "apollo-server-express";

// The GraphQL schema
export default gql`
  type seeProfileResult {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(
      username: String!
    ): seeProfileResult
  }
`;