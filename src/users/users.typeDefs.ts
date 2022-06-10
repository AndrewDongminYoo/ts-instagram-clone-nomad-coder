import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    seeProfileId(id: Int!): User
    seeProfile(username: String!): User
  }
`;