import React from "react";
import { Router as ReachRouter } from "@reach/router";
import styled from "styled-components";

import Login from "./login";
import Applications from "./applications";

const Router = styled(ReachRouter)`
    width: 100%;
    height: 100%;
`;

function Home(props) {
    return (
        <Router>
            <Applications path="/apps" />
            <Login path="/login" />
        </Router>
    );
}

export default Home;
