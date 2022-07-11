import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  headers: { 'x-hasura-admin-secret': process.env.ENDPOINT_SECRET },
  cache: new InMemoryCache()
});

