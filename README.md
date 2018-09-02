## Monzoid

The developer's developer portal. Monzoid allows a verified user to login
and view and update their apps, as well as its users (psst.. it's a dummy
API).

It's built with React, styled-components and GraphQL (using `react-apollo` `apollo-link-rest`)
It currently uses local state management as opposed to `redux` but given
time I'd ideally like to switch to using `Context -> <Context />` as it is
a simpler strategy with a smaller api and given that most of the data is
fed in by graphql i'd need to clarify what was really required across the
app.

Currently its error handling needs some work, I'm planning on adding an
`ErrorHandler` component to wrap the `Queries` and `Mutations` return
values.
