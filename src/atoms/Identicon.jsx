import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";


export default function Identicon({address, className, size=24}) {
  const hasExtraClasses = className ? className : '';
  
  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      if (address && address != "")
        ref.current.appendChild(Jazzicon(size, parseInt(address.slice(2, 10), 16)));
        //ref.current.appendChild(Jazzicon(24, parseInt(address.slice(2, 10), 16)));
    }
  }, [address]);
  
  
  return <div className={`${hasExtraClasses} identicon`} ref={ref} />
}