"use client";

import { htmlToDOM } from "html-react-parser";

type RawHtmlProps = {
  content: string;
};

function RawHtml({ content }: RawHtmlProps) {
  return <>{htmlToDOM(content)}</>;
}

export type { RawHtmlProps };

export { RawHtml };
