import {Html} from "./components/html.tsx";
import {If} from "./components/if.tsx";
import {Else} from "./components/else.tsx";
import {type ElementType, Fragment} from "react";
import {For} from "./components/for.tsx";

const DEFAULT_COMPONENTS: Record<string, ElementType> = {
    html: Html,
    if: If,
    else: Else,
    for: For,
    text: Fragment
}

export {DEFAULT_COMPONENTS}
