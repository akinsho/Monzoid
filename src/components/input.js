import styled from "styled-components";
import { boxShadow, borderRadius } from "./../common/styles";

const Input = styled.input`
    width: 100%;
    border: none;
    margin: 0.5rem 0;
    outline: none;
    padding: 0.5rem;
    height: ${({ height = "2rem" }) => height};
    font-size: ${({ fontSize = "1.2rem" }) => fontSize};
    ${boxShadow};
    ${borderRadius};

    ${({ empty }) =>
        !empty &&
        `:invalid {
            border: 0.2rem dashed red;
        }
    `};

    :valid {
        border: 0.2rem solid green;
    }

    :focus {
        border: 0.2rem solid royalblue;
    }
`;

export default Input;
