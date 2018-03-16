var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        // fixed data value
        return 'Hello world!';
    },
};

// fixed query String
const queryString = '{ hello }';
// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, queryString, root).then((response) => {
    console.log(response);
});