import { css } from "@/styled-system/css";
import { container } from "@/styled-system/patterns";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={container({
        maxW: "lg",
        my: 4,
        minH: "calc(100vh - 115px - 2rem)",
      })}
    >
      {children}
    </div>
  );
}
