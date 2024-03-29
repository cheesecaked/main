import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
const POSTS = gql`
  query GetPosts {
    getPosts {
      text
      images
      _id
    }
  }
`;

const CRUD_POST = gql`
  mutation CrudPost($postCreateInput: PostInput) {
    createPost(postCreateInput: $postCreateInput)
  }
`;

export default function Home() {
  const [createPost, { loading, error, data }] = useMutation(CRUD_POST);
  const {
    loading: loadingQuery,
    error: errorQuery,
    data: dataQuery,
  } = useQuery(POSTS);
  const [input, setInput] = useState("");
  const [switchType, setSwitchType] = useState(false);
  console.log({ loading, error, data });

  return (
    <>
      {dataQuery &&
        dataQuery.getPosts.map((el: any) => {
          return (
            <TodoItem
              switchType={switchType}
              setSwitchType={setSwitchType}
              el={el}
              key={el._id}
            />
          );
        })}
      <input
        type="text"
        value={input}
        onChange={(input: any) => setInput(input.target.value)}
      />
      <button
        onClick={() => {
          createPost({
            variables: {
              postCreateInput: {
                text: input,
                images: ["nothing yet"],
              },
            },
          });
        }}
      >
        add post
      </button>
    </>
  );
}
const TodoItem = ({ switchType, setSwitchType, el }: any) => {
  return (
    <div
      style={{
        border: "1px solid",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {switchType ? <input /> : <div>{el.text}</div>}
      <div>
        <button
          style={{
            margin: 0,
          }}
          onClick={() => {
            console.log(el._id);
            setSwitchType(!switchType);
          }}
        >
          edit
        </button>
        <button
          style={{
            margin: 0,
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};
