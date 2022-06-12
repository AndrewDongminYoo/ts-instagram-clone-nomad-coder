import { Resolvers } from "../../types";

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Mutation: {
    followUser: async (_,
      { toFollow },
      { activeUser, checkLogin, client }
    ) => {
      try {
        // console.log("resolver", activeUser);
        let { id } = await checkLogin(activeUser);
        const checkUser = await client.user.findUnique({ where: { username: toFollow } });
        if (!checkUser) throw new Error("User does not exist");
        if (checkUser.id === id) throw new Error("You cannot follow yourself");
        await client.user.update({
          where: {
            id,
          },
          data: {
            following: {
              connect: {
                username: toFollow
              }
            },
          }
        });
        return {
          ok: true,
          error: null
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message,
        }
      }
    },
  },
}

export default resolvers;