require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './src/schema';

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
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }: {
  url: String;
}) => {
  console.log(`🚀 Server ready at ${url}`);
});