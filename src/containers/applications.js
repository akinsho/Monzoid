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
    color: green;
    width: 3.5rem;
    height: 3.5rem;
    margin: 0.5rem 0;
    background: royalblue;
    ${boxShadow};
`;

export default class Applications extends PureComponent {
    state = {
        value: "",
    };

    formatDate(str) {
        const addZero = num => num.toString().padStart(2, "0");
        const date = new Date(str);
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${addZero(day)}/${addZero(month)}/${year}`;
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    };

    onChange = evt => {
        const { value } = evt.currentTarget;
        if (value) {
            this.setState({ name: value });
        }
    };

    render() {
        return (
            <Query query={GET_USER_APPS}>
                {({ data, error, loading }) => {
                    if (error) {
                        return <h3>Woops... sorry something went wrong</h3>;
                    }
                    return !loading ? (
                        <Layout>
                            <h3>Apps</h3>
                            <List>
                                {data &&
                                    data.getUserApps &&
                                    data.getUserApps.apps.map(app => (
                                        <ListItem key={app.id}>
                                            <Image src={app.logo} />
                                            <div>{app.name}</div>
                                            <div>{this.formatDate(app.created)}</div>
                                            <EditButton onClick={this.toggleEditing}>
                                                {!this.state.editing ? <Pencil /> : "X"}
                                            </EditButton>
                                        </ListItem>
                                    ))}
                            </List>
                        </Layout>
                    ) : (
                        <Loading />
                    );
                }}
            </Query>
        );
    }
}
