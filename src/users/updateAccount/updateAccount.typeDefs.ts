import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type editProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    updateUser(id: Int!, firstName: String, lastName: String, username: String, email: String, password: String): editProfileResult
  }
`;