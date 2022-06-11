import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import client from '../client';

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = async (token: string) => {
  try {
    let activeUser = null;
    if (!token) return activeUser;
    let { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
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
  resolverFn: Function,
) => (
  root: any, args: any, context: any, info: any
) => {
    if (!context.activeUser) {
      return {
        ok: false,
        error: "You must be logged in.",
      }
    }
    return resolverFn(root, args, context, info);
  }