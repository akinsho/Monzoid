import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import Heart from "./../components/heart";

const HomeContainer = styled.main`
    width: 100%;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 3rem;
    overflow: auto;
`;

const Title = styled.h2`
    text-align: center;
    display: inline-block;
    margin-right: 1rem;
    color: white;
`;

const NavBar = styled.nav`
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: flex-start;
    padding: 0.4rem;
`;

const StyledLink = styled(Link)`
    margin: 0 1rem;
    color: white;
    :hover,
    :active {
        color: royalblue;
    }
`;

function Nav() {
    return (
        <NavBar>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/apps">Apps</StyledLink>
        </NavBar>
    );
}

export default function Layout(props) {
    return (
        <HomeContainer>
            <Nav />
            <div>
                <Title>Monzoid</Title>
                <Heart />
            </div>
            {props.children}
        </HomeContainer>
    );
}
