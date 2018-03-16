var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// import 'whatwg-fetch';
// var fetch= require('whatwg-fetch');
// require('whatwg-fetch');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        xyz: User
        # Object
    },
    type User {
        id: ID
        #id: ID!
        name: String
        #age: Number
        #Error: Type "Number" not found in document.
    }
`);

/* 

{
  xyz{
    id,
    name
  }
}


{
  "data": {
    "xyz": {
      "id": null,
      "name": null
    }
  }
}

*/

// Error: Type "Query" was defined more than once.

/* 
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);
    type Query {
        xyz: User
        # Object
    },
    type User {
        id: ID
        #id: ID!
        name: String
    }
*/

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    abc: () => `666!`,
    xyz: (str) => {
        console.log(`query string = `, str);
        let result = {};
        // fetch  data
        // const url = `http://localhost:8888/data.json`;
        // const url = `./data.json`;
        // fetch(url)
        // .then(res => res.json())
        // .then(json => {
        //     if(`data` in json){
        //         console.log(`json =\n`, JSON.stringify(json, null, 4));
        //     }else{
        //         // no data
        //         console.log(`json errors=\n`, JSON.stringify(json, null, 4));
        //     }
        // })
        // .catch(err => console.log(`error =`, err));
        result = {
            "id": `007`,
            "name": `xgqfrms`,
            "age": 23,// no useful, no more
        };
        return result;
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    // graphiql: true, // only for debugger
    graphiql: false,// production mode
}));

const port = 8888;
app.listen(port);
let host = `http://localhost:${port}/graphql`;
console.log(`Running a GraphQL API server at:\n`, host);


/* 

// test 

query{
    hello
}

# http://localhost:8888/graphql?query=query{hello}
# http://localhost:8888/graphql?query=query%7Bhello%7D
# http://localhost:8888/graphql?query=query%7B%0A%20%20%20%20hello%0A%7D


// {
//     "data": {
//         "hello": "Hello world!"
//     }
// }

const url = `http://localhost:8888/graphql?query=query{hello}`;

fetch(url)
.then(res => res.json())
.then(json => {
    if(`data` in json){
        console.log(`json =\n`, JSON.stringify(json, null, 4));
    }else{
        // no data
        console.log(`json errors=\n`, JSON.stringify(json, null, 4));
    }
    
})
.catch(err => console.log(`error =`, err));

*/