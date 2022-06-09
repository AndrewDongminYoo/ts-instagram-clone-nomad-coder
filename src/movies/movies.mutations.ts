import client from "../client";

// A map of functions which return data for the schema.
export default {
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