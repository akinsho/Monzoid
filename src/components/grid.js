import styled from "styled-components";

const Grid = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > li {
        margin: 0.4rem;
    }
`;

export default Grid;
