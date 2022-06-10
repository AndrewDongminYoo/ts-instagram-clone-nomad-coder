import client from "../../client";

// A map of functions which return data for the schema.
export default {
  Mutation: {
    updateAccount: (_: any, {
      id, firstName, lastName, username, email, password
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
  }
};