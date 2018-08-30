import React, { Fragment, PureComponent } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import Page from "./../containers/page";
import { GET_USER_APPS } from "./../graphql/getUserApps";
import { borderRadius, boxShadow } from "./../common/styles";
import Loading from "./../components/loading";
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

const Button = styled.button`
    border-radius: 0.4rem;
    background: royalblue;
    color: white;
    width: 6rem;
    height: 2.5rem;
    margin: 0.5rem 0;
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

function UserApp({ app, toggleEditing, handleInput, editing, newLogo, newName }) {
    return (
        <ListItem key={app.id}>
            <Image src={app.logo} />
            <div>{app.name}</div>
            <div>{formatDate(app.created)}</div>
            <div>
                <Button>See app's users</Button>
                <Button onClick={() => toggleEditing(app.id)}>
                    {!editing ? "Edit App" : "Cancel Edit"}
                </Button>
                {editing && (
                    <form>
                        <input name="name" value={newName} onChange={handleInput} />
                        <input name="logo" value={newLogo} onChange={handleInput} />
                    </form>
                )}
            </div>
        </ListItem>
    );
}

export default class Applications extends PureComponent {
    state = {
        name: "",
        logo: "",
        editing: null,
    };

    toggleEditing = id => {
        const { editing } = this.state;
        const newEdit = id !== editing ? id : null;
        this.setState({ editing: newEdit });
    };

    onChange = evt => {
        const { value, name } = evt.currentTarget;
        this.setState({ [name]: value });
    };

    render() {
        const { editing, logo, name } = this.state;
        return (
            <Page>
                <Query query={GET_USER_APPS}>
                    {({ data, error, loading }) => (
                        <Fragment>
                            <h3>Apps</h3>
                            {loading ? (
                                <Loading />
                            ) : error || !data ? (
                                <h3>Woops... sorry something went wrong</h3>
                            ) : (
                                <List>
                                    {data.getUserApps.apps &&
                                        data.getUserApps.apps.map(app => (
                                            <UserApp
                                                app={app}
                                                key={app.id}
                                                newName={name}
                                                newLogo={logo}
                                                editing={editing === app.id}
                                                handleInput={this.onChange}
                                                toggleEditing={this.toggleEditing}
                                            />
                                        ))}
                                </List>
                            )}
                        </Fragment>
                    )}
                </Query>
            </Page>
        );
    }
}
