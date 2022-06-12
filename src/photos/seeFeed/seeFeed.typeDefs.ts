import { gql } from "apollo-server";

export default gql`
  type Mutation {
    seeFeed(userId: Int!): [Photo]
  }
`;