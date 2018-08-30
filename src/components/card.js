import React from "react";
import styled from "styled-components";

import { borderRadius, boxShadow } from "./../common/styles";
import Heading from "./heading";

const ListItem = styled.li`
    ${boxShadow};
    ${borderRadius};
    height: ${({ height = "30rem" }) => height};
    width: ${({ width = "15rem" }) => width};
    overflow: auto;
    padding: 1rem;
    margin: 1rem 0;
    background: whitesmoke;
`;

const Image = styled.img`
    width: 20rem;
    height: auto;
`;

const Subsection = styled.div`
    text-align: center;
`;

function Card(props) {
    return (
        <ListItem height={props.tall && "40rem"} width={props.wide && "20rem"}>
            <Image src={props.src} alt={`Picture of ${props.name}`} />
            <Heading color="black">{props.name}</Heading>
            <Subsection>{props.metadata}</Subsection>
            <Subsection>{props.children}</Subsection>
        </ListItem>
    );
}

export default Card;
