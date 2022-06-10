import { gql } from "apollo-server-express";

// The GraphQL schema
export default gql`
  type DeleteAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deleteAccount(
      username: String!
    ): DeleteAccountResult!
  }
`;