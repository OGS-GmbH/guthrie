import {Html} from "./components/html.tsx";
import {If} from "./components/if.tsx";
import {Else} from "./components/else.tsx";
import {Fragment} from "react";
import { ElseIf } from "./components/elseif.tsx";

const DEFAULT_COMPONENTS = {
    html: Html,
    if: If,
    else: Else,
    "else-if": ElseIf,
    button: "button",
    text: Fragment
}

export {DEFAULT_COMPONENTS}
