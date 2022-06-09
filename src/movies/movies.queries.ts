import client from "../client";

// A map of functions which return data for the schema.
export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: { id: number; }) => client.movie.findUnique({ where: { id } }),
  },
}