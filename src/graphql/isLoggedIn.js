import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
    query isLoggedIn {
        isLoggedIn @rest(method: "GET", type: "Status", path: "/") {
            message
            token {
                email
                iat
                exp
            }
        }
    }
`;
