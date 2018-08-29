import React from "react";
import styled from "styled-components";

import Heart from "./../components/heart";

const HomeContainer = styled.main`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
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
            <div>
                <Title>Monzoid</Title>
                <Heart />
            </div>
            {props.children}
        </HomeContainer>
    );
}
