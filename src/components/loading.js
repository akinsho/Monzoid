import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
    border: 1rem solid #f3f3f3;
    border-top: 1rem solid royalblue;
    border-radius: 50%;
    height: 6rem;
    width: 6rem;
    animation: ${spin} 2s linear infinite;
    z-index: 5;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default Loading;
