import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
`;

const HeartShape = styled(HeartSvg)`
    fill: red;
    width: 1rem;
    position: absolute;
    margin: 0 auto;
    top: 0
    right: 0;
    animation: ${pulse} 1.5s ease infinite;
`;

function HeartSvg(props) {
    return (
        <svg className="heart" viewBox="0 0 32 29.6" {...props}>
            <path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z" />
        </svg>
    );
}

export default function Heart(props) {
    return <HeartShape />;
}
