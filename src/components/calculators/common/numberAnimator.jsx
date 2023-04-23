import { useEffect, useRef, useState } from "react";
import { numberFormater } from "../../../util/numberFunction";

export default function NumberAnimator({ value }) {
  const [count, setCount] = useState(value);

  const countRef = useRef(count);
  
  
    useEffect(() => {
      countRef.current = count;
    }, [value]);

  useEffect(() => {
    let intervalId;

    let finalValue  = 0;
    if(!isNaN(value)){
      finalValue = value;
    }
    const increment = (finalValue - countRef.current) / 30;

    intervalId = setInterval(() => {
      if (
        (increment > 0 && count + increment >= finalValue) ||
        (increment < 0 && count + increment <= finalValue)
      ) {
        setCount(finalValue);
        clearInterval(intervalId);
      } else {
        setCount(count + increment);
      }
    }, 8);

    return () => clearInterval(intervalId);
  }, [count, value]);

  return <>₹{numberFormater(count, false, true)}</>;
}
