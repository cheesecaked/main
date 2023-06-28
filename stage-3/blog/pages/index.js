import { Inter } from "next/font/google";
import * as React from "react";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/joy";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [articles, setArticles] = useState();

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=nataliedeweerd`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className={styles.card_container}>
      {articles &&
        articles.map((article, index) => {
          console.log(articles.cover_image);
          return (
            <CardComponent key={index} article={article} />
            // <div
            //   onClick={() => {
            //     window.location.pathname = article.slug;
            //   }}
            //   key={index}
            //   className={styles.post_container}
            // >
            //   {
            //     article?.cover_image && (
            //       <Image
            //       src={article.cover_image}
            //       width={500}
            //       height={500}
            //       alt="Picture of the author"
            //     />
            //     )
            //   }

            //   <h1 style={{
            //     margin: "0"
            //   }}>{article.title}</h1>
            // </div>
          );
        })}
    </div>
  );
}

const CardComponent = ({ article }) => {
  console.log(article);
  return (
    <Card variant="outlined" sx={{ width: 520 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          {article.cover_image && <img src={article.cover_image} alt="asdasd" />}
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="h2" fontSize="md">
          <Link href={article.slug} overlay underline="none">
            {article.title}
          </Link>
        </Typography>
        <Typography display={"flex"} alignItems={"center"} flexDirection={"row"} gap={1} level="body2" sx={{ mt: 0.5 }}>
          <Avatar width={50}height={50} src={article.user.profile_image}/>
          {article.user.username}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            6.3k views
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            1 hour ago
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};
