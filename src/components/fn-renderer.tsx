import {useGuthrieFns} from "../stores/fns.ts";
import {useEffect, useRef, useState} from "react";
import type {DynamicElementProps} from "../renderer/type.ts";
import {Renderer} from "../renderer/renderer.tsx";
import {useMountedEffect} from "../hooks/effect.ts";

function FnRenderer({name, args, as}) {
  const fn = useGuthrieFns((state)=> state.getFn(name));
  const [content, setContent] = useState<DynamicElementProps | null>(null);
  const testPromise = new Promise<DynamicElementProps | null>((resolve) => {
    setTimeout(()=>{
      resolve({element: "prefix_raw-html", content: "<h1>promise result</h1>"})
    }, 100)
  });

  useMountedEffect(()=>{
     Promise.resolve(testPromise).then((result)=> setContent(result));
  }, []);

  return content && (<Renderer {...content}/>)
}

export {FnRenderer}
