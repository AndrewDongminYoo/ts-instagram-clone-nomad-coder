import express from 'express';
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './src/schema';
import { protectResolver, verifyToken } from './src/users/user.utils';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress';
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

async function startServer() {
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

  await server.start();
  const app = express();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  await new Promise<void>(r => app.listen({ port: PORT }, r));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();