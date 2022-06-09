import { ApolloServer, gql } from 'apollo-server';

// The GraphQL schema
const typeDefs = gql`

  type Movie {
    id: Int
    title: String
    year: Int
  }

  type Query {
    "A simple type for getting started!"
    movies: [Movie]
    movie: Movie
  }

  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: "Hello", year: 2022 })
  },
  Mutation: {
    createMovie: (_: any, { title }: {
      title: String;
    }) => {
      console.log(title);
      return true;
    },
    deleteMovie: (_: any, { title }: {
      title: String;
    }) => {
      console.log(title);
      return true;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});