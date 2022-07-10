import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import '../styles/globals.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  // headers: {'x-hasura-admin-secret': '<Admin secret from step 1>'},
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
