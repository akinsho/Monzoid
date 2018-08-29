import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { RestLink } from "apollo-link-rest";
import { ApolloLink } from "apollo-link";

import { getSession, setSession } from "./services/storage";

import "./common/global.css.js";
import Home from "./containers/Home";

// CREDIT: https://www.apollographql.com/docs/link/links/rest.html#examples
const authRestLink = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers }) => {
        const { accessToken } = getSession();
        const authHeaders = {
            headers: Object.assign({}, headers, {
                Accept: "application/json",
                Authorization: accessToken,
            }),
        };
        return authHeaders;
    });

    return forward(operation).map(result => {
        const { restResponses } = operation.getContext();
        const authTokenResponse = restResponses.find(res => res.headers.has("Authorization"));
        const accessToken = authTokenResponse.headers.get("Authorization");
        return authTokenResponse ? setSession({ accessToken }) : result;
    });
});

const restLink = new RestLink({
    // uri: process.env.API_URL,
    uri: "https://guarded-thicket-22918.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
    // If the returning data is nested adding a typepatcher allows
    // for adding a typename to the nested object or array
    typePatcher: {},
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: ApolloLink.from([/* authRestLink,  */ restLink, new HttpLink()]),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));
