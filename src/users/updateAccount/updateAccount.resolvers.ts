import client from "../../client";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { FileUpload } from "graphql-upload";
import { createWriteStream, ReadStream } from "fs";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    updateAccount: async (
      _: any,
      {
        firstName,
        lastName,
        username,
        email,
        password,
        bio,
        avatar
      }: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        bio: string;
        avatar: Promise<FileUpload>;
      },
      { activeUser, protectResolver }: {
        activeUser: User | null,
        protectResolver: Function
      }) => {
      try {
        const { filename, createReadStream } = await avatar;
        const readStream: ReadStream = createReadStream();
        const writeStream = createWriteStream(
          process.cwd() + "/uploads/" + filename
        );
        readStream.pipe(writeStream);

        let { id } = protectResolver(activeUser);
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