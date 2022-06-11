require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './src/schema';
import { protectResolver, verifyToken } from './src/users/user.utils';
import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      SECRET_KEY: Secret;
      DATABASE_URL: string;
    }
  }
}

const server: ApolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return {
      activeUser: await (token ? verifyToken(token) : null),
      protectResolver,
    };
  },
  // Using graphql-upload without CSRF prevention is very insecure.
  csrfPrevention: true,
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})