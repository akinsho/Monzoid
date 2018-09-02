import React from "react";
import styled from "styled-components";

import { borderRadius, boxShadow, flexColumn } from "./../common/styles";
import Card from "./../components/card";
import Button from "./../components/button";
import Input from "./../components/input";

const UpdateForm = styled.form`
    width: 80%;
    ${flexColumn};
`;

const Contents = styled.div`
    ${flexColumn};
`;

const formatDate = dateStr => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

function UserApp({ app, editing, newLogo, newName, ...props }) {
    return (
        <Card
            wide
            key={app.id}
            src={app.logo}
            name={app.name}
            metadata={`Created at: ${formatDate(app.created)}`}
        >
            <Contents>
                <Button fontSize="0.8rem" onClick={() => props.navigateToUsers(app.id)}>
                    See {app.name}'s users
                </Button>
                <Button fontSize="0.8rem" onClick={() => props.toggleEditing(app.id)}>
                    {!editing ? "Edit App" : "Cancel Edit"}
                </Button>
                {editing && (
                    <UpdateForm>
                        <Input
                            name="name"
                            value={newName}
                            placeholder="Please enter a new name"
                            onChange={props.handleInput}
                        />
                        <Input
                            name="logo"
                            value={newLogo}
                            placeholder="Please enter a new logo url"
                            onChange={props.handleInput}
                        />
                        <Button onClick={props.handleSubmit}>Submit</Button>
                    </UpdateForm>
                )}
            </Contents>
        </Card>
    );
}

export default UserApp;
