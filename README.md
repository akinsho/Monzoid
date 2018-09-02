## Monzoid

The developer's developer portal. Monzoid allows a verified user to login
and view and update their apps, as well as its users (psst.. it's a dummy
API).

It's built with React, styled-components and GraphQL (using `react-apollo` `apollo-link-rest`)
The project is bundled using `parcel` as its simple to setup and get up and
running with.

It currently uses local state management as opposed to `redux` but given
time I'd ideally like to switch to using `Context -> <Context />` as it is
a simpler strategy with a smaller api and given that most of the data is
fed in by graphql i'd need to clarify what was really required across the
app.

Currently its error handling needs some work, I'm planning on adding an
`ErrorHandler` component to wrap the `Queries` and `Mutations` return
values.

### Todo

-   [ ] Tests!!

### Run Locally

1.  Clone this repository.
1.  Run `yarn` or `npm install`
1.  **Important** create a `.env` file _now_ and add

```
    API_URL=https://guarded-thicket-22918.herokuapp.com
```

-   parcel is occasionally flaky at picking up a `.env` file so having it
    setup before you run the project is a good way to get around this

1.  `yarn start` or `npm start` and navigate to `localhost:1234`
