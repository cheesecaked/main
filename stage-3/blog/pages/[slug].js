import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [article, setArticle] = useState();

  const router = useRouter();

  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetch(`https://dev.to/api/articles/nataliedeweerd/${slug}`)
        .then((res) => res.json())
        .then((data) => setArticle(data));
    }
  }, [slug]);
  if (!article) return <div>Loading...</div>;

  return (
    <>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body_html }} />
    </>
  );
}
