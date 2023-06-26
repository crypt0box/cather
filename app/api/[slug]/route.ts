import fs from "fs";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  await delay(1000);
  const articles = fs.readFileSync("articles.json", "utf8");
  const article = JSON.parse(articles).articles.find(
    (a: any) => a.slug === slug
  );
  if (!article) {
    return new Response(null, {
      status: 404,
    });
  }
  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(req: NextRequest) {
  delay(1000);
  const slug = req.url;
  const { title, content } = await req.json();
  const articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));
  const article = articles.find((a: any) => a.slug === slug);
  if (!article) {
    return new Response(null, {
      status: 404,
    });
  }
  article.title = title;
  article.content = content;
  article.updatedAt = new Date();
  fs.writeFileSync("articles.json", JSON.stringify(articles));
  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
