import { User } from '@prisma/client';
import jwt, { UserJwtPayload } from 'jsonwebtoken';
import client from '../client';

const SECRET_KEY = process.env.SECRET_KEY;

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends JwtPayload {
    id: number;
  }
}

export const verifyToken = async (token: string) => {
  try {
    let activeUser = null;
    if (!token) return activeUser;
    let { id } = jwt.verify(token, SECRET_KEY) as UserJwtPayload;
    activeUser = await client.user.findUnique({
      where: {
        id,
      }
    });
    return activeUser;
  } catch (e) {
    return null;
  }
}

export const protectResolver = (user: User | null): User => {
  if (!user) throw new Error("You must be logged in.");
  return user;
}