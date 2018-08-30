import styled from "styled-components";

const Heading = styled.h4`
    text-transform: uppercase;
    color: ${({ color }) => color || "white"};
`;

export default Heading;
