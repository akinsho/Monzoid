import gql from "graphql-tag";

export const LOGIN_USER = gql`
    fragment PublishablePostInput on REST {
        email: String
        password: String
    }

    mutation loginUser($input: PublishablePostInput) {
        loginUser(input: $input) @rest(method: "POST", type: "Login", path: "/login") {
            accessToken
        }
    }
`;
