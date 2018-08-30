import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { Redirect } from "@reach/router";

import Layout from "./../components/layout";
import { IS_LOGGED_IN } from "./../graphql/isLoggedIn";
import { getSession, clearSession } from "./../services/storage";

class Page extends PureComponent {
    componentDidMount() {
        const session = getSession();
        const isLoginPage = this.isLoginPage();

        if (isLoginPage && session && session.accessToken) {
            this.props.navigate("/apps");
        }
    }

    isLoginPage = () => this.props.location && this.props.location.pathname === "/";

    handleError = error => {
        if (!this.isLoginPage()) {
            clearSession();
            this.props.navigate("/");
        }
    };

    render() {
        // Don't query for whether a user is logged in or not on the login page
        return (
            <Query
                skip={this.isLoginPage()}
                query={IS_LOGGED_IN}
                pollInterval={150000}
                onError={this.handleError}
            >
                {({ error, data, loading }) => <Layout>{this.props.children}</Layout>}
            </Query>
        );
    }
}

export default Page;
