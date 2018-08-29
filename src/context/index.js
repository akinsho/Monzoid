import React from "react";

const DefaultState = {
    accessToken: "",
};

export const { Provider, Consumer } = React.CreateContext(DefaultState);
