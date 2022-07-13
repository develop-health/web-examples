import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://preview.hasura.app/v1/graphql',
// headers: {'x-hasura-admin-secret': '<Admin secret from step 1>'},
  cache: new InMemoryCache(),
});