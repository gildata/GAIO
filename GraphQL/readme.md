# GraphQL



https://scotch.io/tutorials/implementing-graphql-using-apollo-on-an-express-server

https://scotch.io/tutorials/implementing-graphql-in-react-using-apollo


## GraphQL clients

GraphQL clients communicate with GraphQL servers via queries and mutations. 

> GraphQL vs REST

1. Queries === GET
2. Mutations === POST, PUT, 和其他 http 动词

```js
// GraphQL
query {
    projects {
        name
        tagline
    }
}

```

```js

query {
    //Fetch a project whose id is 1
    project(id: "1"){
        name
        tagline
    }
}

```