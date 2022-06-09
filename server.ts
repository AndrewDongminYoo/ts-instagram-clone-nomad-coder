require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './src/schema';

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

server.listen().then(({ url }: {
  url: String;
}) => {
  console.log(`🚀 Server ready at ${url}`);
});