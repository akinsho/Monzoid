import React, { Component } from "react";
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
        // Example login: email: "mondo@example.com", password: "hunter2"
        if (email && password) {
            await this.props.loginUser({ variables: { input: { email, password } } });

            const { data } = this.props;
            const accessToken = data && data.loginUser;

            if (accessToken) {
                setSession(accessToken);
            }

            this.setState({ authenticated: !!accessToken, email: "", password: "" });
        }
    };

    render() {
        const { password, email } = this.state;
        if (this.props.loading) {
            return <Loading />;
        }

        if (this.props.data) {
            return this.state.authenticated ? (
                <Redirect to="/apps" />
            ) : (
                <div>Sorry Login failed</div>
            );
        }

        return (
            <LoginForm
                email={email}
                password={password}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
            />
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
