import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    deleteAccount: (_: any, { id }: {
      id: number;
    }) => {

      try {
        client.user.delete({
          where: {
            id
          }

        })
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    }
  }
};