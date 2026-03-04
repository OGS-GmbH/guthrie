import  {type ReactNode} from "react";

type ForProps = {count: number, children: ReactNode}
function For({count, children}: ForProps){

    for(let i = 0; i < count; i++) {}

    return
}
