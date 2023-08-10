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
    userId: String
    createdAt: String
}

input PostInput {
    text: String
    images: [String]
}

type Query {
    getPosts: [Post]
    getPostDetail(id: ID!): Post
}

type Mutation {
    createPost(postCreateInput: PostInput): ID,
    updatePost(id: ID!, postUpdateInput: PostInput): Post,
    deletePost(id: ID!): ID,
    helloMutation:String
}
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const { documents } = await dataRequest("find", {});
      console.log(documents);
      return documents;
    },
    getPostDetail: async (_: any, args: any) => {
        const { id } = args.getPostDetailId
      const { document } = await dataRequest("findOne", {
        filter: {
          _id: {
            $oid: id
          },
        },
      });
      console.log(document);
      return document;
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
      const { text, images, id } = args.postUpdateInput;
      const result = await dataRequest("", {});
    },
    deletePost: () => {},
    helloMutation: () => "HI",
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
