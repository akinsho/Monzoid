import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import Layout from "./../components/layout";
import { IS_LOGGED_IN } from "./../graphql/isLoggedIn";

class Page extends PureComponent {
    render() {
        return (
            <Query query={IS_LOGGED_IN} pollInterval={150000}>
                {({ error, data, loading }) => {
                    console.log("data: ", data);
                    if (error) {
                        console.log("error: ", error);
                    }
                    return <Layout>{this.props.children}</Layout>;
                }}
            </Query>
        );
    }
}

export default Page;
