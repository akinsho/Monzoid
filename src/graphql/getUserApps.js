import gql from "graphql-tag";

export const GET_USER_APPS = gql`
    query getUserApps {
        getUserApps @rest(method: "GET", type: "APP", path: "/apps") {
            id
            name
            created
            logo
        }
    }
`;
