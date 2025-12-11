import { useEffect, useState } from "react";

export default function useScroll(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return isScrolled;
}
