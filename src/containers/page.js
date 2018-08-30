import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { Redirect } from "@reach/router";

import Layout from "./../components/layout";
import { IS_LOGGED_IN } from "./../graphql/isLoggedIn";
import { getSession } from "./../services/storage";

class Page extends PureComponent {
    state = {
        redirected: false,
    };

    componentDidMount() {
        const session = getSession();
        const isLoginPage = this.isLoginPage();
        if (isLoginPage && session && session.accessToken) {
            this.props.navigate("/apps");
        }
    }

    isLoginPage = () => {
        const { location } = this.props;
        return location && location.pathname === "/";
    };

    render() {
        // Don't query for whether a user is logged in or not on the login page
        const { redirected } = this.state;
        return (
            <Query skip={this.isLoginPage()} query={IS_LOGGED_IN} pollInterval={150000}>
                {({ error, data, loading }) => {
                    console.log("data: ", data);
                    if (error && !redirected && !this.isLoginPage()) {
                        console.log("error: ", error);
                        return <Redirect to="/" />;
                    }
                    return <Layout>{this.props.children}</Layout>;
                }}
            </Query>
        );
    }
}

export default Page;
