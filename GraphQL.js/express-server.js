var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
// log4js
var log4js = require('log4js');
// Helmet helps you secure your Express apps by setting various HTTP headers. 
var helmet = require('helmet')

// log4js.configure({
//     appenders: [
//         {
//             type: 'console',
//             // 控制台输出
//         },
//         {
//             type: 'file',
//             // 文件输出
//             filename: 'logs/access.log', 
//             maxLogSize: 1024,
//             backups: 3,
//             category: 'normal',
//             // ???
//         }
//     ],
//     replaceConsole: true,
// });

// var logger = log4js.getLogger('normal');
// logger.setLevel('INFO');
// log4js的输出级别6个: trace, debug, info, warn, error, fatal
// 如果输出级别是INFO，则不会打印出低于info级别的日志trace,debug，只打印info,warn,error,fatal。

// app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO, format: ':method :url'}));

// app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
// app.use(app.router);

// import 'whatwg-fetch';
// var fetch= require('whatwg-fetch');
// require('whatwg-fetch');

// Construct a schema, using GraphQL schema language
let schema1 = buildSchema(`
    type Query {
        xyz: User
        # Object
    },
    type User {
        id: ID
        #id: ID!
        name: String
        age: Int
        #Error: Type "Number" not found in document.
        #age: Number
        #age: String
    }
`);



let schema2 = buildSchema(`
    type Query {
        hello: String
        # String
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

function loggingMiddleware(req, res, next) {
    console.log('ip:', req.ip);
    next();
}

// Middleware
function xyz_logger(req, res, next){
    console.log(new Date(), req.method, req.url);
    next();
}

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    abc: () => `666!`,
    xyz: (args, request) => {
        console.log(`query string & args = `, args);
        // {}
        // console.log(`query string & request= `, request);
        console.log(`query string & request= `, request.originalUrl);
        console.log(`query string & request= `, request.baseUrl);
        console.log(`query string & request= `, request.url);
        console.log(`query string & request= `, request.query);
        console.log(`query string & request= `, request.method);
        // IncomingMessage {}
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
// helmet
app.use(helmet());
// logs
// auto 日志级别对应规则: http responses 3xx, level = WARN; http responses 4xx & 5xx, level = ERROR; other http responses level = INFO;
// app.use(log4js.connectLogger(logger, {
//     level: 'auto',
//     format:':method :url'
// }));

// exports.logger = function (name) {
//     var logger = log4js.getLogger(name);
//     logger.setLevel('INFO');
//     return logger;
// };

// app.use(log4js.connectLogger(logger, {
//     level: log4js.levels.INFO,
//     format: ':method :url'
// }));
// app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
// express-middleware
// app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema1,
    rootValue: root,
    // graphiql: true, // only for debugger
    graphiql: false,// production mode
}));

const port = 8888;
app.listen(port);
// let host = `http://localhost:${port}/graphql`;
let host = ` http://localhost:${port}/graphql?query=query{}`;
console.log(`Running a GraphQL API server at:\n`, host);


/* 

// test 

query{
    hello
}

# http://localhost:8888/graphql?query=query{hello}
# http://localhost:8888/graphql?query=query%7Bhello%7D
# http://localhost:8888/graphql?query=query%7B%0A%20%20%20%20hello%0A%7D

# http://localhost:8888/graphql?query=query{xyz}
# http://localhost:8888/graphql?query=query{xyz{id}}
# http://localhost:8888/graphql?query=query{xyz{name}}
# http://localhost:8888/graphql?query=query{xyz{id,name}}
# http://localhost:8888/graphql?query=query{xyz{id name}}
# http://localhost:8888/graphql?query=query{xyz{age}}


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