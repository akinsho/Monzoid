import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

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

export default function Nav() {
    return (
        <NavBar>
            <StyledLink to="/">Login</StyledLink>
            <StyledLink to="/apps">Apps</StyledLink>
        </NavBar>
    );
}
