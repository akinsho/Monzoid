import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { Redirect } from "@reach/router";

import Page from "./../containers/page";
import Applications from "./../containers/applications";
import Loading from "./../components/loading";
import LoginForm from "./../components/loginForm";
import { setSession } from "./../services/storage";
import { LOGIN_USER } from "./../graphql/loginUser";

export class Login extends Component {
    state = {
        email: "",
        password: "",
        authenticated: false,
        error: false,
    };

    handleChange = evt => {
        const { name, value } = evt.currentTarget;
        if (name in this.state) {
            this.setState({ [name]: value });
        }
    };

    handleLogin = async evt => {
        evt.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            try {
                await this.props.loginUser({ variables: { input: { email, password } } });
                const { data } = this.props;
                const accessToken = data && data.loginUser;

                if (accessToken) {
                    setSession(accessToken);
                }
                this.setState({ authenticated: !!accessToken });
            } catch (error) {
                this.setState({ error: true, authenticated: false });
            }

            this.setState({ email: "", password: "" });
        }
    };

    render() {
        const { loading, data } = this.props;
        const { password, email, error, authenticated } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (data) {
            return this.state.authenticated && <Redirect to="/apps" noThrow />;
        }

        return (
            <Fragment>
                {error && <div>Sorry! 😔 we weren't able to log you in</div>}
                <LoginForm
                    email={email}
                    password={password}
                    handleChange={this.handleChange}
                    handleLogin={this.handleLogin}
                />
            </Fragment>
        );
    }
}

export default props => (
    <Page {...props}>
        <Mutation mutation={LOGIN_USER}>
            {(loginUser, { error, loading, data }) => (
                <Login loginUser={loginUser} data={data} error={error} loading={loading} />
            )}
        </Mutation>
    </Page>
);
