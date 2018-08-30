import React, { PureComponent, Fragment } from "react";
import styled from "styled-components";

const Img = styled.img`
    width: 20rem;
    height: auto;
    visibility: ${({ loaded }) => (loaded ? "visible" : "hidden")};
`;

function Placeholder(props) {
    return (
        <svg width="20rem" height="10rem" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="10" ry="10" fill="#CCC" />
            <text
                x="50"
                y="30"
                fill="black"
                fontSize="0.6rem"
                textAnchor="middle"
                style={{ whiteSpace: "pre-line" }}
            >
                {props.alt}
            </text>
        </svg>
    );
}

class Image extends PureComponent {
    state = { loaded: false };
    setLoaded = loaded => this.setState({ loaded });

    render() {
        const { loaded } = this.state;
        return (
            <Fragment>
                {!loaded && <Placeholder alt={this.props.alt} />}
                <Img {...this.props} loaded={loaded} onLoad={() => this.setLoaded(true)} />
            </Fragment>
        );
    }
}

export default Image;
