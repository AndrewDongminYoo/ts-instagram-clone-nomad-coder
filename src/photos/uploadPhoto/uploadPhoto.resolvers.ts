import { createWriteStream, ReadStream } from "fs";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: async (_, { file, caption }, { activeUser, checkLogin, client }) => {
      try {
        let { id } = checkLogin(activeUser);
        let fileUrl = undefined;
        if (file) {
          const { filename, createReadStream } = await file.promise;
          console.log(typeof createReadStream);
          const readStream: ReadStream = createReadStream();
          const newFilename = `${id}-${Date.now()}-${filename}`
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`);
          readStream.pipe(writeStream);
          fileUrl = `http://localhost:4000/uploads/${newFilename}`;
          if (caption) {
            // pare the caption to get the hashtags
            // save the photo with the pared caption
          }
        }

      } catch (e: any) {

      }
    }
  }
}

export default resolvers;