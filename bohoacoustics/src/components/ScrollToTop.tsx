import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (hash) {
      return;
    }

    const forceScrollTop = () => {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run multiple times to overcome browser/Lenis state retention.
    forceScrollTop();
    const rafId = window.requestAnimationFrame(forceScrollTop);
    const timeoutId = window.setTimeout(forceScrollTop, 50);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
