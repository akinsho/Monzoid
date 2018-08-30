import React, { Fragment, PureComponent } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";

import { GET_USER_APPS } from "./../graphql/getUserApps";
import { UPDATE_APP } from "./../graphql/updateApp";
import Page from "./../containers/page";
import Loading from "./../components/loading";
import Heading from "./../components/heading";
import UserApp from "./../components/userApp";
import Grid from "./../components/grid";

const getUserApps = ({ render }) => <Query query={GET_USER_APPS}>{props => render(props)}</Query>;

const updateApp = ({ render }) => (
    <Mutation refetchQueries={[{ query: GET_USER_APPS }]} mutation={UPDATE_APP}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

// Combine multiple render props to avoid having to deeply nest them which hurts legibility
const GraphQL = adopt({
    updateApp,
    getUserApps,
});

export default class Applications extends PureComponent {
    state = {
        name: "",
        logo: "",
        editing: null,
    };

    toggleEditing = id => {
        const { editing } = this.state;
        const newEdit = id !== editing ? id : null;
        this.setState({ editing: newEdit });
    };

    onChange = evt => {
        const { value, name } = evt.currentTarget;
        this.setState({ [name]: value });
    };

    navigateToUsers = id => {
        this.props.navigate(`/users/${id}`);
    };

    render() {
        const { editing, logo, name } = this.state;
        return (
            <Page {...this.props}>
                <GraphQL>
                    {({ updateApp, getUserApps }) => {
                        const loading = getUserApps.loading || updateApp.loading;
                        const error = getUserApps.error || updateApp.error;
                        const submit = async (evt, app) => {
                            evt.preventDefault();
                            await updateApp.mutation({
                                variables: {
                                    id: app.id,
                                    input: { logo, name },
                                },
                            });
                            this.setState({ name: "", logo: "" });
                        };

                        return (
                            <Fragment>
                                <Heading>Apps</Heading>
                                {loading ? (
                                    <Loading />
                                ) : error || !getUserApps.data ? (
                                    <h3>Woops... sorry something went wrong</h3>
                                ) : (
                                    <Grid>
                                        {getUserApps.data.getUserApps.apps.map(app => {
                                            return (
                                                <UserApp
                                                    app={app}
                                                    key={app.id}
                                                    newName={name}
                                                    newLogo={logo}
                                                    editing={editing === app.id}
                                                    handleSubmit={evt => submit(evt, app)}
                                                    handleInput={this.onChange}
                                                    toggleEditing={this.toggleEditing}
                                                    navigateToUsers={this.navigateToUsers}
                                                />
                                            );
                                        })}
                                    </Grid>
                                )}
                            </Fragment>
                        );
                    }}
                </GraphQL>
            </Page>
        );
    }
}
