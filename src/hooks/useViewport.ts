import { useState, useEffect, useCallback } from "react";

const useViewport = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return isMobile;
};

export default useViewport;
