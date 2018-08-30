import React, { Fragment, PureComponent } from "react";
import { Query } from "react-apollo";

import Page from "./page";
import Loading from "./../components/loading";
import Card from "./../components/card";
import Grid from "./../components/grid";
import Heading from "./../components/heading";
import { GET_APP_USERS } from "./../graphql/getAppUsers";

class Users extends PureComponent {
    render() {
        const { id } = this.props;
        return (
            <Page {...this.props}>
                <Query query={GET_APP_USERS} variables={{ id }}>
                    {({ error, loading, data }) => {
                        console.log("data: ", data);
                        return loading || !data ? (
                            <Loading />
                        ) : (
                            <Fragment>
                                <Heading>users</Heading>
                                <Grid>
                                    {data.getAppUsers.users.map(user => {
                                        return (
                                            <Card
                                                key={user.id}
                                                name={user.name}
                                                src={user.avatar}
                                                metadata={user.email}
                                            />
                                        );
                                    })}
                                </Grid>
                            </Fragment>
                        );
                    }}
                </Query>
            </Page>
        );
    }
}

export default Users;
