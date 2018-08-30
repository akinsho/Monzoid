import React from "react";
import styled from "styled-components";

import Heart from "./../components/heart";
import Nav from "./../components/nav";

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
