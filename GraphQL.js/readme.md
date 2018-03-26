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


## curl

https://graphql.org/graphql-js/graphql-clients/

```sh
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql

# curl -X POST -H "Content-Type: application/json" -d '{"query": "{ hello }"}' http://localhost:4000/graphql


```

## XHR

```js

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", " http://localhost:8888/graphql");
// xhr.open("POST", "/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
// callback function
xhr.onload = function () {
    console.log('data returned:', xhr.response);
}
xhr.send(JSON.stringify({query: "{xyz{name}}"}));

```


## fetch

```js
// get
const url = `http://localhost:8888/graphql?query=query{xyz{name}}`;

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


// post
// const url = `http://localhost:8888/graphql?query=query{xyz{name}}`;

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        query: "{xyz{name}}"
    })
})
.then(res => res.json())
.then(json => {
    console.log(`json =\n`, JSON.stringify(json, null, 4));
})
.catch(err => console.log(`fetch post data error =`, err));
// console.log(`%c fetch post data!`, color);

```

## Relay


https://facebook.github.io/relay/docs/en/prerequisites.html

https://www.graph.cool/

## apollo

https://www.apollographql.com/client/

https://github.com/apollographql

https://github.com/apollographql/apollo-client

https://github.com/apollographql/react-apollo

https://github.com/apollographql/apollo-server



## express-middleware

https://graphql.org/graphql-js/authentication-and-express-middleware/


```js

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        ip: String
    }
`);

function loggingMiddleware(req, res, next) {
    console.log('ip:', req.ip);
    next();
}

var root = {
    ip: function (args, request) {
        return request.ip;
    }
};

var app = express();
// express-middleware
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

```


## authentication

http://www.passportjs.org/
https://github.com/jaredhanson/passport

https://github.com/auth0/express-jwt
https://github.com/expressjs/session

https://github.com/expressjs/morgan

https://github.com/log4js-node/log4js-node
http://blog.fens.me/nodejs-log4js/
https://stackoverflow.com/questions/22401319/write-logs-in-file-using-log4js-in-node-js


https://github.com/winstonjs/winston
https://github.com/foreverjs/forever



https://expressjs.com/en/guide/using-middleware.html

https://github.com/expressjs/body-parser
https://github.com/expressjs/session
https://github.com/expressjs/multer
https://github.com/expressjs/cors



https://stormpath.com/blog/how-to-write-middleware-for-express-apps

https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions

https://stormpath.com/blog/build-nodejs-express-stormpath-app


## log4js

```sh

$ npm i -s log4js

```

## node-inspector

https://github.com/node-inspector/node-inspector

```sh

$ npm i -g node-inspector

#$ node-debug app.js

```

## helmet

https://github.com/helmetjs/helmet

https://helmetjs.github.io/docs/hide-powered-by/

```sh

$ npm i -S helmet

```

## CLI tools

> Node-CLI-Tools

```sh

$ npm i -S node-fetch colors

$ npm i -D shelljs

```

```js

const fetch = require('node-fetch');

const colors = require('colors');

```


https://graphql.cn/learn/

https://graphql.cn/graphql-js/

