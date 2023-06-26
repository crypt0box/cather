// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "../types";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function GET() {
  await delay(1500);
  const articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));
  articles.articles.sort((a: any, b: any) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });
  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  await delay(1000);
  const { title, content } = await req.json();
  const articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));
  const id = articles.articles.length + 1;
  const date = new Date();
  const slug = randomUUID();
  const newArticle = {
    id,
    title,
    slug,
    content,
    createdAt: date,
    updatedAt: date,
  };
  articles.articles.push(newArticle);
  fs.writeFileSync("articles.json", JSON.stringify(articles));
  return new Response(JSON.stringify(newArticle), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
