import fs from "fs";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  await delay(3000);
  const comments = fs.readFileSync("comments.json", "utf8");
  const articles = fs.readFileSync("articles.json", "utf8");
  const articleId = JSON.parse(articles).articles.find(
    (a: any) => a.slug === slug
  ).id;
  const comment = JSON.parse(comments).comments.filter(
    (c: any) => c.articleId === articleId
  );
  return new Response(JSON.stringify(comment), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
