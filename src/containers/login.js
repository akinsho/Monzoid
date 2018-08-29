import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { Redirect } from "@reach/router";

import Loading from "./../components/loading";
import Layout from "./../components/layout";
import Applications from "./../containers/applications";
import { boxShadow, borderRadius } from "./../common/styles";
import { setSession } from "./../services/storage";
import { LOGIN_USER } from "./../graphql/loginUser";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
`;

const Input = styled.input`
    width: 100%;
    height: 2rem;
    border: none;
    margin: 0.5rem 0;
    outline: none;
    padding: 0.5rem;
    font-size: 1.2rem;
    ${boxShadow};
    ${borderRadius};

    :invalid {
        border: 2px dashed red;
    }

    :focus {
        border: 0.2rem solid royalblue;
    }
`;

const Button = styled.button`
    width: 80%;
    height: 3rem;
    border: none;
    font-size: 1.2rem;
    margin: 1rem 0;
    ${boxShadow};
    ${borderRadius};
`;

function LoginForm(props) {
    return (
        <Form onSubmit={props.handleLogin}>
            <Input
                required
                name="email"
                type="email"
                value={props.email}
                onChange={props.handleChange}
                placeholder="Please enter your email"
            />
            <Input
                required
                minlength="5"
                name="password"
                type="password"
                value={props.password}
                onChange={props.handleChange}
                placeholder="Please enter your password"
            />
            <Button>Login</Button>
        </Form>
    );
}

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
    <Mutation mutation={LOGIN_USER}>
        {(loginUser, { error, loading, data }) => (
            <Layout>
                <Login loginUser={loginUser} data={data} error={error} loading={loading} />
            </Layout>
        )}
    </Mutation>
);
