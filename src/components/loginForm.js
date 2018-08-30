import React from "react";
import styled from "styled-components";

import Button from "./button";
import Input from "./input";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
`;

export default function LoginForm(props) {
    return (
        <Form onSubmit={props.handleLogin}>
            <Input
                required
                name="email"
                type="email"
                empty={!props.email}
                value={props.email}
                onChange={props.handleChange}
                placeholder="Please enter your email"
            />
            <Input
                required
                minlength="5"
                name="password"
                type="password"
                empty={!props.password}
                value={props.password}
                onChange={props.handleChange}
                placeholder="Please enter your password"
            />
            <Button>Login</Button>
        </Form>
    );
}
