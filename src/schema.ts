import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadedResolvers = loadFilesSync(`${__dirname}/**/{queries,mutations}.ts`);
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;