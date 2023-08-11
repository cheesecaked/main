import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { dataRequest } from "../util/data-request.js";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
type Post {
    text: String
    images: [String]
    _id: String
    createdAt: String
}

input PostInput {
    text: String
    images: [String]
}

type Query {
    getPosts: [Post]
}

type Mutation {
    createPost(postCreateInput: PostInput): ID,
    updatePost(id: ID!, postUpdateInput: PostInput): Post,
    deletePost(id: ID!): ID,
    getPostDetail(id: ID!): Post,
}
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const { documents } = await dataRequest("find", {});
      console.log(documents);
      return documents;
    },
  },
  Mutation: {
    createPost: async (_: any, args: any) => {
      const { text, images } = args.postCreateInput;
      const result = await dataRequest("insertOne", {
        document: {
          text,
          images,
        },
      });
      console.log(result);
      return result.insertedId;
    },
    updatePost: async (_: any, args: any) => {
      const { text, images } = args.postUpdateInput;
      const { document } = await dataRequest("updateOne", {
        filter: {
          _id: {
            $oid: args.id,
          },
        },
        update: {
          text: text,
          images: images,
        },
      });
      console.log(document);
      return document;
    },
    getPostDetail: async (_: any, args: any) => {
      const { document } = await dataRequest("findOne", {
        filter: {
          _id: {
            $oid: args.id,
          },
        },
      });
      console.log(document);
      return document;
    },
    deletePost: async (_: any, args: any) => {
      const { document } = await dataRequest("deleteOne", {
        filter: {
          _id: {
            $oid: args.id,
          },
        },
      });
      console.log(document)
      return document
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
