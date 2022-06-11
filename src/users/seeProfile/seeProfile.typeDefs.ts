import { gql } from "apollo-server";

// The GraphQL schema
export default gql`
  type Query {
    seeProfile(
      username: String!
    ): User
  }
`;