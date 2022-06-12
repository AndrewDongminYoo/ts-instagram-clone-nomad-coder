import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    likePhoto: async (_, { id }, { client, checkLogin, activeUser }) => {
      try {
        let user = checkLogin(activeUser);
        let photo = await client.photo.findUnique({
          where: { id },
        })
        if (!photo) throw new Error("Photo not found");
        let like = await client.like.findUnique({
          where: {
            userId_photoId: {
              userId: user.id,
              photoId: photo.id,
            }
          }
        })
        if (like) {
          await client.like.delete({
            where: {
              id: like.id,
            }
          })
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: user.id,
                }
              },
              photo: {
                connect: {
                  id: photo.id
                }
              }
            }
          })
        }
        return {
          ok: true,
          photo
        }
      } catch (e: any) {
        return {
          ok: true,
          error: e.message,
        }
      }
    },
  }
}

export default resolvers;