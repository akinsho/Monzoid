import React from "react";
import styled from "styled-components";

import Heart from "./../components/heart";
import Nav from "./../components/nav";

const HomeContainer = styled.main`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding-top: 3rem;
    overflow: auto;
`;

const Title = styled.h2`
    text-align: center;
    display: inline-block;
    color: white;
    text-transform: lowercase;
`;

const TitleContainer = styled.div`
    position: relative;
`;

export default function Layout(props) {
    return (
        <HomeContainer>
            <Nav />
            <TitleContainer>
                <Heart />
                <Title>Monzoid</Title>
            </TitleContainer>
            {props.children}
        </HomeContainer>
    );
}
