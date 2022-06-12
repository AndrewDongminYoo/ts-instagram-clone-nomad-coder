import { Resolvers } from "../../types";
// take means how many items to take from the database
const take = 6;

const resolvers: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }, { client }) => {
      try {
        return await client.hashtag.findUnique({
          where: { hashtag }
        })
      } catch (e: any) {
        return null;
      }
    },
  },
  Hashtag: {
    totalPhotos: async ({ hashtag }, _, { client }) => {
      return await client.photo.count({
        where: { hashtags: { some: { hashtag } } }
      })
    },
    photos: async ({ hashtag }, _, { client }) => {
      try {
        return await client.hashtag.findUnique({
          where: {
            hashtag,
          }
        }).photos({ take });
      } catch (e: any) {
        return [];
      }
    },
  }
}

export default resolvers;