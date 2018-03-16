# GAIO

GAIO: GraphQL All In One


```sh

$ npm i -D nodemon babel-cli babel-preset-es2015 babel-preset-stage-0

$ npm i -S express cors body-parser graphql graphql-server-express graphql-tools

$ npm i -S graphql-subscriptions subscriptions-transport-ws

$ npm i -g nodemon

$ npm i -D cowsay

$ npm install -g npx

```

## npx

https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b

https://github.com/zkat/npx


## GraphQL Tutorial

https://graphql.cn/learn/

https://graphql.cn/code/

https://graphql.cn/blog/

https://spec.graphql.cn/

https://facebook.github.io/graphql/October2016/

https://www.youtube.com/watch?v=9sc8Pyc51uU

https://graphql.org/

https://stackoverflow.com/questions/tagged/graphql


> GraphiQL

https://github.com/graphql/graphiql

https://graphql.org/swapi-graphql/

https://github.com/graphql/swapi-graphql

> SWAPI - The Star Wars API

https://swapi.co/

```js

# Welcome to GraphiQL
#
# GraphiQL is an in-browser IDE for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will
# see intelligent typeaheads aware of the current GraphQL type schema and
# live syntax and validation errors highlighted within the text.
#
# To bring up the auto-complete at any point, just press Ctrl-Space.
#
# Press the run button above, or Cmd-Enter to execute the query, and the result
# will appear in the pane to the right.

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


```json
{
    "data": {
        "person": {
            "name": "Luke Skywalker",
            "birthYear": "19BBY"
        }
    }
}

```

```json

{
    "errors": [
        {
            "message": "No entry in local cache for http://swapi.co/api/people/666/",
            "locations": [
                {
                    "line": 25,
                    "column": 3
                }
            ],
            "path": [
                "person"
            ]
        }
    ],
    "data": {
        "person": null
    }
}

```


## GraphQL for VSCode

https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode


## shell


https://node-cli-tools.xgqfrms.xyz/


> node.js

```sh

#!/usr/bin/env node

```

> Linux/Unix

```sh

#!/bin/bash

```

> 'sh' is not recognized as an internal or external command, operable program or batch file.




https://stackoverflow.com/questions/32057785/what-is-the-difference-between-falcor-and-graphql



## open `8888``port bug

> dynamic port bug???



```json

{
    "scripts": {
        "start": "npm run open && npm run download && babel-node src/server/main.js",
        "open": "start http://localhost:8888",
    },
}

```

```js

// Listen for incoming HTTP requests
const listener = app.listen(() => {
    let host = listener.address().address;
    if (host === '::') {
        host = 'localhost';
    }
    // dynamic port bug???
    // const port = 8888;
    const port = listener.address().port;
    /* eslint-disable no-console */
    console.log(`port =`, port);
    console.log('Listening at http://%s%s', host, port === 80 ? '' : `:${port}`);
    /* eslint-enable no-console */
});

```

https://graphql.cn/code/#javascript
https://github.com/graphql/graphql-js/

## GraphQL.js

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


## bootstrap

```sh

$ npm i -S bootstrap

```

http://getbootstrap.com/docs/4.0/getting-started/download/






