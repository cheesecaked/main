import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/joy";
import Comment from "../components/comment";

export default function Home() {
  const [article, setArticle] = useState();
  const [comment, setComment] = useState();

  const router = useRouter();

  const { username, slug } = router.query;

  const getArticle = async () => {
    const articleData = await fetch(
      `https://dev.to/api/articles/${username}/${slug}`
    ).then((res) => res.json());
    const commentData = await fetch(
      `https://dev.to/api/comments?a_id=${articleData.id}`
    ).then((res) => res.json());

    setArticle(articleData);
    setComment(commentData);

    console.log(commentData);
  };

  useEffect(() => {
    if (slug) {
      getArticle();
    }
  }, [slug]);
  if (!article) return <div>Loading...</div>;

  return (
    <>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body_html }} />
      <hr></hr>
      {comment &&
        comment.map(({ id_code, user, body_html, children }) => {
          return (
            <Comment
              key={id_code}
              user={user}
              body_html={body_html}
              children={children}
            />)
        })}
    </>
  );
}
