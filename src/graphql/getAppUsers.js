import gql from "graphql-tag";

export const GET_APP_USERS = gql`
    query getAppUsers($id: String!, $offset: Number) {
        results(id: $id, offset: $offset)
            @rest(
                method: "GET"
                type: "UsersList"
                path: "/apps/{args.id}/users?offset={args.offset}"
            ) {
            users {
                id
                name
                email
                avatar
            }
        }
    }
`;
