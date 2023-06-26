import NextLink from "next/link";
import { css } from "@/styled-system/css";

export default function Header() {
  return (
    <header>
      <div
        className={css({
          bg: "white",
          color: "gray.600",
          minH: "60px",
          py: 2,
          px: 2,
          borderBottom: 1,
          borderStyle: "solid",
          borderColor: "gray.200",
          alignItems: "center",
        })}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            maxW: "5xl",
            mx: "auto",
          })}
        >
          <h1 className={css({ fontSize: "lg" })}>
            <NextLink href="/">Blog App</NextLink>
          </h1>
          <NextLink
            className={css({
              fontSize: "sm",
              fontWeight: 600,
              color: "white",
              bg: "orange.400",
              _hover: { bg: "orange.300" },
            })}
            href="/articles/new"
          >
            記事を書く
          </NextLink>
        </div>
      </div>
    </header>
  );
}
