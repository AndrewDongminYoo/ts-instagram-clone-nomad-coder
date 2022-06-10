require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './src/schema';
import { verifyToken } from './src/users/user.utils';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      SECRET_KEY: string;
      DATABASE_URL: string;
    }
  }
}

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return {
      activeUser: await (token ? verifyToken(token) : null),
    };
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }: {
  url: String;
}) => {
  console.log(`🚀 Server ready at ${url}`);
});