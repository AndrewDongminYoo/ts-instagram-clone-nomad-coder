import client from "../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    createUser: (_: any, { firstName, lastName, username, email, password
    }: {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    }) => client.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password,
      }
    }),
    updateUser: (_: any, { id, firstName, lastName, username, email, password
    }: {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    }) => client.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        username,
        email,
        password,
      }
    }),
    deleteUser: (_: any, { id }: {
      id: number;
    }) => client.user.delete({
      where: {
        id
      }
    })
  }
};