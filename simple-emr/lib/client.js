import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  headers: { 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_ENDPOINT_SECRET },
  cache: new InMemoryCache()
});

