import React from "react";
import styled from "styled-components";

import { boxShadow, borderRadius } from "./../common/styles";

const Button = styled.button`
    height: 3rem;
    border: none;
    font-size: ${({ fontSize = "1.2rem" }) => fontSize};
    margin: 1rem 0;
    ${boxShadow};
    ${borderRadius};
    width: ${({ width }) => width || "80%"};
`;

export default Button;
