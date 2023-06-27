import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [articles, setArticles] = useState();

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=nataliedeweerd`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      {articles &&
        articles.map((article, index) => {
          console.log(articles.cover_image)
          return (
            <div
              onClick={() => {
                window.location.pathname = article.slug;
              }}
              key={index}
              className={styles.post_container}
            >
              {
                article?.cover_image && (
                  <Image
                  src={article.cover_image}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
                )
              }
             
              <h1 style={{
                margin: "0"
              }}>{article.title}</h1>
            </div>
          );
        })}
    </>
  );
}
