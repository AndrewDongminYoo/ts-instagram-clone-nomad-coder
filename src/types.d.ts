import { Hashtag, PrismaClient, User } from "@prisma/client";
import { Upload } from "graphql-upload";

type Parent = {
  id: number;
  userId: number;
}

type Args = {
  id: number;
  username: string
  keyword: string
  last: number
  page: number
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  avatar: Upload;
  toUnfollow: string;
  toFollow: string;
  file: Upload;
  caption: string;
  hashtag: string;
}

type Context = {
  client: PrismaClient
  activeUser: User | null
  checkLogin: (user: User | null) => User
}

type Info = {
  fieldName: string
}


export type Resolver = (
  parent: Parent,
  args: Args,
  context: Context,
  info: Info
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};


