import React from "react";
import styled from "styled-components";

import { borderRadius, boxShadow } from "./../common/styles";

const ListItem = styled.li`
    ${boxShadow};
    ${borderRadius};
    padding: 1rem;
    margin: 1rem 0;
    background: whitesmoke;
`;

const Image = styled.img`
    width: 20rem;
    height: auto;
`;

function Card(props) {
    return (
        <ListItem>
            <Image src={props.src} />
            <h4>{props.name}</h4>
            <div>{props.metadata}</div>
            <div>{props.children}</div>
        </ListItem>
    );
}

export default Card;
