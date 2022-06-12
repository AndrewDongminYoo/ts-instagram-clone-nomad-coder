import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unlikePhoto(id: Int!): Photo
  }
`;