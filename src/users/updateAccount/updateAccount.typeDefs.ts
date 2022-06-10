import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type editProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    updateAccount(firstName: String, lastName: String, username: String, email: String, password: String, bio: String): editProfileResult
  }
`;