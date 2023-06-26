import { css } from "@/styled-system/css";
import { container } from "@/styled-system/patterns";

export default function Footer() {
  return (
    <footer className={css({ bg: "gray.50", color: "gray.700" })}>
      <div className={container({ maxW: "5xl", py: 4 })}>
        <p className={css({ fontSize: "small" })}>© 2023 cryptoooon</p>
      </div>
    </footer>
  );
}
