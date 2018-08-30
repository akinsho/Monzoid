import React, { Fragment, PureComponent } from "react";
import { Query } from "react-apollo";

import Page from "./page";
import Loading from "./../components/loading";
import Card from "./../components/card";
import Button from "./../components/button";
import Row from "./../components/row";
import Grid from "./../components/grid";
import Heading from "./../components/heading";
import { GET_APP_USERS } from "./../graphql/getAppUsers";

class Users extends PureComponent {
    state = {
        offset: 25,
        page: 1,
    };

    updateOffset = size => {
        this.setState({ offset: this.state.offset + size, page: this.state.page + 1 });
    };

    render() {
        const { id } = this.props;
        const { page, offset } = this.state;
        return (
            <Page {...this.props}>
                <Query query={GET_APP_USERS} variables={{ id, offset }}>
                    {({ error, loading, data, fetchMore }) => {
                        const nextPage = async () => {
                            const { users } = data.results;
                            await fetchMore({
                                variables: { offset: users.length },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) {
                                        return prev;
                                    }
                                    return {
                                        ...prev,
                                        users: [
                                            ...prev.results.users,
                                            ...fetchMoreResult.results.users,
                                        ],
                                    };
                                },
                            });
                            this.updateOffset(users.length);
                        };

                        return loading || !data ? (
                            <Loading />
                        ) : (
                            <Fragment>
                                <Heading>users</Heading>
                                <Row>
                                    {/* TODO: Add a previous button*/}
                                    <Button width="15rem" onClick={nextPage}>
                                        Next Page ({page})
                                    </Button>
                                </Row>
                                <Grid>
                                    {data.results.users.map(user => {
                                        return (
                                            <Card
                                                wide
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
