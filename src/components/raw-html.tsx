import parse from 'html-react-parser';
import  {type ReactNode} from "react";

type HtmlProps = { content: string, children: ReactNode[] };

function RawHtml({content, children}: HtmlProps) {
    /*TODO: templateinterpolation"*/

    return (<>
        {parse(content)}
        {children}
    </>)
}

export {RawHtml}
