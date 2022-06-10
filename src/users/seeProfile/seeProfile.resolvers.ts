import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    seeProfile: (_: any, { username }: { username: string; }) => client.user.findUnique({ where: { username } }),
  },
}