import React, { Fragment, PureComponent } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import { GET_USER_APPS } from "./../graphql/getUserApps";
import { borderRadius, boxShadow } from "./../common/styles";
import Loading from "./../components/loading";
import Layout from "./../components/layout";
import Pencil from "./../components/pencil";

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

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

const EditButton = styled.button`
    border-radius: 50%;
    color: white;
    width: 3.5rem;
    height: 3.5rem;
    margin: 0.5rem 0;
    background: royalblue;
    display: flex;
    align-items: center;
    justify-content: center;
    ${boxShadow};
`;

function formatDate(str) {
    const addZero = num => num.toString().padStart(2, "0");
    const date = new Date(str);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${addZero(day)}/${addZero(month)}/${year}`;
}

function UserApp(props) {
    return (
        <ListItem key={props.app.id}>
            <Image src={props.app.logo} />
            <div>{props.app.name}</div>
            <div>{formatDate(props.app.created)}</div>
            <div>
                <EditButton onClick={() => toggleEditing(props.app.id)}>
                    {!props.editing ? <Pencil /> : "X"}
                </EditButton>
                {props.editing && (
                    <input name={props.app.id} value={props.newName} onChange={props.handleInput} />
                )}
            </div>
        </ListItem>
    );
}

export default class Applications extends PureComponent {
    state = {
        inputs: {},
        edits: [],
    };

    toggleEditing = id => {
        const { edits } = this.state;
        const newEdits = edits.includes(id)
            ? edits.filter(editId => editId !== id)
            : [...edits, id];
        this.setState({ edits: newEdits });
    };

    onChange = evt => {
        const { value, name } = evt.currentTarget;
        if (value) {
            this.setState(state => ({ ...state, inputs: { ...state.inputs, [name]: value } }));
        }
    };

    render() {
        const { edits, inputs } = this.state;
        return (
            <Query query={GET_USER_APPS}>
                {({ data, error, loading }) => {
                    return (
                        <Layout>
                            <h3>Apps</h3>
                            {!loading ? (
                                error ? (
                                    <h3>Woops... sorry something went wrong</h3>
                                ) : (
                                    <List>
                                        {data &&
                                            data.getUserApps.apps.map(app => {
                                                const editing = edits.includes(app.id);
                                                return (
                                                    <UserApp
                                                        app={app}
                                                        key={app.id}
                                                        editing={editing}
                                                        newName={inputs[app.id]}
                                                        handleInput={this.handleInput}
                                                        toggleEditing={this.toggleEditing}
                                                    />
                                                );
                                            })}
                                    </List>
                                )
                            ) : (
                                <Loading />
                            )}
                        </Layout>
                    );
                }}
            </Query>
        );
    }
}
