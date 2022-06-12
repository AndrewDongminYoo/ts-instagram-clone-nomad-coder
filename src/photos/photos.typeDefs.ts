import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    url: String!
    caption: String
    user: User!
    userId: Int!
    hashtags: [Hashtag]
    comments: [Comment]
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: Int!
    createdAt: String!
    updatedAt: String!
    text: String!
    user: User!
    userId: Int!
    photo: Photo!
    photoId: Int!
  }
`