import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const access_token = localStorage.getItem("access_token");

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        authorization: access_token,
        ...headers,
      },
    }));
    return forward(operation);
  }),
  new HttpLink({ uri: process.env.REACT_APP_HTTP_LINK_URL }),
]);

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const AppoloProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default AppoloProvider;
