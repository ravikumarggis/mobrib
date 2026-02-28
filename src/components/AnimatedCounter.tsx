import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // animation duration in ms
  prefix?: string;
}

const AnimatedCounter = ({
  value = 0,
  duration = 1500,
  prefix = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;

    if (start === end) return;

    const incrementTime = 20;
    const totalSteps = duration / incrementTime;
    const step = end / totalSteps;

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{prefix}{count.toLocaleString()}</span>;
};

export default AnimatedCounter;