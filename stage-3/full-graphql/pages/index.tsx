import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
const POSTS = gql`
  query GetPosts {
    getPosts {
      text
      images
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($postCreateInput: PostInput) {
    createPost(postCreateInput: $postCreateInput)
  }
`;

export default function Home() {
  const [createPost, { loading, error, data }] = useMutation(CREATE_POST);
  const {
    loading: loadingQuery,
    error: errorQuery,
    data: dataQuery,
  } = useQuery(POSTS);
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(dataQuery);
  }, [loadingQuery]);
  // const [taskItems, setTaskItems] = useState([]);

  // const handleSubmit = () => {
  //   setTaskItems([...taskItems, input]);
  //   setInput("");
  // };
  console.log(items);
  console.log({ loading, error, data });
  return (
    <>
      {/* {
        items.map((el: any) => {
          return <div>{el.text}</div>
        })
      } */}
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
          // handleSubmit();
        }}
      >
        add post
      </button>
    </>
  );
}
