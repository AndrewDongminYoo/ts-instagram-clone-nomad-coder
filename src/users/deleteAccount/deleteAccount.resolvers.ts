import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    deleteAccount: (_: any, { id }: {
      id: number;
    }) => client.user.delete({
      where: {
        id
      }
    })
  }
};