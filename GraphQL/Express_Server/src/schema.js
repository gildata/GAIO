import {
    makeExecutableSchema,
} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
    type Channel {
        id: ID!
        #注释 ! 表示必填字段
        name: String
        messages: [Message]!
        #注释 一个 Message 类型的数组
    }
    type Message {
        id: ID!
        text: String
    }
    # This type specifies the entry points into our API. In this case
    # there is only one - "channels" - which returns a list of channels.
    type Query {
        channels: [Channel]
        # "[]" means this is a list of channels
        channel(id: ID!): Channel
    }
    # The mutation root type, used to define all mutations.
    type Mutation {
        # A mutation to add a new channel to the list of channels
        addChannel(name: String!): Channel
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
