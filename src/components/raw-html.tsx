import parse from "html-react-parser";
import { type ReactNode } from "react";

type RawHtmlProps = { content: string; children: ReactNode[] };

function RawHtml({ content, children }: RawHtmlProps) {
  /*TODO: templateinterpolation"*/

  return (
    <>
      {parse(content)}
      {children}
    </>
  );
}

export type { RawHtmlProps };

export { RawHtml };
