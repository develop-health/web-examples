import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import '../styles/globals.css'

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  headers: { 'x-hasura-admin-secret': process.env.ENDPOINT_SECRET },
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
