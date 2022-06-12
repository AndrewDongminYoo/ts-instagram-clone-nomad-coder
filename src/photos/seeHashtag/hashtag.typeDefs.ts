import { gql } from "apollo-server";

export default gql`
  type Query {
    seeHashtag(hashtag: String!): Hashtag
  }

  type Hashtag {
    hashtag: String!
    photos: [Photo]
    totalPhotos: Int!
  }
`;