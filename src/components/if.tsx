import {type ReactNode, type RefObject, useImperativeHandle, useState} from "react";

type IfProps = { ref: RefObject<{isTrue: boolean}> | null; condition: boolean; children: ReactNode[] };

function If({ref, condition, children}: IfProps) {

    /*TODO: resolve and parse condition*/
    const [renderChildren, setRenderChildren] = useState(condition);

    useImperativeHandle(ref, () => ({isTrue: renderChildren}), [])

    return <>
        <button onClick={()=> {
            setRenderChildren((state) => !state);
        }}>
            GEHT AB
        </button>
        {renderChildren && children}
    </>
}

export {If}
