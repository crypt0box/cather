import { css } from "@/styled-system/css";

export default function Loading() {
  return (
    <div className={css({ display: "flex", justifyContent: "center" })}>
      <p>loading...</p>
    </div>
  );
}
