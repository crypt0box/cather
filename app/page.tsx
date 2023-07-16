import { Article } from "./types";
import NextLink from "next/link";

async function getArticles() {
  const res = await fetch("http://localhost:3000/api", {
    cache: "no-store",
  });

  // エラーハンドリングを行うことが推奨されている
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data.articles as Article[];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <h1>新着記事</h1>
      <NextLink href="/books/1">詳細</NextLink>
    </div>
  );
}
