import { createWriteStream, ReadStream } from "fs";
import { Resolvers } from "../../types";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: async (_, { file, caption }, { activeUser, checkLogin, client }) => {
      try {
        if (!file) throw new Error("No file provided.");
        let { id } = checkLogin(activeUser);
        if (!id) throw new Error("No user logged in..");
        let url = undefined;
        if (file) {
          const { filename, createReadStream } = await file.promise;
          const readStream: ReadStream = createReadStream();
          const newFilename = `${id}-${Date.now()}-${filename}`
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`);
          readStream.pipe(writeStream);
          url = `http://localhost:4000/uploads/${newFilename}`;
          if (!caption) caption = "";
          // pare the caption to get the hashtags
          const hashtagObj = processHashtags(caption);
          // save the photo with the pared caption
          const photo = await client.photo.create({
            data: {
              url,
              caption,
              user: {
                connect: {
                  id
                }
              },
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }
          });
          console.log(photo);
          return {
            ok: true,
            photo,
          }
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    }
  }
}

export default resolvers;