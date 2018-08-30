import React from "react";
import { Router as ReachRouter } from "@reach/router";
import styled from "styled-components";

import Users from "./users";
import Login from "./login";
import Applications from "./applications";

const Router = styled(ReachRouter)`
    width: 100%;
    height: 100%;
`;

function Home(props) {
    return (
        <Router>
            <Login path="/" />
            <Applications path="/apps" />
            <Users path="/users/:id" />
        </Router>
    );
}

export default Home;
