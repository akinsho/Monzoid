import gql from "graphql-tag";

export const GET_APP_USERS = gql`
    query getAppUsers($id: String!) {
        getAppUsers(id: $id)
            @rest(method: "GET", type: "UsersList", path: "/apps/{args.id}/users") {
            users {
                id
                name
                email
                avatar
            }
        }
    }
`;
