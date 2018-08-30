import React from "react";

const DefaultState = {
    authenticated: false,
};

export const { Provider, Consumer } = React.CreateContext(DefaultState);
