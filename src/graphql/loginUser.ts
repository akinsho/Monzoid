import gql from "graphql-tag";

export const LOGIN_USER = gql`
    fragment LoginInput on REST {
        email: String
        password: String
    }

    mutation loginUser($input: LoginInput) {
        loginUser(input: $input) @rest(method: "POST", type: "Login", path: "/login") {
            accessToken
        }
    }
`;
