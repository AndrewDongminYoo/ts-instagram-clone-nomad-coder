import { gql } from "apollo-server";

export default gql`
  type Mutation {
    searchPhoto(hashtag: String!): [Photo]
  }
`;