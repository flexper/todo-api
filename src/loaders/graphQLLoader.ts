import { NonEmptyArray } from 'type-graphql-v2-fork';
import { AuthResolver } from '../components/auth/authResolver';
import { TodoResolver } from '../components/todo/todoResolver';

export const graphQLSchemaLoader = () => {
  const resolvers = [AuthResolver, TodoResolver];

  for (const resolver of resolvers) {
    //@ts-ignore
    logger.info(`[GQL] ${resolver.name} Query & Mutations loaded`);
  }

  return {
    // eslint-disable-next-line @typescript-eslint/ban-types
    resolvers: resolvers as unknown as NonEmptyArray<Function>,
  };
};

export const graphQLLoaderLoader = () => {
  const loaders = {};

  for (const loader of Object.keys(loaders)) {
    logger.info(`[GQL] ${loader} Loader loaded`);
  }

  return loaders;
};
