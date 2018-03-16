# GraphQL.js

https://graphql.org/graphql-js/


> The JavaScript reference implementation for GraphQL.

```sh

$ npm i -S graphql

```

> GraphQL.js provides two important capabilities: building a type schema, and serving queries against that type schema.


```js
// build a GraphQL type schema which maps to your code base.

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                    // fixed demo value
                }
            }
        }
    })
});

```

```js
// serve the result of a query against that type schema

var query = '{ hello }';

graphql(schema, query).then(result => {
    // Prints
    // {
    //     data: {
    //         hello: "world"
    //     }
    // }
    console.log(`result =`, result);
});

```

> The graphql function will first ensure the query is syntactically and semantically valid before executing it, reporting errors otherwise.

```js
var query = '{ boyhowdy }';

graphql(schema, query).then(result => {
    // Prints
    // {
    //     errors: [
    //         {
    //             message: 'Cannot query field boyhowdy on RootQueryType',
    //             locations: [
    //                 {
    //                     line: 1,
    //                     column: 3
    //                 }
    //             ]
    //         }
    //     ]
    // }
    console.log(`result =`, result);
});

```


### server.js

```js

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

```

## run GraphQL queries from an API server

> use GraphQL for an API server over HTTP

https://graphql.org/graphql-js/running-an-express-graphql-server/

https://github.com/graphql/express-graphql



```sh

$ npm i -S express express-graphql graphql


```

### GraphQL HTTP API Server

> URL


### space/comma

> error

http://localhost:8888/graphql?query=query{xyz{idname}}

> ok

http://localhost:8888/graphql?query=query{xyz{id name}}

http://localhost:8888/graphql?query=query{xyz{id, name}}


```js
// ok
let url = `http://localhost:8888/graphql?query=query{xyz{id name}}`;
let url = `http://localhost:8888/graphql?query=query{xyz{id, name}}`;


// error
let url = `http://localhost:8888/graphql?query=query{xyz{idname}}`;

```


```js

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

```

```js



# https://swapi.co/api/people/1/
query{
  person(personID: 1){
    name,
    birthYear,
  },
}

# https://swapi.co/api/people/666
# query{
#   person(personID: 666){
#     name,
#     birthYear,
#   },
# }

```