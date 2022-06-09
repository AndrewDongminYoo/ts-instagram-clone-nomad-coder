import { gql } from "apollo-server";

// The GraphQL schema
export default gql`

  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    createUser(firstName: String, lastName: String, username: String, password: String): User
    updateUser(id: Int!, firstName: String, lastName: String, username: String, password: String): User
    deleteUser(id: Int!): User
  }
`;