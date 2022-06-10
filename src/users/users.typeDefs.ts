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

  type LoginResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createUser(firstName: String!, lastName: String, username: String!, email: String!, password: String!): User
    signinUser(username: String!, password: String!): LoginResult!
    updateUser(id: Int!, firstName: String, lastName: String, username: String, email: String, password: String): User
    deleteUser(id: Int!): User
  }
`;