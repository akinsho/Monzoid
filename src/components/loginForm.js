import React from "react";
import styled from "styled-components";

import { boxShadow, borderRadius } from "./../common/styles";

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

export default function LoginForm(props) {
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
