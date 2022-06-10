import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const loadedResolvers = loadFilesSync(`${__dirname}/**/**/*.resolvers.ts`, { recursive: true });
const loadedTypes = loadFilesSync(`${__dirname}/**/**/*.typeDefs.ts`, { recursive: true });

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);