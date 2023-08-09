import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
type Post {
    text: String
    images: [String]
    userId: String
    createdAt: String
}

input PostInput {
    text: String
    images: [String]
}

type Query {
    getPosts: [Post]
    getPostDetail: Post
}

type Mutation {
    createPost(postCreateInput: PostInput!): Post,
    updatePost(id: ID!, postUpdateInput: PostInput!): Post,
    deletePost(id: ID!): ID
}
`;
const resolvers = {
    Query: {
        getPosts: () => {
        },
        getPostDetail: () => {
        }
    },
    Mutation: {
        createPost: () => {
        },
        updatePost: () => {
        },
        deletePost: () => {
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
