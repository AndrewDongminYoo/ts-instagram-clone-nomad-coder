import bcrypt from "bcrypt";
import { createWriteStream, ReadStream } from "fs";
import { Resolvers } from "../../types";

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  Mutation: {
    updateAccount: async (
      _,
      {
        firstName,
        lastName,
        username,
        email,
        password,
        bio,
        avatar
      },
      { activeUser, checkLogin, client }) => {
      try {
        let { id } = checkLogin(activeUser);
        let avatarUrl = undefined;
        if (avatar) {
          const { filename, createReadStream } = await avatar.promise;
          console.log(typeof createReadStream);
          const readStream: ReadStream = createReadStream();
          const newFilename = `${id}-${Date.now()}-${filename}`
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`);
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/uploads/${newFilename}`;
        }

        // check if user exists or username is taken
        const existUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }]
          }
        })
        if (existUser) throw new Error("Username or email already exists.");
        // check hash password
        let hashedPassword = undefined;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
        }
        // save user to db and return user
        let updated = await client.user.update({
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            avatar: avatarUrl,
            password: hashedPassword,
          },
          where: {
            id
          }
        })
        if (updated.id) {
          return {
            ok: true,
          }
        } else {
          return {
            ok: false,
            error: "Could not update user"
          }
        }
      } catch (e: any) {
        return {
          ok: false,
          error: e.message
        }
      }
    }
  },
}

export default resolvers;