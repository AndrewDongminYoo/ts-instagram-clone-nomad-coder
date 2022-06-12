import { gql } from "apollo-server";

export default gql`

  type editPhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Mutation {
    editPhoto(id: Int!): editPhotoResult!
  }
`;