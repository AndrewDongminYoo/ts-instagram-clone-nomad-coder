import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const client = new PrismaClient();

// The GraphQL schema
const typeDefs = gql`

  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
    deleteMovie(id: Int!): Movie
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: { id: number; }) => client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (_: any, { title, year, genre }: {
      title: string;
      year: number;
      genre: string;
    }) => client.movie.create({
      data: {
        title,
        year,
        genre
      }
    }),
    updateMovie: (_: any, { id, title, year, genre }: {
      id: number;
      title: string;
      year: number;
      genre: string;
    }) => client.movie.update({
      where: { id },
      data: {
        title,
        year,
        genre
      }
    }),
    deleteMovie: (_: any, { id }: {
      id: number;
    }) => client.movie.delete({
      where: {
        id
      }
    })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: {
  url: String;
}) => {
  console.log(`🚀 Server ready at ${url}`);
});