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
    const increment = (value - countRef.current) / 30;

    intervalId = setInterval(() => {
      if (
        (increment > 0 && count + increment >= value) ||
        (increment < 0 && count + increment <= value)
      ) {
        setCount(value);
        clearInterval(intervalId);
      } else {
        setCount(count + increment);
      }
    }, 8);

    return () => clearInterval(intervalId);
  }, [count, value]);

  return <>₹{numberFormater(count, true)}</>;
}
