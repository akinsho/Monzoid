import React, { Fragment, PureComponent } from "react";
import { Query } from "react-apollo";

import { GET_USER_APPS } from "./../graphql/getUserApps";
import Layout from "./../components/layout";

export default class Applications extends PureComponent {
    render() {
        const apps = [
            {
                id: "ebdb9723-39ba-4157-9d36-aa483581aa13",
                name: "Intelligent Steel Car",
                created: "2016-01-25T03:57:53.873Z",
                logo: "http://lorempixel.com/400/400/animals",
            },
        ];
        return (
            <Query query={GET_USER_APPS}>
                {({ data, error, loading }) => {
                    console.log("data: ", data);
                    return (
                        <Layout>
                            <h3>Apps</h3>
                            {apps.map(app => (
                                <Fragment key={app.id}>
                                    <div>{app.name}</div>
                                    <div>{app.created}</div>
                                    <img src={app.logo} />
                                </Fragment>
                            ))}
                        </Layout>
                    );
                }}
            </Query>
        );
    }
}
