import { css } from "@/styled-system/css";
import Image from "next/image";

export default function Book({ params }: { params: { slug: string } }) {
  return (
    <article>
      <section
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          bg: "green.100",
        })}
      >
        <Image
          className={css({
            rounded: "2px",
            boxShadow:
              "rgba(5, 27, 68, 0.4) -6px 6px 10px -2px, rgba(0, 21, 60, 0.1) 0px 0px 3px;",
          })}
          width={160}
          height={224}
          src="data:image/jpeg;base64,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"
          alt="タイトル"
        />
      </section>
      <h1>書籍の詳細</h1>
      <p>書籍のスラッグ: {params.slug}</p>
    </article>
  );
}
