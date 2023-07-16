import { css } from "@/styled-system/css";

export default function Book({ params }: { params: { slug: string } }) {
  return (
    <article>
      <section className={css({ height: "400px", bg: "green.100" })}></section>
      <h1>書籍の詳細</h1>
      <p>書籍のスラッグ: {params.slug}</p>
    </article>
  );
}
