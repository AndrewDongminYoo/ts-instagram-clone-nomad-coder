import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../client';
import { Args, Context, Info, Parent, Resolver } from '../types';

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = async (token: string) => {
  try {
    let activeUser = null;
    if (!token) return activeUser;
    let { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
    console.log(`verifiying token ${id}`);
    activeUser = await client.user.findUnique({
      where: {
        id,
      }
    });
    // console.log("activeUser", activeUser);
    return activeUser;
  } catch (e) {
    return null;
  }
}

export const protectResolver = (user: User | null): User => {
  if (!user) throw new Error("You must be logged in.");
  return user;
}

export const wrappedResolver = (
  resolverFn: Resolver,
) => (
  root: Parent, args: Args, context: Context, info: Info
) => {
    if (!context.activeUser) {
      return {
        ok: false,
        error: "You must be logged in.",
      }
    }
    return resolverFn(root, args, context, info);
  }