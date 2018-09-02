import React from "react";
import styled from "styled-components";

import { borderRadius, boxShadow } from "./../common/styles";
import Heading from "./heading";
import Image from "./image";

const ListItem = styled.li`
    box-shadow: 0.1rem 0.4rem 0.2rem rgba(0, 0, 0, 0.4);
    ${borderRadius};
    height: ${({ height = "30rem" }) => height};
    width: ${({ width = "15rem" }) => width};
    overflow: auto;
    padding: 1rem;
    margin: 1rem 0;
    background: whitesmoke;
`;

const Subsection = styled.div`
    text-align: center;
`;

function Card(props) {
    return (
        <ListItem height={props.tall ? "40rem" : null} width={props.wide ? "20rem" : null}>
            <Image src={props.src} alt={`Picture of ${props.name}`} />
            <Heading color="black">{props.name}</Heading>
            <Subsection>{props.metadata}</Subsection>
            <Subsection>{props.children}</Subsection>
        </ListItem>
    );
}

export default Card;
