import gql from "graphql-tag";

export const UPDATE_APP = gql`
    fragment UpdateInput on REST {
        name: String
        logo: String
    }

    mutation updateApp($id: String!, $input: UpdateInput!) {
        updateApp(id: $id, input: $input)
            @rest(method: "PUT", type: "Update", path: "/apps/{args.id}") {
            app {
                id
                name
                created
                logo
            }
        }
    }
`;
