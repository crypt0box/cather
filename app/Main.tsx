import { css } from "@/styled-system/css";
import { container } from "@/styled-system/patterns";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        minH: "calc(100vh - 115px - 2rem)",
      })}
    >
      {children}
    </div>
  );
}
