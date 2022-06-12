require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './src/schema';
import { checkLogin, verifyToken } from './src/users/users.utils';
import { Secret } from 'jsonwebtoken';
import logger from 'morgan';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import express from 'express';
import client from './src/client';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      SECRET_KEY: Secret;
    }
  }
}
(async function () {
  const server: ApolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      // console.log(token);
      return {
        activeUser: await (token ? verifyToken(token) : null),
        checkLogin,
        client: client,
      };
    },
    // Using graphql-upload without CSRF prevention is very insecure.
    // csrfPrevention: true,
  });

  await server.start();
  const PORT = process.env.PORT;
  const app = express();
  app.use(logger('tiny'));
  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () => {
    console.log(`🚀Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  })
})()