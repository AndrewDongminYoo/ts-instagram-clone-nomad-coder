import { Resolvers } from "../../types";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: async ({ userId }, { id, caption }, { client, activeUser, checkLogin }) => {
      try {
        let user = checkLogin(activeUser);
        if (user.id !== userId)
          throw new Error("You are not authorized to edit this photo");
        let oldPhoto = await client.photo.findFirst({
          where: { userId: user.id, id },
          select: { hashtags: true }
        })
        if (!caption) caption = "";
        // pare the caption to get the hashtags
        if (!oldPhoto) throw new Error("Photo not found");
        let photo = await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
            }
          },
        })
        return {
          ok: true,
          photo,
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message,
        }
      }
    },
  }
}

export default resolvers;