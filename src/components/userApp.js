import React from "react";
import styled from "styled-components";

import { borderRadius, boxShadow } from "./../common/styles";
import Card from "./../components/card";
import Pencil from "./../components/pencil";

const Button = styled.button`
    border-radius: 0.4rem;
    background: royalblue;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 2.5rem;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    ${boxShadow};
`;

const addZero = num => num.toString().padStart(2, "0");

function formatDate(str) {
    const date = new Date(str);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${addZero(day)}/${addZero(month)}/${year}`;
}

function UserApp({ app, editing, newLogo, newName, ...props }) {
    return (
        <Card
            key={app.id}
            src={app.logo}
            name={app.name}
            metadata={`Created at: ${formatDate(app.created)}`}
        >
            <div>
                <div>
                    <Button onClick={() => props.navigateToUsers(app.id)}>
                        See {app.name}'s users
                    </Button>
                    <Button onClick={() => props.toggleEditing(app.id)}>
                        {!editing ? "Edit App" : "Cancel Edit"}
                    </Button>
                </div>
                {editing && (
                    <form>
                        <input name="name" value={newName} onChange={props.handleInput} />
                        <input name="logo" value={newLogo} onChange={props.handleInput} />
                    </form>
                )}
            </div>
        </Card>
    );
}

export default UserApp;
