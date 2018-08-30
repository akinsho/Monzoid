import React, { Fragment, PureComponent } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import { GET_USER_APPS } from "./../graphql/getUserApps";
import Page from "./../containers/page";
import Loading from "./../components/loading";
import Heading from "./../components/heading";
import UserApp from "./../components/userApp";
import Grid from "./../components/grid";

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
                <Query query={GET_USER_APPS}>
                    {({ data, error, loading }) => (
                        <Fragment>
                            <Heading>Apps</Heading>
                            {loading ? (
                                <Loading />
                            ) : error || !data ? (
                                <h3>Woops... sorry something went wrong</h3>
                            ) : (
                                <Grid>
                                    {data.getUserApps.apps &&
                                        data.getUserApps.apps.map(app => (
                                            <UserApp
                                                app={app}
                                                key={app.id}
                                                newName={name}
                                                newLogo={logo}
                                                editing={editing === app.id}
                                                handleInput={this.onChange}
                                                toggleEditing={this.toggleEditing}
                                                navigateToUsers={this.navigateToUsers}
                                            />
                                        ))}
                                </Grid>
                            )}
                        </Fragment>
                    )}
                </Query>
            </Page>
        );
    }
}
