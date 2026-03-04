import {type ReactNode, type RefObject, useEffect, useMemo, useState} from "react";
import {useGuthrieRefs} from "../hooks";

type ElseProps = { ifRef: string, children: ReactNode[] };

function Else({ ifRef, children }: ElseProps) {
    const guthrieRefs = useGuthrieRefs(state => state.refs);
    const [renderChildren, setRenderChildren] = useState(false);
    const ifNodeRef = useMemo(() => guthrieRefs[ifRef] as RefObject<{isTrue: boolean}>, [guthrieRefs])

    useEffect(()=> {
        setRenderChildren(!ifNodeRef?.current?.isTrue)
        console.log(ifNodeRef?.current?.isTrue);
    }, [ifNodeRef?.current.isTrue])

    return renderChildren && children

}

export {Else}
