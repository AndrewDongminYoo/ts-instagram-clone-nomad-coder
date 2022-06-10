import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    createUser(firstName: String!, lastName: String, username: String!, email: String!, password: String!): User
    signinUser(username: String!, password: String!): LoginResult!
    updateUser(id: Int!, firstName: String, lastName: String, username: String, email: String, password: String): editProfileResult
    deleteUser(id: Int!): User
  }
`;